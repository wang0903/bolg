<template><div><h1 id="docker安装nginx-并配置ssl证书" tabindex="-1"><a class="header-anchor" href="#docker安装nginx-并配置ssl证书" aria-hidden="true">#</a> docker安装nginx，并配置SSL证书</h1>
<h3 id="_1、下载ssl证书和秘钥" tabindex="-1"><a class="header-anchor" href="#_1、下载ssl证书和秘钥" aria-hidden="true">#</a> 1、下载SSL证书和秘钥</h3>
<h4 id="根据自己购买的ssl网站上下载证书和秘钥" tabindex="-1"><a class="header-anchor" href="#根据自己购买的ssl网站上下载证书和秘钥" aria-hidden="true">#</a> <strong>根据自己购买的SSL网站上下载证书和秘钥</strong></h4>
<p><em>下载文件的后缀名分别为：（如：.xxxxxxx.com.crt，.xxxxxxxx.com.pem，SSL.KEY）这只是一个实例，具体要到你购买的网站上下载</em></p>
<h3 id="_2、使用docker安装nginx" tabindex="-1"><a class="header-anchor" href="#_2、使用docker安装nginx" aria-hidden="true">#</a> 2、使用docker安装nginx</h3>
<h6 id="_2-1、安装docker-compose-官网-https-github-com-docker-compose-tags" tabindex="-1"><a class="header-anchor" href="#_2-1、安装docker-compose-官网-https-github-com-docker-compose-tags" aria-hidden="true">#</a> 2.1、安装docker-compose，官网：https://github.com/docker/compose/tags</h6>
<h6 id="_2-2、编辑docker-compose文件-docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_2-2、编辑docker-compose文件-docker-compose-yml" aria-hidden="true">#</a> 2.2、编辑docker-compose文件，docker-compose.yml</h6>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"80:80"</span>
      <span class="token punctuation">-</span> <span class="token string">"443:443"</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> TZ=Asia/Shanghai
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/mes/work/nginx/nginx.conf<span class="token punctuation">:</span>/etc/nginx/nginx.conf  <span class="token comment">#将容器中的文件挂载到宿主机中，前面是宿主机文件路径，后面是容器文件路径</span>
      <span class="token punctuation">-</span> /home/mes/work/nginx/conf.d<span class="token punctuation">:</span>/etc/nginx/conf.d <span class="token comment">#放配置文件</span>
      <span class="token punctuation">-</span> /home/mes/work/nginx/logs<span class="token punctuation">:</span>/var/log/nginx <span class="token comment">#放日志</span>
      <span class="token punctuation">-</span> /home/mes/work/nginx/cert<span class="token punctuation">:</span>/etc/nginx/cert <span class="token comment">#证书和秘钥放在这个目录下面</span>
      <span class="token punctuation">-</span> /home/mes/work/nginx/html<span class="token punctuation">:</span>/usr/share/nginx/html <span class="token comment">#放网站文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、修改配置文件-nginx-conf" tabindex="-1"><a class="header-anchor" href="#_3、修改配置文件-nginx-conf" aria-hidden="true">#</a> 3、修改配置文件：nginx.conf</h3>
<div class="language-conf line-numbers-mode" data-ext="conf"><pre v-pre class="language-conf"><code>user nginx;
worker_processes 1;

events {
    worker_connections 1024;
}

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    log_format  main  '$remote_addr - $remote_user [$time_local] &quot;$request&quot; '
                      '$status $body_bytes_sent &quot;$http_referer&quot; '
                      '&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;';

    access_log  /var/log/nginx/access.log  main;

    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 2;
    gzip_types text/plain application/x-javascript text/css application/xml application/javascript;

    include /etc/nginx/conf.d/*.conf;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1、修改conf-d下的配置文件-pro-conf" tabindex="-1"><a class="header-anchor" href="#_3-1、修改conf-d下的配置文件-pro-conf" aria-hidden="true">#</a> 3.1、修改conf.d下的配置文件：pro.conf</h3>
<div class="language-conf line-numbers-mode" data-ext="conf"><pre v-pre class="language-conf"><code>server {
    listen       443 ssl http2; #用443端口访问资源，并开通SSL访问（HTTPS协议是通过443端口才能访问）
    server_name  wbg.com; #填写你自己的域名
      #把http的域名请求转成https
#    return 301 https://$server_name$request_uri; #让80端口跳转到443端口
    ssl_certificate  /etc/nginx/cert/_.xxxxxx.com.crt; # 替换为您的SSL证书文件的路径，文件路径一定要写容器内的路径，要写宿主机的路径
    ssl_certificate_key  /etc/nginx/cert/SSL.KEY; # 替换为您的SSL私钥文件的路径，文件路径一定要写容器内的路径，要写宿主机的路径

        # SSL参数，根据您的需求进行配置
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;#SSL版本，一般都是用新版本
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;

     # 配置SSL会话缓存以提高性能
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
#配置访问后端
   location /admin-api/ {
        proxy_pass http://192.168.1.1:48080/admin-api/; # 重要！！！proxy_pass 需要设置为后端项目所在服务器的 IP
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /app-api/ { ## 后端项目 - 用户 App
        proxy_pass http://192.168.1.1:48080/app-api/; # 重要！！！proxy_pass 需要设置为后端项目所在服务器的 IP
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
  #访问前端资源
   location / {
        root   /usr/share/nginx/html/h5; #前端资源地址
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、上sl证书到容器内部的路径-etc-nginx-cert" tabindex="-1"><a class="header-anchor" href="#_4、上sl证书到容器内部的路径-etc-nginx-cert" aria-hidden="true">#</a> 4、上sl证书到容器内部的路径 /etc/nginx/cert/</h3>
<h3 id="_5、去路由上将你的服务器ip映射到外网上去-并开启443端口" tabindex="-1"><a class="header-anchor" href="#_5、去路由上将你的服务器ip映射到外网上去-并开启443端口" aria-hidden="true">#</a> 5、去路由上将你的服务器IP映射到外网上去，并开启443端口</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nat server protocol tcp global <span class="token number">192.168</span>.1.1 <span class="token number">443</span> inside <span class="token number">192.168</span>.1.2 <span class="token number">443</span> <span class="token comment">#映射并开通端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、重启nginx服务-重启容器" tabindex="-1"><a class="header-anchor" href="#_6、重启nginx服务-重启容器" aria-hidden="true">#</a> 6、重启nginx服务,重启容器</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> restart nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7、测试" tabindex="-1"><a class="header-anchor" href="#_7、测试" aria-hidden="true">#</a> 7、测试</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-k</span> https://你的服务器IP/admin-api/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


