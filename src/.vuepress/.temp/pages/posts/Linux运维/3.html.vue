<template><div><h1 id="用docker搭建minio文件服务器" tabindex="-1"><a class="header-anchor" href="#用docker搭建minio文件服务器" aria-hidden="true">#</a> 用docker搭建minio文件服务器</h1>
<h3 id="_1、使用docker-compose搭建-创建docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_1、使用docker-compose搭建-创建docker-compose-yml" aria-hidden="true">#</a> 1、使用docker-compose搭建，创建docker-compose.yml</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>  <span class="token comment"># 使用Docker Compose的版本，当前为3。</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">minio</span><span class="token punctuation">:</span>  <span class="token comment"># 定义一个名为minio的服务。</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> minio/minio  <span class="token comment"># 使用MinIO官方镜像。</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> minio  <span class="token comment"># 为容器指定一个名称。</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
     <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai <span class="token comment">#设置时区</span>
      <span class="token key atrule">MINIO_ROOT_USER</span><span class="token punctuation">:</span> admin  <span class="token comment"># 设置MinIO的根用户用户名。</span>
      <span class="token key atrule">MINIO_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token number">123456</span>  <span class="token comment"># 设置MinIO的根用户密码。</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/data  <span class="token comment"># 将MinIO容器的数据卷映射到相对于docker-compose.yml文件的./data目录。</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"9000:9000"</span>  <span class="token comment"># 映射容器端口9000到主机端口9000，用于MinIO对象存储。</span>
      <span class="token punctuation">-</span> <span class="token string">"9090:9090"</span>  <span class="token comment"># 映射容器端口9090到主机端口9090，用于MinIO控制台。</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always  <span class="token comment"># 始终在容器退出时重新启动容器。</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> server /data <span class="token punctuation">-</span><span class="token punctuation">-</span>console<span class="token punctuation">-</span>address "<span class="token punctuation">:</span>9090"  <span class="token comment"># 启动MinIO容器并指定数据目录和控制台端口。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、启动minio容器-在包含docker-compose-yml文件的目录中运行以下命令来启动minio容器" tabindex="-1"><a class="header-anchor" href="#_2、启动minio容器-在包含docker-compose-yml文件的目录中运行以下命令来启动minio容器" aria-hidden="true">#</a> 2、启动MinIO容器：在包含<code v-pre>docker-compose.yml</code>文件的目录中运行以下命令来启动MinIO容器</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


