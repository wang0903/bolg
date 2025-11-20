import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as e}from"./app-HMLpIP8o.js";const t={},p=e(`<h1 id="prometheus、alertmanager、grafana部署" tabindex="-1"><a class="header-anchor" href="#prometheus、alertmanager、grafana部署" aria-hidden="true">#</a> Prometheus、Alertmanager、grafana部署</h1><h2 id="创建docker-compose-yaml文件-安装三个软件" tabindex="-1"><a class="header-anchor" href="#创建docker-compose-yaml文件-安装三个软件" aria-hidden="true">#</a> 创建docker-compose.yaml文件,安装三个软件</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.3&#39;</span>

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheus_data</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token key atrule">grafana_data</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">monitoring</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token comment"># 数据收集</span>
  <span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/prometheus<span class="token punctuation">:</span>v2.47.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> prometheus
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> ./prometheus/<span class="token punctuation">:</span>/etc/prometheus/
      <span class="token punctuation">-</span> prometheus_data<span class="token punctuation">:</span>/prometheus
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.path=/prometheus&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--web.console.libraries=/usr/share/prometheus/console_libraries&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--web.console.templates=/usr/share/prometheus/consoles&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--web.enable-lifecycle&#39;</span>  <span class="token comment"># 热加载配置</span>
      <span class="token comment"># - &#39;--web.enable-admin-api&#39;  # api配置</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.retention.time=30d&#39;</span>  <span class="token comment"># 历史数据最大保留时间，默认15天</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> monitoring
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> alertmanager
      <span class="token punctuation">-</span> cadvisor
      <span class="token punctuation">-</span> node_exporter
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;9090&#39;</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;9090:9090&#39;</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> cadvisor

  <span class="token comment"># 告警软件</span>
  <span class="token key atrule">alertmanager</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/alertmanager<span class="token punctuation">:</span>v0.26.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> alertmanager
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> ./alertmanager/<span class="token punctuation">:</span>/etc/alertmanager/
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/alertmanager/config.yml&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.path=/alertmanager&#39;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> monitoring
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;9093&#39;</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;9093:9093&#39;</span>

  <span class="token comment"># 容器收集</span>
  <span class="token key atrule">cadvisor</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> linuxkit/cadvisor<span class="token punctuation">:</span>6ae4b50f8279692c459bccd0003066d22bd558ce
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> cadvisor
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> /<span class="token punctuation">:</span>/rootfs<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> /var/run<span class="token punctuation">:</span>/var/run<span class="token punctuation">:</span>rw
      <span class="token punctuation">-</span> /sys<span class="token punctuation">:</span>/sys<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> /var/lib/docker/<span class="token punctuation">:</span>/var/lib/docker<span class="token punctuation">:</span>ro
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> monitoring
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;8080&#39;</span>

  <span class="token comment"># liux收集</span>
  <span class="token key atrule">node_exporter</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/node<span class="token punctuation">-</span>exporter<span class="token punctuation">:</span>v1.6.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>exporter
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> /proc<span class="token punctuation">:</span>/host/proc<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> /sys<span class="token punctuation">:</span>/host/sys<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> /<span class="token punctuation">:</span>/rootfs<span class="token punctuation">:</span>ro
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--path.procfs=/host/proc&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--path.sysfs=/host/sys&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc|rootfs/var/lib/docker)($$|/)&#39;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> monitoring
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;9100:9100&#39;</span>

  <span class="token comment"># 图表展示</span>
  <span class="token key atrule">grafana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/grafana<span class="token punctuation">:</span>10.1.2
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> grafana
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> grafana_data<span class="token punctuation">:</span>/var/lib/grafana
      <span class="token punctuation">-</span> ./grafana/provisioning/<span class="token punctuation">:</span>/etc/grafana/provisioning/
    <span class="token key atrule">env_file</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./grafana/config.monitoring
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> monitoring
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> prometheus
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;3000:3000&#39;</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> prometheus

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="prometheus-配置" tabindex="-1"><a class="header-anchor" href="#prometheus-配置" aria-hidden="true">#</a> prometheus 配置</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 全局配置</span>
<span class="token key atrule">global</span><span class="token punctuation">:</span>
  <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span>     15s <span class="token comment"># 将搜刮间隔设置为每15秒一次。默认是每1分钟一次。</span>
  <span class="token key atrule">evaluation_interval</span><span class="token punctuation">:</span> 15s <span class="token comment"># 每15秒评估一次规则。默认是每1分钟一次。</span>

<span class="token comment"># Alertmanager 配置</span>
<span class="token key atrule">alerting</span><span class="token punctuation">:</span>
  <span class="token key atrule">alertmanagers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;alertmanager:9093&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># 报警(触发器)配置</span>
<span class="token key atrule">rule_files</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;alert.yml&quot;</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;node-exporter.yml&quot;</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;jvm-exporter.yml&quot;</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;mysql-exporter.yml&quot;</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;cadvisor-exporter.yml&quot;</span>

<span class="token comment"># 搜刮配置，接收各个客户端传过来的信息</span>
<span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;prometheus&#39;</span>
    <span class="token comment"># 覆盖全局默认值，每15秒从该作业中刮取一次目标</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;localhost:9090&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;alertmanager&#39;</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;alertmanager:9093&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;cadvisor&#39;</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;cadvisor:8080&#39;</span><span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> Prometheus服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.2:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> jenkins服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.3:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> minio服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.4:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> gitlab服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.5:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> mysql服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.6:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> server服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.7:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> sonarQubeHarbor服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.8:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> web服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.9:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> app服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.10:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> milian服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.11:8088&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> vpn服务器

  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;node-exporter&#39;</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;node_exporter:9100&#39;</span><span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> Prometheus服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.12:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> jenkins服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.13:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> server服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.14:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> web服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.15:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> minio服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.16:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> mysql服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.17:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> sonarQubeHarbor服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.18:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> app服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.19:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> milian服务器
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.20:9100&#39;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> gitlab服务器
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;mysql-exporter&#39;</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;192.168.1.21:9104&#39;</span><span class="token punctuation">]</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">instance</span><span class="token punctuation">:</span> mysql
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;redis-exporter&#39;</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.22:9121&#39;</span> <span class="token punctuation">]</span>
        <span class="token key atrule">labels</span><span class="token punctuation">:</span>
          <span class="token key atrule">instance</span><span class="token punctuation">:</span> redis
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;server&#39;</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;192.168.1.23:48080&#39;</span><span class="token punctuation">]</span>
        <span class="token key atrule">labels</span><span class="token punctuation">:</span>
          <span class="token key atrule">instance</span><span class="token punctuation">:</span> jvm
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;filesystem-exporter&#39;</span>
    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;192.168.1.24:9100&#39;</span> <span class="token punctuation">]</span>
        <span class="token key atrule">labels</span><span class="token punctuation">:</span>
          <span class="token key atrule">instance</span><span class="token punctuation">:</span> 共享文件服务器


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="alertmanager-配置" tabindex="-1"><a class="header-anchor" href="#alertmanager-配置" aria-hidden="true">#</a> alertmanager 配置</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">global</span><span class="token punctuation">:</span>
  <span class="token comment">#163服务器</span>
  <span class="token key atrule">smtp_smarthost</span><span class="token punctuation">:</span> <span class="token string">&#39;smtp.163.com:465&#39;</span>
  <span class="token comment">#发邮件的邮箱</span>
  <span class="token key atrule">smtp_from</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token comment">#发邮件的邮箱用户名，也就是你的邮箱　　　　　</span>
  <span class="token key atrule">smtp_auth_username</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token comment">#发邮件的邮箱密码</span>
  <span class="token key atrule">smtp_auth_password</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token comment">#进行tls验证</span>
  <span class="token key atrule">smtp_require_tls</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token key atrule">route</span><span class="token punctuation">:</span>
  <span class="token key atrule">group_by</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;alertname&#39;</span><span class="token punctuation">]</span>
  <span class="token comment"># 当收到告警的时候，等待group_wait配置的时间，看是否还有告警，如果有就一起发出去</span>
  <span class="token key atrule">group_wait</span><span class="token punctuation">:</span> 10s
  <span class="token comment">#  如果上次告警信息发送成功，此时又来了一个新的告警数据，则需要等待group_interval配置的时间才可以发送出去</span>
  <span class="token key atrule">group_interval</span><span class="token punctuation">:</span> 10s
  <span class="token comment"># 如果上次告警信息发送成功，且问题没有解决，则等待 repeat_interval配置的时间再次发送告警数据</span>
  <span class="token key atrule">repeat_interval</span><span class="token punctuation">:</span> 10m
  <span class="token comment"># 全局报警组，这个参数是必选的</span>
  <span class="token key atrule">receiver</span><span class="token punctuation">:</span> dingtalk

<span class="token key atrule">receivers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;email&#39;</span>
  <span class="token comment">#收邮件的邮箱</span>
  <span class="token key atrule">email_configs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">to</span><span class="token punctuation">:</span> <span class="token string">&#39;xxxxx@xxxxxx.com&#39;</span>
    <span class="token key atrule">send_resolved</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;dingtalk&#39;</span>
  <span class="token comment">#钉钉报警配置</span>
  <span class="token key atrule">webhook_configs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&#39;http://192.168.1.2:8060/dingtalk/webhook/send&#39;</span>
    <span class="token key atrule">send_resolved</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">inhibit_rules</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">source_match</span><span class="token punctuation">:</span>
     <span class="token key atrule">severity</span><span class="token punctuation">:</span> <span class="token string">&#39;critical&#39;</span>
   <span class="token key atrule">target_match</span><span class="token punctuation">:</span>
     <span class="token key atrule">severity</span><span class="token punctuation">:</span> <span class="token string">&#39;warning&#39;</span>
   <span class="token key atrule">equal</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;alertname&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;dev&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;instance&#39;</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置grafana登录密码" tabindex="-1"><a class="header-anchor" href="#配置grafana登录密码" aria-hidden="true">#</a> 配置grafana登录密码</h3><div class="language-editorconfig line-numbers-mode" data-ext="editorconfig"><pre class="language-editorconfig"><code> <span class="token key attr-name">GF_SECURITY_ADMIN_PASSWORD</span><span class="token value attr-value"><span class="token punctuation">=</span>123456</span>
 <span class="token key attr-name">GF_USERS_ALLOW_SIGN_UP</span><span class="token value attr-value"><span class="token punctuation">=</span>false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装钉钉提醒" tabindex="-1"><a class="header-anchor" href="#安装钉钉提醒" aria-hidden="true">#</a> 安装钉钉提醒</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">webhook</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> timonwong/prometheus<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> prometheus<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> <span class="token string">&quot;always&quot;</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;8060:8060&#39;</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/prometheus-webhook-dingtalk/config.yml&#39;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./config.yml<span class="token punctuation">:</span>/etc/prometheus<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dingtalk/config.yml
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置连接钉钉机器人" tabindex="-1"><a class="header-anchor" href="#配置连接钉钉机器人" aria-hidden="true">#</a> 配置连接钉钉机器人</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">targets</span><span class="token punctuation">:</span>
  <span class="token key atrule">webhook</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token comment">#这里填写地址</span>
    <span class="token key atrule">secret</span><span class="token punctuation">:</span> <span class="token comment">#这里填写加签</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="刷新配置" tabindex="-1"><a class="header-anchor" href="#刷新配置" aria-hidden="true">#</a> 刷新配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:9090/-/reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,15),l=[p];function c(i,o){return s(),a("div",null,l)}const k=n(t,[["render",c],["__file","6.html.vue"]]);export{k as default};
