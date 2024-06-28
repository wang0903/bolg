<template><div><h1 id="docker安装v2raya" tabindex="-1"><a class="header-anchor" href="#docker安装v2raya" aria-hidden="true">#</a> docker安装v2rayA</h1>
<h2 id="debian-ubuntu-kalilinux" tabindex="-1"><a class="header-anchor" href="#debian-ubuntu-kalilinux" aria-hidden="true">#</a> Debian/Ubuntu/kaliLinux</h2>
<p>官网：https://v2raya.org/en/</p>
<p>v2rayA 的功能依赖于 V2Ray 核心，因此需要安装内核。</p>
<h4 id="方法一-通过软件源安装" tabindex="-1"><a class="header-anchor" href="#方法一-通过软件源安装" aria-hidden="true">#</a> 方法一：通过软件源安装</h4>
<h5 id="_1、公钥" tabindex="-1"><a class="header-anchor" href="#_1、公钥" aria-hidden="true">#</a> 1、公钥</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-qO</span> - https://apt.v2raya.org/key/public-key.asc <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/keyrings/v2raya.asc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_2、添加v2raya软件源" tabindex="-1"><a class="header-anchor" href="#_2、添加v2raya软件源" aria-hidden="true">#</a> 2、添加V2RayA软件源</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">"deb [signed-by=/etc/apt/keyrings/v2raya.asc] https://apt.v2raya.org/ v2raya main"</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/v2raya.list
<span class="token function">sudo</span> <span class="token function">apt</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3、安装" tabindex="-1"><a class="header-anchor" href="#_3、安装" aria-hidden="true">#</a> 3、安装</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> v2raya v2ray <span class="token comment">## you can install xray package instead of if you want</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="方法-二-手动安装-deb" tabindex="-1"><a class="header-anchor" href="#方法-二-手动安装-deb" aria-hidden="true">#</a> 方法 二：手动安装 deb</h4>
<h5 id="_1、下载deb包之后-可以使用gdebi、qapt等图形化工具进行安装-也可以使用命令行" tabindex="-1"><a class="header-anchor" href="#_1、下载deb包之后-可以使用gdebi、qapt等图形化工具进行安装-也可以使用命令行" aria-hidden="true">#</a> 1、<a href="https://github.com/v2rayA/v2rayA/releases" target="_blank" rel="noopener noreferrer">下载deb包<ExternalLinkIcon/></a>之后 可以使用Gdebi、QApt等图形化工具进行安装，也可以使用命令行：</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> /path/download/installer_debian_xxx_vxxx.deb <span class="token comment">### Replace the actual path where the deb package is located by yourself</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以在<a href="https://github.com/v2rayA/v2raya-apt/tree/master/pool/main/" target="_blank" rel="noopener noreferrer">APT Repo中找到 V2Ray 和 Xray debian 软件包<ExternalLinkIcon/></a></p>
<p>启动 v2rayA / 启用 v2rayA 自动启动</p>
<blockquote>
<p>从1.5版本开始，将不再默认启动v2rayA并设置自动启动。</p>
</blockquote>
<h5 id="_2、启动-v2raya" tabindex="-1"><a class="header-anchor" href="#_2、启动-v2raya" aria-hidden="true">#</a> 2、启动 v2rayA</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl start v2raya.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_3、设置自动启动" tabindex="-1"><a class="header-anchor" href="#_3、设置自动启动" aria-hidden="true">#</a> 3、设置自动启动</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> v2raya.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="方法三-docker安装" tabindex="-1"><a class="header-anchor" href="#方法三-docker安装" aria-hidden="true">#</a> 方法三：docker安装</h4>
<h5 id="官网https-v2raya-org-en-docs-prologue-installation-docker" tabindex="-1"><a class="header-anchor" href="#官网https-v2raya-org-en-docs-prologue-installation-docker" aria-hidden="true">#</a> 官网https://v2raya.org/en/docs/prologue/installation/docker/</h5>
<h5 id="_1、镜像下载" tabindex="-1"><a class="header-anchor" href="#_1、镜像下载" aria-hidden="true">#</a> 1、镜像下载</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull mzz2017/v2raya
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li><strong><code v-pre>V2RAYA_V2RAY_BIN</code>应该是<code v-pre>/usr/local/bin/v2ray</code>或者<code v-pre>/usr/local/bin/xray</code>，v2rayA 默认核心是 xray。</strong></li>
<li><strong>如果您的主机操作系统正在使用本机 nftables，请设置<code v-pre>V2RAYA_NFTABLES_SUPPORT</code>为。<code v-pre>on</code></strong></li>
<li><strong>如果您的主机操作系统正在使用 iptables，那么您可以<code v-pre>IPTABLES_MODE</code>选择您的 iptables 后端，它可以是<code v-pre>nftables</code>（使用 nft 后端）或<code v-pre>legacy</code>（使用旧式 iptables 后端）。</strong></li>
</ol>
<h5 id="_2、运行docker容器" tabindex="-1"><a class="header-anchor" href="#_2、运行docker容器" aria-hidden="true">#</a> 2、运行docker容器</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\</span>
  <span class="token parameter variable">--privileged</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">--network</span><span class="token operator">=</span>host <span class="token punctuation">\</span>
  <span class="token parameter variable">--name</span> v2raya <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_LOG_FILE</span><span class="token operator">=</span>/tmp/v2raya.log <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_V2RAY_BIN</span><span class="token operator">=</span>/usr/local/bin/v2ray <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_NFTABLES_SUPPORT</span><span class="token operator">=</span>off <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">IPTABLES_MODE</span><span class="token operator">=</span>legacy <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /lib/modules:/lib/modules:ro <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /etc/resolv.conf:/etc/resolv.conf <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /etc/v2raya:/etc/v2raya <span class="token punctuation">\</span>
  mzz2017/v2raya
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你使用 macOS 或者其他不支持 host 模式的环境，这种情况下<strong>就无法使用全局透明代理</strong>，或者你不想使用全局透明代理，docker 命令会稍有不同：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">-p</span> <span class="token number">2017</span>:2017 <span class="token punctuation">\</span>
  <span class="token parameter variable">-p</span> <span class="token number">20170</span>-20172:20170-20172 <span class="token punctuation">\</span>
  <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\</span>
  <span class="token parameter variable">--name</span> v2raya <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_V2RAY_BIN</span><span class="token operator">=</span>/usr/local/bin/v2ray <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_LOG_FILE</span><span class="token operator">=</span>/tmp/v2raya.log <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /etc/v2raya:/etc/v2raya <span class="token punctuation">\</span>
  mzz2017/v2raya
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查状态：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> container stats v2raya
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="方法-2-获取特定版本" tabindex="-1"><a class="header-anchor" href="#方法-2-获取特定版本" aria-hidden="true">#</a> <a href="https://v2raya.org/en/docs/prologue/installation/docker/#method-2-get-a-specific-version" target="_blank" rel="noopener noreferrer">方法 2：获取特定<ExternalLinkIcon/></a>版本</h5>
<p>Docker 允许用户同时下载不同版本的 v2rayA，通过使用不同的端口，用户还可以运行多个不同版本的 v2rayA。</p>
<p>获取 Docker</p>
<p>获取最新版本号：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">Latest_version</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token string">"https://api.github.com/repos/v2rayA/v2rayA/releases/latest"</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">'tag_name'</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">'"'</span> <span class="token string">'{print $4}'</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">'v'</span> <span class="token string">'{print $2}'</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable">$Latest_version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你不需要最新版本，也可以访问 Docker 镜像仓库：https://hub.docker.com/r/mzz2017/v2raya/tags 找到你需要的版本，比如你需要 1.5.8 版本，那么替换<code v-pre>$Latest_version</code>成你需要的版本即可。</p>
<p>拉取 Docker 镜像：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull mzz2017/v2raya:<span class="token variable">$Latest_version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行</p>
<p>使用 Docker 运行 v2rayA：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\</span>
  <span class="token parameter variable">--privileged</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">--network</span><span class="token operator">=</span>host <span class="token punctuation">\</span>
  <span class="token parameter variable">--name</span> v2raya <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_LOG_FILE</span><span class="token operator">=</span>/tmp/v2raya.log <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_V2RAY_BIN</span><span class="token operator">=</span>/usr/local/bin/v2ray <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_NFTABLES_SUPPORT</span><span class="token operator">=</span>off <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">IPTABLES_MODE</span><span class="token operator">=</span>legacy <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /lib/modules:/lib/modules:ro <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /etc/resolv.conf:/etc/resolv.conf <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /etc/v2raya:/etc/v2raya <span class="token punctuation">\</span>
  mzz2017/v2raya:<span class="token variable">$Latest_version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你使用 macOS 或者其他不支持 host 模式的环境，这种情况下<strong>就无法使用全局透明代理</strong>，或者你不想使用全局透明代理，docker 命令会稍有不同：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">-p</span> <span class="token number">2017</span>:2017 <span class="token punctuation">\</span>
  <span class="token parameter variable">-p</span> <span class="token number">20170</span>-20172:20170-20172 <span class="token punctuation">\</span>
  <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\</span>
  <span class="token parameter variable">--name</span> v2raya <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">V2RAYA_LOG_FILE</span><span class="token operator">=</span>/tmp/v2raya.log <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /etc/v2raya:/etc/v2raya <span class="token punctuation">\</span>
  mzz2017/v2raya:<span class="token variable">$Latest_version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查状态：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> container stats v2raya
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="升级-v2raya" tabindex="-1"><a class="header-anchor" href="#升级-v2raya" aria-hidden="true">#</a> 升级 v2rayA</h4>
<p><a href="https://v2raya.org/en/docs/prologue/installation/docker/#pull-the-image" target="_blank" rel="noopener noreferrer">使用拉取镜像<ExternalLinkIcon/></a>中提到的命令 获取镜像的最新版本，然后停止当前容器。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> container stop v2raya
<span class="token function">docker</span> container <span class="token function">rm</span> v2raya
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://v2raya.org/en/docs/prologue/installation/docker/#run-v2raya" target="_blank" rel="noopener noreferrer">最后使用运行 v2rayA<ExternalLinkIcon/></a>中提到的命令 运行新版本的 v2rayA。更新 v2rayA 后，可以考虑删除旧版本镜像。</p>
<p>如何配置，查看官网的使用配置</p>
<p>https://v2raya.org/en/docs/prologue/quick-start/</p>
</div></template>


