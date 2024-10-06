<template><div><h1 id="项目实现jenkins-k8s部署" tabindex="-1"><a class="header-anchor" href="#项目实现jenkins-k8s部署" aria-hidden="true">#</a> 项目实现jenkins+K8S部署</h1>
<h2 id="一、安装kubekey" tabindex="-1"><a class="header-anchor" href="#一、安装kubekey" aria-hidden="true">#</a> 一、安装<a href="https://github.com/kubesphere/kubekey" target="_blank" rel="noopener noreferrer">kubekey<ExternalLinkIcon/></a></h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxf</span> kubekey-v3.1.2-linux-amd64.tar.gz
<span class="token comment">#将解压出来的KK放到/usr/bin</span>
<span class="token function">mv</span> kk /usr/bin
<span class="token comment">#安装时间同步</span>
<span class="token function">apt</span> <span class="token function">install</span> ntpdate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、安装k8s和kubesphere" tabindex="-1"><a class="header-anchor" href="#二、安装k8s和kubesphere" aria-hidden="true">#</a> 二、安装k8s和kubesphere</h2>
<h3 id="_1、单集群" tabindex="-1"><a class="header-anchor" href="#_1、单集群" aria-hidden="true">#</a> 1、单集群</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#这是单个集群安装的</span>
kk create cluster --with-kubernetes v1.26 --container-manager containerd --with-kubesphere v3.4.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：版本大于1.18一定要安装：apt install socat和apt install conntrack  所有节点都安装,同时在所有节点上都运行：export KKZONE=cn</p>
</blockquote>
<h3 id="_1-1、关闭swap分区" tabindex="-1"><a class="header-anchor" href="#_1-1、关闭swap分区" aria-hidden="true">#</a> 1.1、关闭swap分区</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>swapoff <span class="token parameter variable">-a</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">'s/.*swap.*/#&amp;/'</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、多集群" tabindex="-1"><a class="header-anchor" href="#_2、多集群" aria-hidden="true">#</a> 2、多集群</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#下载配置文件</span>
./kk create config --with-kubesphere <span class="token punctuation">[</span>version<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1、配置文件-config-sample-yaml" tabindex="-1"><a class="header-anchor" href="#_2-1、配置文件-config-sample-yaml" aria-hidden="true">#</a> 2.1、配置文件:config-sample.yaml</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kubekey.kubesphere.io/v1alpha2
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Cluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> sample
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">name</span><span class="token punctuation">:</span> master<span class="token punctuation">,</span> <span class="token key atrule">address</span><span class="token punctuation">:</span> 192.168.200.235<span class="token punctuation">,</span> <span class="token key atrule">internalAddress</span><span class="token punctuation">:</span> 192.168.200.235<span class="token punctuation">,</span> <span class="token key atrule">user</span><span class="token punctuation">:</span> root<span class="token punctuation">,</span> <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">"62352744aa??aa"</span><span class="token punctuation">}</span>
  <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">name</span><span class="token punctuation">:</span> node01<span class="token punctuation">,</span> <span class="token key atrule">address</span><span class="token punctuation">:</span> 192.168.200.236<span class="token punctuation">,</span> <span class="token key atrule">internalAddress</span><span class="token punctuation">:</span> 192.168.200.236<span class="token punctuation">,</span> <span class="token key atrule">user</span><span class="token punctuation">:</span> root<span class="token punctuation">,</span> <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">"62352744aa??aa"</span><span class="token punctuation">}</span>
  <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">name</span><span class="token punctuation">:</span> node02<span class="token punctuation">,</span> <span class="token key atrule">address</span><span class="token punctuation">:</span> 192.168.200.237<span class="token punctuation">,</span> <span class="token key atrule">internalAddress</span><span class="token punctuation">:</span> 192.168.200.237<span class="token punctuation">,</span> <span class="token key atrule">user</span><span class="token punctuation">:</span> root<span class="token punctuation">,</span> <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">"62352744aa??aa"</span><span class="token punctuation">}</span>
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
    <span class="token key atrule">address</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6443</span>
  <span class="token key atrule">kubernetes</span><span class="token punctuation">:</span>
    <span class="token key atrule">version</span><span class="token punctuation">:</span> v1.30.0
    <span class="token key atrule">clusterName</span><span class="token punctuation">:</span> cluster.local
    <span class="token key atrule">autoRenewCerts</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">containerManager</span><span class="token punctuation">:</span> docker
  <span class="token key atrule">containerRuntime</span><span class="token punctuation">:</span>
    <span class="token key atrule">docker</span><span class="token punctuation">:</span>
      <span class="token key atrule">version</span><span class="token punctuation">:</span> 26.1.4
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
    <span class="token key atrule">privateRegistry</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">namespaceOverride</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">registryMirrors</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">insecureRegistries</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">addons</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
      <span class="token key atrule">sources</span><span class="token punctuation">:</span>
        <span class="token key atrule">chart</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
          <span class="token key atrule">repo</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//charts.kubesphere.io/main
          <span class="token key atrule">valuesFile</span><span class="token punctuation">:</span> /root/values.yaml

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2、执行安装命令" tabindex="-1"><a class="header-anchor" href="#_2-2、执行安装命令" aria-hidden="true">#</a> 2.2、执行安装命令：</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>./kk create cluster <span class="token parameter variable">-f</span> config-sample.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3、控制节点配置" tabindex="-1"><a class="header-anchor" href="#_2-3、控制节点配置" aria-hidden="true">#</a> 2.3、控制节点配置：</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
Your Kubernetes control-plane has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:

  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
  <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
  <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

Alternatively, <span class="token keyword">if</span> you are the root user, you can run:

  <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run <span class="token string">"kubectl apply -f [podnetwork].yaml"</span> with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now <span class="token function">join</span> any number of control-plane nodes by copying certificate authorities
and <span class="token function">service</span> account keys on each <span class="token function">node</span> and <span class="token keyword">then</span> running the following as root:

  kubeadm <span class="token function">join</span> lb.kubesphere.local:6443 <span class="token parameter variable">--token</span> 3ph0wq.hq47dw7m73a1mr6q <span class="token punctuation">\</span>
        --discovery-token-ca-cert-hash sha256:1da916bb93cec463d1aa2de71da9ca6e984df8f74517e59ff4fa9b1a9407ab6c <span class="token punctuation">\</span>
        --control-plane

Then you can <span class="token function">join</span> any number of worker nodes by running the following on each as root:

kubeadm <span class="token function">join</span> lb.kubesphere.local:6443 <span class="token parameter variable">--token</span> 3ph0wq.hq47dw7m73a1mr6q <span class="token punctuation">\</span>
        --discovery-token-ca-cert-hash sha256:1da916bb93cec463d1aa2de71da9ca6e984df8f74517e59ff4fa9b1a9407ab6c

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4、安装成功日志" tabindex="-1"><a class="header-anchor" href="#_2-4、安装成功日志" aria-hidden="true">#</a> 2.4、安装成功日志</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>namespace/kubesphere-system unchanged
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

Console: http://192.168.200.239:30880
Account: admin
Password: P@88w0rd 修改为：TG62352744aa??aa
NOTES：
  <span class="token number">1</span>. After you log into the console, please check the
     monitoring status of <span class="token function">service</span> components <span class="token keyword">in</span>
     <span class="token string">"Cluster Management"</span><span class="token builtin class-name">.</span> If any <span class="token function">service</span> is not
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

        kubectl logs <span class="token parameter variable">-n</span> kubesphere-system <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-n</span> kubesphere-system <span class="token parameter variable">-l</span> <span class="token string">'app in (ks-install, ks-installer)'</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">'{.items[0].metadata.name}'</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、pod操作" tabindex="-1"><a class="header-anchor" href="#_3、pod操作" aria-hidden="true">#</a> 3、pod操作</h2>
<h3 id="_3-1、强制删除pod" tabindex="-1"><a class="header-anchor" href="#_3-1、强制删除pod" aria-hidden="true">#</a> 3.1、强制删除pod</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl delete pod ks-apiserver-6485fd9665-vn52k  <span class="token parameter variable">-n</span> kubesphere-system --grace-period<span class="token operator">=</span><span class="token number">0</span> <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-2、查看所有pod" tabindex="-1"><a class="header-anchor" href="#_3-2、查看所有pod" aria-hidden="true">#</a> 3.2、查看所有pod</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get pods --all-namespaces
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-3、创建-nfs-provisioner-配置文件" tabindex="-1"><a class="header-anchor" href="#_3-3、创建-nfs-provisioner-配置文件" aria-hidden="true">#</a> 3.3、创建 NFS Provisioner 配置文件</h4>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">nfs</span><span class="token punctuation">:</span>
  <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.1.238  <span class="token comment"># 你的NFS服务器地址</span>
  <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/nfs  <span class="token comment"># NFS服务器上导出的路径</span>

<span class="token key atrule">storageClass</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client
  <span class="token key atrule">defaultClass</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  <span class="token comment"># 将NFS设为默认的StorageClass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、流水线安装" tabindex="-1"><a class="header-anchor" href="#三、流水线安装" aria-hidden="true">#</a> 三、流水线安装</h2>
<h3 id="_1、自动化部署-后端部署" tabindex="-1"><a class="header-anchor" href="#_1、自动化部署-后端部署" aria-hidden="true">#</a> 1、自动化部署(后端部署)</h3>
<h3 id="_1-1、流水线代码" tabindex="-1"><a class="header-anchor" href="#_1-1、流水线代码" aria-hidden="true">#</a> 1.1、流水线代码</h3>
<div class="language-groovy line-numbers-mode" data-ext="groovy"><pre v-pre class="language-groovy"><code>pipeline <span class="token punctuation">{</span>
    agent any

    environment <span class="token punctuation">{</span>
        harborUser <span class="token operator">=</span> <span class="token string">'admin'</span>
        harborPasswd <span class="token operator">=</span> <span class="token string">'TG62352744aa??aa'</span>
        harborAddress <span class="token operator">=</span> <span class="token string">'192.168.200.239:30002'</span>
        harborRepo <span class="token operator">=</span> <span class="token string">'tgprod'</span>
        kubeNamespace <span class="token operator">=</span> <span class="token string">'tgpord'</span>
        chartName <span class="token operator">=</span> <span class="token string">'tg-server'</span>
    <span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'检出'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                checkout <span class="token function">scmGit</span><span class="token punctuation">(</span>branches<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>name<span class="token punctuation">:</span> <span class="token string">'${tag}'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> extensions<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> userRemoteConfigs<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>credentialsId<span class="token punctuation">:</span> <span class="token string">'5e3afd73-6581-4e14-8bd4-f17e3f353270'</span><span class="token punctuation">,</span> url<span class="token punctuation">:</span> <span class="token string">'http://192.168.200.232/root/tg.git'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'项目构建'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'/var/jenkins_home/maven-3.9.9/bin/mvn clean package -Dmaven.test.skip=true'</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'SonarQube代码质量分析'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'/var/jenkins_home/sonar-scanner/bin/sonar-scanner  -Dsonar.source=./  -Dsonar.projectname=${JOB_NAME}  -Dsonar.projectKey=${JOB_NAME}  -Dsonar.java.binaries=/var/jenkins_home/workspace/tg-k8s/yudao-server/target  -Dsonar.login=8ee03618a249aa7c14ab664cf85f0e7627256306'</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'docker镜像构建'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''mv /var/jenkins_home/workspace/tg-k8s/yudao-server/target/*.jar ./yudao-server/
                         docker build -t tg-server:${tag} /var/jenkins_home/workspace/tg-k8s/yudao-server'''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'推送镜像至镜像仓库'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''docker login -u ${harborUser} -p ${harborPasswd} ${harborAddress}
                      docker tag tg-server:${tag} ${harborAddress}/${harborRepo}/tg-server:${tag}
                      docker push ${harborAddress}/${harborRepo}/tg-server:${tag}'''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'打包helm chart'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''cd /var/jenkins_home/workspace/tg-k8s/script/k8s/tg-server
                         helm package . --version ${chartTag} --app-version ${tag}'''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'通知k8s集群部署'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    sh <span class="token string">'''
                    helm upgrade --install tg-server /var/jenkins_home/workspace/tg-k8s/script/k8s/tg-server/tg-server-${chartTag}.tgz \
                        --set image.repository=${harborAddress}/${harborRepo}/tg-server \
                        --set image.tag=${tag} \
                        --namespace ${kubeNamespace} \
                        --values /var/jenkins_home/workspace/tg-k8s/script/k8s/tg-server/values.yaml
                    '''</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    post <span class="token punctuation">{</span>
        success <span class="token punctuation">{</span>
            <span class="token function">dingtalk</span><span class="token punctuation">(</span>
                    robot<span class="token punctuation">:</span> <span class="token string">'tg-k8s'</span><span class="token punctuation">,</span>
                    type<span class="token punctuation">:</span> <span class="token string">'MARKDOWN'</span><span class="token punctuation">,</span>
                    title<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">"success: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span>
                    text<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">"- 成功构建:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">项目!\n- 版本:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">tag</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n- 持续时间:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">currentBuild<span class="token punctuation">.</span>durationString</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n- 任务:#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">]</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            <span class="token function">dingtalk</span><span class="token punctuation">(</span>
                    robot<span class="token punctuation">:</span> <span class="token string">'tg-k8s'</span><span class="token punctuation">,</span>
                    type<span class="token punctuation">:</span> <span class="token string">'MARKDOWN'</span><span class="token punctuation">,</span>
                    title<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">"fail: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span>
                    text<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">"- 失败构建:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">项目!\n- 版本:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">tag</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n- 持续时间:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">currentBuild<span class="token punctuation">.</span>durationString</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n- 任务:#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">]</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2、后端采用helm部署-部署的chart代码如下" tabindex="-1"><a class="header-anchor" href="#_1-2、后端采用helm部署-部署的chart代码如下" aria-hidden="true">#</a> 1.2、后端采用helm部署，部署的chart代码如下：</h3>
<p>Chart.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v2

<span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>server

<span class="token key atrule">description</span><span class="token punctuation">:</span> A Helm chart for Kubernetes

<span class="token key atrule">type</span><span class="token punctuation">:</span> application

<span class="token key atrule">version</span><span class="token punctuation">:</span> 0.1.0 <span class="token comment">#chart版本</span>

<span class="token key atrule">appVersion</span><span class="token punctuation">:</span> <span class="token string">"1.0.0"</span> <span class="token comment">#应用版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>values.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">replicaCount</span><span class="token punctuation">:</span> <span class="token number">3</span>  <span class="token comment"># 副本数量，决定了有多少个 Pod 会同时运行该应用</span>

<span class="token key atrule">image</span><span class="token punctuation">:</span>
  <span class="token key atrule">repository</span><span class="token punctuation">:</span> 192.168.200.239<span class="token punctuation">:</span>30002/tgtestprod/tg<span class="token punctuation">-</span>server  <span class="token comment"># 镜像仓库地址，指定从哪里拉取镜像</span>
  <span class="token key atrule">pullPolicy</span><span class="token punctuation">:</span> Always  <span class="token comment"># 镜像拉取策略，`Always` 表示每次都会尝试拉取镜像</span>
  <span class="token key atrule">tag</span><span class="token punctuation">:</span> <span class="token string">"latest"</span>  <span class="token comment"># 镜像的标签，默认是 `latest`，可以在部署时通过 --set 覆盖</span>

<span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP  <span class="token comment"># 服务类型，`ClusterIP` 表示仅集群内部可以访问该服务</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">48080</span>  <span class="token comment"># 服务的端口，应用将通过此端口暴露</span>

<span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token key atrule">limits</span><span class="token punctuation">:</span>
    <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 2000m  <span class="token comment"># CPU 限制，最大可用 2 核 CPU</span>
    <span class="token key atrule">memory</span><span class="token punctuation">:</span> 2048Mi  <span class="token comment"># 内存限制，最大可使用 2048Mi 的内存</span>

<span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>  <span class="token comment"># 存活探针，用于检测应用是否存活</span>
  <span class="token key atrule">path</span><span class="token punctuation">:</span> /actuator/health  <span class="token comment"># 探测路径，通过该路径检测应用是否存活</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">48080</span>  <span class="token comment"># 探测的端口</span>
  <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">60</span>  <span class="token comment"># 初始延迟 60 秒后开始探测，避免启动时探测失败</span>
  <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span>  <span class="token comment"># 探测超时时间，1 秒</span>
  <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>  <span class="token comment"># 每 30 秒探测一次</span>
  <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>  <span class="token comment"># 成功探测的次数</span>
  <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>  <span class="token comment"># 失败探测超过 3 次后，认为 Pod 已不可用并重启</span>

<span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>  <span class="token comment"># 就绪探针，用于检测应用是否准备好接收流量</span>
  <span class="token key atrule">path</span><span class="token punctuation">:</span> /actuator/health  <span class="token comment"># 探测路径，通过该路径检测应用是否准备好</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">48080</span>  <span class="token comment"># 探测的端口</span>
  <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">60</span>  <span class="token comment"># 初始延迟 60 秒后开始探测，确保应用完全启动</span>
  <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span>  <span class="token comment"># 探测超时时间，1 秒</span>
  <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">60</span>  <span class="token comment"># 每 60 秒探测一次</span>
  <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>  <span class="token comment"># 成功探测的次数</span>
  <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>  <span class="token comment"># 失败探测超过 3 次后，认为 Pod 暂时不可用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deployment.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1  <span class="token comment"># 定义API版本，指定使用apps/v1，适用于Deployment资源</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment  <span class="token comment"># 指定资源类型为Deployment</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># Deployment的名称，使用Chart的名称</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>  <span class="token comment"># 定义标签</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 应用程序的标签，便于选择和管理</span>

<span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment"># 定义Deployment的规格</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.replicaCount <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 指定要运行的Pod副本数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>  <span class="token comment"># 用于选择管理的Pods的标签选择器</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 匹配标签，以识别该Deployment所管理的Pods</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>  <span class="token comment"># 更新策略</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate  <span class="token comment"># 指定滚动更新的策略</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>  <span class="token comment"># 定义滚动更新的参数</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> 50%  <span class="token comment"># 允许超出期望副本数的最大数量（可以同时启动的额外副本数量）</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> 50%  <span class="token comment"># 允许不可用的副本数（可以同时关闭的副本数量）</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>  <span class="token comment"># 定义Pod模板</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># Pod的标签，与Deployment中的选择器匹配</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>  <span class="token comment"># Pod的规格</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>  <span class="token comment"># 定义容器</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> app  <span class="token comment"># 容器名称</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"{{ .Values.image.repository }}:{{ .Values.image.tag }}"</span>  <span class="token comment"># 容器镜像，使用Values中的repository和tag</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.image.pullPolicy <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 镜像拉取策略，从Values中获取</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>  <span class="token comment"># 容器暴露的端口</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.port <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 容器端口，使用Values中的port</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP  <span class="token comment"># 使用的协议</span>
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>  <span class="token comment"># 资源限制</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>  <span class="token comment"># 定义资源限制</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.resources.limits.cpu <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># CPU限制</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.resources.limits.memory <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 内存限制</span>
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>  <span class="token comment"># 存活探针</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>  <span class="token comment"># 使用HTTP GET请求检查存活状态</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.livenessProbe.path <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 检查的路径</span>
              <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.livenessProbe.port <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 检查的端口</span>
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.livenessProbe.initialDelaySeconds <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 初始延迟秒数</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.livenessProbe.timeoutSeconds <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 超时时间（秒）</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.livenessProbe.periodSeconds <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 检查频率（秒）</span>
            <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.livenessProbe.successThreshold <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 成功阈值</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.livenessProbe.failureThreshold <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 失败阈值</span>
          <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>  <span class="token comment"># 就绪探针</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>  <span class="token comment"># 使用HTTP GET请求检查就绪状态</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.readinessProbe.path <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 检查的路径</span>
              <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.readinessProbe.port <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 检查的端口</span>
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.readinessProbe.initialDelaySeconds <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 初始延迟秒数</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.readinessProbe.timeoutSeconds <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 超时时间（秒）</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.readinessProbe.periodSeconds <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 检查频率（秒）</span>
            <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.readinessProbe.successThreshold <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 成功阈值</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.readinessProbe.failureThreshold <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 失败阈值</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>service.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.type <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.port <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.port <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、自动化部署-前端" tabindex="-1"><a class="header-anchor" href="#_2、自动化部署-前端" aria-hidden="true">#</a> 2、自动化部署(前端)</h3>
<p>Chart.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v2
<span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>web
<span class="token key atrule">description</span><span class="token punctuation">:</span> A Helm chart for Kubernetes

<span class="token key atrule">type</span><span class="token punctuation">:</span> application

<span class="token key atrule">version</span><span class="token punctuation">:</span> 0.1.0

<span class="token key atrule">appVersion</span><span class="token punctuation">:</span> <span class="token string">"1.16.0"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>values.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># 副本数量，即部署多少个 Pod 实例</span>
<span class="token key atrule">replicaCount</span><span class="token punctuation">:</span> <span class="token number">3</span>

<span class="token comment"># 镜像的配置信息，包括仓库地址、版本标签和拉取策略</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span>
  <span class="token comment"># 镜像仓库地址</span>
  <span class="token key atrule">repository</span><span class="token punctuation">:</span> 192.168.200.239<span class="token punctuation">:</span>30002/tgweb/tg<span class="token punctuation">-</span>web
  <span class="token comment"># 镜像标签，这里可以传入变量进行替换</span>
  <span class="token key atrule">tag</span><span class="token punctuation">:</span> <span class="token string">"latest"</span>
  <span class="token comment"># 镜像拉取策略，可以是 Always、IfNotPresent 或 Never</span>
  <span class="token key atrule">pullPolicy</span><span class="token punctuation">:</span> Always

<span class="token comment"># 服务的配置</span>
<span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token comment"># 服务类型，ClusterIP 表示只能集群内部访问</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token comment"># 服务的端口号</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token comment"># Ingress 的配置，用于外部访问服务</span>
<span class="token key atrule">ingress</span><span class="token punctuation">:</span>
  <span class="token comment"># 是否启用 Ingress</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token comment"># 域名，替换为你自己的域名</span>
  <span class="token key atrule">hostname</span><span class="token punctuation">:</span> tmes.dingshenggroup.com
  <span class="token comment"># 路径，根路径 "/"</span>
  <span class="token key atrule">path</span><span class="token punctuation">:</span> /
  <span class="token comment"># 是否启用 TLS 加密</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 使用的 TLS 证书的名称，需要提前在 Kubernetes 中创建该 Secret</span>
    <span class="token key atrule">secretName</span><span class="token punctuation">:</span> tmes<span class="token punctuation">-</span>dingshenggroup<span class="token punctuation">-</span>tls

<span class="token comment"># 部署的命名空间</span>
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token string">"tgpord"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deployment.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1  <span class="token comment"># 定义 API 版本</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment  <span class="token comment"># 资源类型是 Deployment</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 用于标识 Deployment 资源的标签</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># Deployment 的名称</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.namespace <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 使用的命名空间</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.replicaCount <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># Pod 副本数量，使用 values.yaml 中的配置</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 用于选择与 Deployment 关联的 Pod</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 为 Pod 设置标签，方便服务与 Pod 关联</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> host<span class="token punctuation">-</span>time  <span class="token comment"># 挂载主机的时间</span>
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /etc/localtime  <span class="token comment"># 确保容器内时间同步</span>
      <span class="token key atrule">imagePullSecrets</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> harbor  <span class="token comment"># 镜像拉取的秘钥</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> app
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"{{ .Values.image.repository }}:{{ .Values.image.tag }}"</span>  <span class="token comment"># 镜像地址和标签</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.image.pullPolicy <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 镜像拉取策略</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.port <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 容器的端口配置</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP  <span class="token comment"># 协议类型</span>
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 2000m  <span class="token comment"># 限制 CPU 使用为 2 个核心</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1024Mi  <span class="token comment"># 限制内存使用为 1 GB</span>
          <span class="token key atrule">terminationMessagePath</span><span class="token punctuation">:</span> /dev/termination<span class="token punctuation">-</span>log  <span class="token comment"># 定义容器的终止消息路径</span>
          <span class="token key atrule">terminationMessagePolicy</span><span class="token punctuation">:</span> File  <span class="token comment"># 终止消息的处理策略</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ingress.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1  <span class="token comment"># 定义 Kubernetes Ingress 资源所使用的 API 版本</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress  <span class="token comment"># 声明这是一个 Ingress 资源，用于控制外部请求到 Kubernetes 服务的流量</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 定义 Ingress 资源的名称，通常与 Helm Chart 名称一致</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.namespace <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># Ingress 所在的命名空间，使用 values.yaml 中的值</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">traefik.ingress.kubernetes.io/router.entrypoints</span><span class="token punctuation">:</span> websecure  <span class="token comment"># Traefik 的入口点配置，用于启用 HTTPS</span>
    <span class="token key atrule">traefik.ingress.kubernetes.io/router.middlewares</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>rewrite@kubernetescrd  <span class="token comment"># 需要配置一个中间件用于 URL 重写规则</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.ingress.hostname <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 定义外部访问的域名，来源于 values.yaml 中的配置</span>
      <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /admin<span class="token punctuation">-</span>api(/<span class="token punctuation">|</span>$)(.<span class="token important">*)</span>  <span class="token comment"># 匹配 /admin-api 路径以及其后的子路径</span>
            <span class="token key atrule">pathType</span><span class="token punctuation">:</span> ImplementationSpecific  <span class="token comment"># 使用 ImplementationSpecific 类型，支持灵活的路径匹配</span>
            <span class="token key atrule">backend</span><span class="token punctuation">:</span>
              <span class="token key atrule">service</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>server  <span class="token comment"># 后端 Service 的名称，这里是 tg-server 服务</span>
                <span class="token key atrule">port</span><span class="token punctuation">:</span>
                  <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">48080</span>  <span class="token comment"># 指定后端服务暴露的端口为 48080</span>

          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /app<span class="token punctuation">-</span>api(/<span class="token punctuation">|</span>$)(.<span class="token important">*)</span>  <span class="token comment"># 匹配 /app-api 路径以及其后的子路径</span>
            <span class="token key atrule">pathType</span><span class="token punctuation">:</span> ImplementationSpecific  <span class="token comment"># 使用 ImplementationSpecific 类型，支持灵活的路径匹配</span>
            <span class="token key atrule">backend</span><span class="token punctuation">:</span>
              <span class="token key atrule">service</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>server  <span class="token comment"># 同样指向后端的 tg-server 服务</span>
                <span class="token key atrule">port</span><span class="token punctuation">:</span>
                  <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">48080</span>  <span class="token comment"># 使用后端服务的 48080 端口</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if .Values.ingress.tls.enabled <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 如果启用了 TLS，加密配置</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.ingress.hostname <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 使用 values.yaml 中的域名</span>
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.ingress.tls.secretName <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 使用定义的 TLS Secret 名称</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>service.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  <span class="token comment"># 定义 API 版本</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service  <span class="token comment"># 资源类型是 Service</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>.Chart.Name<span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 设置与后端服务相关的标签</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>.Chart.Name<span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># Service 的名称，使用后端服务名称</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.namespace <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 所在的命名空间</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http  <span class="token comment"># 端口的名称</span>
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.port <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 暴露的服务端口号（如果 values.yaml 中为48080则可以用 {{ .Values.service.port }} ）</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP  <span class="token comment"># 使用的协议</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>  <span class="token comment"># 容器内部的目标端口（通常和 port 一致）</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>.Chart.Name<span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 选择与 Service 关联的 Pod，通过标签 app: tg-server 进行匹配</span>
  <span class="token key atrule">sessionAffinity</span><span class="token punctuation">:</span> None  <span class="token comment"># 服务的会话亲和性配置，设置为 None 表示不需要会话亲和性</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP  <span class="token comment"># 服务类型，使用 values.yaml 中的配置，如果要确保 Service 类型可以写为 {{ .Values.service.type }}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>traefik-middleware.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Middleware
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>rewrite  <span class="token comment"># 中间件的名称</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.namespace <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># 命名空间</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app.kubernetes.io/managed-by</span><span class="token punctuation">:</span> Helm  <span class="token comment"># 表示该资源由 Helm 管理</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">meta.helm.sh/release-name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>web  <span class="token comment"># Helm 发布名称</span>
    <span class="token key atrule">meta.helm.sh/release-namespace</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.namespace <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment"># Helm 发布的命名空间</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">redirectRegex</span><span class="token punctuation">:</span>
    <span class="token key atrule">regex</span><span class="token punctuation">:</span> <span class="token string">"^/admin-api(/|$)(.*)"</span>  <span class="token comment"># 匹配正则表达式</span>
    <span class="token key atrule">replacement</span><span class="token punctuation">:</span> <span class="token string">"/$2"</span>  <span class="token comment"># 重写后的路径</span>
    <span class="token key atrule">permanent</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Dockerfile</p>
<div class="language-docker line-numbers-mode" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token comment">#拉取nginx镜像</span>
<span class="token instruction"><span class="token keyword">FROM</span> 	nginx:latest</span>
<span class="token comment">#文件维护者</span>
<span class="token instruction"><span class="token keyword">LABEL</span> authors=<span class="token string">"wangbinggui"</span></span>

<span class="token comment"># 删除容器内的 nginx.conf 文件</span>
<span class="token instruction"><span class="token keyword">RUN</span> rm /etc/nginx/nginx.conf</span>

<span class="token comment"># 将本地的 nginx.conf 文件复制到容器中</span>
<span class="token instruction"><span class="token keyword">COPY</span> nginx.conf /etc/nginx/nginx.conf</span>

<span class="token comment">#将构建好的项目文件复制到nginx目录下</span>
<span class="token instruction"><span class="token keyword">COPY</span> dist-prod /usr/share/nginx/html/</span>

<span class="token comment">#将nginx本地文件替换镜像里面的配置文件</span>
<span class="token instruction"><span class="token keyword">COPY</span> tg-pro.conf  /etc/nginx/conf.d/</span>

<span class="token comment"># 运行 nginx，使用前台模式，不要使用守护进程模式</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"nginx"</span>, <span class="token string">"-g"</span>, <span class="token string">"daemon off;"</span>]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1、流水线代码" tabindex="-1"><a class="header-anchor" href="#_2-1、流水线代码" aria-hidden="true">#</a> 2.1、流水线代码</h3>
<div class="language-groovy line-numbers-mode" data-ext="groovy"><pre v-pre class="language-groovy"><code><span class="token shebang comment">#!groovy</span>
pipeline <span class="token punctuation">{</span>
    agent any
    tools <span class="token punctuation">{</span> nodejs <span class="token interpolation-string"><span class="token string">"node-v20.17.0"</span></span> <span class="token punctuation">}</span>

    environment <span class="token punctuation">{</span>
        APP_NAME <span class="token operator">=</span> <span class="token string">'yudao-admin'</span>
        PROJECT_DIR <span class="token operator">=</span> <span class="token string">'/var/jenkins_home/workspace/tgweb-k8s/yudao-ui/yudao-ui-admin-vue3'</span>
        NGINX_WORKDIR <span class="token operator">=</span> <span class="token string">'/home/mes/nginx/html'</span>
        <span class="token comment">//声明全局变量，方便后使用</span>
        harborUser <span class="token operator">=</span> <span class="token string">'admin'</span>
        harborPasswd <span class="token operator">=</span> <span class="token string">'TG6'</span>
        harborAddress <span class="token operator">=</span> <span class="token string">'192.168.200.239:30002'</span>
        harborRepo <span class="token operator">=</span> <span class="token string">'tgweb'</span>
        environment <span class="token operator">=</span> <span class="token string">'prod'</span>
        kubeNamespace <span class="token operator">=</span> <span class="token string">'tgpord'</span>
    <span class="token punctuation">}</span>

    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'启用pnpm'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''
                corepack enable pnpm
            '''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'设置淘宝镜像'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''
                pnpm config set registry https://registry.npmmirror.com'''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'检出'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                checkout <span class="token function">scmGit</span><span class="token punctuation">(</span>branches<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>name<span class="token punctuation">:</span> <span class="token string">'${tag}'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> extensions<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> userRemoteConfigs<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>credentialsId<span class="token punctuation">:</span> <span class="token string">'5e3afd73-6581-4e14-8bd4-f17e3f353270'</span><span class="token punctuation">,</span> url<span class="token punctuation">:</span> <span class="token string">'http://192.168.200.232/root/tg.git'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'构建'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'pnpm  --prefix '</span> <span class="token operator">+</span> <span class="token interpolation-string"><span class="token string">"</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">env<span class="token punctuation">.</span>PROJECT_DIR</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span> <span class="token operator">+</span> <span class="token string">' install'</span>
                sh <span class="token string">'pnpm  --prefix '</span> <span class="token operator">+</span> <span class="token interpolation-string"><span class="token string">"</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">env<span class="token punctuation">.</span>PROJECT_DIR</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span> <span class="token operator">+</span> <span class="token string">' run build:prod'</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'通过docker制作自定义镜像'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''rm -rf /var/jenkins_home/workspace/tgweb-k8s/yudao-ui/yudao-ui-admin-vue3/k8s/dist-prod
                     mv /var/jenkins_home/workspace/tgweb-k8s/yudao-ui/yudao-ui-admin-vue3/dist-prod  /var/jenkins_home/workspace/tgweb-k8s/yudao-ui/yudao-ui-admin-vue3/k8s/
                     docker build -t  dist-prod:${tag} /var/jenkins_home/workspace/tgweb-k8s/yudao-ui/yudao-ui-admin-vue3/k8s'''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'将自定义镜像推送到Harbor仓库'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''docker login -u ${harborUser} -p ${harborPasswd} ${harborAddress}
                   docker tag dist-prod:${tag} 192.168.200.239:30002/tgweb/tg-web:${tag}
                   docker push ${harborAddress}/${harborRepo}/tg-web:${tag}'''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'打包helm chart'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''cd /var/jenkins_home/workspace/tgweb-k8s/yudao-ui/yudao-ui-admin-vue3/k8s/tg-web
                         helm package . --version ${chartTag} --app-version ${tag}'''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">'通知目标服务器拉取并且部署容器'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                sh <span class="token string">'''
                    helm upgrade --install tg-web /var/jenkins_home/workspace/tgweb-k8s/yudao-ui/yudao-ui-admin-vue3/k8s/tg-web/tg-web-${chartTag}.tgz \
                        --set image.repository=${harborAddress}/${harborRepo}/tg-web \
                        --set image.tag=${tag} \
                        --set env.value=${environment} \
                        --namespace ${kubeNamespace} \
                        --values /var/jenkins_home/workspace/tgweb-k8s/yudao-ui/yudao-ui-admin-vue3/k8s/tg-web/values.yaml
                    '''</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    post <span class="token punctuation">{</span>
        success <span class="token punctuation">{</span>
            <span class="token function">dingtalk</span><span class="token punctuation">(</span>
                    robot<span class="token punctuation">:</span> <span class="token string">'tg-prod-web'</span><span class="token punctuation">,</span>
                    type<span class="token punctuation">:</span> <span class="token string">'MARKDOWN'</span><span class="token punctuation">,</span>
                    title<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">"success: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span>
                    text<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">"- 成功构建:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">项目!\n- 版本:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">tag</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n- 持续时间:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">currentBuild<span class="token punctuation">.</span>durationString</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n- 任务:#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">]</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            <span class="token function">dingtalk</span><span class="token punctuation">(</span>
                    robot<span class="token punctuation">:</span> <span class="token string">'tg-prod-web'</span><span class="token punctuation">,</span>
                    type<span class="token punctuation">:</span> <span class="token string">'MARKDOWN'</span><span class="token punctuation">,</span>
                    title<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">"fail: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span>
                    text<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">"- 失败构建:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">项目!\n- 版本:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">tag</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n- 持续时间:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">currentBuild<span class="token punctuation">.</span>durationString</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n- 任务:#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">JOB_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">]</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2、在-kubernetes-中部署-traefik-ingress-controller-可以通过-helm-或使用-kubernetes-清单文件来完成。以下是使用-helm-安装-traefik-的详细步骤" tabindex="-1"><a class="header-anchor" href="#_2-2、在-kubernetes-中部署-traefik-ingress-controller-可以通过-helm-或使用-kubernetes-清单文件来完成。以下是使用-helm-安装-traefik-的详细步骤" aria-hidden="true">#</a> 2.2、在 Kubernetes 中部署 <strong>Traefik</strong> Ingress Controller 可以通过 Helm 或使用 Kubernetes 清单文件来完成。以下是使用 Helm 安装 Traefik 的详细步骤：</h3>
<h3 id="_2-2-1-前提条件" tabindex="-1"><a class="header-anchor" href="#_2-2-1-前提条件" aria-hidden="true">#</a> 2.2.1 <strong>前提条件</strong></h3>
<ul>
<li>确保你的 Kubernetes 集群已经创建，并且可以使用 <code v-pre>kubectl</code> 命令。</li>
<li>安装 Helm，确保 Helm CLI 已经配置好。</li>
</ul>
<h3 id="_2-2-2-添加-traefik-helm-仓库" tabindex="-1"><a class="header-anchor" href="#_2-2-2-添加-traefik-helm-仓库" aria-hidden="true">#</a> 2.2.2 <strong>添加 Traefik Helm 仓库</strong></h3>
<p>首先，添加 Traefik 的官方 Helm 仓库并更新：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>helm repo add traefik https://traefik.github.io/charts
helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装-traefik" tabindex="-1"><a class="header-anchor" href="#_3-安装-traefik" aria-hidden="true">#</a> 3. <strong>安装 Traefik</strong></h2>
<p>使用以下命令安装 Traefik，指定 <code v-pre>kube-system</code> 命名空间（或者你希望安装的其他命名空间）：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>helm install traefik traefik/traefik --namespace kube-system --create-namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-验证-traefik-是否运行" tabindex="-1"><a class="header-anchor" href="#_4-验证-traefik-是否运行" aria-hidden="true">#</a> 4. <strong>验证 Traefik 是否运行</strong></h3>
<p>安装完成后，检查 Traefik Pod 的状态：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>kubectl get pods -n kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>确保 <code v-pre>traefik</code> 的 Pod 状态为 <code v-pre>Running</code>。</p>
<h3 id="_1-2、jenkins连接k8s" tabindex="-1"><a class="header-anchor" href="#_1-2、jenkins连接k8s" aria-hidden="true">#</a> 1.2、jenkins连接K8S</h3>
<p>第一步：创建凭证,-n tgpord 是指定命名空间</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl create secret generic jenkins-kubeconfig --from-file<span class="token operator">=</span>.kube/config <span class="token parameter variable">-n</span> tgpord 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二步：</p>
<figure><img src="@source/.vuepress/public/assets/images/k8s/image-20240925235016470.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<p>第三步：</p>
<p>步骤一、首先，你需要创建一个角色 (Role)，以授予对 <code v-pre>pods</code> 资源的访问权限。可以使用以下 YAML 配置创建一个角色：注意要有创建权限才能跑流水线代码</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>role
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"pods"</span><span class="token punctuation">,</span> <span class="token string">"services"</span><span class="token punctuation">,</span> <span class="token string">"secrets"</span><span class="token punctuation">,</span> <span class="token string">"configmaps"</span><span class="token punctuation">,</span> <span class="token string">"replicationcontrollers"</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"create"</span><span class="token punctuation">,</span> <span class="token string">"update"</span><span class="token punctuation">,</span> <span class="token string">"delete"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将以上内容保存为 <code v-pre>role.yaml</code>，然后应用它：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> role.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>步骤 2: 创建角色绑定 (RoleBinding)</p>
<p>然后，创建一个角色绑定，将刚才创建的角色绑定到 <code v-pre>default</code> Service Account：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>role<span class="token punctuation">-</span>binding
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>role
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将以上内容保存为 <code v-pre>rolebinding.yaml</code>，然后应用它：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> rolebinding.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>应用完成后，您可以通过以下命令验证 Jenkins ServiceAccount 的权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl auth can-i list secrets <span class="token parameter variable">--as</span><span class="token operator">=</span>system:serviceaccount:tgpord:jenkins <span class="token parameter variable">-n</span> tgpord
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1、给jenkins赋创建pod的权限-jenkins-deployment-role-yaml" tabindex="-1"><a class="header-anchor" href="#_1、给jenkins赋创建pod的权限-jenkins-deployment-role-yaml" aria-hidden="true">#</a> 1、给jenkins赋创建pod的权限 jenkins-deployment-role.yaml</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>role
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"apps"</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"deployments"</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"create"</span><span class="token punctuation">,</span> <span class="token string">"update"</span><span class="token punctuation">,</span> <span class="token string">"patch"</span><span class="token punctuation">,</span> <span class="token string">"delete"</span><span class="token punctuation">]</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"pods"</span><span class="token punctuation">,</span> <span class="token string">"services"</span><span class="token punctuation">,</span> <span class="token string">"secrets"</span><span class="token punctuation">,</span> <span class="token string">"configmaps"</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">]</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"networking.k8s.io"</span><span class="token punctuation">]</span>  <span class="token comment"># 对 Ingress 资源的权限</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"ingresses"</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"create"</span><span class="token punctuation">,</span> <span class="token string">"update"</span><span class="token punctuation">,</span> <span class="token string">"delete"</span><span class="token punctuation">]</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"traefik.io"</span><span class="token punctuation">]</span>  <span class="token comment"># Traefik API 组</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"middlewares"</span><span class="token punctuation">]</span>  <span class="token comment"># 访问 Middleware 资源</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"create"</span><span class="token punctuation">,</span> <span class="token string">"update"</span><span class="token punctuation">,</span> <span class="token string">"delete"</span><span class="token punctuation">]</span>  <span class="token comment"># 相关操作权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>jenkins-deployment-role.yaml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>binding
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins  <span class="token comment"># 你在 Jenkins 中使用的 ServiceAccount</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>role
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> jenkins-deployment-role.yaml
kubectl apply <span class="token parameter variable">-f</span> jenkins-deployment-binding.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>找到 <code v-pre>serviceAccountName</code> 行</strong>，将其值从 <code v-pre>default</code> 修改为 <code v-pre>jenkins</code>。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>v1
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token string">'2024-09-28T06:59:41Z'</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> jenkins
    <span class="token key atrule">version</span><span class="token punctuation">:</span> v1
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubesphere.io/creator</span><span class="token punctuation">:</span> admin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> jenkins
      <span class="token key atrule">version</span><span class="token punctuation">:</span> v1
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> jenkins
        <span class="token key atrule">version</span><span class="token punctuation">:</span> v1
      <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
        <span class="token key atrule">kubesphere.io/creator</span><span class="token punctuation">:</span> admin
        <span class="token key atrule">kubesphere.io/imagepullsecrets</span><span class="token punctuation">:</span> <span class="token string">'{}'</span>
        <span class="token key atrule">logging.kubesphere.io/logsidecar-config</span><span class="token punctuation">:</span> <span class="token string">'{}'</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> host<span class="token punctuation">-</span>time
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /etc/localtime
            <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">''</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>sock
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /var/run/docker.sock
            <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">''</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>docker
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /usr/bin/docker
            <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">''</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>daemon
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /etc/docker/daemon.json
            <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">''</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> container<span class="token punctuation">-</span>ow86l0
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">'jenkins/jenkins:2.478'</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tcp<span class="token punctuation">-</span><span class="token number">50000</span>
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">50000</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tcp<span class="token punctuation">-</span><span class="token number">8080</span>
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> host<span class="token punctuation">-</span>time
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/localtime
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>pvc
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/jenkins_home
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>sock
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/run/docker.sock
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>docker
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/bin/docker
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>daemon
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/docker/daemon.json
          <span class="token key atrule">terminationMessagePath</span><span class="token punctuation">:</span> /dev/termination<span class="token punctuation">-</span>log
          <span class="token key atrule">terminationMessagePolicy</span><span class="token punctuation">:</span> File
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">dnsPolicy</span><span class="token punctuation">:</span> ClusterFirst
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> jenkins <span class="token comment">#将</span>
      <span class="token key atrule">serviceAccount</span><span class="token punctuation">:</span> jenkins
      <span class="token key atrule">securityContext</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token key atrule">schedulerName</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>scheduler
  <span class="token key atrule">volumeClaimTemplates</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
      <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
      <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>pvc
        <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
        <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">spec</span><span class="token punctuation">:</span>
        <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ReadWriteOnce
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10Gi
        <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client
        <span class="token key atrule">volumeMode</span><span class="token punctuation">:</span> Filesystem
      <span class="token key atrule">status</span><span class="token punctuation">:</span>
        <span class="token key atrule">phase</span><span class="token punctuation">:</span> Pending
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> jenkins
  <span class="token key atrule">podManagementPolicy</span><span class="token punctuation">:</span> OrderedReady
  <span class="token key atrule">updateStrategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">partition</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">persistentVolumeClaimRetentionPolicy</span><span class="token punctuation">:</span>
    <span class="token key atrule">whenDeleted</span><span class="token punctuation">:</span> Retain
    <span class="token key atrule">whenScaled</span><span class="token punctuation">:</span> Retain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤-3-验证权限" tabindex="-1"><a class="header-anchor" href="#步骤-3-验证权限" aria-hidden="true">#</a> 步骤 3: 验证权限</h3>
<p>角色和角色绑定创建完成后，使用以下命令验证配置是否正确：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl auth can-i list pods <span class="token parameter variable">--namespace</span> tgpord <span class="token parameter variable">--as</span> system:serviceaccount:tgpord:default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果输出 <code v-pre>yes</code>，表示权限已正确设置。</p>
<p>配置界面：</p>
<figure><img src="@source/.vuepress/public/assets/images/k8s/image-20240925235447686.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<p>强制删除： pod名称：tg-34-9lrv5-5j8s9-c0mhn</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl delete pod tg-34-9lrv5-5j8s9-c0mhn <span class="token parameter variable">-n</span> tgpord --grace-period<span class="token operator">=</span><span class="token number">0</span> <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>1.3、当集群是的容器运行时是containerd时，采用Buildah打包镜像</p>
<div class="language-ssh line-numbers-mode" data-ext="ssh"><pre v-pre class="language-ssh"><code># 启用必要的仓库
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/CentOS_7/devel:kubic:libcontainers:stable.repo

# 安装 Buildah
sudo yum install -y buildah

# 验证安装
buildah --version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后挂载到jenkins容器里面</p>
<h2 id="_2、安装sonarqube" tabindex="-1"><a class="header-anchor" href="#_2、安装sonarqube" aria-hidden="true">#</a> 2、安装SonarQube</h2>
<h3 id="_2-1、安装helm" tabindex="-1"><a class="header-anchor" href="#_2-1、安装helm" aria-hidden="true">#</a> 2.1、安装helm</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>下载 需要的版本
解压<span class="token punctuation">(</span>tar <span class="token parameter variable">-zxvf</span> helm-v3.0.0-linux-amd64.tar.gz<span class="token punctuation">)</span>
在解压目录中找到helm程序，移动到需要的目录中<span class="token punctuation">(</span>mv linux-amd64/helm /usr/local/bin/helm<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2、添加仓库" tabindex="-1"><a class="header-anchor" href="#_2-2、添加仓库" aria-hidden="true">#</a> 2.2、添加仓库</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> <span class="token punctuation">[</span>NAME<span class="token punctuation">]</span> <span class="token punctuation">[</span>URL<span class="token punctuation">]</span> <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3、安装sonarqube" tabindex="-1"><a class="header-anchor" href="#_2-3、安装sonarqube" aria-hidden="true">#</a> 2.3、安装SonarQube</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm upgrade <span class="token parameter variable">--install</span> sonarqube sonarqube <span class="token parameter variable">--repo</span> https://charts.kubesphere.io/main --create-namespace <span class="token parameter variable">--set</span> <span class="token assign-left variable">service.type</span><span class="token operator">=</span>NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-4、获取-sonarqube-控制台地址" tabindex="-1"><a class="header-anchor" href="#_2-4、获取-sonarqube-控制台地址" aria-hidden="true">#</a> 2.4、获取 SonarQube 控制台地址</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  <span class="token builtin class-name">export</span> <span class="token assign-left variable">NODE_PORT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get <span class="token parameter variable">--namespace</span> default <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.spec.ports[0].nodePort}"</span> services sonarqube-sonarqube<span class="token variable">)</span></span>
  <span class="token builtin class-name">export</span> <span class="token assign-left variable">NODE_IP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get nodes <span class="token parameter variable">--namespace</span> default <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].status.addresses[0].address}"</span><span class="token variable">)</span></span>
  <span class="token builtin class-name">echo</span> http://<span class="token variable">$NODE_IP</span><span class="token builtin class-name">:</span><span class="token variable">$NODE_PORT</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5、访问地址" tabindex="-1"><a class="header-anchor" href="#_2-5、访问地址" aria-hidden="true">#</a> 2.5、访问地址</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>http://192.168.200.235:31762/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3、安装harbor" tabindex="-1"><a class="header-anchor" href="#_3、安装harbor" aria-hidden="true">#</a> 3、安装Harbor</h2>
<h3 id="_3-1、添加仓库" tabindex="-1"><a class="header-anchor" href="#_3-1、添加仓库" aria-hidden="true">#</a> 3.1、添加仓库</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> harbor https://helm.goharbor.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2、安装harbor" tabindex="-1"><a class="header-anchor" href="#_3-2、安装harbor" aria-hidden="true">#</a> 3.2、安装Harbor</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> harbor-release harbor/harbor <span class="token parameter variable">--set</span> <span class="token assign-left variable">expose.type</span><span class="token operator">=</span>nodePort,externalURL<span class="token operator">=</span>http://192.168.200.235:30002,expose.tls.enabled<span class="token operator">=</span>false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3、启用-insecure-registry" tabindex="-1"><a class="header-anchor" href="#_3-3、启用-insecure-registry" aria-hidden="true">#</a> 3.3、启用 Insecure Registry</h3>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"insecure-registries"</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"103.61.38.55:30002"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4、修改-containerd-配置文件" tabindex="-1"><a class="header-anchor" href="#_3-4、修改-containerd-配置文件" aria-hidden="true">#</a> 3.4、修改 <code v-pre>containerd</code> 配置文件</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/containerd/config.toml

<span class="token punctuation">[</span>plugins.<span class="token string">"io.containerd.grpc.v1.cri"</span>.registry<span class="token punctuation">]</span>
  <span class="token punctuation">[</span>plugins.<span class="token string">"io.containerd.grpc.v1.cri"</span>.registry.mirrors<span class="token punctuation">]</span>
    <span class="token punctuation">[</span>plugins.<span class="token string">"io.containerd.grpc.v1.cri"</span>.registry.mirrors.<span class="token string">"docker.io"</span><span class="token punctuation">]</span>
      endpoint <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"https://registry-1.docker.io"</span><span class="token punctuation">]</span>
      <span class="token comment">#添加自己的配置</span>
    <span class="token punctuation">[</span>plugins.<span class="token string">"io.containerd.grpc.v1.cri"</span>.registry.mirrors.<span class="token string">"103.61.38.55:30002"</span><span class="token punctuation">]</span>
      endpoint <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"http://103.61.38.55:30002"</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5、重启containerd" tabindex="-1"><a class="header-anchor" href="#_3-5、重启containerd" aria-hidden="true">#</a> 3.5、重启containerd</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-6、当用docker时-让jenkins内部使用宿主机的docker-推送给harbor" tabindex="-1"><a class="header-anchor" href="#_3-6、当用docker时-让jenkins内部使用宿主机的docker-推送给harbor" aria-hidden="true">#</a> 3.6、当用docker时，让jenkins内部使用宿主机的docker 推送给Harbor</h3>
<p>修改docker.sock用户</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chown</span> root:root docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改文件权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> o+rw docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4、安装maven" tabindex="-1"><a class="header-anchor" href="#_4、安装maven" aria-hidden="true">#</a> 4、安装maven</h2>
<h3 id="_4-1、下载地址-官网-https-maven-apache-org-历史版本地址-https-archive-apache-org-dist-maven-maven-3" tabindex="-1"><a class="header-anchor" href="#_4-1、下载地址-官网-https-maven-apache-org-历史版本地址-https-archive-apache-org-dist-maven-maven-3" aria-hidden="true">#</a> 4.1、下载地址，官网：https://maven.apache.org/  历史版本地址：https://archive.apache.org/dist/maven/maven-3/</h3>
<h3 id="_4-2、将maven放到jenkins-home里面" tabindex="-1"><a class="header-anchor" href="#_4-2、将maven放到jenkins-home里面" aria-hidden="true">#</a> 4.2、将maven放到jenkins_home里面</h3>
<h3 id="_4-3、修改settings-xml" tabindex="-1"><a class="header-anchor" href="#_4-3、修改settings-xml" aria-hidden="true">#</a> 4.3、修改settings.xml</h3>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--阿里云仓库 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirror</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>nexus-aliyun<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>Nexus aliyun<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">></span></span>https://maven.aliyun.com/nexus/content/groups/public/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrorOf</span><span class="token punctuation">></span></span>central<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrorOf</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirror</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>jdk-1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeByDefault</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeByDefault</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>jdk</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>jdk</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.compilerVersion</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.compilerVersion</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、推荐到新的仓库" tabindex="-1"><a class="header-anchor" href="#四、推荐到新的仓库" aria-hidden="true">#</a> 四、推荐到新的仓库</h2>
<h3 id="_1、推送到gitlab仓库-添加用户" tabindex="-1"><a class="header-anchor" href="#_1、推送到gitlab仓库-添加用户" aria-hidden="true">#</a> 1、推送到gitlab仓库，添加用户</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--local</span> user.name <span class="token string">"Administrator"</span>
<span class="token function">git</span> config <span class="token parameter variable">--local</span> user.email <span class="token string">"gitlab_admin_ea50d9@example.com"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、创建一个新仓库" tabindex="-1"><a class="header-anchor" href="#_2、创建一个新仓库" aria-hidden="true">#</a> 2、创建一个新仓库</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone http://192.168.200.232/root/tg.git
<span class="token builtin class-name">cd</span> tg
<span class="token function">git</span> switch <span class="token parameter variable">--create</span> main
<span class="token function">touch</span> README.md
<span class="token function">git</span> <span class="token function">add</span> README.md
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"add README"</span>
<span class="token function">git</span> push --set-upstream origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、推送现有文件夹" tabindex="-1"><a class="header-anchor" href="#_3、推送现有文件夹" aria-hidden="true">#</a> 3、推送现有文件夹</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> existing_folder
<span class="token function">git</span> init --initial-branch<span class="token operator">=</span>main
<span class="token function">git</span> remote <span class="token function">add</span> origin http://192.168.200.232/root/tg.git
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"Initial commit"</span>
<span class="token function">git</span> push --set-upstream origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、推送现有的-git-仓库" tabindex="-1"><a class="header-anchor" href="#_4、推送现有的-git-仓库" aria-hidden="true">#</a> 4、推送现有的 Git 仓库</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> existing_repo
<span class="token function">git</span> remote <span class="token function">rename</span> origin old-origin
<span class="token function">git</span> remote <span class="token function">add</span> origin http://192.168.200.232/root/tg.git
<span class="token function">git</span> push --set-upstream origin <span class="token parameter variable">--all</span>
<span class="token function">git</span> push --set-upstream origin <span class="token parameter variable">--tags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


