<template><div><h1 id="weave和xxl-job-admin安装与使用" tabindex="-1"><a class="header-anchor" href="#weave和xxl-job-admin安装与使用" aria-hidden="true">#</a> weave和xxl-job-admin安装与使用</h1>
<h2 id="一、官网" tabindex="-1"><a class="header-anchor" href="#一、官网" aria-hidden="true">#</a> 一、<a href="https://github.com/weaveworks/weave" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></h2>
<p>Weave Net（ https://github.com/weaveworks/weave）是Docker上的虚拟网络，可以将分布式的Docker服务链接为一个虚拟的服务网络，就像在一个局域网中运行一样，而且可以穿透防火墙（需要开放相应端口），从而可以构建出基于Mesh架构的对等服务网络(https://github.com/weaveworks/mesh )。目前Weave版本是独立发展的，尚未纳入Docker官方体系。</p>
<h2 id="二、安装" tabindex="-1"><a class="header-anchor" href="#二、安装" aria-hidden="true">#</a> 二、安装</h2>
<h3 id="_1、安装-weave-在每个宿主机上安装-weave" tabindex="-1"><a class="header-anchor" href="#_1、安装-weave-在每个宿主机上安装-weave" aria-hidden="true">#</a> 1、<strong>安装 Weave</strong>： 在每个宿主机上安装 Weave</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-L</span> git.io/weave <span class="token parameter variable">-o</span> /usr/local/bin/weave <span class="token comment">#也可以到github上下载</span>
<span class="token function">chmod</span> +x /usr/local/bin/weave
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2、<strong>启动 Weave</strong>： 在每个宿主机上启动 Weave 网络：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>weave launch <span class="token operator">&lt;</span>其他主机的IP<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、如果你的容器已经启动，又不想停止容器可以<strong>手动将容器连接到 Weave 网络</strong>： 假设 Weave 网络名称为 <code v-pre>weave</code>，可以通过以下命令将容器连接到 Weave 网络</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network connect weave <span class="token operator">&lt;</span>container_name_or_id<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4、<strong>创建自定义网络</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network create mynet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5、用docker-compose.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">xxl-job-admin</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> xuxueli/xxl<span class="token punctuation">-</span>job<span class="token punctuation">-</span>admin<span class="token punctuation">:</span>2.4.1
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> xxl<span class="token punctuation">-</span>job<span class="token punctuation">-</span>admin
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"8080:8080"</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">PARAMS</span><span class="token punctuation">:</span> <span class="token string">"--spring.datasource.url=jdbc:mysql://192.168.1.221:3306/xxl_job?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai --spring.datasource.username=root --spring.datasource.password=12dewew56 --xxl.job.accessToken=h333fsfsdsadsd"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /tmp<span class="token punctuation">:</span>/data/applogs
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> weave <span class="token comment">#连接到weave网络</span>

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">weave</span><span class="token punctuation">:</span>
    <span class="token key atrule">external</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6、运行 <code v-pre>docker-compose</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样，容器会自动加入 Weave 网络，你不需要手动执行 <code v-pre>docker network connect</code>。</p>
<p>7、检查容器是否已经加入 Weave 网络：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network inspect weave
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、安装-ping-工具" tabindex="-1"><a class="header-anchor" href="#三、安装-ping-工具" aria-hidden="true">#</a> 三、<strong>安装 <code v-pre>ping</code> 工具</strong>：</h2>
<p>1、如果是 <code v-pre>Debian</code> 或 <code v-pre>Ubuntu</code> 系列的容器：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">apt</span> update
<span class="token function">apt</span> <span class="token function">install</span> iputils-ping <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2、如果是 <code v-pre>Alpine</code> 镜像</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>apk <span class="token function">add</span> iputils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="四、安装指定版本" tabindex="-1"><a class="header-anchor" href="#四、安装指定版本" aria-hidden="true">#</a> 四、安装指定版本</h2>
<h3 id="_1-确保安装了-yum-utils" tabindex="-1"><a class="header-anchor" href="#_1-确保安装了-yum-utils" aria-hidden="true">#</a> 1. <strong>确保安装了 <code v-pre>yum-utils</code></strong></h3>
<p>在某些系统中，<code v-pre>yum-utils</code> 包可能包含版本锁定功能。你可以先安装它：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> yum-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-安装-yum-plugin-versionlock" tabindex="-1"><a class="header-anchor" href="#_2-安装-yum-plugin-versionlock" aria-hidden="true">#</a> 2. <strong>安装 <code v-pre>yum-plugin-versionlock</code></strong></h3>
<p>确保安装了 <code v-pre>yum-plugin-versionlock</code>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> yum-plugin-versionlock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-使用-versionlock-命令" tabindex="-1"><a class="header-anchor" href="#_3-使用-versionlock-命令" aria-hidden="true">#</a> 3. <strong>使用 <code v-pre>versionlock</code> 命令</strong></h3>
<p>一旦安装了 <code v-pre>yum-utils</code> 和 <code v-pre>yum-plugin-versionlock</code>，你就可以锁定特定版本的包。使用以下命令锁定 Docker 的版本：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum versionlock <span class="token function">add</span> docker-ce-24.0.6-1.el7 docker-ce-cli-24.0.6-1.el7 containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-检查已锁定的版本" tabindex="-1"><a class="header-anchor" href="#_4-检查已锁定的版本" aria-hidden="true">#</a> 4. <strong>检查已锁定的版本</strong></h3>
<p>你可以通过以下命令检查当前已锁定的包版本：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum versionlock list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-解锁版本-如需" tabindex="-1"><a class="header-anchor" href="#_5-解锁版本-如需" aria-hidden="true">#</a> 5. <strong>解锁版本（如需）</strong></h3>
<p>如果需要解锁版本，可以使用以下命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum versionlock delete docker-ce docker-ce-cli containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、卸载老版本" tabindex="-1"><a class="header-anchor" href="#_6、卸载老版本" aria-hidden="true">#</a> 6、<strong>卸载老版本</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum remove docker-ce docker-ce-cli containerd.io
<span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/docker
<span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、配置daemon-json" tabindex="-1"><a class="header-anchor" href="#_7、配置daemon-json" aria-hidden="true">#</a> 7、<strong>配置daemon.json</strong></h3>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"registry-mirrors"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"https://cf-workers-docker-io-784.pages.dev"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"insecure-registries"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"192.168.128.166:80"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"exec-opts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"native.cgroupdriver=systemd"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"log-driver"</span><span class="token operator">:</span> <span class="token string">"json-file"</span><span class="token punctuation">,</span>
  <span class="token property">"log-opts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"max-size"</span><span class="token operator">:</span> <span class="token string">"100m"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"storage-driver"</span><span class="token operator">:</span> <span class="token string">"overlay2"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8、安装docker指定版本" tabindex="-1"><a class="header-anchor" href="#_8、安装docker指定版本" aria-hidden="true">#</a> 8、<strong>安装docker指定版本</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> docker-ce-24.0.6-1.el7 docker-ce-cli-24.0.6-1.el7 containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_9、启动-docker-并启用开机自启" tabindex="-1"><a class="header-anchor" href="#_9、启动-docker-并启用开机自启" aria-hidden="true">#</a> 9、<strong>启动 Docker 并启用开机自启</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl start <span class="token function">docker</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


