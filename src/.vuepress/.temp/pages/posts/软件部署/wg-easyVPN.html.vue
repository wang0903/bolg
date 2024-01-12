<template><div><h3 id="wg-easy官网-https-github-com-wg-easy-wg-easy" tabindex="-1"><a class="header-anchor" href="#wg-easy官网-https-github-com-wg-easy-wg-easy" aria-hidden="true">#</a> [wg-easy官网][https://github.com/wg-easy/wg-easy]</h3>
<h4 id="_1、创建docker-compose-yml文件-这种方式安装基础环境要安装docker和docker-compose-记得将服务器的ip映射到外网-映射端口为51820" tabindex="-1"><a class="header-anchor" href="#_1、创建docker-compose-yml文件-这种方式安装基础环境要安装docker和docker-compose-记得将服务器的ip映射到外网-映射端口为51820" aria-hidden="true">#</a> 1、<strong>创建docker-compose.yml文件，这种方式安装基础环境要安装docker和docker-compose</strong>，记得将服务器的IP映射到外网，映射端口为51820</h4>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">wg-easy</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> weejewel/wg<span class="token punctuation">-</span>easy <span class="token comment">#镜像名称</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> wg<span class="token punctuation">-</span>easy <span class="token comment">#容器名称</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> WG_HOST=115.238.65.36 <span class="token comment">#公网IP</span>
      <span class="token punctuation">-</span> PASSWORD=62352744aa<span class="token punctuation">?</span><span class="token punctuation">?</span>aa <span class="token comment">#默认登录密码</span>
      <span class="token punctuation">-</span> WG_DEFAULT_ADDRESS=192.168.21.x <span class="token comment">#默认生成的网段,需要写成公司内部的网段，最好是单独分配一个网段给</span>
      <span class="token punctuation">-</span> WG_DEFAULT_DNS=192.168.128.4  <span class="token comment">#网络的dns</span>
      <span class="token punctuation">-</span> WG_ALLOWED_IPS=192.168.127.0/24<span class="token punctuation">,</span> 192.168.128.0/24<span class="token punctuation">,</span>192.168.207.0/24 <span class="token comment">#允许那些公司内部网段被访问</span>
      <span class="token punctuation">-</span> WG_PERSISTENT_KEEPALIVE=25 <span class="token comment">#自动重连</span>
      <span class="token punctuation">-</span> WG_DEVICE=wg<span class="token punctuation">-</span>easy_default <span class="token comment">#服务器网卡名称（这个地方要填写docker的网络名称）</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/mes/wg<span class="token punctuation">-</span>easy<span class="token punctuation">:</span>/etc/wireguard <span class="token comment">#配置文件保存的位置</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"51820:51820/udp"</span> <span class="token comment">#vpn端口</span>
      <span class="token punctuation">-</span> <span class="token string">"51821:51821/tcp"</span> <span class="token comment">#连接客户端接口</span>
    <span class="token key atrule">cap_add</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> NET_ADMIN
      <span class="token punctuation">-</span> SYS_MODULE
    <span class="token key atrule">sysctls</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> net.ipv4.conf.all.src_valid_mark=1 <span class="token comment">#允许IP转发</span>
      <span class="token punctuation">-</span> net.ipv4.ip_forward=1
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always <span class="token comment">#容器自动重启</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> <span class="token comment">#用这个命令启动容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2、配置参数" tabindex="-1"><a class="header-anchor" href="#_2、配置参数" aria-hidden="true">#</a> 2、配置参数</h4>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/image-20231115082527594.png" alt="image-20231115082527594" tabindex="0" loading="lazy"><figcaption>image-20231115082527594</figcaption></figure>
<h4 id="_3、-pc端软件下载-https-download-wireguard-com-windows-client" tabindex="-1"><a class="header-anchor" href="#_3、-pc端软件下载-https-download-wireguard-com-windows-client" aria-hidden="true">#</a> 3、[PC端软件下载][https://download.wireguard.com/windows-client/]</h4>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/2.png" alt="image-20231115082720018" tabindex="0" loading="lazy"><figcaption>image-20231115082720018</figcaption></figure>
<h4 id="_4、-安卓下载-https-www-wireguard-com-install" tabindex="-1"><a class="header-anchor" href="#_4、-安卓下载-https-www-wireguard-com-install" aria-hidden="true">#</a> 4、[安卓下载][https://www.wireguard.com/install/]</h4>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/3.png" alt="image-20231115082942170" tabindex="0" loading="lazy"><figcaption>image-20231115082942170</figcaption></figure>
<h4 id="_5、苹果手机和苹果电脑自行到苹果商店下载" tabindex="-1"><a class="header-anchor" href="#_5、苹果手机和苹果电脑自行到苹果商店下载" aria-hidden="true">#</a> 5、苹果手机和苹果电脑自行到苹果商店下载</h4>
<h4 id="_6、容器安装" tabindex="-1"><a class="header-anchor" href="#_6、容器安装" aria-hidden="true">#</a> 6、容器安装</h4>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/4.png" alt="image-20231115083135626" tabindex="0" loading="lazy"><figcaption>image-20231115083135626</figcaption></figure>
<p>启动成功</p>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/5.png" alt="image-20231115083210747" tabindex="0" loading="lazy"><figcaption>image-20231115083210747</figcaption></figure>
<h4 id="_7、访问web端" tabindex="-1"><a class="header-anchor" href="#_7、访问web端" aria-hidden="true">#</a> 7、访问web端</h4>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/6.png" alt="image-20231115083427097" tabindex="0" loading="lazy"><figcaption>image-20231115083427097</figcaption></figure>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/7.png" alt="image-20231115083510204" tabindex="0" loading="lazy"><figcaption>image-20231115083510204</figcaption></figure>
<h4 id="_8、创建客户端密钥" tabindex="-1"><a class="header-anchor" href="#_8、创建客户端密钥" aria-hidden="true">#</a> 8、创建客户端密钥</h4>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/9.png" alt="image-20231115083637828" tabindex="0" loading="lazy"><figcaption>image-20231115083637828</figcaption></figure>
<h4 id="_9、下载密钥" tabindex="-1"><a class="header-anchor" href="#_9、下载密钥" aria-hidden="true">#</a> 9、下载密钥</h4>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/10.png" alt="image-20231115084127443" tabindex="0" loading="lazy"><figcaption>image-20231115084127443</figcaption></figure>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/11.png" alt="image-20231115084305012" tabindex="0" loading="lazy"><figcaption>image-20231115084305012</figcaption></figure>
<p>导入成功</p>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/Desktop/wg-easy/wg-easyVPN/13.png" alt="image-20231115084336803" tabindex="0" loading="lazy"><figcaption>image-20231115084336803</figcaption></figure>
<figure><img src="@source/posts/软件部署/C:/Users/hzwx20220304001/AppData/Roaming/Typora/typora-user-images/image-20231127140501740.png" alt="image-20231127140501740" tabindex="0" loading="lazy"><figcaption>image-20231127140501740</figcaption></figure>
<h4 id="_10、配置文件wg0-conf" tabindex="-1"><a class="header-anchor" href="#_10、配置文件wg0-conf" aria-hidden="true">#</a> 10、配置文件wg0.conf</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># Note: Do not edit this file directly.</span>
<span class="token comment"># Your changes will be overwritten!</span>

<span class="token comment"># Server</span>
<span class="token punctuation">[</span>Interface<span class="token punctuation">]</span>
PrivateKey <span class="token operator">=</span> SPPs8SREpY1z1+v7CRLbDTwpqRp0L+TCvdt3qOmD1GU<span class="token operator">=</span>
Address <span class="token operator">=</span> <span class="token number">192.168</span>.21.1/24 <span class="token comment">#这个地方记得写成你自己要分配的IP网段</span>
ListenPort <span class="token operator">=</span> <span class="token number">51820</span>
PreUp <span class="token operator">=</span>
PostUp <span class="token operator">=</span>  iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> POSTROUTING <span class="token parameter variable">-s</span> <span class="token number">192.168</span>.21.0/24 <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> MASQUERADE<span class="token punctuation">;</span> iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-m</span> udp <span class="token parameter variable">--dport</span> <span class="token number">51820</span> <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-i</span> wg0 <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-o</span> wg0 <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span>
PreDown <span class="token operator">=</span>
PostDown <span class="token operator">=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_11、配置文件wg0-json" tabindex="-1"><a class="header-anchor" href="#_11、配置文件wg0-json" aria-hidden="true">#</a> 11、配置文件wg0.json</h4>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"server"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"privateKey"</span><span class="token operator">:</span> <span class="token string">"SPPs8SREpY1z1+v7CRLbDTwpqRp0L+TCvdt3qOmD1GU="</span><span class="token punctuation">,</span>
    <span class="token property">"publicKey"</span><span class="token operator">:</span> <span class="token string">"BWG90hhWoiTM/9iZuBgdsX70pe/0UkN5JZFK7bpi7GQ="</span><span class="token punctuation">,</span>
    <span class="token property">"address"</span><span class="token operator">:</span> <span class="token string">"192.168.21.1"</span> #这个地方也改成你自己要分配的IP
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


