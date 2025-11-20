import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as e}from"./app-HMLpIP8o.js";const t={},p=e(`<h1 id="k8s安装kube-prometheus-stack" tabindex="-1"><a class="header-anchor" href="#k8s安装kube-prometheus-stack" aria-hidden="true">#</a> k8s安装kube-prometheus-stack</h1><h2 id="一、安装kube-prometheus-stack-helm仓库" tabindex="-1"><a class="header-anchor" href="#一、安装kube-prometheus-stack-helm仓库" aria-hidden="true">#</a> 一、安装kube-prometheus-stack helm仓库</h2><p>官网：</p><blockquote><p>helm：https://github.com/prometheus-community/helm-charts</p><p>源生：https://github.com/prometheus-operator/kube-prometheus</p><p>注：源生安装自行到官网查看文档</p></blockquote><h3 id="_1-1、添加仓库" tabindex="-1"><a class="header-anchor" href="#_1-1、添加仓库" aria-hidden="true">#</a> 1.1、添加仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm repo <span class="token function">add</span> prometheus-community https://prometheus-community.github.io/helm-charts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2、更新仓库" tabindex="-1"><a class="header-anchor" href="#_1-2、更新仓库" aria-hidden="true">#</a> 1.2、更新仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-3、查看版本" tabindex="-1"><a class="header-anchor" href="#_1-3、查看版本" aria-hidden="true">#</a> 1.3、查看版本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm search repo prometheus-community/kube-prometheus-stack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-4、下载最新版本" tabindex="-1"><a class="header-anchor" href="#_1-4、下载最新版本" aria-hidden="true">#</a> 1.4、下载最新版本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm pull prometheus-community/kube-prometheus-stack <span class="token parameter variable">--version</span> <span class="token operator">&lt;</span>最新版本号<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-5、修改values-yaml-设置存储方式" tabindex="-1"><a class="header-anchor" href="#_1-5、修改values-yaml-设置存储方式" aria-hidden="true">#</a> 1.5、修改values.yaml 设置存储方式</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>    <span class="token comment">##设置存储方式</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span>
     <span class="token key atrule">volumeClaimTemplate</span><span class="token punctuation">:</span>
       <span class="token key atrule">spec</span><span class="token punctuation">:</span>
         <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client <span class="token comment">#nfs名字</span>
         <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ReadWriteMany&quot;</span><span class="token punctuation">]</span> <span class="token comment">#多节点连接</span>
         <span class="token key atrule">resources</span><span class="token punctuation">:</span>
           <span class="token key atrule">requests</span><span class="token punctuation">:</span>
             <span class="token key atrule">storage</span><span class="token punctuation">:</span> 50Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6、安装自定义版本" tabindex="-1"><a class="header-anchor" href="#_1-6、安装自定义版本" aria-hidden="true">#</a> 1.6、安装自定义版本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm <span class="token function">install</span> kube-prometheus-stack prometheus-community/kube-prometheus-stack <span class="token parameter variable">-n</span> monitoring --create-namespace <span class="token parameter variable">-f</span> values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-7、添加不在集群内的服务器和容器" tabindex="-1"><a class="header-anchor" href="#_1-7、添加不在集群内的服务器和容器" aria-hidden="true">#</a> 1.7、添加不在集群内的服务器和容器</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheusSpec</span><span class="token punctuation">:</span>
    <span class="token key atrule">additionalScrapeConfigs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&quot;external-server&quot;</span>
        <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
        <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token string">&quot;192.168.1.100:9100&quot;</span>  <span class="token comment"># 外部服务器的 IP 和端口（如 Node Exporter）</span>
              <span class="token punctuation">-</span> <span class="token string">&quot;192.168.1.101:9100&quot;</span>
              <span class="token punctuation">-</span> <span class="token string">&quot;example.com:8080&quot;</span>    <span class="token comment"># 监控某个容器的服务</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-8、修改配置文件-更新系统" tabindex="-1"><a class="header-anchor" href="#_1-8、修改配置文件-更新系统" aria-hidden="true">#</a> 1.8、修改配置文件，更新系统</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm upgrade kube-prometheus-stack prometheus-community/kube-prometheus-stack <span class="token parameter variable">-n</span> monitoring <span class="token parameter variable">-f</span> values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-9、更新本地文件-在kube-prometheus-stack文件下运行这命令" tabindex="-1"><a class="header-anchor" href="#_1-9、更新本地文件-在kube-prometheus-stack文件下运行这命令" aria-hidden="true">#</a> 1.9、更新本地文件,在kube-prometheus-stack文件下运行这命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm upgrade kube-prometheus-stack ./ <span class="token parameter variable">-n</span> monitoring <span class="token parameter variable">-f</span> values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-10、修改alertmanager外部访问-values-yaml" tabindex="-1"><a class="header-anchor" href="#_1-10、修改alertmanager外部访问-values-yaml" aria-hidden="true">#</a> 1.10、修改Alertmanager外部访问(values.yaml)</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">annotations</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">ipDualStack</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">ipFamilies</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;IPv6&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;IPv4&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">ipFamilyPolicy</span><span class="token punctuation">:</span> <span class="token string">&quot;PreferDualStack&quot;</span>

    <span class="token comment">## Port for Alertmanager Service to listen on</span>
    <span class="token comment">##</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9093</span>
    <span class="token comment">## To be used with a proxy extraContainer port</span>
    <span class="token comment">##</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">9093</span>
    <span class="token comment">## Port to expose on each node</span>
    <span class="token comment">## Only used if service.type is &#39;NodePort&#39;</span>
    <span class="token comment">##</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30903</span>
    <span class="token comment">## List of IP addresses at which the Prometheus server service is available</span>
    <span class="token comment">## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips</span>
    <span class="token comment">##</span>

    <span class="token comment">## Additional ports to open for Alertmanager service</span>
    <span class="token comment">##</span>
    <span class="token key atrule">additionalPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment"># - name: oauth-proxy</span>
    <span class="token comment">#   port: 8081</span>
    <span class="token comment">#   targetPort: 8081</span>
    <span class="token comment"># - name: oauth-metrics</span>
    <span class="token comment">#   port: 8082</span>
    <span class="token comment">#   targetPort: 8082</span>

    <span class="token key atrule">externalIPs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">loadBalancerIP</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">loadBalancerSourceRanges</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">## Denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints</span>
    <span class="token comment">##</span>
    <span class="token key atrule">externalTrafficPolicy</span><span class="token punctuation">:</span> Cluster

    <span class="token comment">## If you want to make sure that connections from a particular client are passed to the same Pod each time</span>
    <span class="token comment">## Accepts &#39;ClientIP&#39; or &#39;None&#39;</span>
    <span class="token comment">##</span>
    <span class="token key atrule">sessionAffinity</span><span class="token punctuation">:</span> None

    <span class="token comment">## If you want to modify the ClientIP sessionAffinity timeout</span>
    <span class="token comment">## The value must be &gt;0 &amp;&amp; &lt;=86400(for 1 day) if ServiceAffinity == &quot;ClientIP&quot;</span>
    <span class="token comment">##</span>
    <span class="token key atrule">sessionAffinityConfig</span><span class="token punctuation">:</span>
      <span class="token key atrule">clientIP</span><span class="token punctuation">:</span>
        <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">10800</span>

    <span class="token comment">## Service type</span>
    <span class="token comment">##暴露对外的服务类型，支持ClusterIP、NodePort、LoadBalancer、ExternalName四种类型 暴露NodePort类型的服务，用IP访问</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-11、修改prometheus对外访问-values-yaml" tabindex="-1"><a class="header-anchor" href="#_1-11、修改prometheus对外访问-values-yaml" aria-hidden="true">#</a> 1.11、修改Prometheus对外访问(values.yaml)</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">annotations</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">ipDualStack</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">ipFamilies</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;IPv6&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;IPv4&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">ipFamilyPolicy</span><span class="token punctuation">:</span> <span class="token string">&quot;PreferDualStack&quot;</span>

    <span class="token comment">## Port for Prometheus Service to listen on</span>
    <span class="token comment">##</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9090</span>

    <span class="token comment">## To be used with a proxy extraContainer port</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">9090</span>

    <span class="token comment">## Port for Prometheus Reloader to listen on</span>
    <span class="token comment">##</span>
    <span class="token key atrule">reloaderWebPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>

    <span class="token comment">## List of IP addresses at which the Prometheus server service is available</span>
    <span class="token comment">## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips</span>
    <span class="token comment">##</span>
    <span class="token key atrule">externalIPs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">## Port to expose on each node</span>
    <span class="token comment">## Only used if service.type is &#39;NodePort&#39;</span>
    <span class="token comment">##</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30090</span>

    <span class="token comment">## Loadbalancer IP</span>
    <span class="token comment">## Only use if service.type is &quot;LoadBalancer&quot;</span>
    <span class="token key atrule">loadBalancerIP</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">loadBalancerSourceRanges</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">## Denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints</span>
    <span class="token comment">##</span>
    <span class="token key atrule">externalTrafficPolicy</span><span class="token punctuation">:</span> Cluster

    <span class="token comment">## Service type</span>
    <span class="token comment">##</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-12、不在集群内部的配置-values-yaml" tabindex="-1"><a class="header-anchor" href="#_1-12、不在集群内部的配置-values-yaml" aria-hidden="true">#</a> 1.12、不在集群内部的配置(values.yaml)</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">additionalScrapeConfigs</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;node-exporter&#39;</span>
       <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">&#39;192.168.1.226:9100&#39;</span>  <span class="token comment"># MES 后端服务器</span>
              <span class="token key atrule">labels</span><span class="token punctuation">:</span>
                <span class="token key atrule">alias</span><span class="token punctuation">:</span> <span class="token string">&#39;mes后端服务器&#39;</span>
                <span class="token key atrule">instance</span><span class="token punctuation">:</span> <span class="token string">&#39;mes后端服务器&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">&#39;192.168.1.238:9100&#39;</span>  <span class="token comment"># NFS 服务器</span>
              <span class="token key atrule">labels</span><span class="token punctuation">:</span>
                <span class="token key atrule">alias</span><span class="token punctuation">:</span> <span class="token string">&#39;nfs服务器&#39;</span>
                <span class="token key atrule">instance</span><span class="token punctuation">:</span> <span class="token string">&#39;nfs服务器&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">&#39;192.168.1.232:9100&#39;</span> <span class="token comment"># 源码服务器</span>
              <span class="token key atrule">labels</span><span class="token punctuation">:</span>
                <span class="token key atrule">alias</span><span class="token punctuation">:</span> <span class="token string">&#39;gitlab服务器&#39;</span>
                <span class="token key atrule">instance</span><span class="token punctuation">:</span> <span class="token string">&#39;gitlab服务器&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">&#39;192.168.1.229:9100&#39;</span> <span class="token comment"># app端服务器</span>
              <span class="token key atrule">labels</span><span class="token punctuation">:</span>
                <span class="token key atrule">alias</span><span class="token punctuation">:</span> <span class="token string">&#39;app服务器&#39;</span>
                <span class="token key atrule">instance</span><span class="token punctuation">:</span> <span class="token string">&#39;app服务器&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">&#39;192.168.1.230:9100&#39;</span> <span class="token comment"># 文件服务器</span>
              <span class="token key atrule">labels</span><span class="token punctuation">:</span>
                <span class="token key atrule">alias</span><span class="token punctuation">:</span> <span class="token string">&#39;minio服务器&#39;</span>
                <span class="token key atrule">instance</span><span class="token punctuation">:</span> <span class="token string">&#39;minio服务器&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">&#39;192.168.1.231:9100&#39;</span> <span class="token comment"># 数据库服务器</span>
              <span class="token key atrule">labels</span><span class="token punctuation">:</span>
                <span class="token key atrule">alias</span><span class="token punctuation">:</span> <span class="token string">&#39;mysql服务器&#39;</span>
                <span class="token key atrule">instance</span><span class="token punctuation">:</span> <span class="token string">&#39;mysql服务器&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">&#39;192.168.1.228:9100&#39;</span> <span class="token comment"># PC端服务器</span>
              <span class="token key atrule">labels</span><span class="token punctuation">:</span>
                <span class="token key atrule">alias</span><span class="token punctuation">:</span> <span class="token string">&#39;web服务器&#39;</span>
                <span class="token key atrule">instance</span><span class="token punctuation">:</span> <span class="token string">&#39;web服务器&#39;</span>
       <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> /metrics
       <span class="token key atrule">scheme</span><span class="token punctuation">:</span> http
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-13、配置钉钉提醒-values-yaml" tabindex="-1"><a class="header-anchor" href="#_1-13、配置钉钉提醒-values-yaml" aria-hidden="true">#</a> 1.13、配置钉钉提醒(values.yaml)</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>   <span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">global</span><span class="token punctuation">:</span>
      <span class="token key atrule">resolve_timeout</span><span class="token punctuation">:</span> 5m
    <span class="token key atrule">inhibit_rules</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">source_matchers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;severity = critical&#39;</span>
        <span class="token key atrule">target_matchers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;severity =~ warning|info&#39;</span>
        <span class="token key atrule">equal</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;namespace&#39;</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;alertname&#39;</span>
      <span class="token punctuation">-</span> <span class="token key atrule">source_matchers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;severity = warning&#39;</span>
        <span class="token key atrule">target_matchers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;severity = info&#39;</span>
        <span class="token key atrule">equal</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;namespace&#39;</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;alertname&#39;</span>
      <span class="token punctuation">-</span> <span class="token key atrule">source_matchers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;alertname = InfoInhibitor&#39;</span>
        <span class="token key atrule">target_matchers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;severity = info&#39;</span>
        <span class="token key atrule">equal</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;namespace&#39;</span>
      <span class="token punctuation">-</span> <span class="token key atrule">target_matchers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;alertname = InfoInhibitor&#39;</span>
    <span class="token key atrule">route</span><span class="token punctuation">:</span>
      <span class="token key atrule">group_by</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;namespace&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">group_wait</span><span class="token punctuation">:</span> 30s
      <span class="token key atrule">group_interval</span><span class="token punctuation">:</span> 5m
      <span class="token key atrule">repeat_interval</span><span class="token punctuation">:</span> 12h
      <span class="token key atrule">receiver</span><span class="token punctuation">:</span> <span class="token string">&#39;dingtalk&#39;</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">receiver</span><span class="token punctuation">:</span> <span class="token string">&#39;dingtalk&#39;</span>
          <span class="token key atrule">matchers</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> alertname = &quot;Watchdog&quot;
    <span class="token key atrule">receivers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;null&#39;</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;dingtalk&#39;</span>
        <span class="token key atrule">webhook_configs</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">send_resolved</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
              <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&#39;http://alertmanager-webhook-dingtalk:8060/dingtalk/webhook/send&#39;</span> <span class="token comment"># 钉钉机器人webhook地址</span>
    <span class="token key atrule">templates</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;/etc/alertmanager/config/*.tmpl&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-14、设置提醒条件和提醒的内容" tabindex="-1"><a class="header-anchor" href="#_1-14、设置提醒条件和提醒的内容" aria-hidden="true">#</a> 1.14、设置提醒条件和提醒的内容</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>additionalPrometheusRulesMap:
  hardware-monitoring-rules:
    groups:
      - name: Hardware-Monitoring
        rules:
          <span class="token comment"># CPU使用率告警</span>
          - alert: HighCPUUsage
            expr: <span class="token number">100</span> - <span class="token punctuation">(</span>avg by <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token punctuation">(</span>irate<span class="token punctuation">(</span>node_cpu_seconds_total<span class="token punctuation">{</span>mode<span class="token operator">=</span><span class="token string">&quot;idle&quot;</span><span class="token punctuation">}</span><span class="token punctuation">[</span>5m<span class="token punctuation">]</span><span class="token punctuation">))</span> * <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">5</span>
            for: 1m
            labels:
              severity: critical
            annotations:
              summary: <span class="token string">&quot;CPU 使用率过高&quot;</span>
              description: <span class="token string">&quot;实例 {{ <span class="token variable">$labels</span>.instance }} 的 CPU 使用率超过 5%，当前值: {{ <span class="token variable">$value</span> }}%&quot;</span>

          <span class="token comment"># 内存使用率告警</span>
          - alert: HighMemoryUsage
            expr: <span class="token punctuation">(</span><span class="token number">1</span> - <span class="token punctuation">(</span>node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes<span class="token punctuation">))</span> * <span class="token number">100</span> <span class="token operator">&gt;</span> <span class="token number">90</span>
            for: 1m
            labels:
              severity: critical
            annotations:
              summary: <span class="token string">&quot;内存使用率过高&quot;</span>
              description: <span class="token string">&quot;实例 {{ <span class="token variable">$labels</span>.instance }} 的内存使用率超过 90%，当前值: {{ <span class="token variable">$value</span> }}%&quot;</span>

          <span class="token comment"># 磁盘使用率告警</span>
          - alert: HighDiskUsage
            expr: <span class="token punctuation">(</span>node_filesystem_size_bytes<span class="token punctuation">{</span>fstype<span class="token operator">=~</span><span class="token string">&quot;ext4|xfs&quot;</span><span class="token punctuation">}</span> - node_filesystem_free_bytes<span class="token punctuation">{</span>fstype<span class="token operator">=~</span><span class="token string">&quot;ext4|xfs&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span> / node_filesystem_size_bytes<span class="token punctuation">{</span>fstype<span class="token operator">=~</span><span class="token string">&quot;ext4|xfs&quot;</span><span class="token punctuation">}</span> * <span class="token number">100</span> <span class="token operator">&gt;</span> <span class="token number">90</span>
            for: 1m
            labels:
              severity: critical
            annotations:
              summary: <span class="token string">&quot;磁盘使用率过高&quot;</span>
              description: <span class="token string">&quot;实例 {{ <span class="token variable">$labels</span>.instance }} 的磁盘使用率超过 90%，当前值: {{ <span class="token variable">$value</span> }}%&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、不在集群内的服务器和容器接入监控" tabindex="-1"><a class="header-anchor" href="#二、不在集群内的服务器和容器接入监控" aria-hidden="true">#</a> 二、不在集群内的服务器和容器接入监控</h2><h3 id="_1-1、监控硬件node-exporter" tabindex="-1"><a class="header-anchor" href="#_1-1、监控硬件node-exporter" aria-hidden="true">#</a> 1.1、监控硬件node-exporter</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#docker-compose.yml 在要监听的机器上部署</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">node-exporter</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> quay.io/prometheus/node<span class="token punctuation">-</span>exporter<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>exporter
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;host&quot;</span>
    <span class="token key atrule">pid</span><span class="token punctuation">:</span> <span class="token string">&quot;host&quot;</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>path.rootfs=/host
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /<span class="token punctuation">:</span>/host<span class="token punctuation">:</span>ro<span class="token punctuation">,</span>rslave
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、k8s操作" tabindex="-1"><a class="header-anchor" href="#三、k8s操作" aria-hidden="true">#</a> 三、k8s操作</h2><h3 id="_1-1、删除pod" tabindex="-1"><a class="header-anchor" href="#_1-1、删除pod" aria-hidden="true">#</a> 1.1、删除pod</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl delete <span class="token parameter variable">-f</span> config.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="四、k8s安装prometheus-webhook-dingtalk" tabindex="-1"><a class="header-anchor" href="#四、k8s安装prometheus-webhook-dingtalk" aria-hidden="true">#</a> 四、k8s安装prometheus-webhook-dingtalk</h2><h3 id="_1、官网-https-github-com-timonwong-prometheus-webhook-dingtalk" tabindex="-1"><a class="header-anchor" href="#_1、官网-https-github-com-timonwong-prometheus-webhook-dingtalk" aria-hidden="true">#</a> 1、官网：https://github.com/timonwong/prometheus-webhook-dingtalk</h3><h3 id="_2、修改配置文件" tabindex="-1"><a class="header-anchor" href="#_2、修改配置文件" aria-hidden="true">#</a> 2、修改配置文件</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">##</span>
<span class="token comment"># This config is for prometheus-webhook-dingtalk instead of Kubernetes!</span>
<span class="token comment">##</span>

<span class="token comment">## Request timeout</span>
<span class="token comment"># timeout: 5s</span>
<span class="token comment"># （可选）设置请求超时时间，默认 5 秒。</span>

<span class="token comment">## Customizable templates path</span>
<span class="token key atrule">templates</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> /config/template.tmpl
<span class="token comment"># 自定义模板路径，用于定义报警消息的格式。</span>

<span class="token comment">## 精简后的目标配置，仅保留 webhook1 和 webhook_mention_users，其它注释掉</span>
<span class="token key atrule">targets</span><span class="token punctuation">:</span>
  <span class="token key atrule">webhook</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//oapi.dingtalk.com/robot/send<span class="token punctuation">?</span>access_token=xxxxxxxxxxxxxxxxx <span class="token comment">#这个是钉钉机器人Webhook</span>
    <span class="token comment"># secret for signature</span>
    <span class="token key atrule">secret</span><span class="token punctuation">:</span> xxxxxxxxxxxxxxxxxxxxxxxxx <span class="token comment">#钉钉机器人签名</span>
    <span class="token comment"># 钉钉 Webhook 地址，用于发送消息，带签名密钥增强安全性。</span>

  <span class="token comment"># 注释掉以下 Webhook 配置</span>
  <span class="token comment">#  webhook2:</span>
  <span class="token comment">#    url: https://oapi.dingtalk.com/robot/send?access_token=743d803b207286cb46f9005f1802fbe8c8137f0fe8ed136af63b9b750f5b5494</span>

  <span class="token comment">#  webhook_legacy:</span>
  <span class="token comment">#    url: https://oapi.dingtalk.com/robot/send?access_token=743d803b207286cb46f9005f1802fbe8c8137f0fe8ed136af63b9b750f5b5494</span>
  <span class="token comment">#    message:</span>
  <span class="token comment">#      title: &#39;{{ template &quot;legacy.title&quot; . }}&#39;</span>
  <span class="token comment">#      text: &#39;{{ template &quot;legacy.content&quot; . }}&#39;</span>

  <span class="token comment">#  webhook_mention_all:</span>
  <span class="token comment">#    url: https://oapi.dingtalk.com/robot/send?access_token=743d803b207286cb46f9005f1802fbe8c8137f0fe8ed136af63b9b750f5b5494</span>
  <span class="token comment">#    mention:</span>
  <span class="token comment">#      all: true</span>

  <span class="token key atrule">webhook_mention_users</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//oapi.dingtalk.com/robot/send<span class="token punctuation">?</span>access_token=xxxxxxxxxxxxxxxxx
    <span class="token key atrule">mention</span><span class="token punctuation">:</span>
      <span class="token key atrule">mobiles</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;1508666666&#39;</span><span class="token punctuation">]</span>
    <span class="token comment"># 仅在报警消息中 @ 手机号 &#39;1508666666&#39; 对应的用户。</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、模板配置-根据自己需要配置" tabindex="-1"><a class="header-anchor" href="#_3、模板配置-根据自己需要配置" aria-hidden="true">#</a> 3、模板配置，根据自己需要配置</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token comment">/* 定义告警主题 */</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> define <span class="token string">&quot;__subject&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Status <span class="token operator">|</span> toUpper <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">if</span> eq <span class="token punctuation">.</span>Status <span class="token string">&quot;firing&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">:</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Alerts<span class="token punctuation">.</span>Firing <span class="token operator">|</span> <span class="token builtin">len</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token comment">/* 定义告警列表文本 */</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> define <span class="token string">&quot;__alert_list&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">range</span> <span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">-</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">if</span> <span class="token punctuation">.</span>Labels<span class="token punctuation">.</span>owner <span class="token punctuation">}</span><span class="token punctuation">}</span>@<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Labels<span class="token punctuation">.</span>owner <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">-</span>
<span class="token operator">*</span><span class="token operator">*</span>告警名称<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Labels<span class="token punctuation">.</span>alertname <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token operator">*</span><span class="token operator">*</span>告警主机<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Labels<span class="token punctuation">.</span>server_ip <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token operator">*</span><span class="token operator">*</span>告警级别<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Labels<span class="token punctuation">.</span>severity <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token operator">*</span><span class="token operator">*</span>告警描述<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> index <span class="token punctuation">.</span>Annotations <span class="token string">&quot;description&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token operator">*</span><span class="token operator">*</span>告警时间<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> dateInZone <span class="token string">&quot;2006.01.02 15:04:05&quot;</span> <span class="token punctuation">(</span><span class="token punctuation">.</span>StartsAt<span class="token punctuation">)</span> <span class="token string">&quot;Asia/Bangkok&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token operator">*</span><span class="token operator">*</span>查看详情<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>点击这里<span class="token punctuation">]</span><span class="token punctuation">(</span>http<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span><span class="token number">192.168</span><span class="token number">.200</span><span class="token number">.239</span><span class="token punctuation">:</span><span class="token number">31063</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token comment">/* 定义恢复列表文本 */</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> define <span class="token string">&quot;__resolved_list&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">range</span> <span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">-</span>
<span class="token operator">*</span><span class="token operator">*</span>告警名称<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Labels<span class="token punctuation">.</span>alertname <span class="token punctuation">}</span><span class="token punctuation">}</span>
                 
<span class="token operator">*</span><span class="token operator">*</span>告警主机<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Labels<span class="token punctuation">.</span>server_ip <span class="token punctuation">}</span><span class="token punctuation">}</span>
                 
<span class="token operator">*</span><span class="token operator">*</span>告警级别<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Labels<span class="token punctuation">.</span>severity <span class="token punctuation">}</span><span class="token punctuation">}</span>
                 
<span class="token operator">*</span><span class="token operator">*</span>告警描述<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> index <span class="token punctuation">.</span>Annotations <span class="token string">&quot;description&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
                 
<span class="token operator">*</span><span class="token operator">*</span>告警时间<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> dateInZone <span class="token string">&quot;2006.01.02 15:04:05&quot;</span> <span class="token punctuation">(</span><span class="token punctuation">.</span>StartsAt<span class="token punctuation">)</span> <span class="token string">&quot;Asia/Bangkok&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
                 
<span class="token operator">*</span><span class="token operator">*</span>恢复时间<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> dateInZone <span class="token string">&quot;2006.01.02 15:04:05&quot;</span> <span class="token punctuation">(</span><span class="token punctuation">.</span>EndsAt<span class="token punctuation">)</span> <span class="token string">&quot;Asia/Bangkok&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token comment">/* 默认标题 */</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> define <span class="token string">&quot;default.title&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> template <span class="token string">&quot;__subject&quot;</span> <span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token comment">/* 默认内容 */</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> define <span class="token string">&quot;default.content&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">if</span> gt <span class="token punctuation">(</span><span class="token builtin">len</span> <span class="token punctuation">.</span>Alerts<span class="token punctuation">.</span>Firing<span class="token punctuation">)</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">*</span><span class="token operator">*=</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span> 侦测到<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Alerts<span class="token punctuation">.</span>Firing <span class="token operator">|</span> <span class="token builtin">len</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>个告警 <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">*</span><span class="token operator">*</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> template <span class="token string">&quot;__alert_list&quot;</span> <span class="token punctuation">.</span>Alerts<span class="token punctuation">.</span>Firing <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">-</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">if</span> gt <span class="token punctuation">(</span><span class="token builtin">len</span> <span class="token punctuation">.</span>Alerts<span class="token punctuation">.</span>Resolved<span class="token punctuation">)</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">*</span><span class="token operator">*=</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span> 恢复<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Alerts<span class="token punctuation">.</span>Resolved <span class="token operator">|</span> <span class="token builtin">len</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>个故障 <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">*</span><span class="token operator">*</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> template <span class="token string">&quot;__resolved_list&quot;</span> <span class="token punctuation">.</span>Alerts<span class="token punctuation">.</span>Resolved <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token comment">/* 钉钉链接标题 */</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> define <span class="token string">&quot;ding.link.title&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> template <span class="token string">&quot;default.title&quot;</span> <span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token comment">/* 钉钉链接内容 */</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> define <span class="token string">&quot;ding.link.content&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> template <span class="token string">&quot;default.content&quot;</span> <span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token comment">/* 渲染默认标题和内容 */</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> template <span class="token string">&quot;default.title&quot;</span> <span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> template <span class="token string">&quot;default.content&quot;</span> <span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、pod文件" tabindex="-1"><a class="header-anchor" href="#_4、pod文件" aria-hidden="true">#</a> 4、pod文件</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
          <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
          <span class="token key atrule">image</span><span class="token punctuation">:</span> timonwong/prometheus<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
          <span class="token key atrule">args</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>web.listen<span class="token punctuation">-</span>address=<span class="token punctuation">:</span><span class="token number">8060</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>config.file=/config/config.yaml
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /config
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8060</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、kustomization-yaml文件" tabindex="-1"><a class="header-anchor" href="#_5、kustomization-yaml文件" aria-hidden="true">#</a> 5、kustomization.yaml文件</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization

<span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> deployment.yaml
  <span class="token punctuation">-</span> service.yaml

<span class="token key atrule">namespace</span><span class="token punctuation">:</span> monitoring

<span class="token key atrule">commonLabels</span><span class="token punctuation">:</span>
  <span class="token key atrule">app</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk

<span class="token key atrule">replicas</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
    <span class="token key atrule">count</span><span class="token punctuation">:</span> <span class="token number">1</span>

<span class="token key atrule">images</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> timonwong/prometheus<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
    <span class="token key atrule">newTag</span><span class="token punctuation">:</span> v2.1.0

<span class="token key atrule">configMapGenerator</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
    <span class="token key atrule">files</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> config/config.yaml
      <span class="token punctuation">-</span> config/template.tmpl

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、访问文件service-yaml" tabindex="-1"><a class="header-anchor" href="#_6、访问文件service-yaml" aria-hidden="true">#</a> 6、访问文件service.yaml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8060</span>  <span class="token comment"># 服务的端口</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> http  <span class="token comment"># 目标端口</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort  <span class="token comment"># 可根据需要设置为 ClusterIP, NodePort, 或 LoadBalancer</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,50),l=[p];function o(i,c){return s(),a("div",null,l)}const k=n(t,[["render",o],["__file","5.html.vue"]]);export{k as default};
