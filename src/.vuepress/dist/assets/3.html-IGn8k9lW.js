import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as l,c,d as n,e as s,b as e,a as t}from"./app-HMLpIP8o.js";const o="/assets/1-BksDI-a2.png",u="/assets/2-0zM-vbNC.png",r="/assets/3-9pOsX7l2.png",d="/assets/4-AEwa4ZZ8.png",k="/assets/5-ao2lRXQh.png",v={},m=n("h1",{id:"kubesphere实现流水线部署",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#kubesphere实现流水线部署","aria-hidden":"true"},"#"),s(" kubesphere实现流水线部署")],-1),b={id:"一、安装kubekey",tabindex:"-1"},h=n("a",{class:"header-anchor",href:"#一、安装kubekey","aria-hidden":"true"},"#",-1),g={href:"https://github.com/kubesphere/kubekey",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxf</span> kubekey-v3.1.2-linux-amd64.tar.gz
<span class="token comment">#将解压出来的KK放到/usr/bin</span>
<span class="token function">mv</span> kk /usr/bin
<span class="token comment">#安装时间同步</span>
<span class="token function">apt</span> <span class="token function">install</span> ntpdate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、安装k8s和kubesphere" tabindex="-1"><a class="header-anchor" href="#二、安装k8s和kubesphere" aria-hidden="true">#</a> 二、安装k8s和kubesphere</h2><h3 id="_1、单集群" tabindex="-1"><a class="header-anchor" href="#_1、单集群" aria-hidden="true">#</a> 1、单集群</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#这是单个集群安装的</span>
kk create cluster --with-kubernetes v1.26 --container-manager containerd --with-kubesphere v3.4.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：版本大于1.18一定要安装：apt install socat和apt install conntrack 所有节点都安装,同时在所有节点上都运行：export KKZONE=cn</p></blockquote><h3 id="_1-1、关闭swap分区" tabindex="-1"><a class="header-anchor" href="#_1-1、关闭swap分区" aria-hidden="true">#</a> 1.1、关闭swap分区</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>swapoff <span class="token parameter variable">-a</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">&#39;s/.*swap.*/#&amp;/&#39;</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、多集群" tabindex="-1"><a class="header-anchor" href="#_2、多集群" aria-hidden="true">#</a> 2、多集群</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#下载配置文件</span>
./kk create config --with-kubesphere <span class="token punctuation">[</span>version<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1、配置文件-config-sample-yaml" tabindex="-1"><a class="header-anchor" href="#_2-1、配置文件-config-sample-yaml" aria-hidden="true">#</a> 2.1、配置文件:config-sample.yaml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kubekey.kubesphere.io/v1alpha2
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Cluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> sample
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">name</span><span class="token punctuation">:</span> master<span class="token punctuation">,</span> <span class="token key atrule">address</span><span class="token punctuation">:</span> 192.168.128.218<span class="token punctuation">,</span> <span class="token key atrule">internalAddress</span><span class="token punctuation">:</span> 192.168.128.218<span class="token punctuation">,</span> <span class="token key atrule">user</span><span class="token punctuation">:</span> root<span class="token punctuation">,</span> <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;Aa135246&quot;</span><span class="token punctuation">}</span> <span class="token comment">#控制节点</span>
  <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">name</span><span class="token punctuation">:</span> node01<span class="token punctuation">,</span> <span class="token key atrule">address</span><span class="token punctuation">:</span> 192.168.128.219<span class="token punctuation">,</span> <span class="token key atrule">internalAddress</span><span class="token punctuation">:</span> 192.168.128.219<span class="token punctuation">,</span> <span class="token key atrule">user</span><span class="token punctuation">:</span> root<span class="token punctuation">,</span> <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;Aa135246&quot;</span><span class="token punctuation">}</span> <span class="token comment">#工作节点</span>
  <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">name</span><span class="token punctuation">:</span> node02<span class="token punctuation">,</span> <span class="token key atrule">address</span><span class="token punctuation">:</span> 192.168.128.220<span class="token punctuation">,</span> <span class="token key atrule">internalAddress</span><span class="token punctuation">:</span> 192.168.128.220<span class="token punctuation">,</span> <span class="token key atrule">user</span><span class="token punctuation">:</span> root<span class="token punctuation">,</span> <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;Aa135246&quot;</span><span class="token punctuation">}</span> <span class="token comment">#工作节点</span>
  <span class="token key atrule">roleGroups</span><span class="token punctuation">:</span>
    <span class="token key atrule">etcd</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
    <span class="token key atrule">control-plane</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
    <span class="token key atrule">worker</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> node01
    <span class="token punctuation">-</span> node02
  <span class="token key atrule">controlPlaneEndpoint</span><span class="token punctuation">:</span>
    <span class="token comment">## Internal loadbalancer for apiservers</span>
    <span class="token comment"># internalLoadbalancer: haproxy</span>

    <span class="token key atrule">domain</span><span class="token punctuation">:</span> lb.kubesphere.local
    <span class="token key atrule">address</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6443</span>
  <span class="token key atrule">kubernetes</span><span class="token punctuation">:</span>
    <span class="token key atrule">version</span><span class="token punctuation">:</span> v1.26.5 <span class="token comment">#k8s版本</span>
    <span class="token key atrule">clusterName</span><span class="token punctuation">:</span> cluster.local
    <span class="token key atrule">autoRenewCerts</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">containerManager</span><span class="token punctuation">:</span> docker
  <span class="token key atrule">etcd</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> kubekey
  <span class="token key atrule">network</span><span class="token punctuation">:</span>
    <span class="token key atrule">plugin</span><span class="token punctuation">:</span> calico
    <span class="token key atrule">kubePodsCIDR</span><span class="token punctuation">:</span> 10.233.64.0/18
    <span class="token key atrule">kubeServiceCIDR</span><span class="token punctuation">:</span> 10.233.0.0/18
    <span class="token comment">## multus support. https://github.com/k8snetworkplumbingwg/multus-cni</span>
    <span class="token key atrule">multusCNI</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">privateRegistry</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">namespaceOverride</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">registryMirrors</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">insecureRegistries</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">#---只显示一部分</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2、执行安装命令" tabindex="-1"><a class="header-anchor" href="#_2-2、执行安装命令" aria-hidden="true">#</a> 2.2、执行安装命令：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./kk create cluster <span class="token parameter variable">-f</span> config-sample.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3、控制节点配置" tabindex="-1"><a class="header-anchor" href="#_2-3、控制节点配置" aria-hidden="true">#</a> 2.3、控制节点配置：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Your Kubernetes control-plane has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:

  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
  <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
  <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

Alternatively, <span class="token keyword">if</span> you are the root user, you can run:

  <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run <span class="token string">&quot;kubectl apply -f [podnetwork].yaml&quot;</span> with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now <span class="token function">join</span> any number of control-plane nodes by copying certificate authorities
and <span class="token function">service</span> account keys on each <span class="token function">node</span> and <span class="token keyword">then</span> running the following as root:

  kubeadm <span class="token function">join</span> lb.kubesphere.local:6443 <span class="token parameter variable">--token</span> qia5c7.cwtiagpza4lckibi <span class="token punctuation">\\</span>
        --discovery-token-ca-cert-hash sha256:04f5f1c3a9367c970ae32776561674bdb62950cca8596fe5fca1dabb75152d25 <span class="token punctuation">\\</span>
        --control-plane

Then you can <span class="token function">join</span> any number of worker nodes by running the following on each as root:

kubeadm <span class="token function">join</span> lb.kubesphere.local:6443 <span class="token parameter variable">--token</span> qia5c7.cwtiagpza4lckibi <span class="token punctuation">\\</span>
        --discovery-token-ca-cert-hash sha256:04f5f1c3a9367c970ae32776561674bdb62950cca8596fe5fca1dabb75152d25

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4、安装成功日志" tabindex="-1"><a class="header-anchor" href="#_2-4、安装成功日志" aria-hidden="true">#</a> 2.4、安装成功日志</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>namespace/kubesphere-system unchanged
serviceaccount/ks-installer unchanged
customresourcedefinition.apiextensions.k8s.io/clusterconfigurations.installer.kubesphere.io unchanged
clusterrole.rbac.authorization.k8s.io/ks-installer unchanged
clusterrolebinding.rbac.authorization.k8s.io/ks-installer unchanged
deployment.apps/ks-installer unchanged
clusterconfiguration.installer.kubesphere.io/ks-installer created
<span class="token number">22</span>:41:33 CST success: <span class="token punctuation">[</span>master<span class="token punctuation">]</span>
<span class="token comment">#####################################################</span>
<span class="token comment">###              Welcome to KubeSphere!           ###</span>
<span class="token comment">#####################################################</span>

Console: http://192.168.128.218:30880
Account: admin
Password: P@88w0rd 修改为：HZWX62352744aa??aa
NOTES：
  <span class="token number">1</span>. After you log into the console, please check the
     monitoring status of <span class="token function">service</span> components <span class="token keyword">in</span>
     <span class="token string">&quot;Cluster Management&quot;</span><span class="token builtin class-name">.</span> If any <span class="token function">service</span> is not
     ready, please <span class="token function">wait</span> patiently <span class="token keyword">until</span> all components
     are up and running.
  <span class="token number">2</span>. Please change the default password after login.

<span class="token comment">#####################################################</span>
https://kubesphere.io             <span class="token number">2024</span>-07-11 <span class="token number">22</span>:56:50
<span class="token comment">#####################################################</span>
<span class="token number">22</span>:56:54 CST success: <span class="token punctuation">[</span>master<span class="token punctuation">]</span>
<span class="token number">22</span>:56:54 CST Pipeline<span class="token punctuation">[</span>CreateClusterPipeline<span class="token punctuation">]</span> execute successfully
Installation is complete.

Please check the result using the command:

        kubectl logs <span class="token parameter variable">-n</span> kubesphere-system <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-n</span> kubesphere-system <span class="token parameter variable">-l</span> <span class="token string">&#39;app in (ks-install, ks-installer)&#39;</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.items[0].metadata.name}&#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、pod操作" tabindex="-1"><a class="header-anchor" href="#三、pod操作" aria-hidden="true">#</a> 三、pod操作</h2><h3 id="_3-1、强制删除pod" tabindex="-1"><a class="header-anchor" href="#_3-1、强制删除pod" aria-hidden="true">#</a> 3.1、强制删除pod</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl delete pod ks-apiserver-6485fd9665-vn52k  <span class="token parameter variable">-n</span> kubesphere-system --grace-period<span class="token operator">=</span><span class="token number">0</span> <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2、查看所有pod" tabindex="-1"><a class="header-anchor" href="#_3-2、查看所有pod" aria-hidden="true">#</a> 3.2、查看所有pod</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pods --all-namespaces
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="四、kubesphere相关基础配置" tabindex="-1"><a class="header-anchor" href="#四、kubesphere相关基础配置" aria-hidden="true">#</a> 四、kubesphere相关基础配置</h2><h3 id="_4-1、配置镜像拉取和推送镜像到" tabindex="-1"><a class="header-anchor" href="#_4-1、配置镜像拉取和推送镜像到" aria-hidden="true">#</a> 4.1、配置镜像拉取和推送镜像到</h3><p>路径:/etc/docker/daemon.json 如果没有这个文件就新建，需要在所有节点上设置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 日志选项配置</span>
  <span class="token property">&quot;log-opts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 单个日志文件的最大大小为5MB，达到此大小时，日志文件将会被轮转</span>
    <span class="token property">&quot;max-size&quot;</span><span class="token operator">:</span> <span class="token string">&quot;5m&quot;</span><span class="token punctuation">,</span>
    
    <span class="token comment">// 系统最多保留3个轮转后的日志文件</span>
    <span class="token property">&quot;max-file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// 执行选项配置</span>
  <span class="token property">&quot;exec-opts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 使用systemd作为cgroup驱动程序</span>
    <span class="token string">&quot;native.cgroupdriver=systemd&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token comment">// 不安全的私有镜像仓库地址</span>
  <span class="token property">&quot;insecure-registries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 配置不安全的镜像仓库地址，允许从该地址拉取镜像而不进行SSL验证</span>
    <span class="token string">&quot;192.168.1.166:80&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token comment">// 镜像加速器配置</span>
  <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 配置镜像加速器地址，从该地址拉取镜像时速度会更快</span>
    <span class="token string">&quot;https://cf-workers-docker-io-784.pages.dev&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2、重启docker" tabindex="-1"><a class="header-anchor" href="#_4-2、重启docker" aria-hidden="true">#</a> 4.2、重启docker</h3><p>重载守护进程，以便它读取新的配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重启Docker服务使新的配置生效：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证Docker是否正常运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl status <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3、kubesphere配置私有镜像仓库" tabindex="-1"><a class="header-anchor" href="#_4-3、kubesphere配置私有镜像仓库" aria-hidden="true">#</a> 4.3、kubesphere配置私有镜像仓库</h3><h4 id="_1-1-准备工作" tabindex="-1"><a class="header-anchor" href="#_1-1-准备工作" aria-hidden="true">#</a> 1.1 准备工作</h4><p>您需要创建一个企业空间、一个项目和一个用户（例如 demo4project）。该用户必须已邀请至该项目，并具有 operator 角色</p><p><img src="`+o+'" alt="第一步" loading="lazy"><img src="'+u+'" alt="第二步" loading="lazy"></p><h4 id="_1-2-创建保密字典" tabindex="-1"><a class="header-anchor" href="#_1-2-创建保密字典" aria-hidden="true">#</a> 1.2 创建保密字典</h4><p>创建工作负载、服务、任务或定时任务时，除了从公共仓库选择镜像，您还可以从私有仓库选择镜像。要使用私有仓库中的镜像，您必须先为私有仓库创建保密字典，以便在 KubeSphere 中集成该私有仓库。</p><h4 id="_1-2-1-步骤-1-进入保密字典页面" tabindex="-1"><a class="header-anchor" href="#_1-2-1-步骤-1-进入保密字典页面" aria-hidden="true">#</a> 1.2.1 步骤 1：进入保密字典页面</h4><p>以 demo4project 用户登录 KubeSphere Web 控制台并进入项目，在左侧导航栏中选择配置下的保密字典，然后点击创建。</p><figure><img src="'+r+'" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><h4 id="_1-2-2-步骤-2-配置基本信息" tabindex="-1"><a class="header-anchor" href="#_1-2-2-步骤-2-配置基本信息" aria-hidden="true">#</a> 1.2.2 步骤 2：配置基本信息</h4><p>设置保密字典的名称（例如 dockerhub），然后点击下一步。</p><blockquote><p>您可以在对话框右上角启用编辑 YAML 来查看保密字典的 YAML 清单文件，并通过直接编辑清单文件来创建保密字典。您也可以继续执行后续步骤在控制台上创建保密字典。</p></blockquote><figure><img src="'+d+'" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><h4 id="_1-2-3-步骤-3-配置镜像仓库信息" tabindex="-1"><a class="header-anchor" href="#_1-2-3-步骤-3-配置镜像仓库信息" aria-hidden="true">#</a> 1.2.3 步骤 3：配置镜像仓库信息</h4><p>将类型设置为 镜像仓库信息。要在创建应用负载时使用私有仓库中的镜像，您需要配置以下字段：</p><p>仓库地址：镜像仓库的地址，其中包含创建应用负载时需要使用的镜像。 用户名：登录镜像仓库所需的用户名。 密码：登录镜像仓库所需的密码。 邮箱（可选）：您的邮箱地址。</p><figure><img src="'+k+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><h4 id="_1-2-3-1-添加-docker-hub-仓库" tabindex="-1"><a class="header-anchor" href="#_1-2-3-1-添加-docker-hub-仓库" aria-hidden="true">#</a> 1.2.3.1 添加 Docker Hub 仓库</h4><p>在 Docker Hub 上添加镜像仓库之前，您需要注册一个 Docker Hub 帐户。在保密字典设置页面，将仓库地址设置为 docker.io，将用户名和密码分别设置为您的 Docker ID 和密码，然后点击验证以检查地址是否可用。</p><p>点击创建。保密字典创建后会显示在保密字典界面。</p><h4 id="_1-2-3-2-添加-harbor-镜像仓库" tabindex="-1"><a class="header-anchor" href="#_1-2-3-2-添加-harbor-镜像仓库" aria-hidden="true">#</a> 1.2.3.2 添加 Harbor 镜像仓库</h4><p>Harbor 是一个开源的可信云原生仓库项目，用于对内容进行存储、签名和扫描。通过增加用户经常需要的功能，例如安全、身份验证和管理，Harbor 扩展了开源的 Docker Distribution。Harbor 使用 HTTP 和 HTTPS 为仓库请求提供服务。</p><h4 id="http" tabindex="-1"><a class="header-anchor" href="#http" aria-hidden="true">#</a> HTTP</h4><p>您需要修改集群中所有节点的 Docker 配置。例如，如果外部 Harbor 仓库的 IP 地址为 http://192.168.0.99，您需要在 /etc/systemd/system/docker.service.d/docker-options.conf 文件中增加 --insecure-registry=192.168.0.99 标签。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">&quot;DOCKER_OPTS=--registry-mirror=https://registry.docker-cn.com --insecure-registry=10.233.0.0/18 --data-root=/var/lib/docker --log-opt max-size=50m --log-opt max-file=5 \\
--insecure-registry=192.168.0.99&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>请将镜像仓库的地址替换成实际的地址。 有关 Environment 字段中的标签，请参阅 Dockerd Options。 Docker 守护进程需要 --insecure-registry 标签才能与不安全的仓库通信。有关该标签的更多信息，请参阅 Docker 官方文档。</p></blockquote><p>2、重新加载配置文件并重启 Docker。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">sudo</span> systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、在 KubeSphere 控制台上进入创建保密字典的数据设置页面，将类型设置为镜像仓库信息，将仓库地址设置为您的 Harbor IP 地址，并设置用户名和密码。</p><blockquote><p>如需使用 Harbor 域名而非 IP 地址，您需要在集群中配置 CoreDNS 和 nodelocaldns。 下一篇文章中会介绍，如何集成使用Harobr域名的镜像仓库</p></blockquote><p>4、点击创建。保密字典创建后会显示在保密字典页面。有关保密字典创建后如何编辑保密字典。</p><h4 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h4><p>有关如何集成基于 HTTPS 的 Harbor 仓库，请参阅 Harbor 官方文档。请确保您已使用 docker login 命令连接到您的 Harbor 仓库。</p><h4 id="_1-3-使用镜像仓库" tabindex="-1"><a class="header-anchor" href="#_1-3-使用镜像仓库" aria-hidden="true">#</a> 1.3 使用镜像仓库</h4><p>如果您已提前创建了私有镜像仓库的保密字典，您可以选择私有镜像仓库中的镜像。例如，创建部署时，您可以在添加容器页面点击镜像下拉列表选择一个仓库，然后输入镜像名称和标签使用镜像。</p><h4 id="_1-4-快速部署-harbor-v2-3-1-https-访问" tabindex="-1"><a class="header-anchor" href="#_1-4-快速部署-harbor-v2-3-1-https-访问" aria-hidden="true">#</a> 1.4 快速部署 Harbor v2.3.1 https 访问</h4>`,70),y={href:"https://shenhonglei.blog.csdn.net/article/details/124183802",target:"_blank",rel:"noopener noreferrer"},_=t(`<h2 id="五、流水线安装" tabindex="-1"><a class="header-anchor" href="#五、流水线安装" aria-hidden="true">#</a> 五、流水线安装</h2><h3 id="_1、流水线代码" tabindex="-1"><a class="header-anchor" href="#_1、流水线代码" aria-hidden="true">#</a> 1、流水线代码</h3><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>pipeline <span class="token punctuation">{</span>
    agent <span class="token punctuation">{</span>
        node <span class="token punctuation">{</span>
            label <span class="token string">&#39;mavenjdk21&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    environment <span class="token punctuation">{</span>
        <span class="token comment">// Harbor 凭证 ID(登录您的 Harbor)</span>
        DOCKER_CREDENTIAL_ID <span class="token operator">=</span> <span class="token string">&#39;harbor-id&#39;</span>
        <span class="token comment">// GitLab 凭证 ID (推送 tag 到 GitLab 仓库)</span>
        GITHUB_CREDENTIAL_ID <span class="token operator">=</span> <span class="token string">&#39;git&#39;</span>
        <span class="token comment">// Kubeconfig 凭证 ID (访问接入正在运行的 Kubernetes 集群)</span>
        KUBECONFIG_CREDENTIAL_ID <span class="token operator">=</span> <span class="token string">&#39;tg-kubeconfig&#39;</span>
        <span class="token comment">// 镜像的推送地址</span>
        HARBOR_REGISTRY <span class="token operator">=</span> <span class="token string">&#39;192.168.128.166:80&#39;</span>
        <span class="token comment">// Harbor 账号名</span>
        DOCKERHUB_NAMESPACE <span class="token operator">=</span> <span class="token string">&#39;robot$tg&#39;</span>
        <span class="token comment">//仓库名称</span>
        HARBOR_NAME <span class="token operator">=</span> <span class="token string">&#39;tgtestprod&#39;</span>
        <span class="token comment">//创建命名空间</span>
        KUBE_NAMESPACE <span class="token operator">=</span> <span class="token string">&#39;tg-test&#39;</span>
        <span class="token comment">//源码地址</span>
        GIT_URL <span class="token operator">=</span> <span class="token string">&#39;http://192.168.127.142/root/tg.git&#39;</span>
    <span class="token punctuation">}</span>

    parameters <span class="token punctuation">{</span>
        <span class="token comment">// 添加分支选择参数</span>
         <span class="token function">choice</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token string">&#39;BRANCH_NAME&#39;</span><span class="token punctuation">,</span> choices<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;develop&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;master&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> description<span class="token punctuation">:</span> <span class="token string">&#39;选择要构建的分支&#39;</span><span class="token punctuation">)</span>
          <span class="token comment">//string(name: &#39;TAG_NAME&#39;, defaultValue: &#39;&#39;, description: &#39;选择标签&#39;)</span>
    <span class="token punctuation">}</span>

    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;检出&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;maven&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">git</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">GIT_URL</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> credentialsId<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">GITHUB_CREDENTIAL_ID</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> branch<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">BRANCH_NAME</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> changelog<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> poll<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
                    sh <span class="token string">&#39;ls -l&#39;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;编译打包&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;maven&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    sh <span class="token string">&#39;mvn clean package -Dmaven.test.skip=true&#39;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;构建镜像&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            parallel <span class="token punctuation">{</span>
                <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;构建tg-test镜像&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    steps <span class="token punctuation">{</span>
                        <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;maven&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            sh <span class="token string">&#39;docker build -t yudao-server:latest -f yudao-server/Dockerfile yudao-server/&#39;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;推送镜像到仓库&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            parallel <span class="token punctuation">{</span>
                <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;推送tg-server镜像到harbor&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    steps <span class="token punctuation">{</span>
                        <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;maven&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token function">withCredentials</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">usernamePassword</span><span class="token punctuation">(</span>credentialsId<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">DOCKER_CREDENTIAL_ID</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> passwordVariable<span class="token punctuation">:</span> <span class="token string">&#39;HARBOR_PWD_VAR&#39;</span><span class="token punctuation">,</span> usernameVariable<span class="token punctuation">:</span> <span class="token string">&#39;HARBOR_USER_VAR&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                sh <span class="token string">&#39;echo &quot;$HARBOR_PWD_VAR&quot; | docker login -u $HARBOR_USER_VAR --password-stdin $HARBOR_REGISTRY&#39;</span>
                                sh <span class="token string">&#39;docker tag yudao-server:latest $HARBOR_REGISTRY/$HARBOR_NAME/tg-server:latest&#39;</span>
                                sh <span class="token string">&#39;docker push $HARBOR_REGISTRY/$HARBOR_NAME/tg-server:latest&#39;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;推送到K8S环境&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             steps <span class="token punctuation">{</span>
                   <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tg-kubeconfig&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                       <span class="token function">withCredentials</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">kubeconfigFile</span><span class="token punctuation">(</span>credentialsId<span class="token punctuation">:</span> env<span class="token punctuation">.</span>KUBECONFIG_CREDENTIAL_ID<span class="token punctuation">,</span> variable<span class="token punctuation">:</span> <span class="token string">&#39;KUBECONFIG&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                           <span class="token comment">// 确保 kubectl 命令在 PATH 中</span>
                           sh <span class="token interpolation-string"><span class="token string">&quot;export PATH=/usr/local/bin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">PATH</span></span><span class="token string">&quot;</span></span>
    
                           <span class="token comment">// 设置 kubectl 权限</span>
                           sh <span class="token string">&#39;chmod +x /usr/local/bin/kubectl&#39;</span>
    
                           <span class="token comment">// 检查 kubectl 是否可用</span>
                           sh <span class="token string">&#39;which kubectl&#39;</span>
    
                           <span class="token comment">// 替换占位符并将结果保存到临时文件</span>
                           sh <span class="token string">&#39;envsubst &lt; script/devops/deploy/deploy.yml | kubectl apply -f -&#39;</span>
                       <span class="token punctuation">}</span>
                   <span class="token punctuation">}</span>
             <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    post <span class="token punctuation">{</span>
        always <span class="token punctuation">{</span>
            <span class="token function">cleanWs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        success <span class="token punctuation">{</span>
            echo <span class="token string">&#39;Pipeline completed successfully&#39;</span>
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            echo <span class="token string">&#39;Pipeline failed&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function x(q,R){const a=p("ExternalLinkIcon");return l(),c("div",null,[m,n("h2",b,[h,s(" 一、安装"),n("a",g,[s("kubekey"),e(a)])]),f,n("p",null,[n("a",y,[s("https 访问-快速部署 Harbor v2.3.1"),e(a)])]),_])}const H=i(v,[["render",x],["__file","3.html.vue"]]);export{H as default};
