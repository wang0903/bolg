import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,d as e}from"./app-af1K1DCR.js";const i={},t=e(`<h1 id="docker安装nginx服务器-代理访问minio" tabindex="-1"><a class="header-anchor" href="#docker安装nginx服务器-代理访问minio" aria-hidden="true">#</a> docker安装nginx服务器,代理访问minio</h1><h3 id="_1-拉取nginx镜像-创建docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_1-拉取nginx镜像-创建docker-compose-yml" aria-hidden="true">#</a> 1. 拉取nginx镜像,创建docker-compose.yml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;80:80&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;443:443&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> TZ=Asia/Shanghai
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./nginx.conf<span class="token punctuation">:</span>/etc/nginx/nginx.conf <span class="token comment"># 挂载配置文件</span>
      <span class="token punctuation">-</span> ./conf.d<span class="token punctuation">:</span>/etc/nginx/conf.d <span class="token comment"># 挂载配置目录</span>
      <span class="token punctuation">-</span> ./logs<span class="token punctuation">:</span>/var/log/nginx <span class="token comment"># 挂载日志目录</span>
      <span class="token punctuation">-</span> ./cert<span class="token punctuation">:</span>/etc/nginx/cert <span class="token comment"># 挂载证书目录</span>
      <span class="token punctuation">-</span> ./html<span class="token punctuation">:</span>/usr/share/nginx/html <span class="token comment"># 挂载网站目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-拉取minio镜像-创建docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_2-拉取minio镜像-创建docker-compose-yml" aria-hidden="true">#</a> 2. 拉取minio镜像,创建docker-compose.yml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">minio</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> minio/minio<span class="token punctuation">:</span>RELEASE.2023<span class="token punctuation">-</span>09<span class="token punctuation">-</span>23T03<span class="token punctuation">-</span>47<span class="token punctuation">-</span>50Z
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> minio
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MINIO_ROOT_USER</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">MINIO_ROOT_PASSWORD</span><span class="token punctuation">:</span> 62352744aa<span class="token punctuation">?</span><span class="token punctuation">?</span>aa
       <span class="token comment">#设置时区</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token comment">#https需要指定域名</span>
      <span class="token comment">#MINIO_SERVER_URL: &quot;https://mi.dingshenggroup.com:9090&quot;</span>
      <span class="token comment">#MINIO_BROWSER_REDIRECT_URL: &quot;http://192.168.128.164:9090&quot;</span>
      <span class="token comment">#MINIO_API_BROWSER: &quot;on&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/data <span class="token comment">#数据文件挂载</span>
      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/root/.minio 
        <span class="token comment">#  - ./certs:/root/.minio/certs #SSL证书</span>
      <span class="token punctuation">-</span> ./custom<span class="token punctuation">-</span>config.json<span class="token punctuation">:</span>/root/.minio/config.json <span class="token comment">#跨域访问配置</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9090:9090&quot;</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">command</span><span class="token punctuation">:</span> server <span class="token punctuation">-</span><span class="token punctuation">-</span>address &quot;<span class="token punctuation">:</span>9000&quot; /data <span class="token punctuation">-</span><span class="token punctuation">-</span>console<span class="token punctuation">-</span>address &quot;<span class="token punctuation">:</span>9090&quot; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-nginx配置" tabindex="-1"><a class="header-anchor" href="#_3-nginx配置" aria-hidden="true">#</a> 3. nginx配置</h3><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>server {
    listen 9090;
    server_name wbg.com;
    return 301 https://$host$request_uri;
}
server {
    listen       443 ssl http2;
    server_name  wbg.com;
    #证书路径
    ssl_certificate  /etc/nginx/cert/_.xxxxxxx.com.crt;
    #SSL私钥文件的路径
    ssl_certificate_key  /etc/nginx/cert/SSL.KEY;

    # SSL参数，根据您的需求进行配置
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;#SSL版本，一般都是用新版本
    ssl_ciphers &#39;TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:ECDHE-RSA-AES128-GCM-SHA256&#39;;
    ssl_prefer_server_ciphers off;

     # 配置SSL会话缓存以提高性能
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

     location /file/ {
         # 用于访问minio服务器静态资源
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://192.168.1.3:9000/file/; # 假设MinIO运行在同一台机器的9000端口
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        client_max_body_size 0; # 设置为0表示不限制上传文件大小
        sub_filter &#39;http://192.168.1.3:9000&#39; &#39;https://wbg.com:9000&#39;;
        sub_filter_once off;

   }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-重启容器nginx" tabindex="-1"><a class="header-anchor" href="#_4-重启容器nginx" aria-hidden="true">#</a> 4. 重启容器nginx</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> restart nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-上传ssl证书到-etc-nginx-cert-这个是容器内部的路径-需要映射到宿主机" tabindex="-1"><a class="header-anchor" href="#_5-上传ssl证书到-etc-nginx-cert-这个是容器内部的路径-需要映射到宿主机" aria-hidden="true">#</a> 5. 上传ssl证书到/etc/nginx/cert，这个是容器内部的路径，需要映射到宿主机</h3>`,10),c=[t];function l(o,p){return s(),a("div",null,c)}const r=n(i,[["render",l],["__file","2.html.vue"]]);export{r as default};
