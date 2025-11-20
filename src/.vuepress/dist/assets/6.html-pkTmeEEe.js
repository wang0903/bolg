import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as e}from"./app-HMLpIP8o.js";const t={},i=e(`<h1 id="rke2安装" tabindex="-1"><a class="header-anchor" href="#rke2安装" aria-hidden="true">#</a> RKE2安装</h1><h2 id="中文文档地址" tabindex="-1"><a class="header-anchor" href="#中文文档地址" aria-hidden="true">#</a> 中文文档地址</h2><p>https://docs.rancher.cn/docs/rke2/install/quickstart/_index</p><h2 id="github地址" tabindex="-1"><a class="header-anchor" href="#github地址" aria-hidden="true">#</a> GitHub地址</h2><p>https://github.com/rancher/rke2/</p><h2 id="国内镜像网站" tabindex="-1"><a class="header-anchor" href="#国内镜像网站" aria-hidden="true">#</a> 国内镜像网站</h2><p>https://docker.aityp.com/</p><h2 id="修改时区" tabindex="-1"><a class="header-anchor" href="#修改时区" aria-hidden="true">#</a> 修改时区</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> timedatectl set-timezone Asia/Shanghai
<span class="token comment"># 查看是否成功</span>
timedatectl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置时间同步-小集群" tabindex="-1"><a class="header-anchor" href="#设置时间同步-小集群" aria-hidden="true">#</a> 设置时间同步(小集群)</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#更新包</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token comment">#安装</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> systemd-timesyncd <span class="token parameter variable">-y</span>
<span class="token comment">#开机自启</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> systemd-timesyncd <span class="token parameter variable">--now</span>
<span class="token comment">#改成阿里云 NTP</span>
<span class="token function">sudo</span> <span class="token function">nano</span> /etc/systemd/timesyncd.conf
<span class="token comment">#加上配置</span>
<span class="token punctuation">[</span>Time<span class="token punctuation">]</span>
<span class="token assign-left variable">NTP</span><span class="token operator">=</span>ntp.aliyun.com
<span class="token assign-left variable">FallbackNTP</span><span class="token operator">=</span>ntp1.aliyun.com ntp2.aliyun.com ntp.tencent.com time.pool.aliyun.com
<span class="token comment">#重启</span>
<span class="token function">sudo</span> systemctl restart systemd-timesyncd
<span class="token comment">#查看状态</span>
timedatectl status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用chrony-适合大规模集群-更稳" tabindex="-1"><a class="header-anchor" href="#用chrony-适合大规模集群-更稳" aria-hidden="true">#</a> 用<code>chrony</code>(适合大规模集群，更稳)</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#更新包</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token comment">#安装</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> chrony <span class="token parameter variable">-y</span>
<span class="token comment">#修改配置文件</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/chrony/chrony.conf
<span class="token comment">#填写阿里的时间服务器</span>
server ntp.aliyun.com iburst
server ntp1.aliyun.com iburst
server ntp2.aliyun.com iburst
<span class="token comment">#系统启动自动启动</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> chrony <span class="token parameter variable">--now</span>
<span class="token comment">#强制同步</span>
<span class="token function">sudo</span> chronyc makestep
<span class="token comment">#查看同步状态</span>
chronyc sources <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置主机名" tabindex="-1"><a class="header-anchor" href="#设置主机名" aria-hidden="true">#</a> 设置主机名</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#编辑以下文件</span>
<span class="token function">sudo</span> <span class="token function">vim</span>  /etc/hosts
<span class="token number">192.168</span>.128.230 masters
<span class="token number">192.168</span>.128.231 node01
<span class="token number">192.168</span>.128.232 node02
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mastrs节点安装" tabindex="-1"><a class="header-anchor" href="#mastrs节点安装" aria-hidden="true">#</a> mastrs节点安装</h2><blockquote><p>下载离线包</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>https://github.com/rancher/rke2/tags
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="下载安装脚本" tabindex="-1"><a class="header-anchor" href="#下载安装脚本" aria-hidden="true">#</a> 下载安装脚本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://rancher-mirror.rancher.cn/rke2/install.sh
<span class="token function">sudo</span> <span class="token assign-left variable">INSTALL_RKE2_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">INSTALL_RKE2_VERSION</span><span class="token operator">=</span><span class="token string">&quot;v1.32.8+rke2r1&quot;</span> <span class="token function">sh</span> install.sh  <span class="token comment">#指定v1.32.8+rke2r1版本，cn是环境</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将离线包放到这目录下" tabindex="-1"><a class="header-anchor" href="#将离线包放到这目录下" aria-hidden="true">#</a> 将离线包放到这目录下</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/rancher/rke2/agent/images/
<span class="token function">sudo</span> <span class="token function">mv</span> rke2-images.linux-amd64.tar.zst /var/lib/rancher/rke2/agent/images/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart rke2-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看服务状态" tabindex="-1"><a class="header-anchor" href="#查看服务状态" aria-hidden="true">#</a> 查看服务状态</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl status rke2-server <span class="token parameter variable">-l</span>
<span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> rke2-server <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="验证集群是否成功启动" tabindex="-1"><a class="header-anchor" href="#验证集群是否成功启动" aria-hidden="true">#</a> 验证集群是否成功启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># RKE2 会在 /etc/rancher/rke2/rke2.yaml 生成 kubeconfig：</span>
<span class="token function">sudo</span> <span class="token function">cat</span> /etc/rancher/rke2/rke2.yaml
<span class="token comment"># 然后你就可以用 kubectl（默认安装在 /var/lib/rancher/rke2/bin/kubectl）测试：</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/rancher/rke2/rke2.yaml
kubectl get nodes
kubectl get pods <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置环境变量-方便直接使用kubectl" tabindex="-1"><a class="header-anchor" href="#设置环境变量-方便直接使用kubectl" aria-hidden="true">#</a> 设置环境变量,方便直接使用kubectl</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;export PATH=$PATH:/var/lib/rancher/rke2/bin&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/profile.d/rke2.sh
<span class="token builtin class-name">source</span> /etc/profile.d/rke2.sh
<span class="token comment">#给权限</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">644</span> /etc/rancher/rke2/rke2.yaml
<span class="token comment">#默认</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;export KUBECONFIG=/etc/rancher/rke2/rke2.yaml&#39;</span> <span class="token operator">&gt;&gt;</span> ~/.bashrc
<span class="token builtin class-name">source</span> ~/.bashrc
<span class="token comment">#验证</span>
kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动日志查看" tabindex="-1"><a class="header-anchor" href="#启动日志查看" aria-hidden="true">#</a> 启动日志查看</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> rke2-server <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="worker节点" tabindex="-1"><a class="header-anchor" href="#worker节点" aria-hidden="true">#</a> worker节点</h2><h3 id="下载安装脚本-1" tabindex="-1"><a class="header-anchor" href="#下载安装脚本-1" aria-hidden="true">#</a> 下载安装脚本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://rancher-mirror.rancher.cn/rke2/install.sh <span class="token parameter variable">-o</span> install.sh
<span class="token comment"># INSTALL_RKE2_TYPE=&quot;agent&quot; 增加这个配置，就不会安装控制组件</span>
<span class="token function">sudo</span> <span class="token assign-left variable">INSTALL_RKE2_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">INSTALL_RKE2_TYPE</span><span class="token operator">=</span><span class="token string">&quot;agent&quot;</span> <span class="token assign-left variable">INSTALL_RKE2_VERSION</span><span class="token operator">=</span><span class="token string">&quot;v1.32.8+rke2r1&quot;</span> <span class="token function">sh</span> install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载离线镜像-并将包放到指定目录下" tabindex="-1"><a class="header-anchor" href="#下载离线镜像-并将包放到指定目录下" aria-hidden="true">#</a> 下载离线镜像，并将包放到指定目录下</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/rancher/rke2/agent/images/
<span class="token function">sudo</span> <span class="token function">mv</span> rke2-images.linux-amd64.tar.zst /var/lib/rancher/rke2/agent/images/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置-rke2-agent-服务" tabindex="-1"><a class="header-anchor" href="#配置-rke2-agent-服务" aria-hidden="true">#</a> 配置 rke2-agent 服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/rancher/rke2/
<span class="token function">vim</span> /etc/rancher/rke2/config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="填写内容" tabindex="-1"><a class="header-anchor" href="#填写内容" aria-hidden="true">#</a> 填写内容</h3><p><code>本地也必须用 *https://&lt;master-ip&gt;:9345*，因为 RKE2 的 server 端默认就是用 TLS 起的 9345 端口。</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server: https://masters:9345 
token: K104ae9acd991afd22246e01e5080b711a4198f4d92f3b858ebb1db99b8a6b2f7ed::server:548edec63f78e4f97e7295f43d64de63
node-name: node01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取token" tabindex="-1"><a class="header-anchor" href="#获取token" aria-hidden="true">#</a> 获取token</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">cat</span> /var/lib/rancher/rke2/server/node-token
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="开机自启" tabindex="-1"><a class="header-anchor" href="#开机自启" aria-hidden="true">#</a> 开机自启</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> rke2-agent.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启动-1" tabindex="-1"><a class="header-anchor" href="#启动-1" aria-hidden="true">#</a> 启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl start rke2-agent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看启动日志" tabindex="-1"><a class="header-anchor" href="#查看启动日志" aria-hidden="true">#</a> 查看启动日志</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> rke2-agent <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="安装-cert-manager" tabindex="-1"><a class="header-anchor" href="#安装-cert-manager" aria-hidden="true">#</a> 安装 cert-manager</h2><blockquote><p><strong>HTTPS 证书的申请、续签、分发都交给 cert-manager 来处理</strong><strong>cert-manager 自动处理 ACME 协议</strong>，通过 Ingress (nginx) 完成域名验证，然后把证书存到 Secret 里。<strong>邮箱</strong>：在 <code>ClusterIssuer</code> 里配置，用于向 Let’s Encrypt 注册账号，<strong>也能接收证书过期提醒邮件</strong>。 <strong>证书有效期</strong>：Let’s Encrypt 默认 90 天，cert-manager 会在过期前 30 天自动续签。</p><p><strong>自动化程度</strong>：证书创建 → 绑定 Ingress → 自动续签，全部无人值守。</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#离线下载，根据自己的版本下载</span>
https<span class="token punctuation">:</span>//github.com/helm/helm/tags
<span class="token comment"># 1. 安装 CRDs（必须先安装）</span>
kubectl apply <span class="token punctuation">-</span>f https<span class="token punctuation">:</span>//github.com/cert<span class="token punctuation">-</span>manager/cert<span class="token punctuation">-</span>manager/releases/download/v1.14.4/cert<span class="token punctuation">-</span>manager.crds.yaml
<span class="token comment">#离线安装</span>
kubectl apply <span class="token punctuation">-</span>f cert<span class="token punctuation">-</span>manager.crds.yaml
<span class="token comment"># 2. 添加 Jetstack 仓库</span>
helm repo add jetstack https<span class="token punctuation">:</span>//charts.jetstack.io
helm repo update

<span class="token comment"># 3. 安装 cert-manager</span>
helm install cert<span class="token punctuation">-</span>manager jetstack/cert<span class="token punctuation">-</span>manager \\
  <span class="token punctuation">-</span><span class="token punctuation">-</span>namespace cert<span class="token punctuation">-</span>manager \\
  <span class="token punctuation">-</span><span class="token punctuation">-</span>create<span class="token punctuation">-</span>namespace \\
  <span class="token punctuation">-</span><span class="token punctuation">-</span>version v1.18.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="桌面管理软件" tabindex="-1"><a class="header-anchor" href="#桌面管理软件" aria-hidden="true">#</a> 桌面管理软件</h2><p>https://k8slens.dev/</p><h2 id="安装rancher管理界面-web" tabindex="-1"><a class="header-anchor" href="#安装rancher管理界面-web" aria-hidden="true">#</a> 安装rancher管理界面(WEB)</h2><h3 id="官网-文档" tabindex="-1"><a class="header-anchor" href="#官网-文档" aria-hidden="true">#</a> 官网(文档)</h3><p>https://ranchermanager.docs.rancher.com/zh/</p><h3 id="国内镜像网站-1" tabindex="-1"><a class="header-anchor" href="#国内镜像网站-1" aria-hidden="true">#</a> 国内镜像网站</h3><p>https://docker.aityp.com/</p><h3 id="安装helm" tabindex="-1"><a class="header-anchor" href="#安装helm" aria-hidden="true">#</a> 安装helm</h3><p><code>版本下载</code>：https://github.com/helm/helm/tags</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://get.helm.sh/helm-v3.18.6-linux-amd64.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> helm-v3.18.6-linux-amd64.tar.gz
<span class="token function">sudo</span> <span class="token function">mv</span> linux-amd64/helm /usr/local/bin/helm
helm version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加仓库" tabindex="-1"><a class="header-anchor" href="#添加仓库" aria-hidden="true">#</a> 添加仓库：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm repo <span class="token function">add</span> rancher-stable https://rancher-mirror.rancher.cn/server-charts/stable
helm repo updatehelm repo <span class="token function">add</span> stable https://charts.helm.sh/stable
helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装rancher-nodeport方式连接" tabindex="-1"><a class="header-anchor" href="#安装rancher-nodeport方式连接" aria-hidden="true">#</a> 安装rancher(NodePort方式连接)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm <span class="token function">install</span> rancher rancher-stable/rancher <span class="token punctuation">\\</span>
  <span class="token parameter variable">--namespace</span> cattle-system <span class="token punctuation">\\</span>
  --create-namespace <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">hostname</span><span class="token operator">=</span>rancher.local <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">replicas</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">bootstrapPassword</span><span class="token operator">=</span>admin <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">ingress.enabled</span><span class="token operator">=</span>false <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">service.type</span><span class="token operator">=</span>NodePort <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">rancherImage</span><span class="token operator">=</span>registry.cn-hangzhou.aliyuncs.com/rancher/rancher <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">rancherImageTag</span><span class="token operator">=</span>v2.11.3 <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">rancherShellImage</span><span class="token operator">=</span>rancher/shell <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">rancherShellImageTag</span><span class="token operator">=</span>v0.4.1
  <span class="token parameter variable">-set</span> <span class="token assign-left variable">rancherShellImage</span><span class="token operator">=</span>rancher/rancher-webhook <span class="token punctuation">\\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">rancherShellImageTag</span><span class="token operator">=</span>v0.7.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>-set ingress.enabled=false \\ #禁用 Ingress，不创建 Ingress 资源。</code></p><p><code>--set rancherImage=registry.cn-hangzhou.aliyuncs.com/rancher/rancher \\ #用阿里云的镜像</code></p><p><code>--set bootstrapPassword=admin \\ #默认密码</code></p><p><code>安装前先用一台能连通docker的系统，下载rancher/shell和rancher/rancher-webhook 操作请看下面：</code></p></blockquote><h3 id="用docker下载指定容器" tabindex="-1"><a class="header-anchor" href="#用docker下载指定容器" aria-hidden="true">#</a> 用docker下载指定容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull rancher/shell:v0.4.1
<span class="token function">sudo</span> <span class="token function">docker</span> save rancher/shell:v0.4.1 <span class="token operator">&gt;</span> rancher-shell-v0.4.1.tar
<span class="token comment">#将文件传给目标文件</span>
<span class="token function">scp</span> rancher-shell-v0.4.1.tar mes@192.168.128.230:/tmp/
<span class="token comment">#导入容器中</span>
<span class="token function">sudo</span> /var/lib/rancher/rke2/bin/ctr <span class="token punctuation">\\</span>
  <span class="token parameter variable">--address</span> /run/k3s/containerd/containerd.sock <span class="token punctuation">\\</span>
  <span class="token parameter variable">-n</span> k8s.io images <span class="token function">import</span> rancher-shell-v0.4.1.tar
<span class="token comment">#查看导入是否成功</span>
<span class="token function">sudo</span> /var/lib/rancher/rke2/bin/ctr <span class="token punctuation">\\</span>
  <span class="token parameter variable">--address</span> /run/k3s/containerd/containerd.sock <span class="token punctuation">\\</span>
  <span class="token parameter variable">-n</span> k8s.io images <span class="token function">ls</span> <span class="token operator">|</span> <span class="token function">grep</span> shell
<span class="token comment">#改别名</span>
<span class="token function">sudo</span> /var/lib/rancher/rke2/bin/ctr <span class="token punctuation">\\</span>
  <span class="token parameter variable">--address</span> /run/k3s/containerd/containerd.sock <span class="token punctuation">\\</span>
  <span class="token parameter variable">-n</span> k8s.io images tag docker.io/rancher/shell:v0.4.1 rancher/shell:v0.4.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建values-yaml" tabindex="-1"><a class="header-anchor" href="#创建values-yaml" aria-hidden="true">#</a> 创建values.yaml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># values.yaml</span>
<span class="token key atrule">hostname</span><span class="token punctuation">:</span> rancher.local

<span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>

<span class="token key atrule">bootstrapPassword</span><span class="token punctuation">:</span> 62352744aa<span class="token punctuation">?</span><span class="token punctuation">?</span>aa

<span class="token key atrule">ingress</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort

<span class="token key atrule">rancherImage</span><span class="token punctuation">:</span> registry.cn<span class="token punctuation">-</span>hangzhou.aliyuncs.com/rancher/rancher
<span class="token key atrule">rancherImageTag</span><span class="token punctuation">:</span> v2.11.3

<span class="token key atrule">rancherShellImage</span><span class="token punctuation">:</span> rancher/shell
<span class="token key atrule">rancherShellImageTag</span><span class="token punctuation">:</span> v0.4.1


<span class="token key atrule">rancherWebhookImage</span><span class="token punctuation">:</span> rancher/rancher<span class="token punctuation">-</span>webhook
<span class="token key atrule">rancherWebhookImageTag</span><span class="token punctuation">:</span> v0.7.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行文件" tabindex="-1"><a class="header-anchor" href="#运行文件" aria-hidden="true">#</a> 运行文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm <span class="token function">install</span> rancher rancher-stable/rancher <span class="token punctuation">\\</span>
  <span class="token parameter variable">--namespace</span> cattle-system <span class="token punctuation">\\</span>
  --create-namespace <span class="token punctuation">\\</span>
  <span class="token parameter variable">-f</span> values.yaml
  <span class="token comment">#更新</span>
  helm upgrade rancher rancher-stable/rancher <span class="token punctuation">\\</span>
  <span class="token parameter variable">-n</span> cattle-system <span class="token punctuation">\\</span>
  <span class="token parameter variable">-f</span> values.yaml
  <span class="token comment">#强制覆盖</span>
  helm upgrade rancher rancher-stable/rancher <span class="token punctuation">\\</span>
  <span class="token parameter variable">-n</span> cattle-system <span class="token punctuation">\\</span>
  <span class="token parameter variable">-f</span> values.yaml <span class="token punctuation">\\</span>
  <span class="token parameter variable">--force</span> --reset-values
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加加速镜像" tabindex="-1"><a class="header-anchor" href="#添加加速镜像" aria-hidden="true">#</a> 添加加速镜像</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>mirrors<span class="token operator">:</span>
  <span class="token property">&quot;docker.io&quot;</span><span class="token operator">:</span>
    endpoint<span class="token operator">:</span>
      - <span class="token string">&quot;https://cf-workers-docker-io-784.pages.dev&quot;</span>
      - <span class="token string">&quot;https://registry.cn-hangzhou.aliyuncs.com&quot;</span>
      - <span class="token string">&quot;https://docker.m.daocloud.io&quot;</span>
configs<span class="token operator">:</span>
  <span class="token property">&quot;docker.io&quot;</span><span class="token operator">:</span>
    auth<span class="token operator">:</span>
      username<span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
      password<span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>mirrors</code>：把 <code>docker.io</code> 的镜像请求重定向到国内镜像源。</p><p><code>configs</code>：可选，填入私有仓库认证信息（如果有）。</p></blockquote><h3 id="拉取镜像" tabindex="-1"><a class="header-anchor" href="#拉取镜像" aria-hidden="true">#</a> 拉取镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> /var/lib/rancher/rke2/bin/ctr <span class="token parameter variable">-n</span> k8s.io images pull registry.cn-hangzhou.aliyuncs.com/rancher/shell:v0.4.1
<span class="token function">sudo</span> /var/lib/rancher/rke2/bin/ctr <span class="token parameter variable">-n</span> k8s.io images tag registry.cn-hangzhou.aliyuncs.com/rancher/shell:v0.4.1 rancher/shell:v0.4.1

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="helm命令使用" tabindex="-1"><a class="header-anchor" href="#helm命令使用" aria-hidden="true">#</a> helm命令使用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看某个库的chart</span>
helm search repo rancher-stable
<span class="token comment">#更新仓库</span>
helm repo update
<span class="token comment">#删除部署</span>
helm uninstall rancher <span class="token parameter variable">-n</span> cattle-system

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kubectl命令使用" tabindex="-1"><a class="header-anchor" href="#kubectl命令使用" aria-hidden="true">#</a> kubectl命令使用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 确认 Pod 已经清理干净</span>
kubectl get pods <span class="token parameter variable">-n</span> cattle-system
<span class="token comment">#强制删掉 Job 和 Pod</span>
kubectl delete job rancher-post-delete <span class="token parameter variable">-n</span> cattle-system <span class="token parameter variable">--force</span> --grace-period<span class="token operator">=</span><span class="token number">0</span>
kubectl delete pod rancher-post-delete-nbhc7 <span class="token parameter variable">-n</span> cattle-system <span class="token parameter variable">--force</span> --grace-period<span class="token operator">=</span><span class="token number">0</span>
<span class="token comment">#查看命名空间信息</span>
kubectl get all <span class="token parameter variable">-n</span> cattle-system
<span class="token comment">#查找残留的 release Secret</span>
kubectl get secret <span class="token parameter variable">-n</span> cattle-system <span class="token operator">|</span> <span class="token function">grep</span> rancher
<span class="token comment">#删除 Secret</span>
kubectl delete secret <span class="token parameter variable">-n</span> cattle-system sh.helm.release.v1.rancher.v1
kubectl delete secret <span class="token parameter variable">-n</span> cattle-system sh.helm.release.v1.rancher.v2
<span class="token comment">#跳过 Hook 强制卸载</span>
helm uninstall rancher <span class="token parameter variable">-n</span> cattle-system --no-hooks
<span class="token function">sudo</span> helm uninstall rancher <span class="token parameter variable">-n</span> cattle-system --no-hooks <span class="token parameter variable">--kubeconfig</span> /etc/rancher/rke2/rke2.yaml
<span class="token comment">#删除残留</span>
kubectl delete secret tls-rancher tls-rancher-internal tls-rancher-internal-ca <span class="token parameter variable">-n</span> cattle-system
<span class="token comment">#清理残留资源</span>
kubectl delete all <span class="token parameter variable">--all</span> <span class="token parameter variable">-n</span> cattle-system
kubectl delete <span class="token function">jobs</span> <span class="token parameter variable">--all</span> <span class="token parameter variable">-n</span> cattle-system
<span class="token comment">#确认 namespace 干净</span>
kubectl get all <span class="token parameter variable">-n</span> cattle-system
<span class="token comment">#重启pod</span>
kubectl <span class="token parameter variable">-n</span> cattle-system delete pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>rancher
<span class="token comment">#查看pod信息</span>
kubectl get pods <span class="token parameter variable">-n</span> cattle-system <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取权限" tabindex="-1"><a class="header-anchor" href="#获取权限" aria-hidden="true">#</a> 获取权限</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> /etc/rancher/rke2/rke2.yaml ~/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> ~/.kube/config
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">600</span> ~/.kube/config
<span class="token comment">#添加到环境</span>
<span class="token function">sudo</span> <span class="token function">vim</span> ~/.bashrc
<span class="token comment">#加到最后面</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/.kube/config
<span class="token comment">#刷新</span>
<span class="token builtin class-name">source</span> ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装argo-cd" tabindex="-1"><a class="header-anchor" href="#安装argo-cd" aria-hidden="true">#</a> 安装Argo CD</h2><h3 id="下载安装文件" tabindex="-1"><a class="header-anchor" href="#下载安装文件" aria-hidden="true">#</a> 下载安装文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>https://raw.githubusercontent.com/argoproj/argo-cd/v3.0.6/manifests/install.yaml
<span class="token comment">#修改容器源地址</span>
quay.io/argoproj/argocd
<span class="token comment">#替换成</span>
swr.cn-north-4.myhuaweicloud.com/ddn-k8s/quay.io/argoproj/argocd:v3.0.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装运行" tabindex="-1"><a class="header-anchor" href="#安装运行" aria-hidden="true">#</a> 安装运行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建命名空间</span>
kubectl create namespace argocd
<span class="token comment">#运行命令</span>
kubectl apply <span class="token parameter variable">-n</span> argocd <span class="token parameter variable">-f</span> ArgoCD-install.yaml
<span class="token comment">#删除</span>
kubectl delete <span class="token parameter variable">-n</span> argocd <span class="token parameter variable">-f</span> ArgoCD-install.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取密码" tabindex="-1"><a class="header-anchor" href="#获取密码" aria-hidden="true">#</a> 获取密码</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#取初始 admin 密码（登录之后记得改密码）</span>
kubectl <span class="token parameter variable">-n</span> argocd get secret argocd-initial-admin-secret <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&quot;{.data.password}&quot;</span> <span class="token operator">|</span> base64 <span class="token parameter variable">-d</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="搭建-nfs-服务器" tabindex="-1"><a class="header-anchor" href="#搭建-nfs-服务器" aria-hidden="true">#</a> 搭建 NFS 服务器</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 以 Ubuntu 为例</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-kernel-server

<span class="token comment"># 创建导出目录</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/nfs
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> mes:mes /data/nfs
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /data/nfs

<span class="token comment"># 配置导出</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;/data/nfs *(rw,sync,no_subtree_check,no_root_squash)&quot;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/exports

<span class="token comment"># 生效配置</span>
<span class="token function">sudo</span> exportfs <span class="token parameter variable">-rav</span>

<span class="token comment">#验证是否正常</span>
showmount <span class="token parameter variable">-e</span> <span class="token operator">&lt;</span>NFS服务器IP<span class="token operator">&gt;</span>

<span class="token comment">#需要在工作节点上安装客户端</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-common
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="master节点安装" tabindex="-1"><a class="header-anchor" href="#master节点安装" aria-hidden="true">#</a> master节点安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#用浏览器安装</span>
https://raw.githubusercontent.com/kubernetes-sigs/nfs-subdir-external-provisioner/master/deploy/rbac.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>这个 <code>rbac.yaml</code> 是 NFS Subdir External Provisioner 用来申请权限（RBAC，Role-Based Access Control）的一段配置。它定义了 ServiceAccount、ClusterRole、Role、ClusterRoleBinding、RoleBinding 等资源，以便 provisioner 有权限执行必要的操作。</p></blockquote><h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#运行权限</span>
kubectl apply <span class="token parameter variable">-f</span> rbac.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="给操作权限" tabindex="-1"><a class="header-anchor" href="#给操作权限" aria-hidden="true">#</a> 给操作权限</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;nodes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumeclaims&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;storage.k8s.io&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;storageclasses&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;events&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> run<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;endpoints&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写deployment-yaml" tabindex="-1"><a class="header-anchor" href="#编写deployment-yaml" aria-hidden="true">#</a> 编写deployment.yaml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
          <span class="token key atrule">image</span><span class="token punctuation">:</span> swr.cn<span class="token punctuation">-</span>north<span class="token punctuation">-</span>4.myhuaweicloud.com/ddn<span class="token punctuation">-</span>k8s/registry.k8s.io/sig<span class="token punctuation">-</span>storage/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner<span class="token punctuation">:</span>v4.0.2
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /persistentvolumes
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PROVISIONER_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;nk8s-sigs.io/nfs-subdir-external-provisioner&quot;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_SERVER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;192.168.128.233&quot;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_PATH
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;/data/nfs&quot;</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
          <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.128.233
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/nfs

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建一个-storageclass" tabindex="-1"><a class="header-anchor" href="#创建一个-storageclass" aria-hidden="true">#</a> 创建一个 StorageClass</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>storage   <span class="token comment"># 存储类的名字，PVC 申请存储时会引用它</span>
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner  <span class="token comment"># 这里指定了存储供应者（Provisioner）</span>
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
  <span class="token key atrule">archiveOnDelete</span><span class="token punctuation">:</span> <span class="token string">&quot;false&quot;</span> <span class="token comment"># PVC 删除时，是否保留数据（false 表示直接删掉，不归档）</span>
<span class="token key atrule">reclaimPolicy</span><span class="token punctuation">:</span> Retain  <span class="token comment"># PVC 删除时 PV 的回收策略，Retain 表示保留，不自动回收</span>
<span class="token key atrule">mountOptions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> vers=4.1   <span class="token comment"># 挂载参数，这里指定 NFS 使用 v4.1 协议</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建pvc测试案例" tabindex="-1"><a class="header-anchor" href="#创建pvc测试案例" aria-hidden="true">#</a> 创建PVC测试案例</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany     <span class="token comment"># 多个 Pod 可以同时挂载</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi      <span class="token comment"># 申请 1G 存储</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>storage   <span class="token comment"># 要和你 StorageClass 的名字一致</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="storageclass、pvc、pv关系图" tabindex="-1"><a class="header-anchor" href="#storageclass、pvc、pv关系图" aria-hidden="true">#</a> StorageClass、PVC、PV关系图</h3><div class="language-perl line-numbers-mode" data-ext="perl"><pre class="language-perl"><code>         ┌─────────────────────┐
         │   StorageClass      │
         │  <span class="token punctuation">(</span>nfs<span class="token operator">-</span>storage<span class="token punctuation">)</span>      │
         │  Provisioner<span class="token operator">=</span>NFS    │
         └─────────┬───────────┘
                   │
    开发者下单 <span class="token punctuation">(</span>申请存储<span class="token punctuation">)</span>
                   │
         ┌─────────▼───────────┐
         │   PVC <span class="token punctuation">(</span>声明需求<span class="token punctuation">)</span>     │
         │  requests<span class="token punctuation">:</span> 1Gi       │
         │  accessModes<span class="token punctuation">:</span> RWX    │
         │  storageClassName<span class="token operator">=</span>   │
         │     nfs<span class="token operator">-</span>storage      │
         └─────────┬───────────┘
                   │
   Provisioner 根据 StorageClass 创建真实存储
                   │
         ┌─────────▼───────────┐
         │   PV <span class="token punctuation">(</span>实际资源<span class="token punctuation">)</span>      │
         │ capacity<span class="token punctuation">:</span> 1Gi        │
         │ accessModes<span class="token punctuation">:</span> RWX     │
         │ nfs<span class="token punctuation">:</span> <span class="token operator">/</span>data<span class="token regex">/nfs/</span><span class="token operator">...</span>   │
         └─────────┬───────────┘
                   │
     PVC 绑定 PV，Pod 通过 PVC 使用存储
                   │
         ┌─────────▼───────────┐
         │   Pod <span class="token punctuation">(</span>应用<span class="token punctuation">)</span>         │
         │  volumes<span class="token punctuation">:</span>            │
         │    <span class="token operator">-</span> claimName<span class="token operator">=</span>PVC   │
         │  挂载到 <span class="token operator">/</span>mnt<span class="token operator">/</span>data    │
         └─────────────────────┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行" tabindex="-1"><a class="header-anchor" href="#执行" aria-hidden="true">#</a> 执行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建</span>
kubectl apply <span class="token parameter variable">-f</span> test-pvc.yaml
<span class="token comment">#查看状态</span>
kubectl get pvc test-pvc
<span class="token comment">#删掉建新的</span>
kubectl delete storageclass nfs-storage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装metallb-负载均衡" tabindex="-1"><a class="header-anchor" href="#安装metallb-负载均衡" aria-hidden="true">#</a> 安装MetalLB(负载均衡)</h2><h3 id="官网" tabindex="-1"><a class="header-anchor" href="#官网" aria-hidden="true">#</a> 官网</h3><p>https://metallb.io/</p><h3 id="添加仓库helm" tabindex="-1"><a class="header-anchor" href="#添加仓库helm" aria-hidden="true">#</a> 添加仓库helm</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm repo <span class="token function">add</span> metallb https://metallb.github.io/metallb
helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 metallb 到 metallb-system 命名空间</span>
helm <span class="token function">install</span> metallb metallb/metallb <span class="token parameter variable">-n</span> metallb-system --create-namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置-ipaddresspool" tabindex="-1"><a class="header-anchor" href="#配置-ipaddresspool" aria-hidden="true">#</a> 配置 IPAddressPool</h3><blockquote><p>新建一个 <code>IPAddressPool</code>，告诉 MetalLB 可以用哪些 IP 来分配给 <code>Service type=LoadBalancer</code></p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> metallb.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IPAddressPool
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>address<span class="token punctuation">-</span>pool
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> metallb<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">addresses</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> 192.168.1.240<span class="token punctuation">-</span>192.168.1.250 <span class="token comment">#分配的IP，分配之后这些IP不能被其他设备使用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置-l2advertisement" tabindex="-1"><a class="header-anchor" href="#配置-l2advertisement" aria-hidden="true">#</a> 配置 L2Advertisement</h3><blockquote><p>让 MetalLB 广播这段 IP</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> metallb.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> L2Advertisement
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> default
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> metallb<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ipAddressPools</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> default<span class="token punctuation">-</span>address<span class="token punctuation">-</span>pool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="验证是否安装成功" tabindex="-1"><a class="header-anchor" href="#验证是否安装成功" aria-hidden="true">#</a> 验证是否安装成功</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> LoadBalancer
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看ip是否分配成功" tabindex="-1"><a class="header-anchor" href="#查看ip是否分配成功" aria-hidden="true">#</a> 查看IP是否分配成功</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get svc test-nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="成功分配" tabindex="-1"><a class="header-anchor" href="#成功分配" aria-hidden="true">#</a> 成功分配</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mes@masters:~$ kubectl get svc test-nginx
NAME         TYPE           CLUSTER-IP    EXTERNAL-IP       PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
test-nginx   LoadBalancer   <span class="token number">10.43</span>.70.81   <span class="token number">192.168</span>.128.234   <span class="token number">80</span>:31710/TCP   33s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除测试" tabindex="-1"><a class="header-anchor" href="#删除测试" aria-hidden="true">#</a> 删除测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl delete <span class="token parameter variable">-f</span> test-nginx.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="应用部署-springboot-vue" tabindex="-1"><a class="header-anchor" href="#应用部署-springboot-vue" aria-hidden="true">#</a> 应用部署(springboot+vue)</h2><h3 id="部署的流程图" tabindex="-1"><a class="header-anchor" href="#部署的流程图" aria-hidden="true">#</a> 部署的流程图</h3><div class="language-perl line-numbers-mode" data-ext="perl"><pre class="language-perl"><code>   ┌──────────────┐
      │   Developer  │
      │   <span class="token punctuation">(</span>写代码<span class="token punctuation">)</span>   │
      └───────┬──────┘
              │ push
              ▼
      ┌──────────────┐
      │   GitLab     │
      │<span class="token punctuation">(</span>源码仓库<span class="token operator">/</span>CI<span class="token punctuation">)</span> │
      └───────┬──────┘
              │ Webhook 触发
              ▼
      ┌──────────────┐
      │   Jenkins    │
      │<span class="token punctuation">(</span>CI 构建流水线<span class="token punctuation">)</span>│
      └───────┬──────┘
              │ <span class="token number">1</span><span class="token operator">.</span> 构建 SpringBoot Jar <span class="token operator">/</span> Vue 打包
              │ <span class="token number">2</span><span class="token operator">.</span> docker build
              │ <span class="token number">3</span><span class="token operator">.</span> push image
              ▼
      ┌──────────────┐
      │   Harbor     │
      │<span class="token punctuation">(</span>镜像仓库<span class="token punctuation">)</span>    │
      └───────┬──────┘
              │ 镜像 tag 更新
              ▼
      ┌──────────────┐
      │ GitOps Repo  │
      │ <span class="token punctuation">(</span>ArgoCD 管理<span class="token punctuation">)</span>│
      │ apps<span class="token operator">/</span>        │
      │  ├─ springboot<span class="token operator">-</span>service<span class="token operator">.</span>yaml
      │  ├─ vue<span class="token operator">-</span>frontend<span class="token operator">.</span>yaml
      │  └─ <span class="token operator">...</span>      │
      │ charts<span class="token operator">/</span>      │
      │  └─ springboot<span class="token operator">-</span>chart<span class="token operator">/</span>values<span class="token operator">-</span>dev<span class="token operator">.</span>yaml │
      └───────┬──────┘
              │ Jenkins 自动修改 values 文件 <span class="token punctuation">(</span>更新 image tag<span class="token punctuation">)</span> 并 push
              ▼
      ┌──────────────┐
      │   Argo CD    │
      │ App<span class="token operator">-</span>of<span class="token operator">-</span>Apps  │
      │ root<span class="token operator">-</span>app<span class="token operator">.</span>yaml│
      └───────┬──────┘
              │ 自动同步 GitOps Repo
              ▼
      ┌──────────────┐
      │ Kubernetes   │
      │   Cluster    │
      │  ├─ Pod <span class="token punctuation">(</span>SpringBoot<span class="token punctuation">)</span> │
      │  ├─ Pod <span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>        │
      │  ├─ Ingress <span class="token operator">/</span> Service│
      │  └─ PVC <span class="token operator">/</span> NFS        │
      └──────────────┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,135),l=[i];function c(p,o){return s(),a("div",null,l)}const d=n(t,[["render",c],["__file","6.html.vue"]]);export{d as default};
