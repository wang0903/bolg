---
icon: pen-to-square
date: 2024-01-14
category:
  - Linux
tag:
  - java
  - 文件上传
  - minio
  - LVM扩容
star: true
sticky: true #标记
---
# 上传文件到minio服务器

### 1、创建application.yml

```yaml
server:
  port: 8888
minio:
  endpoint: http://192.168.128.136:9000
  accessKey: W5P57CbevU95VEDNqQPO
  secretKey: ovCPyRobUcBLc8ziBtGbILZQXPCL7MQVichvj2sw
  bucketName: file
```

### 2、SpringBoot 启动类

```java
package com.hzwx.file;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = {"com.hzwx.file.minioutil"}) //扫描包
@EnableScheduling // 确保定时任务生效
public class FileApplication {

    public static void main(String[] args) {
        SpringApplication.run(FileApplication.class, args);
    }

}
```

### 3、创建minio工具类

```java
package com.hzwx.file.minioutil;

import io.minio.*;
import io.minio.credentials.Provider;
import io.minio.credentials.StaticProvider;
import io.minio.errors.MinioException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.InputStream;

/**
 * Minio工具类，用于上传文件到MinIO对象存储。
 */
@Component
public class MinioUtil {

    @Value("${minio.endpoint}")  // MinIO服务的URL
    private String endpoint;

    @Value("${minio.accessKey}") // 访问MinIO服务的accessKey
    private String accessKey;

    @Value("${minio.secretKey}") // 访问MinIO服务的secretKey
    private String secretKey;

    @Value("${minio.bucketName}") // MinIO服务中的bucket名称
    private String bucketName;

    // MinIO客户端，用于操作MinIO服务
    private MinioClient minioClient;

    /**
     * 初始化方法，在构造函数执行后调用，用于创建MinioClient实例。
     *
     * @throws Exception 初始化失败时抛出异常。
     */
    @PostConstruct
    public void init() throws Exception {
        // 创建静态提供者，用于提供访问MinIO所需的凭证
        Provider provider = new StaticProvider(accessKey, secretKey, null);
        // 创建MinioClient实例
        minioClient = MinioClient.builder()
                .endpoint(endpoint) //设置MinIO服务的URL。这是你的MinIO服务器的地址，可以是公网地址，也可以是内网地址，取决于你的使用环境。
                .credentialsProvider(provider) //设置访问MinIO服务的凭证。这里的provider是一个凭证提供者对象，它包含了访问MinIO服务所需的accessKey和secretKey
                .build();
    }
    /**
     * 上传文件到MinIO对象存储。
     *
     * @param objectName  对象的名称，即上传到MinIO后的文件名。
     * @param stream      要上传的文件的输入流。
     * @param contentType 文件内容的MIME类型。
     */
    public void uploadFile(String objectName, InputStream stream, String contentType) {
        try {
            // 检查存储桶是否存在，不存在则创建
            boolean isExist = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (!isExist) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }
            // 获取文件大小
            long size = stream.available();
            // 上传文件到MinIO
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName) //设置要上传到的存储桶（Bucket）的名称。
                            .object(objectName) //设置上传文件在MinIO服务器上的对象名。这通常是文件的路径和名称
                            .stream(stream, size, -1) //设置要上传的文件的输入流，及其大小。这里的stream是文件的输入流，size是文件的大小。-1代表的是文件的etag，它是一个可选参数，用于验证文件的一致性。在这里，我们没有提供etag，所以填写-1
                            .contentType(contentType) //设置文件的MIME类型。这是一个可选参数，如果不设置，MinIO服务器会默认使用application/octet-stream。
                            .build()); //构建PutObjectArgs对象。
        } catch (Exception e) {
            System.out.println("发生错误: " + e);
        }
    }

    public void testMinioConnection() {
        try {
            // 执行一个简单的操作以检查 MinIO 服务器是否可访问
            minioClient.listBuckets();

            System.out.println("MinIO 连接测试成功！");
        } catch (MinioException e) {
            System.out.println("MinIO 连接测试失败：" + e.getMessage());
        } catch (Exception e) {
            System.out.println("在 MinIO 连接测试期间发生错误：" + e.getMessage());
        }
    }
}
```

### 4、创建文件扫描定时任务，*定期将指定文件夹中的文件上传到**MinIO**对象存储。*

```java
package com.hzwx.file.minioutil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.time.LocalDateTime;

/**
 * 文件扫描定时任务，定期将指定文件夹中的文件上传到MinIO对象存储。
 */
@Component
public class FileScanTask {

    @Autowired
    private MinioUtil minioUtil;

    /**
     * 定时任务方法，每分钟执行一次，扫描指定文件夹中的文件并上传到MinIO。
     */
    //@Scheduled(cron = "0 0/1 * * * ?") // 每分钟执行一次
    @Scheduled(fixedDelay = 60000)
    public void scanAndUpload() {
        System.out.println("Scheduled task executed at: " + LocalDateTime.now());
        // 本地文件夹路径
        File folder = new File("D:/upload");
        // 获取文件夹中的所有文件
        File[] files = folder.listFiles();
        // 如果文件夹非空
        if (files != null) {
            // 遍历文件夹中的每个文件
            for (File file : files) {
                try (InputStream in = new FileInputStream(file)) {
                    // 上传文件到指定的文件夹
                    String objectName = "folder/" + file.getName();

                    // 调用MinioUtil的uploadFile方法将文件上传到MinIO
                    minioUtil.uploadFile(objectName, in, "application/octet-stream");
                    // 上传成功后删除本地文件
                    file.delete();
                } catch (Exception e) {
                    // 发生异常时打印错误信息
                    e.printStackTrace();
                    // 添加日志输出
                    System.err.println("Error during file upload: " + e.getMessage());
                }
            }
        } else {
            // 输出文件夹为空的信息
            System.out.println("No files found in the folder.");
        }
    }
}
```

### 4.1、指定上传文件类型

```java
package com.hzwx.file.minioutil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

@Component
public class FileScanTask {

    @Autowired
    private MinioUtil minioUtil;

    @Scheduled(cron = "0 0/1 * * * ?") // 每分钟执行一次
    public void scanAndUpload() {
        File folder = new File("D:/upload");
        File[] files = folder.listFiles();
        if (files != null) {
            for (File file : files) {
                // 检查文件是否为 Excel 文件（以 .xls 或 .xlsx 结尾）
                if (file.getName().toLowerCase().endsWith(".xls") || file.getName().toLowerCase().endsWith(".xlsx")) {
                    try (InputStream in = new FileInputStream(file)) {
                        // 调用 MinioUtil 的 uploadFile 方法将 Excel 文件上传到 MinIO
                        minioUtil.uploadFile(file.getName(), in, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                        file.delete(); // 上传后删除本地文件
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    System.out.println("Skipping non-Excel file: " + file.getName());
                }
            }
        }
    }
}
```

### 5、测试文件，测试有没有连接成功

```java
package com.hzwx.file;

import com.hzwx.file.minioutil.MinioUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@SpringBootTest
class FileApplicationTests {

    @Autowired
    private MinioUtil minioUtil;

    @Test
    void testMinioConnection() {
        // 测试MinIO连接是否正常
        try {
            minioUtil.testMinioConnection();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    void testUploadFile() {
        // 测试上传文件到MinIO
        try {
            // 创建一个简单的InputStream作为示例
            String content = "Hello, MinIO!";
            InputStream inputStream = new ByteArrayInputStream(content.getBytes());

            // 替换为你实际的对象名称和内容类型
            String objectName = "test-file.txt";
            String contentType = "text/plain";

            // 调用MinioUtil的uploadFile方法上传文件
            minioUtil.uploadFile(objectName, inputStream, contentType);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 可以继续添加其他测试用例...
}
```

### 6、pom.xml文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.1</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.hzwx</groupId>
    <artifactId>file</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>file</name>
    <description>file</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>io.minio</groupId>
            <artifactId>minio</artifactId>
            <version>8.5.7</version>
        </dependency>

        <dependency>
            <groupId>javax.annotation</groupId>
            <artifactId>javax.annotation-api</artifactId>
            <version>1.3.2</version>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                    <!-- 设置 打包名字 属性 -->
                    <finalName>file-app</finalName>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```