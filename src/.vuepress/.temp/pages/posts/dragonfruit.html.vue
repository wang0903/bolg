<template><div><h1 id="elfk部署" tabindex="-1"><a class="header-anchor" href="#elfk部署" aria-hidden="true">#</a> ELFK部署</h1>
<h2 id="启动文件" tabindex="-1"><a class="header-anchor" href="#启动文件" aria-hidden="true">#</a> 启动文件</h2>
<h3 id="创建docker-compose-yml文件-用docker进行安装" tabindex="-1"><a class="header-anchor" href="#创建docker-compose-yml文件-用docker进行安装" aria-hidden="true">#</a> 创建docker-compose.yml文件,用docker进行安装</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.elastic.co/elasticsearch/elasticsearch<span class="token punctuation">:</span>7.17.9
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> es
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elk_net
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"9200:9200"</span>
      <span class="token punctuation">-</span> <span class="token string">"9300:9300"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/elk/elasticsearch/config/elasticsearch.yml<span class="token punctuation">:</span>/usr/share/elasticsearch/config/elasticsearch.yml
      <span class="token punctuation">-</span> /home/elk/elasticsearch/data<span class="token punctuation">:</span>/usr/share/elasticsearch/data
      <span class="token punctuation">-</span> /home/elk/elasticsearch/logs<span class="token punctuation">:</span>/usr/share/elasticsearch/logs
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ES_JAVA_OPTS=<span class="token punctuation">-</span>Xms1024m <span class="token punctuation">-</span>Xmx1024m
      <span class="token punctuation">-</span> discovery.type=single<span class="token punctuation">-</span>node

  <span class="token key atrule">logstash</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.elastic.co/logstash/logstash<span class="token punctuation">:</span>7.17.9
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> lh
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elk_net
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"5047:5047"</span>
      <span class="token punctuation">-</span> <span class="token string">"9600:9600"</span>
      <span class="token punctuation">-</span> <span class="token string">"5044:5044"</span> <span class="token comment">#用于接收FileBeat收集的数据</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/elk/logstash/config<span class="token punctuation">:</span>/usr/share/logstash/config
      <span class="token punctuation">-</span> /home/elk/logstash/logs/<span class="token punctuation">:</span>/usr/share/logs/

  <span class="token key atrule">kibana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.elastic.co/kibana/kibana<span class="token punctuation">:</span>7.17.9
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> kb
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elk_net
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"5601:5601"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/elk/kibana/config/kibana.yml<span class="token punctuation">:</span>/usr/share/kibana/config/kibana.yml

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">elk_net</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h2>
<h3 id="elasticsearch配置-创建elasticsearch-yml文件" tabindex="-1"><a class="header-anchor" href="#elasticsearch配置-创建elasticsearch-yml文件" aria-hidden="true">#</a> elasticsearch配置,创建elasticsearch.yml文件</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">cluster.name</span><span class="token punctuation">:</span> <span class="token string">"elastic"</span>   <span class="token comment">#es集群名称</span>
<span class="token key atrule">network.host</span><span class="token punctuation">:</span> 0.0.0.0
<span class="token key atrule">http.cors.enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">http.cors.allow-origin</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
<span class="token key atrule">xpack.security.enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#开启密码校验，若开启就必须要走第4步设置密码</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kibana-配置-创建kibana-yml文件-将配置添加在里面" tabindex="-1"><a class="header-anchor" href="#kibana-配置-创建kibana-yml文件-将配置添加在里面" aria-hidden="true">#</a> kibana 配置,创建kibana.yml文件,将配置添加在里面</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">server.name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">server.host</span><span class="token punctuation">:</span> <span class="token string">"0.0.0.0"</span>
<span class="token key atrule">xpack.monitoring.ui.container.elasticsearch.enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">elasticsearch.hosts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"http://192.168.128.138:9200"</span> <span class="token punctuation">]</span>
<span class="token key atrule">elasticsearch.username</span><span class="token punctuation">:</span> <span class="token string">"elastic"</span>
<span class="token key atrule">elasticsearch.password</span><span class="token punctuation">:</span> <span class="token string">"62352744aa??aa"</span>
<span class="token key atrule">elasticsearch.requestTimeout</span><span class="token punctuation">:</span> <span class="token number">50000</span>
<span class="token key atrule">i18n.locale</span><span class="token punctuation">:</span> <span class="token string">"zh-CN"</span>   <span class="token comment">#中文ui界面</span>
<span class="token key atrule">server.publicBaseUrl</span><span class="token punctuation">:</span> <span class="token string">"http://192.168.128.138:5601"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="logstash-配置-创建logstash-yml-用于创建节点和对es的连接" tabindex="-1"><a class="header-anchor" href="#logstash-配置-创建logstash-yml-用于创建节点和对es的连接" aria-hidden="true">#</a> logstash 配置,创建logstash.yml,用于创建节点和对es的连接</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">node.name</span><span class="token punctuation">:</span> <span class="token string">"logstash001"</span>   <span class="token comment">#节点名称</span>
<span class="token key atrule">http.host</span><span class="token punctuation">:</span> <span class="token string">"0.0.0.0"</span> <span class="token comment">#允许从任何源接收传入的HTTP连接</span>
<span class="token key atrule">xpack.monitoring.elasticsearch.hosts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"http://192.168.128.138:9200"</span> <span class="token punctuation">]</span> <span class="token comment">#连接ES</span>
<span class="token key atrule">xpack.monitoring.enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>   <span class="token comment">#设置禁用X-Pack监视功能</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="管道配置文件-创建pipeline001-conf文件" tabindex="-1"><a class="header-anchor" href="#管道配置文件-创建pipeline001-conf文件" aria-hidden="true">#</a> 管道配置文件,创建pipeline001.conf文件</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>input <span class="token punctuation">{</span>
  beats <span class="token punctuation">{</span>
    port =<span class="token punctuation">></span> 5044    <span class="token comment"># 指定接收Filebeat的端口</span>
    client_inactivity_timeout =<span class="token punctuation">></span> 36000   <span class="token comment"># 客户端响应超时时间</span>
    type =<span class="token punctuation">></span> "yudao<span class="token punctuation">-</span>server<span class="token punctuation">-</span>log"   <span class="token comment"># 与output中对应的日志类型</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

filter <span class="token punctuation">{</span>
  <span class="token comment"># 这里是过滤器的配置，暂时为空</span>
<span class="token punctuation">}</span>

output <span class="token punctuation">{</span>
  if <span class="token punctuation">[</span>type<span class="token punctuation">]</span> == "yudao<span class="token punctuation">-</span>server<span class="token punctuation">-</span>log" <span class="token punctuation">{</span>
    elasticsearch <span class="token punctuation">{</span>
      hosts =<span class="token punctuation">></span> <span class="token punctuation">[</span> <span class="token string">"192.168.1.138:9200"</span> <span class="token punctuation">]</span>   <span class="token comment"># Elasticsearch集群的地址</span>
      index =<span class="token punctuation">></span> "yudao<span class="token punctuation">-</span>server<span class="token punctuation">-</span>log<span class="token punctuation">-</span>%<span class="token punctuation">{</span>+YYYY<span class="token punctuation">-</span>MM<span class="token punctuation">-</span>dd<span class="token punctuation">}</span>"   <span class="token comment"># Elasticsearch中的索引名称，带有日期后缀</span>
      user =<span class="token punctuation">></span> "elastic"   <span class="token comment"># Elasticsearch用户名</span>
      password =<span class="token punctuation">></span> "123"   <span class="token comment"># Elasticsearch密码</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="当有多个管道文件是-在这个文件下配置pipelines-yml" tabindex="-1"><a class="header-anchor" href="#当有多个管道文件是-在这个文件下配置pipelines-yml" aria-hidden="true">#</a> 当有多个管道文件是,在这个文件下配置pipelines.yml</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># This file is where you define your pipelines. You can define multiple.</span>
<span class="token comment"># For more information on multiple pipelines, see the documentation:</span>
<span class="token comment">#   https://www.elastic.co/guide/en/logstash/current/multiple-pipelines.html</span>
<span class="token comment">#  可以在这个配置文件中定义多个管道，用于从多个数据源中获取信息</span>
<span class="token punctuation">-</span> <span class="token key atrule">pipeline.id</span><span class="token punctuation">:</span> pipeline001   <span class="token comment">#管道id</span>
  <span class="token key atrule">path.config</span><span class="token punctuation">:</span> <span class="token string">"/usr/share/logstash/config/*.conf"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="filebeat部署" tabindex="-1"><a class="header-anchor" href="#filebeat部署" aria-hidden="true">#</a> FileBeat部署</h2>
<h3 id="创建启动文件-docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#创建启动文件-docker-compose-yml" aria-hidden="true">#</a> 创建启动文件,docker-compose.yml</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">filebeat</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.elastic.co/beats/filebeat<span class="token punctuation">:</span>7.17.9
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> fb
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/mes/work/projects/filebeat/conf/filebeat.yml<span class="token punctuation">:</span>/usr/share/filebeat/filebeat.yml<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> /home/mes/work/projects/yudao<span class="token punctuation">-</span>server<span class="token punctuation">:</span>/usr/share/filebeat/logs


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置文件-1" tabindex="-1"><a class="header-anchor" href="#配置文件-1" aria-hidden="true">#</a> 配置文件</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">filebeat.inputs</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> filestream        <span class="token comment">#自7.16开始log类型被废弃使用filestream代替</span>
  <span class="token key atrule">id</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>filestream<span class="token punctuation">-</span>id    <span class="token comment">#当type为filestream时，id必须要指派</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> /usr/share/filebeat/logs/<span class="token important">*.log</span>    <span class="token comment">#日志的位置</span>

<span class="token key atrule">output.logstash</span><span class="token punctuation">:</span>                     <span class="token comment">#输出到logstash中</span>
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"192.168.1.138:5044"</span><span class="token punctuation">]</span>        <span class="token comment">#logstash的5044为beats监听端口</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


