<template><div><h1 id="用docker安装k8s" tabindex="-1"><a class="header-anchor" href="#用docker安装k8s" aria-hidden="true">#</a> 用docker安装K8S</h1>
<h2 id="基础设置" tabindex="-1"><a class="header-anchor" href="#基础设置" aria-hidden="true">#</a> 基础设置</h2>
<h3 id="_1、设置主机名" tabindex="-1"><a class="header-anchor" href="#_1、设置主机名" aria-hidden="true">#</a> 1、设置主机名</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>hostnamectl set-hostname 主机名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、同步hosts文件" tabindex="-1"><a class="header-anchor" href="#_2、同步hosts文件" aria-hidden="true">#</a> 2、同步hosts文件</h3>
<blockquote>
<p>如果DNS不支持主机名称解析，还需要在每台机器上的/etc/hosts/文件中添加主机名和IP的对应关系</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/hosts <span class="token operator">&lt;&lt;</span><span class="token string">EOF
192.168.127.145 master
192.168.127.146 word01
192.168.127.147 word02
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、防火墙关闭" tabindex="-1"><a class="header-anchor" href="#_3、防火墙关闭" aria-hidden="true">#</a> 3、防火墙关闭</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl stop firewalld <span class="token comment">#关闭防火墙</span>
<span class="token function">sudo</span> systemctl disable firewalld <span class="token comment">#防止启动开启防火墙</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、关闭-selinux" tabindex="-1"><a class="header-anchor" href="#_4、关闭-selinux" aria-hidden="true">#</a> 4、关闭 SELINUX</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>setenforce <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'s/SELINUX=enforcing/SELINUX=disabled/g'</span> /etc/selinux/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、关闭swap分区" tabindex="-1"><a class="header-anchor" href="#_5、关闭swap分区" aria-hidden="true">#</a> 5、关闭swap分区</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>swapoff <span class="token parameter variable">-a</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">'s/.*swap.*/#&amp;/'</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、同步时间-让每个节点在同一个时间下" tabindex="-1"><a class="header-anchor" href="#_6、同步时间-让每个节点在同一个时间下" aria-hidden="true">#</a> 6、同步时间，让每个节点在同一个时间下</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> ntpdate <span class="token parameter variable">-y</span> <span class="token comment">#安装同步时间的工具</span>
ntpdate time1.aliyun.com <span class="token comment">#进行时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、安装ipset、ipvsadm" tabindex="-1"><a class="header-anchor" href="#_7、安装ipset、ipvsadm" aria-hidden="true">#</a> 7、安装ipset、ipvsadm</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ipset ipvsadm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8、写入配置文件中" tabindex="-1"><a class="header-anchor" href="#_8、写入配置文件中" aria-hidden="true">#</a> 8、写入配置文件中</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&lt;&lt;</span><span class="token string">EOF
# !/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#授权、运行、检查是否加载</span>
<span class="token function">chmod</span> <span class="token number">755</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&amp;&amp;</span> lsmod <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-e</span> ip_vs <span class="token parameter variable">-e</span> nf_conntrack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9、启动模块" tabindex="-1"><a class="header-anchor" href="#_9、启动模块" aria-hidden="true">#</a> 9、启动模块</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> systemd-modules-load.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_10、查看模块是否启动成功" tabindex="-1"><a class="header-anchor" href="#_10、查看模块是否启动成功" aria-hidden="true">#</a> 10、查看模块是否启动成功</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lsmod <span class="token operator">|</span><span class="token function">egrep</span> <span class="token string">"ip_vs|nf_conntrack_ipv4"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_11、添加网桥过滤及内核转发配置文件" tabindex="-1"><a class="header-anchor" href="#_11、添加网桥过滤及内核转发配置文件" aria-hidden="true">#</a> 11、添加网桥过滤及内核转发配置文件</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/sysctl.d/k8s.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12、加载br-netfilter模块" tabindex="-1"><a class="header-anchor" href="#_12、加载br-netfilter模块" aria-hidden="true">#</a> 12、加载br_netfilter模块</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>modprobe br_netfilter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_13、更新配置文件" tabindex="-1"><a class="header-anchor" href="#_13、更新配置文件" aria-hidden="true">#</a> 13、更新配置文件</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sysctl</span> <span class="token parameter variable">-p</span> /etc/sysctl.d/k8s.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_14、查看是否加载" tabindex="-1"><a class="header-anchor" href="#_14、查看是否加载" aria-hidden="true">#</a> 14、查看是否加载</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lsmod <span class="token operator">|</span> <span class="token function">grep</span> br_netfilter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_15、使其生效" tabindex="-1"><a class="header-anchor" href="#_15、使其生效" aria-hidden="true">#</a> 15、使其生效</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sysctl</span> <span class="token parameter variable">--system</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="升级linux内核" tabindex="-1"><a class="header-anchor" href="#升级linux内核" aria-hidden="true">#</a> 升级Linux内核</h3>
<h3 id="_1、导入elrepo-gpg-key" tabindex="-1"><a class="header-anchor" href="#_1、导入elrepo-gpg-key" aria-hidden="true">#</a> 1、导入elrepo gpg key</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">--import</span> https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、安装elrepo-yum源仓库" tabindex="-1"><a class="header-anchor" href="#_2、安装elrepo-yum源仓库" aria-hidden="true">#</a> 2、安装elrepo yum源仓库</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> https://www.elrepo.org/elrepo-release-7.0-4.el7.elrepo.noarch.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、安装kernel-ml版本-ml为长期稳定版本-lt为长期维护版本" tabindex="-1"><a class="header-anchor" href="#_3、安装kernel-ml版本-ml为长期稳定版本-lt为长期维护版本" aria-hidden="true">#</a> 3、安装kernel-ml版本,ml为长期稳定版本，lt为长期维护版本</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span><span class="token string">"elrepo-kernel"</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> kernel-lt.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、设置grub2默认引导为0" tabindex="-1"><a class="header-anchor" href="#_4、设置grub2默认引导为0" aria-hidden="true">#</a> 4、设置grub2默认引导为0</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>grub2-set-default <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、重新生成grub2引导文件" tabindex="-1"><a class="header-anchor" href="#_5、重新生成grub2引导文件" aria-hidden="true">#</a> 5、重新生成grub2引导文件</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>grub2-mkconfig <span class="token parameter variable">-o</span> /boot/grub2/grub.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、更新后重启系统" tabindex="-1"><a class="header-anchor" href="#_6、更新后重启系统" aria-hidden="true">#</a> 6、更新后重启系统</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7、查看内核" tabindex="-1"><a class="header-anchor" href="#_7、查看内核" aria-hidden="true">#</a> 7、查看内核</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">uname</span> <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装docker-ce和cri-dockerd" tabindex="-1"><a class="header-anchor" href="#安装docker-ce和cri-dockerd" aria-hidden="true">#</a> 安装docker-ce和cri-dockerd</h3>
<p>1、安装阿里云yum源</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo <span class="token parameter variable">-O</span> /etc/yum.repos.d/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、安装docker-ce</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、启动docker服务</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4、yum repolist</p>
<p>5、修改cgroup方式</p>
<p><code v-pre>在/etc/docker/daemon.json</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span>
<span class="token string">"exec-opts"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">"native.cgroupdriver=systemd"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6、下载cri-dockerd</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.10/cri-dockerd-0.3.10-3.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>7、安装cri-dockerd</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> cri-dockerd-0.3.10-3.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>8、修改/usr/lib/systemd/system/cri-docker.service 指定基本版本</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /usr/lib/systemd/system/cri-docker.service
<span class="token comment">#修改第10行</span>
 <span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/cri-dockerd --pod-infra-container-image<span class="token operator">=</span>registry.k8s.io/pause:3.9 --container-runtime-endpoint fd://

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加阿里云源</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/cri-dockerd --pod-infra-container-image<span class="token operator">=</span>registry.aliyuncs.com/google_containers/pause:3.9 --container-runtime-endpoint fd://
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>9、启动cri-docker</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl start cri-docker
systemctl <span class="token builtin class-name">enable</span> cri-docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装k8s" tabindex="-1"><a class="header-anchor" href="#安装k8s" aria-hidden="true">#</a> 安装k8s</h2>
<h3 id="_1、kubernetes-yum源准备" tabindex="-1"><a class="header-anchor" href="#_1、kubernetes-yum源准备" aria-hidden="true">#</a> 1、kubernetes yum源准备</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/yum.repos.d/k8s.repo <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[kubernetes]
name=kubernetes
baseurl=https://pkgs.k8s.io/core:/stable:/v1.29/rpm/
enabled=1
gpgcheck=1
gpgkey=https://pkgs.k8s.io/core:/stable:/v1.29/rpm/repodata/repomd.xml.key
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、查看有没有要安装的软件" tabindex="-1"><a class="header-anchor" href="#_2、查看有没有要安装的软件" aria-hidden="true">#</a> 2、查看有没有要安装的软件</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum list <span class="token operator">|</span> <span class="token function">grep</span> kubeadm
yum list <span class="token operator">|</span> <span class="token function">grep</span> kubectl
yum list <span class="token operator">|</span> <span class="token function">grep</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、默认安装" tabindex="-1"><a class="header-anchor" href="#_3、默认安装" aria-hidden="true">#</a> 3、默认安装</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> kubeadm kubectl kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、安装指定版本" tabindex="-1"><a class="header-anchor" href="#_4、安装指定版本" aria-hidden="true">#</a> 4、安装指定版本</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> kubeadm-1.29.2-150500.1.1 kubectl-1.29.2-150500.1.1 kubelet-1.29.2-150500.1.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、配置kubelet" tabindex="-1"><a class="header-anchor" href="#_5、配置kubelet" aria-hidden="true">#</a> 5、配置kubelet</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/sysconfig/kubelet
<span class="token comment">#将下面的配置文件复制进去</span>
<span class="token assign-left variable">KUBELET_EXTRA_ARGS</span><span class="token operator">=</span><span class="token string">"--cgroup-driver=systemd"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、设置kubelet为开机自启动-由于没有生成配置文件-集群初始化后自动启动" tabindex="-1"><a class="header-anchor" href="#_6、设置kubelet为开机自启动-由于没有生成配置文件-集群初始化后自动启动" aria-hidden="true">#</a> 6、设置kubelet为开机自启动，由于没有生成配置文件，集群初始化后自动启动</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7、集群镜像准备" tabindex="-1"><a class="header-anchor" href="#_7、集群镜像准备" aria-hidden="true">#</a> 7、集群镜像准备</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubeadm config images list --kubernetes-version<span class="token operator">=</span>v1.29.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8、镜像下载-当出现两个容器运行时时-要在后面加-cri-socket-unix-var-run-cri-dockerd-sock-指定容器" tabindex="-1"><a class="header-anchor" href="#_8、镜像下载-当出现两个容器运行时时-要在后面加-cri-socket-unix-var-run-cri-dockerd-sock-指定容器" aria-hidden="true">#</a> 8、镜像下载，当出现两个容器运行时时，要在后面加--cri-socket unix:///var/run/cri-dockerd.sock 指定容器</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubeadm config images pull --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用阿里云源下载</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubeadm config images pull --cri-socket unix:///var/run/cri-dockerd.sock --image-repository registry.aliyuncs.com/google_containers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_9、master节点集群初始化" tabindex="-1"><a class="header-anchor" href="#_9、master节点集群初始化" aria-hidden="true">#</a> 9、master节点集群初始化</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubeadm init --kubernetes-version<span class="token operator">=</span>v1.29.2 --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16 --apiserver-advertise-address<span class="token operator">=</span><span class="token number">192.168</span>.127.145 --cri-socket unix:///var/run/cri-dockerd.sock --image-repository registry.aliyuncs.com/google_containers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_10、清除配置" tabindex="-1"><a class="header-anchor" href="#_10、清除配置" aria-hidden="true">#</a> 10、清除配置</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#删除kubernetes文件夹下面的所有文件</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/kubernetes/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubeadm reset --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_11、将工作节点连接主节点的秘钥" tabindex="-1"><a class="header-anchor" href="#_11、将工作节点连接主节点的秘钥" aria-hidden="true">#</a> 11、将工作节点连接主节点的秘钥</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.127.145:6443 <span class="token parameter variable">--token</span> xy677h.6r4py7icfjgibuzh <span class="token punctuation">\</span>
        --discovery-token-ca-cert-hash sha256:583a4449f279f6885478d8902b7d8f9274792fb906f4ce1649b3b379b5d1f9fb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12、node节点或其他控制平面节点加入集群时" tabindex="-1"><a class="header-anchor" href="#_12、node节点或其他控制平面节点加入集群时" aria-hidden="true">#</a> 12、node节点或其他控制平面节点加入集群时，</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Found multiple CRI endpoints on the host. Please define <span class="token function">which</span> one <span class="token keyword">do</span> you wish to use by setting the <span class="token string">'criSocket'</span> field <span class="token keyword">in</span> the kubeadm configuration file: unix:///var/run/containerd/containerd.sock, unix:///var/run/cri-dockerd.sock
To see the stack trace of this error execute with <span class="token parameter variable">--v</span><span class="token operator">=</span><span class="token number">5</span> or higher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>报错解决办法：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.127.145:6443 <span class="token parameter variable">--token</span> xy677h.6r4py7icfjgibuzh <span class="token punctuation">\</span>
        --discovery-token-ca-cert-hash sha256:583a4449f279f6885478d8902b7d8f9274792fb906f4ce1649b3b379b5d1f9fb <span class="token punctuation">\</span>
 --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_13、设置操作权限" tabindex="-1"><a class="header-anchor" href="#_13、设置操作权限" aria-hidden="true">#</a> 13、设置操作权限</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
  <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
  <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_14、token-过期解决办法" tabindex="-1"><a class="header-anchor" href="#_14、token-过期解决办法" aria-hidden="true">#</a> 14、token 过期解决办法</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#生成命令</span>
kubeadm token create
<span class="token comment">#token秘钥</span>
566lyl.up1ebpt9k0w57qbc
<span class="token comment">#添加到加入命令</span>
kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.127.145:6443 <span class="token parameter variable">--token</span> 566lyl.up1ebpt9k0w57qbc <span class="token punctuation">\</span>
--discovery-token-ca-cert-hash sha256:b6f52ab55434b44356ad4586436e586aba8a98e54125a179452bb8ae1f616527 --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_15、证书密钥的获取方式" tabindex="-1"><a class="header-anchor" href="#_15、证书密钥的获取方式" aria-hidden="true">#</a> 15、证书密钥的获取方式</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>openssl x509 <span class="token parameter variable">-pubkey</span> <span class="token parameter variable">-in</span> /etc/kubernetes/pki/ca.crt <span class="token operator">|</span> openssl rsa <span class="token parameter variable">-pubin</span> <span class="token parameter variable">-outform</span> der <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">|</span> openssl dgst <span class="token parameter variable">-sha256</span> <span class="token parameter variable">-hex</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">'s/^.* //'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_16、部署网络插件calico" tabindex="-1"><a class="header-anchor" href="#_16、部署网络插件calico" aria-hidden="true">#</a> 16、部署网络插件calico</h3>
<p>https://raw.githubusercontent.com/projectcalico/calico/v3.27.2/manifests/tigera-operator.yaml</p>
<p>复制代码到本地创建tigera-operator.yaml文件</p>
<h3 id="_16-1、-离线安装-下载网络插件容器包-https-github-com-projectcalico-calico-releases-下载release-v3-27-2-tgz-这个是专门给容器使用的" tabindex="-1"><a class="header-anchor" href="#_16-1、-离线安装-下载网络插件容器包-https-github-com-projectcalico-calico-releases-下载release-v3-27-2-tgz-这个是专门给容器使用的" aria-hidden="true">#</a> 16.1、(离线安装)下载网络插件容器包  https://github.com/projectcalico/calico/releases 下载<a href="https://github.com/projectcalico/calico/releases/download/v3.27.2/release-v3.27.2.tgz" target="_blank" rel="noopener noreferrer">release-v3.27.2.tgz<ExternalLinkIcon/></a> 这个是专门给容器使用的</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> release-v3.27.2.tgz
 <span class="token comment">#解压完之后进入images目录</span>
 /root/release-v3.27.2/images
 <span class="token comment">#里面有三个文件，将这个三个文件做成容器</span>
 calico-cni.tar  calico-node.tar  calico-kube-controllers.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解压出来的文件导入容器里面（这个是docker的方法）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> load <span class="token parameter variable">-i</span> calico-cni.tar
<span class="token function">docker</span> load <span class="token parameter variable">-i</span> calico-node.tar
<span class="token function">docker</span> load <span class="token parameter variable">-i</span> calico-kube-controllers.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>containerd的方法，k8s.io是容器的命名空间</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ctr <span class="token parameter variable">-n</span> k8s.io images <span class="token function">import</span> calico-cni.tar
ctr <span class="token parameter variable">-n</span> k8s.io images <span class="token function">import</span> calico-kube-controllers.tar
ctr <span class="token parameter variable">-n</span> k8s.io images <span class="token function">import</span> calico-node.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动网络</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> tigera-operator.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#删除pod</span>
kubectl delete <span class="token parameter variable">-f</span> tigera-operator.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看是否启动成功</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-n</span> tigera-operator <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_17、下载kubectl-create-f-https-raw-githubusercontent-com-projectcalico-calico-v3-27-2-manifests-custom-resources-yaml" tabindex="-1"><a class="header-anchor" href="#_17、下载kubectl-create-f-https-raw-githubusercontent-com-projectcalico-calico-v3-27-2-manifests-custom-resources-yaml" aria-hidden="true">#</a> 17、下载kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.2/manifests/custom-resources.yaml</h3>
<p>配置网络</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment">#vim custom-resources.yaml 修改成自己的网段</span>
<span class="token key atrule">cidr</span><span class="token punctuation">:</span> 10.244.0.0/16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>启用网络配置(使用这个文件)</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> custom-resources.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看网络pod</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">watch</span> kubectl get pods <span class="token parameter variable">-n</span> calico-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="k8s使用及相关命令" tabindex="-1"><a class="header-anchor" href="#k8s使用及相关命令" aria-hidden="true">#</a> k8s使用及相关命令</h4>
<p>1、查看集群的健康状况</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get cs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、查看k8sDNS的命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get svc <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、安装dns工具</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">sudo</span> yum <span class="token function">install</span> bind-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4、检验DNS是否正常</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">dig</span> <span class="token parameter variable">-t</span> a www.baidu.com @10.96.0.10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="pod基本操作" tabindex="-1"><a class="header-anchor" href="#pod基本操作" aria-hidden="true">#</a> pod基本操作</h2>
<h3 id="_1、查看所有的命名空间" tabindex="-1"><a class="header-anchor" href="#_1、查看所有的命名空间" aria-hidden="true">#</a> 1、<strong>查看所有的命名空间</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get pods<span class="token operator">|</span>pod <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、查看指定的命名空间" tabindex="-1"><a class="header-anchor" href="#_2、查看指定的命名空间" aria-hidden="true">#</a> 2、<strong>查看指定的命名空间</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get pods<span class="token operator">|</span>pod <span class="token operator">|</span>po <span class="token parameter variable">-n</span> 命名空间名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、查看命名空间下pod的详细信息" tabindex="-1"><a class="header-anchor" href="#_3、查看命名空间下pod的详细信息" aria-hidden="true">#</a> 3、<strong>查看命名空间下pod的详细信息</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-o</span> wide <span class="token parameter variable">-n</span> 命名空间名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、查看所有的命名空间下pod的详细信息" tabindex="-1"><a class="header-anchor" href="#_4、查看所有的命名空间下pod的详细信息" aria-hidden="true">#</a> 4、<strong>查看所有的命名空间下pod的详细信息</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-o</span> wide <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、实时监控pod的状态" tabindex="-1"><a class="header-anchor" href="#_5、实时监控pod的状态" aria-hidden="true">#</a> 5、<strong>实时监控pod的状态</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-w</span>
<span class="token comment">#看所有pod的监控</span>
kubectl get pod <span class="token parameter variable">-A</span> <span class="token parameter variable">-w</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、创建pod" tabindex="-1"><a class="header-anchor" href="#_6、创建pod" aria-hidden="true">#</a> 6、<strong>创建pod</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>pod-definition.yaml<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-1、以-yaml文件创建pod" tabindex="-1"><a class="header-anchor" href="#_6-1、以-yaml文件创建pod" aria-hidden="true">#</a> 6.1、<strong>以 YAML文件创建pod</strong></h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 设置 Pod 的名称为 "nginx"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 设置容器的名称为 "nginx"</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.25</span>  <span class="token comment"># 使用的容器镜像为 "nginx:1.14.2"</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>  <span class="token comment"># 容器中 Nginx 服务监听的端口为 80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、删除-pod" tabindex="-1"><a class="header-anchor" href="#_7、删除-pod" aria-hidden="true">#</a> 7、<strong>删除 Pod</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl delete pod <span class="token operator">&lt;</span>pod-name<span class="token operator">></span>
kubectl delete <span class="token parameter variable">-f</span> yaml文件名称

<span class="token number">1</span>. 删除特定的 Pod
kubectl delete pod ingress-nginx-admission-create-t7v67 <span class="token parameter variable">-n</span> ingress-nginx
kubectl delete pod myingress-ingress-nginx-admission-create-hfwcg <span class="token parameter variable">-n</span> ingress-nginx
<span class="token number">2</span>. 删除相应的 Job
kubectl delete job ingress-nginx-admission-create <span class="token parameter variable">-n</span> ingress-nginx
kubectl delete job myingress-ingress-nginx-admission-create <span class="token parameter variable">-n</span> ingress-nginx
<span class="token number">3</span>. 删除相关的 Helm Release
helm uninstall myingress <span class="token parameter variable">-n</span> ingress-nginx
<span class="token number">4</span>. 检查资源
kubectl get pods <span class="token parameter variable">-n</span> ingress-nginx
kubectl get <span class="token function">jobs</span> <span class="token parameter variable">-n</span> ingress-nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8、执行-yaml文件" tabindex="-1"><a class="header-anchor" href="#_8、执行-yaml文件" aria-hidden="true">#</a> 8、<strong>执行 YAML文件</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> yaml文件名称
kubectl create <span class="token parameter variable">-f</span> yaml文件名称
<span class="token comment">#apply和create 区别，create不存在pod时才创建，存在就报错，apply存在就更新，不存在就创建，一般都是使用apply</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9、进入pod" tabindex="-1"><a class="header-anchor" href="#_9、进入pod" aria-hidden="true">#</a> 9、<strong>进入pod</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token operator">&lt;</span>pod-name<span class="token operator">></span> -- /bin/bash
<span class="token comment">#进入指定容器</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pod名称 <span class="token parameter variable">-c</span> 容器名称 /bin/bash
<span class="token comment">#列如</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> nginx <span class="token parameter variable">-c</span> nginx -- <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10、查看pod日志" tabindex="-1"><a class="header-anchor" href="#_10、查看pod日志" aria-hidden="true">#</a> 10、<strong>查看pod日志</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看NGINX日志</span>
kubectl logs <span class="token parameter variable">-f</span> nginx
<span class="token comment">#查看指定容器的日志</span>
kubectl logs <span class="token parameter variable">-f</span> pod名称 <span class="token parameter variable">-c</span> 容器名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11、查看pod资源使用情况" tabindex="-1"><a class="header-anchor" href="#_11、查看pod资源使用情况" aria-hidden="true">#</a> 11、<strong>查看pod资源使用情况</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl <span class="token function">top</span> pod 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_12、查看pod标签" tabindex="-1"><a class="header-anchor" href="#_12、查看pod标签" aria-hidden="true">#</a> 12、<strong>查看pod标签</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get nodes --show-labels
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_13、选择一个节点-给它添加一个标签" tabindex="-1"><a class="header-anchor" href="#_13、选择一个节点-给它添加一个标签" aria-hidden="true">#</a> 13、<strong>选择一个节点，给它添加一个标签</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl label nodes 节点名称 <span class="token assign-left variable">disktype</span><span class="token operator">=</span>sdd <span class="token comment">#disktype=sdd 是键和值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="容器的基本操作" tabindex="-1"><a class="header-anchor" href="#容器的基本操作" aria-hidden="true">#</a> 容器的基本操作</h2>
<h3 id="_1、容器生命周期和回调" tabindex="-1"><a class="header-anchor" href="#_1、容器生命周期和回调" aria-hidden="true">#</a> 1、容器生命周期和回调</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> lifecycle<span class="token punctuation">-</span>demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> lifecycle<span class="token punctuation">-</span>demo<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
      <span class="token key atrule">postStart</span><span class="token punctuation">:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"/bin/sh"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> <span class="token string">"echo Hello from the postStart handler > /usr/share/message"</span><span class="token punctuation">]</span>
      <span class="token key atrule">preStop</span><span class="token punctuation">:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"/bin/sh"</span><span class="token punctuation">,</span><span class="token string">"-c"</span><span class="token punctuation">,</span><span class="token string">"nginx -s quit; while killall -0 nginx; do sleep 1; done"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-metrics-server-0-6-4-安装不了也没有关系-可视化工具可以解决" tabindex="-1"><a class="header-anchor" href="#安装-metrics-server-0-6-4-安装不了也没有关系-可视化工具可以解决" aria-hidden="true">#</a> 安装 metrics-server-0.6.4 （安装不了也没有关系，可视化工具可以解决）</h3>
<h3 id="_1、下载地址-kubectl-apply-f-https-github-com-kubernetes-sigs-metrics-server-releases-download-v0-6-4-components-yaml" tabindex="-1"><a class="header-anchor" href="#_1、下载地址-kubectl-apply-f-https-github-com-kubernetes-sigs-metrics-server-releases-download-v0-6-4-components-yaml" aria-hidden="true">#</a> 1、<strong>下载地址：kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.6.4/components.yaml</strong></h3>
<h3 id="_2、修改成国内镜像" tabindex="-1"><a class="header-anchor" href="#_2、修改成国内镜像" aria-hidden="true">#</a> 2、<strong>修改成国内镜像</strong></h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code> <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>cert<span class="token punctuation">-</span>dir=/tmp
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>secure<span class="token punctuation">-</span>port=4443
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>preferred<span class="token punctuation">-</span>address<span class="token punctuation">-</span>types=InternalIP<span class="token punctuation">,</span>ExternalIP<span class="token punctuation">,</span>Hostname
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>use<span class="token punctuation">-</span>node<span class="token punctuation">-</span>status<span class="token punctuation">-</span>port
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>metric<span class="token punctuation">-</span>resolution=15s
        <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.cn<span class="token punctuation">-</span>hangzhou.aliyuncs.com/rainux/metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>v0.6.4
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
<span class="token comment">#修改成下面这个镜像</span>
registry.cn<span class="token punctuation">-</span>hangzhou.aliyuncs.com/rainux/metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>v0.6.4

docker tag registry.cn<span class="token punctuation">-</span>hangzhou.aliyuncs.com/rainux/metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>v0.6.4 registry.k8s.io/metrics<span class="token punctuation">-</span>server/metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>v0.6.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、安装metrics-server" tabindex="-1"><a class="header-anchor" href="#_3、安装metrics-server" aria-hidden="true">#</a> 3、<strong>安装metrics-server</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> components.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、查看是否在运行" tabindex="-1"><a class="header-anchor" href="#_4、查看是否在运行" aria-hidden="true">#</a> 4、<strong>查看是否在运行</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-n</span> kube-system <span class="token operator">|</span> <span class="token function">grep</span> metrics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、查看pod状态的变化" tabindex="-1"><a class="header-anchor" href="#_5、查看pod状态的变化" aria-hidden="true">#</a> 5、<strong>查看pod状态的变化</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">watch</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token parameter variable">-d</span> kubectl get pod <span class="token parameter variable">-A</span> <span class="token comment">#1秒变化</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="deployment控制器" tabindex="-1"><a class="header-anchor" href="#deployment控制器" aria-hidden="true">#</a> deployment控制器</h2>
<h3 id="_1、deployment第一个示例" tabindex="-1"><a class="header-anchor" href="#_1、deployment第一个示例" aria-hidden="true">#</a> 1、<strong>deployment第一个示例</strong></h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1 <span class="token comment">#这指定了所使用的 Kubernetes API 的版本，apps/v1 版本支持 Deployment 资源。</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment <span class="token comment">#这定义了 Kubernetes 中的资源类型，即部署（Deployment）。</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment">#这是 Deployment 的元数据，包括名称（name）和标签（labels）</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment <span class="token comment">#定义了部署的名称为 "nginx-deployment"</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#标签用于标识 Deployment，这里标签为 "app: nginx"。</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment">#这是 Deployment 的规格，指定了部署的配置。</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment">#定义了要创建的 Pod 副本数，即部署中运行的实例数量为 3。</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#选择器用于选择应该由该 Deployment 管理的 Pod。</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span> <span class="token comment">#指定了要匹配的标签，这里选择标签为 "app: nginx" 的 Pod。</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx 
  <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token comment">#定义了要创建的 Pod 的模板。</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment"># Pod 模板的元数据。</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#定义了 Pod 的标签，这里标签为 "app: nginx"。</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment">#pod 的规格，包括容器等。</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span> <span class="token comment">#定义了要在 Pod 中运行的容器列表</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx <span class="token comment">#容器的名称为 "nginx"。</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.14.2 <span class="token comment">#nginx:1.14.2`: 指定了要使用的 Docker 镜像，此处为 Nginx 的版本 1.14.2。</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token comment"># 定义了容器的端口映射。</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment">#指定了容器监听的端口号为 80，即 Nginx 服务器的默认 HTTP 端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、查看deployment" tabindex="-1"><a class="header-anchor" href="#_2、查看deployment" aria-hidden="true">#</a> 2、<strong>查看deployment</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、deployment相关命令" tabindex="-1"><a class="header-anchor" href="#_3、deployment相关命令" aria-hidden="true">#</a> 3、<strong>deployment相关命令</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#部署应用</span>
kubectl apply <span class="token parameter variable">-f</span> app.yaml
<span class="token comment">#查看pod</span>
kubectl get pod <span class="token parameter variable">-o</span> <span class="token parameter variable">-wide</span>
<span class="token comment">#查看pod详细信息</span>
kubectl describe pod pod-name
<span class="token comment">#查看log</span>
kubectl logs <span class="token parameter variable">-f</span> pod-name
<span class="token comment">#进入pod终端</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pod-name <span class="token parameter variable">--bash</span>
<span class="token comment">#删除Deployment</span>
kubectl delete deployment <span class="token punctuation">[</span>DEPLOYMENT_NAME<span class="token punctuation">]</span>
<span class="token comment">#编辑Deployment</span>
kubectl edit deployment <span class="token punctuation">[</span>DEPLOYMENT_NAME<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、扩缩deployment" tabindex="-1"><a class="header-anchor" href="#_4、扩缩deployment" aria-hidden="true">#</a> 4、<strong>扩缩deployment</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看副本</span>
kubectl get rs<span class="token operator">|</span>replicaset
<span class="token comment">#伸缩扩展副本</span>
kubectl scale deployment nginx <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、回滚deployment" tabindex="-1"><a class="header-anchor" href="#_5、回滚deployment" aria-hidden="true">#</a> 5、<strong>回滚deployment</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看上线状态</span>
kubectl rollout status <span class="token punctuation">[</span>deployment nginx-deployment <span class="token operator">|</span> deployment/nginx<span class="token punctuation">]</span>
<span class="token comment">#查看版本历史</span>
kubectl rollout <span class="token function">history</span> deployment nginx-deployment
<span class="token comment">#查看某次历史的详细信息</span>
kubectl rollout <span class="token function">history</span> deployment/nginx-deployment <span class="token parameter variable">--revision</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token comment">#回到上个版本</span>
kubectl rollout undo deployment nginx-deployment
<span class="token comment">#回滚到指定版本</span>
kubectl rollout undo deployment nginx-deployment --to-revision<span class="token operator">=</span><span class="token number">2</span>
<span class="token comment">#重新部署</span>
kubectl rollout restart deployment nginx-deployment
<span class="token comment">#暂停运行，暂停后，对deployment的修改不会立即生效，恢复后才利用设置</span>
kubectl rollout pause deployment nginx-deployment
<span class="token comment">#恢复</span>
kubectl rollout resume deployment nginx-deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、删除deployment" tabindex="-1"><a class="header-anchor" href="#_6、删除deployment" aria-hidden="true">#</a> 6、<strong>删除deployment</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#删除deployment</span>
kubectl delete deployment nginx-deployment
kubectl delete <span class="token parameter variable">-f</span> nginx-deployment.yaml <span class="token punctuation">(</span>强烈建议使用该方法<span class="token punctuation">)</span>
<span class="token comment">#删除全部资源</span>
kubectl delete all <span class="token parameter variable">--all</span>
<span class="token comment">#删除指定命名空间的名称</span>
kubectl delete all <span class="token parameter variable">--all</span> <span class="token parameter variable">-n</span> 命名空间的名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、下面是一个-deployment-示例。其中创建了一个-replicaset-负责启动三个-nginx-pod" tabindex="-1"><a class="header-anchor" href="#_7、下面是一个-deployment-示例。其中创建了一个-replicaset-负责启动三个-nginx-pod" aria-hidden="true">#</a> 7、下面是一个 Deployment 示例。其中创建了一个 ReplicaSet，负责启动三个 <code v-pre>nginx</code> Pod</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1  <span class="token comment"># 使用的 Kubernetes API 版本</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment  <span class="token comment"># 定义的 Kubernetes 资源类型为 Deployment</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>  <span class="token comment"># 元数据段开始</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment  <span class="token comment"># Deployment 的名称为 "nginx-deployment"</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>  <span class="token comment"># 标签段开始</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx  <span class="token comment"># Deployment 的标签为 "app=nginx"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment"># 规范段开始</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>  <span class="token comment"># 需要维护的 Pod 副本数为 3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>  <span class="token comment"># 选择器段开始</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>  <span class="token comment"># 匹配标签段开始</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 选择标签为 "app=nginx" 的 Pod</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>  <span class="token comment"># Pod 模板段开始</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>  <span class="token comment"># 元数据段开始</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>  <span class="token comment"># 标签段开始</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx  <span class="token comment"># Pod 模板的标签为 "app=nginx"</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment"># 规范段开始</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>  <span class="token comment"># 容器列表</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 容器名称为 "nginx"</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.14.2  <span class="token comment"># 使用的容器镜像为 nginx:1.14.2</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>  <span class="token comment"># 容器端口列表</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>  <span class="token comment"># 容器内部监听的端口为 80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用docker安装kuboard-可视化工具" tabindex="-1"><a class="header-anchor" href="#用docker安装kuboard-可视化工具" aria-hidden="true">#</a> 用docker安装Kuboard(可视化工具)</h2>
<h3 id="_1、创建docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_1、创建docker-compose-yml" aria-hidden="true">#</a> 1、<strong>创建docker-compose.yml</strong></h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">kuboard</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> eipwork/kuboard<span class="token punctuation">:</span>v3
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> kuboard
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"80:80"</span>
      <span class="token punctuation">-</span> <span class="token string">"10081:10081"</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> KUBOARD_ENDPOINT=http<span class="token punctuation">:</span>//192.168.128.136<span class="token punctuation">:</span><span class="token number">80</span>
      <span class="token punctuation">-</span> KUBOARD_AGENT_SERVER_TCP_PORT=10081
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /root/kuboard<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="statefulset控制器" tabindex="-1"><a class="header-anchor" href="#statefulset控制器" aria-hidden="true">#</a> statefulSet控制器</h2>
<h3 id="_1、搭建nfs服务-创建新的系统安装" tabindex="-1"><a class="header-anchor" href="#_1、搭建nfs服务-创建新的系统安装" aria-hidden="true">#</a> <strong>1、搭建NFS服务，创建新的系统安装</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#安装nfs-utils</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> rpcbind nfs-utils
<span class="token comment">#创建一个数据目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/nfs/data
<span class="token comment">#编辑/etc/exports输入如下内容</span>
<span class="token comment">#insecure：通过1024以上端口发送 rw：读写 sync：请求时写入共享 no_root_squash:root用户有完全根目录访问权限</span>
<span class="token builtin class-name">echo</span> <span class="token string">"/root/nfs/data*(insecure,rw,sync,no_root_squash)"</span> <span class="token operator">>></span> /etc/exports

<span class="token comment">#启动相关服务并配置开机自启动</span>
systemctl start rpcbind
systemctl start nfs-server
systemctl <span class="token builtin class-name">enable</span> rpcbind
systemctl <span class="token builtin class-name">enable</span> nfs-server
<span class="token comment">#重新挂载，使 /etc/exports生效</span>
exports <span class="token parameter variable">-r</span>
<span class="token comment">#查看共享情况</span>
exportfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、安装客户端-在k8s所有的节点安装" tabindex="-1"><a class="header-anchor" href="#_2、安装客户端-在k8s所有的节点安装" aria-hidden="true">#</a> <strong>2、安装客户端（在K8S所有的节点安装）</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#在所有节点上安装客户端</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
<span class="token comment">#创建本地目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/nfs
<span class="token comment">#挂载远程NFS目录到本地 ip 是nfs</span>
<span class="token function">mount</span> <span class="token parameter variable">-t</span> nfs nfs服务器地址IP :/root/nfs /root/nfs
<span class="token comment">#写入一个测试文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">"hello nfs server"</span> <span class="token operator">></span> /root/nfsmount/test.txt
<span class="token comment">#去远程nfs目录查看</span>
<span class="token function">cat</span> /root/nfsmount/test.txt
<span class="token comment">#挂载取消</span>
<span class="token function">umount</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-l</span> nfs目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、下面的示例演示了-statefulset-的组件" tabindex="-1"><a class="header-anchor" href="#_3、下面的示例演示了-statefulset-的组件" aria-hidden="true">#</a> <strong>3、下面的示例演示了 StatefulSet 的组件</strong></h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  <span class="token comment"># 使用的 Kubernetes API 版本</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service  <span class="token comment"># 定义的 Kubernetes 资源类型为 Service</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>  <span class="token comment"># 元数据段开始</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 服务的名称为 "nginx"</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>  <span class="token comment"># 标签段开始</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 服务的标签为 "app=nginx"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment"># 规范段开始</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>  <span class="token comment"># 端口列表</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>  <span class="token comment"># 服务监听的端口为 80</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> web  <span class="token comment"># 端口的名称为 "web"</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None  <span class="token comment"># 该服务没有集群内部 IP 地址，通常用于 headless 服务</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>  <span class="token comment"># 选择器段开始</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 选择标签为 "app=nginx" 的 Pod 作为后端</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1  <span class="token comment"># 使用的 Kubernetes API 版本</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet  <span class="token comment"># 定义的 Kubernetes 资源类型为 StatefulSet</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>  <span class="token comment"># 元数据段开始</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> web  <span class="token comment"># StatefulSet 的名称为 "web"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment"># 规范段开始</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>  <span class="token comment"># 选择器段开始</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>  <span class="token comment"># 匹配标签段开始</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 选择标签为 "app=nginx" 的 Pod</span>
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> <span class="token string">"nginx"</span>  <span class="token comment"># 该 StatefulSet 使用的服务名称为 "nginx"</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>  <span class="token comment"># 需要维护的 Pod 副本数为 3</span>
  <span class="token key atrule">minReadySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>  <span class="token comment"># Pod 最小就绪时间为 10 秒</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>  <span class="token comment"># Pod 模板段开始</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>  <span class="token comment"># 元数据段开始</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>  <span class="token comment"># 标签段开始</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx  <span class="token comment"># Pod 模板的标签为 "app=nginx"</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment"># 规范段开始</span>
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>  <span class="token comment"># Pod 终止的优雅期为 10 秒</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>  <span class="token comment"># 容器列表</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 容器名称为 "nginx"</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.k8s.io/nginx<span class="token punctuation">-</span>slim<span class="token punctuation">:</span><span class="token number">0.8</span>  <span class="token comment"># 使用的容器镜像</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>  <span class="token comment"># 容器端口列表</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>  <span class="token comment"># 容器内部监听的端口为 80</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> web  <span class="token comment"># 暴露的端口名字为 "web"</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>  <span class="token comment"># 挂载的卷列表</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> www  <span class="token comment"># 挂载的卷名称为 "www"</span>
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html  <span class="token comment"># 挂载到容器内的路径</span>
  <span class="token key atrule">volumeClaimTemplates</span><span class="token punctuation">:</span>  <span class="token comment"># 动态 PVC 模板列表</span>
  <span class="token punctuation">-</span> <span class="token key atrule">metadata</span><span class="token punctuation">:</span>  <span class="token comment"># 元数据段开始</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> www  <span class="token comment"># PVC 的名称为 "www"</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment"># 规范段开始</span>
      <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"ReadWriteOnce"</span> <span class="token punctuation">]</span>  <span class="token comment"># 读写权限为一次性</span>
      <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> <span class="token string">"my-storage-class"</span>  <span class="token comment"># 存储类名称为 "my-storage-class"</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>  <span class="token comment"># 资源声明段开始</span>
        <span class="token key atrule">requests</span><span class="token punctuation">:</span>  <span class="token comment"># 请求声明段开始</span>
          <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi  <span class="token comment"># 请求的存储资源为 1Gi</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、安装nfs-subdir-external-provisioner" tabindex="-1"><a class="header-anchor" href="#_4、安装nfs-subdir-external-provisioner" aria-hidden="true">#</a> 4、安装nfs-subdir-external-provisioner</h3>
<p>calss.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
  <span class="token key atrule">archiveOnDelete</span><span class="token punctuation">:</span> <span class="token string">"false"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deployment</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Recreate
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
          <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.k8s.io/sig<span class="token punctuation">-</span>storage/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner<span class="token punctuation">:</span>v4.0.2
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /persistentvolumes
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PROVISIONER_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_SERVER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> &lt;YOUR NFS SERVER HOSTNAME<span class="token punctuation">></span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_PATH
              <span class="token key atrule">value</span><span class="token punctuation">:</span> /var/nfs
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
          <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">server</span><span class="token punctuation">:</span> &lt;YOUR NFS SERVER HOSTNAME<span class="token punctuation">></span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /var/nfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>rbac 下面的 ClusterRole 和 RoleBinding 将允许用户 <code v-pre>user-1</code> 把名字空间 <code v-pre>user-1-namespace</code> 中的 <code v-pre>admin</code>、<code v-pre>edit</code> 和 <code v-pre>view</code> 角色赋予其他用户：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> role<span class="token punctuation">-</span>grantor
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"rbac.authorization.k8s.io"</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"rolebindings"</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"create"</span><span class="token punctuation">]</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"rbac.authorization.k8s.io"</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"clusterroles"</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"bind"</span><span class="token punctuation">]</span>
  <span class="token comment"># 忽略 resourceNames 意味着允许绑定任何 ClusterRole</span>
  <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"admin"</span><span class="token punctuation">,</span><span class="token string">"edit"</span><span class="token punctuation">,</span><span class="token string">"view"</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> role<span class="token punctuation">-</span>grantor<span class="token punctuation">-</span>binding
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>1<span class="token punctuation">-</span>namespace
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> role<span class="token punctuation">-</span>grantor
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
  <span class="token key atrule">name</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="daemonset-控制器" tabindex="-1"><a class="header-anchor" href="#daemonset-控制器" aria-hidden="true">#</a> daemonset 控制器</h2>
<h3 id="_1、创建一个实例" tabindex="-1"><a class="header-anchor" href="#_1、创建一个实例" aria-hidden="true">#</a> 1、创建一个实例</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>elasticsearch
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>logging
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>elasticsearch
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>elasticsearch
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
      <span class="token comment"># 这些容忍度设置是为了让该守护进程集在控制平面节点上运行</span>
      <span class="token comment"># 如果你不希望自己的控制平面节点运行 Pod，可以删除它们</span>
      <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>role.kubernetes.io/control<span class="token punctuation">-</span>plane
        <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
        <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule
      <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>role.kubernetes.io/master
        <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
        <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>elasticsearch
        <span class="token key atrule">image</span><span class="token punctuation">:</span> quay.io/fluentd_elasticsearch/fluentd<span class="token punctuation">:</span>v2.5.2
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log
      <span class="token comment"># 可能需要设置较高的优先级类以确保 DaemonSet Pod 可以抢占正在运行的 Pod</span>
      <span class="token comment"># priorityClassName: important</span>
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /var/log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、基于-yaml-文件创建-daemonset" tabindex="-1"><a class="header-anchor" href="#_2、基于-yaml-文件创建-daemonset" aria-hidden="true">#</a> 2、基于 YAML 文件创建 DaemonSet：</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>kubectl apply <span class="token punctuation">-</span>f https<span class="token punctuation">:</span>//k8s.io/examples/controllers/daemonset.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、job" tabindex="-1"><a class="header-anchor" href="#_3、job" aria-hidden="true">#</a> 3、Job</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div><h2 id="helm方式部署rancher" tabindex="-1"><a class="header-anchor" href="#helm方式部署rancher" aria-hidden="true">#</a> helm方式部署rancher</h2>
<h3 id="helm-安装" tabindex="-1"><a class="header-anchor" href="#helm-安装" aria-hidden="true">#</a> helm 安装</h3>
<h3 id="_1、官网-https-github-com-helm-helm-releases" tabindex="-1"><a class="header-anchor" href="#_1、官网-https-github-com-helm-helm-releases" aria-hidden="true">#</a> 1、官网:<a href="https://github.com/helm/helm/releases" target="_blank" rel="noopener noreferrer">https://github.com/helm/helm/releases<ExternalLinkIcon/></a></h3>
<h3 id="_2、解压-tar-zxvf-helm-v3-0-0-linux-amd64-tar-gz" tabindex="-1"><a class="header-anchor" href="#_2、解压-tar-zxvf-helm-v3-0-0-linux-amd64-tar-gz" aria-hidden="true">#</a> 2、解压(<code v-pre>tar -zxvf helm-v3.0.0-linux-amd64.tar.gz</code>)</h3>
<h3 id="_3、在解压目录中找到helm程序-移动到需要的目录中-mv-linux-amd64-helm-usr-local-bin-helm" tabindex="-1"><a class="header-anchor" href="#_3、在解压目录中找到helm程序-移动到需要的目录中-mv-linux-amd64-helm-usr-local-bin-helm" aria-hidden="true">#</a> 3、在解压目录中找到<code v-pre>helm</code>程序，移动到需要的目录中(<code v-pre>mv linux-amd64/helm /usr/local/bin/helm</code>)</h3>
<h3 id="部署rancher" tabindex="-1"><a class="header-anchor" href="#部署rancher" aria-hidden="true">#</a> 部署rancher</h3>
<h3 id="_1、修改代理模式" tabindex="-1"><a class="header-anchor" href="#_1、修改代理模式" aria-hidden="true">#</a> 1、修改代理模式</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl edit configmap kube-proxy <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、修改代码" tabindex="-1"><a class="header-anchor" href="#_2、修改代码" aria-hidden="true">#</a> 2、修改代码：</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># Please edit the object below. Lines beginning with a '#' will be ignored,</span>
<span class="token comment"># and an empty file will abort the edit. If an error occurs while saving this file will be</span>
<span class="token comment"># reopened with the relevant failures.</span>
<span class="token comment">#</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">config.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kubeproxy.config.k8s.io/v1alpha1
    <span class="token key atrule">bindAddress</span><span class="token punctuation">:</span> 0.0.0.0
    <span class="token key atrule">bindAddressHardFail</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">clientConnection</span><span class="token punctuation">:</span>
      <span class="token key atrule">acceptContentTypes</span><span class="token punctuation">:</span> <span class="token string">""</span>
      <span class="token key atrule">burst</span><span class="token punctuation">:</span> <span class="token number">0</span>
      <span class="token key atrule">contentType</span><span class="token punctuation">:</span> <span class="token string">""</span>
      <span class="token key atrule">kubeconfig</span><span class="token punctuation">:</span> /var/lib/kube<span class="token punctuation">-</span>proxy/kubeconfig.conf
      <span class="token key atrule">qps</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">clusterCIDR</span><span class="token punctuation">:</span> 10.244.0.0/16
    <span class="token key atrule">configSyncPeriod</span><span class="token punctuation">:</span> 0s
    <span class="token key atrule">conntrack</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxPerCore</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">min</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">tcpBeLiberal</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">tcpCloseWaitTimeout</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">tcpEstablishedTimeout</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">udpStreamTimeout</span><span class="token punctuation">:</span> 0s
      <span class="token key atrule">udpTimeout</span><span class="token punctuation">:</span> 0s
    <span class="token key atrule">detectLocal</span><span class="token punctuation">:</span>
      <span class="token key atrule">bridgeInterface</span><span class="token punctuation">:</span> <span class="token string">""</span>
      <span class="token key atrule">interfaceNamePrefix</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">detectLocalMode</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">enableProfiling</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">healthzBindAddress</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">hostnameOverride</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">iptables</span><span class="token punctuation">:</span>
      <span class="token key atrule">localhostNodePorts</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">masqueradeAll</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">masqueradeBit</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">minSyncPeriod</span><span class="token punctuation">:</span> 0s
      <span class="token key atrule">syncPeriod</span><span class="token punctuation">:</span> 0s
    <span class="token key atrule">ipvs</span><span class="token punctuation">:</span>
      <span class="token key atrule">excludeCIDRs</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">minSyncPeriod</span><span class="token punctuation">:</span> 0s
      <span class="token key atrule">scheduler</span><span class="token punctuation">:</span> <span class="token string">""</span>
      <span class="token key atrule">strictARP</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment">#将false改为true</span>
      <span class="token key atrule">syncPeriod</span><span class="token punctuation">:</span> 0s
      <span class="token key atrule">tcpFinTimeout</span><span class="token punctuation">:</span> 0s
      <span class="token key atrule">tcpTimeout</span><span class="token punctuation">:</span> 0s
      <span class="token key atrule">udpTimeout</span><span class="token punctuation">:</span> 0s
 <span class="token key atrule">kind</span><span class="token punctuation">:</span> KubeProxyConfiguration
    <span class="token key atrule">logging</span><span class="token punctuation">:</span>
      <span class="token key atrule">flushFrequency</span><span class="token punctuation">:</span> <span class="token number">0</span>
      <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">json</span><span class="token punctuation">:</span>
          <span class="token key atrule">infoBufferSize</span><span class="token punctuation">:</span> <span class="token string">"0"</span>
      <span class="token key atrule">verbosity</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">metricsBindAddress</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">""</span> <span class="token comment">#设置ipvs</span>
    <span class="token key atrule">nftables</span><span class="token punctuation">:</span>
      <span class="token key atrule">masqueradeAll</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">masqueradeBit</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">minSyncPeriod</span><span class="token punctuation">:</span> 0s
      <span class="token key atrule">syncPeriod</span><span class="token punctuation">:</span> 0s
    <span class="token key atrule">nodePortAddresses</span><span class="token punctuation">:</span> <span class="token null important">null</span>
    <span class="token key atrule">oomScoreAdj</span><span class="token punctuation">:</span> <span class="token null important">null</span>
    <span class="token key atrule">portRange</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">showHiddenMetricsForVersion</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">winkernel</span><span class="token punctuation">:</span>
      <span class="token key atrule">enableDSR</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">forwardHealthCheckVip</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">networkName</span><span class="token punctuation">:</span> <span class="token string">""</span>
      <span class="token key atrule">rootHnsEndpointName</span><span class="token punctuation">:</span> <span class="token string">""</span>
      <span class="token key atrule">sourceVip</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">kubeconfig.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Config
    <span class="token key atrule">clusters</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">cluster</span><span class="token punctuation">:</span>
        <span class="token key atrule">certificate-authority</span><span class="token punctuation">:</span> /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        <span class="token key atrule">server</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//192.168.127.145<span class="token punctuation">:</span><span class="token number">6443</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> default
    <span class="token key atrule">contexts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">context</span><span class="token punctuation">:</span>
        <span class="token key atrule">cluster</span><span class="token punctuation">:</span> default
        <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
        <span class="token key atrule">user</span><span class="token punctuation">:</span> default
      <span class="token key atrule">name</span><span class="token punctuation">:</span> default
    <span class="token key atrule">current-context</span><span class="token punctuation">:</span> default
    <span class="token key atrule">users</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> default
      <span class="token key atrule">user</span><span class="token punctuation">:</span>
        <span class="token key atrule">tokenFile</span><span class="token punctuation">:</span> /var/run/secrets/kubernetes.io/serviceaccount/token
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubeadm.kubernetes.io/component-config.hash</span><span class="token punctuation">:</span> sha256<span class="token punctuation">:</span>37963ff79d2fa26b47fe50ea27dafc33a89b03bb47eb574f3606c776a95568ba
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token string">"2024-03-12T02:46:42Z"</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>proxy
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>proxy
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
  <span class="token key atrule">resourceVersion</span><span class="token punctuation">:</span> <span class="token string">"229"</span>
  <span class="token key atrule">uid</span><span class="token punctuation">:</span> e61637db<span class="token punctuation">-</span>2973<span class="token punctuation">-</span>4401<span class="token punctuation">-</span>afc2<span class="token punctuation">-</span>a1312d95af6e

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、重启代理" tabindex="-1"><a class="header-anchor" href="#_3、重启代理" aria-hidden="true">#</a> 3、重启代理</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看应用</span>
kubectl get daemonset <span class="token parameter variable">-n</span> kube-system
<span class="token comment">#重启</span>
kubectl rollout restart daemonset kube-proxy <span class="token parameter variable">-n</span> kube-system
<span class="token comment">#查看pod日志</span>
 kubectl describe pod kube-proxy-htspv <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、安装metallb" tabindex="-1"><a class="header-anchor" href="#_4、安装metallb" aria-hidden="true">#</a> 4、安装MetalLB</h3>
<ul>
<li>
<p>安装文档：https://metallb.universe.tf/installation/ 如果网络不能正常访问github，就用这个地址下载：https://raw.githubusercontent.com/metallb/metallb/v0.14.5/config/manifests/metallb-native.yaml 在上传到服务器</p>
</li>
<li>
<p>安装：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>shkubectl apply <span class="token parameter variable">-f</span> metallb-native.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>添加IP地址池：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> metallb.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IPAddressPool
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> first<span class="token punctuation">-</span>pool
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> metallb<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">addresses</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> 192.168.1.240<span class="token punctuation">-</span>192.168.1.250
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建地址池：</p>
<div class="language-ssh line-numbers-mode" data-ext="ssh"><pre v-pre class="language-ssh"><code>kubectl apply -f ippool.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看IP地址池：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get ipaddresspool <span class="token parameter variable">-n</span> metallb-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>开启二层宣告</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> metallb.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> L2Advertisement
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> metallb<span class="token punctuation">-</span>system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建二层宣告：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>kubectl apply <span class="token punctuation">-</span>f l2.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_5、安装ingress-nginx代理服务器" tabindex="-1"><a class="header-anchor" href="#_5、安装ingress-nginx代理服务器" aria-hidden="true">#</a> 5、安装ingress-nginx代理服务器</h3>
<p>官网地址：https://github.com/kubernetes/ingress-nginx/blob/main/docs/deploy/index.md</p>
<p>1、添加阿里云仓库</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> aliyuncs https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts
helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2、搜索仓库</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm search repo aliyuncs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -i '/registry:/s#registry.k8s.io#registry.cn-hangzhou.aliyuncs.com#g' values.yaml</span>
<span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -i 's#ingress-nginx/controller#yinzhengjie-k8s/ingress-nginx#' values.yaml</span>
<span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -i 's#ingress-nginx/kube-webhook-certgen#yinzhengjie-k8s/ingress-nginx#' values.yaml</span>
<span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -i 's#v1.10.1#kube-webhook-certgen-v1.10.1#' values.yaml</span>
<span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -ri '/digest:/s@^@#@' values.yaml</span>
<span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -i '/hostNetwork:/s#false#true#' values.yaml</span>
<span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -i  '/dnsPolicy/s#ClusterFirst#ClusterFirstWithHostNet#' values.yaml</span>
<span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -i '/kind/s#Deployment#DaemonSet#' values.yaml</span>
<span class="token punctuation">[</span>root@master ingress-nginx<span class="token punctuation">]</span><span class="token comment"># sed -i '/default:/s#false#true#'  values.yaml</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


