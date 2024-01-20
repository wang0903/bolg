---
icon: pen-to-square
date: 2024-01-20
category:
  - elasticsearch
  - kibana
  - logstash
tag:
  - elasticsearch
  - kibana
  - logstash
star: true
sticky: true #标记
---

# ELFK部署
## 启动文件
### 创建docker-compose.yml文件,用docker进行安装
```yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.9
    container_name: es
    networks:
      - elk_net
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - /home/elk/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
      - /home/elk/elasticsearch/data:/usr/share/elasticsearch/data
      - /home/elk/elasticsearch/logs:/usr/share/elasticsearch/logs
    environment:
      - ES_JAVA_OPTS=-Xms1024m -Xmx1024m
      - discovery.type=single-node

  logstash:
    image: docker.elastic.co/logstash/logstash:7.17.9
    container_name: lh
    networks:
      - elk_net
    ports:
      - "5047:5047"
      - "9600:9600"
      - "5044:5044" #用于接收FileBeat收集的数据
    volumes:
      - /home/elk/logstash/config:/usr/share/logstash/config
      - /home/elk/logstash/logs/:/usr/share/logs/

  kibana:
    image: docker.elastic.co/kibana/kibana:7.17.9
    container_name: kb
    networks:
      - elk_net
    ports:
      - "5601:5601"
    volumes:
      - /home/elk/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml

networks:
  elk_net:
    driver: bridge
```
## 配置文件
### elasticsearch配置,创建elasticsearch.yml文件
```yaml
cluster.name: "elastic"   #es集群名称
network.host: 0.0.0.0
http.cors.enabled: true
http.cors.allow-origin: "*"
xpack.security.enabled: true #开启密码校验，若开启就必须要走第4步设置密码

```
### kibana 配置,创建kibana.yml文件,将配置添加在里面
```yaml
server.name: kibana
server.host: "0.0.0.0"
xpack.monitoring.ui.container.elasticsearch.enabled: true
elasticsearch.hosts: [ "http://192.168.128.138:9200" ]
elasticsearch.username: "elastic"
elasticsearch.password: "62352744aa??aa"
elasticsearch.requestTimeout: 50000
i18n.locale: "zh-CN"   #中文ui界面
server.publicBaseUrl: "http://192.168.128.138:5601"
```
### logstash 配置,创建logstash.yml,用于创建节点和对es的连接
```yaml
node.name: "logstash001"   #节点名称
http.host: "0.0.0.0" #允许从任何源接收传入的HTTP连接
xpack.monitoring.elasticsearch.hosts: [ "http://192.168.128.138:9200" ] #连接ES
xpack.monitoring.enabled: false   #设置禁用X-Pack监视功能

```
### 管道配置文件,创建pipeline001.conf文件
```yaml
input {
  beats {
    port => 5044    # 指定接收Filebeat的端口
    client_inactivity_timeout => 36000   # 客户端响应超时时间
    type => "yudao-server-log"   # 与output中对应的日志类型
  }
}

filter {
  # 这里是过滤器的配置，暂时为空
}

output {
  if [type] == "yudao-server-log" {
    elasticsearch {
      hosts => [ "192.168.1.138:9200" ]   # Elasticsearch集群的地址
      index => "yudao-server-log-%{+YYYY-MM-dd}"   # Elasticsearch中的索引名称，带有日期后缀
      user => "elastic"   # Elasticsearch用户名
      password => "123"   # Elasticsearch密码
    }
  }
}

```
### 当有多个管道文件是,在这个文件下配置pipelines.yml
```yaml
# This file is where you define your pipelines. You can define multiple.
# For more information on multiple pipelines, see the documentation:
#   https://www.elastic.co/guide/en/logstash/current/multiple-pipelines.html
#  可以在这个配置文件中定义多个管道，用于从多个数据源中获取信息
- pipeline.id: pipeline001   #管道id
  path.config: "/usr/share/logstash/config/*.conf"
```
## FileBeat部署
### 创建启动文件,docker-compose.yml
```yaml
version: '3.8'
services:
  filebeat:
    image: docker.elastic.co/beats/filebeat:7.17.9
    container_name: fb
    privileged: true
    volumes:
      - /home/mes/work/projects/filebeat/conf/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /home/mes/work/projects/yudao-server:/usr/share/filebeat/logs


```
### 配置文件
```yaml
filebeat.inputs:
- type: filestream        #自7.16开始log类型被废弃使用filestream代替
  id: my-filestream-id    #当type为filestream时，id必须要指派
  enabled: true
  paths:
    - /usr/share/filebeat/logs/*.log    #日志的位置

output.logstash:                     #输出到logstash中
  hosts: ["192.168.1.138:5044"]        #logstash的5044为beats监听端口

```