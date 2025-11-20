<template><div><h1 id="安装rocketmq" tabindex="-1"><a class="header-anchor" href="#安装rocketmq" aria-hidden="true">#</a> 安装rocketmq</h1>
<h2 id="系统解耦-decoupling" tabindex="-1"><a class="header-anchor" href="#系统解耦-decoupling" aria-hidden="true">#</a> <strong>系统解耦（Decoupling）</strong></h2>
<ul>
<li><strong>问题</strong>：
<ul>
<li>传统系统 A 调用系统 B，直接依赖。</li>
<li>如果 B 宕机或响应慢，A 也会受影响。</li>
</ul>
</li>
<li><strong>MQ 解决方式</strong>：
<ul>
<li>生产者把消息发到 MQ，消费者自己去 MQ 消费。</li>
<li>生产者不关心谁消费，也不关心消费速度。</li>
</ul>
</li>
<li><strong>制造行业示例</strong>：
<ul>
<li>生产线设备上报状态 → MQ → MES 或报警系统消费</li>
<li>即使 MES 暂时停机，设备依然可以上报消息，系统不会崩。</li>
</ul>
</li>
</ul>
<hr>
<h2 id="流量削峰填谷-peak-shaving" tabindex="-1"><a class="header-anchor" href="#流量削峰填谷-peak-shaving" aria-hidden="true">#</a> <strong>流量削峰填谷（Peak Shaving）</strong></h2>
<ul>
<li><strong>问题</strong>：
<ul>
<li>ERP 或设备在短时间内产生大量消息。</li>
<li>数据库或后端处理系统瞬间承受不了。</li>
</ul>
</li>
<li><strong>MQ 解决方式</strong>：
<ul>
<li>消息先存入 MQ 队列（缓冲区）。</li>
<li>消费端按自己的能力慢慢处理消息。</li>
</ul>
</li>
<li><strong>制造行业示例</strong>：
<ul>
<li>高峰期下 1000 条订单 → MQ 队列缓冲 → MES 慢慢生成工单 → 写数据库</li>
</ul>
</li>
</ul>
<hr>
<h2 id="异步处理-asynchronous-processing" tabindex="-1"><a class="header-anchor" href="#异步处理-asynchronous-processing" aria-hidden="true">#</a> <strong>异步处理（Asynchronous Processing）</strong></h2>
<ul>
<li><strong>问题</strong>：
<ul>
<li>某些操作不需要立即完成，但又必须可靠执行。</li>
<li>如果同步处理，主流程会被阻塞。</li>
</ul>
</li>
<li><strong>MQ 解决方式</strong>：
<ul>
<li>生产者发送消息后立即返回。</li>
<li>消费端异步处理耗时任务。</li>
</ul>
</li>
<li><strong>制造行业示例</strong>：
<ul>
<li>设备报警 → MQ → 消费端异步处理短信/邮件通知 → 不影响设备采集</li>
</ul>
</li>
</ul>
<hr>
<h2 id="提高可靠性-reliability-retry" tabindex="-1"><a class="header-anchor" href="#提高可靠性-reliability-retry" aria-hidden="true">#</a> <strong>提高可靠性（Reliability &amp; Retry）</strong></h2>
<ul>
<li><strong>问题</strong>：
<ul>
<li>网络异常或消费端异常可能导致消息丢失。</li>
<li>直接调用接口或写数据库，如果失败，消息就丢了。</li>
</ul>
</li>
<li><strong>MQ 解决方式</strong>：
<ul>
<li>消息持久化到 Broker（CommitLog），保证不会丢失。</li>
<li>支持消费失败重试、事务消息。</li>
</ul>
</li>
<li><strong>制造行业示例</strong>：
<ul>
<li>关键报警或订单消息即使消费失败，MQ 会重试，保证最终处理成功。</li>
</ul>
</li>
</ul>
<hr>
<h2 id="mq总结" tabindex="-1"><a class="header-anchor" href="#mq总结" aria-hidden="true">#</a> MQ总结</h2>
<blockquote>
<p><strong>MQ 设计出来是为了解耦系统、削峰填谷、异步处理和保证消息可靠性</strong>。
换句话说，它解决的是<strong>高并发、高耦合、同步阻塞和数据可靠性</strong>的问题，而不是用来存储业务数据。</p>
</blockquote>
<hr>
<h2 id="编写docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#编写docker-compose-yml" aria-hidden="true">#</a> 编写docker-compose.yml</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">namesrv</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> swr.cn<span class="token punctuation">-</span>north<span class="token punctuation">-</span>4.myhuaweicloud.com/ddn<span class="token punctuation">-</span>k8s/docker.io/apache/rocketmq<span class="token punctuation">:</span>5.3.2
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rmqnamesrv
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 9876<span class="token punctuation">:</span><span class="token number">9876</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rocketmq
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/mes/rocketmq/namesrv<span class="token punctuation">:</span>/home/rocketmq/logs
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"sh"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> <span class="token string">"/home/rocketmq/rocketmq-5.3.2/bin/mqnamesrv"</span><span class="token punctuation">]</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">broker</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> swr.cn<span class="token punctuation">-</span>north<span class="token punctuation">-</span>4.myhuaweicloud.com/ddn<span class="token punctuation">-</span>k8s/docker.io/apache/rocketmq<span class="token punctuation">:</span>5.3.2
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rmqbroker
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 10909<span class="token punctuation">:</span><span class="token number">10909</span>
      <span class="token punctuation">-</span> 10911<span class="token punctuation">:</span><span class="token number">10911</span>
      <span class="token punctuation">-</span> 10912<span class="token punctuation">:</span><span class="token number">10912</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> NAMESRV_ADDR=rmqnamesrv<span class="token punctuation">:</span><span class="token number">9876</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> namesrv
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rocketmq
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/mes/rocketmq/store<span class="token punctuation">:</span>/home/rocketmq/store
      <span class="token punctuation">-</span> /home/mes/rocketmq/broker/broker.conf<span class="token punctuation">:</span>/home/rocketmq/broker.conf
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"sh"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> <span class="token string">"mqbroker -c /home/rocketmq/broker.conf"</span><span class="token punctuation">]</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">dashboard</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> swr.cn<span class="token punctuation">-</span>north<span class="token punctuation">-</span>4.myhuaweicloud.com/ddn<span class="token punctuation">-</span>k8s/docker.io/apacherocketmq/rocketmq<span class="token punctuation">-</span>dashboard<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rocketmq<span class="token punctuation">-</span>dashboard
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"8089:8080"</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> namesrv
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rocketmq
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JAVA_OPTS=<span class="token punctuation">-</span>Drocketmq.namesrv.addr=rmqnamesrv<span class="token punctuation">:</span>9876 <span class="token punctuation">-</span>Drocketmq.config.loginRequired=true <span class="token punctuation">-</span>Dspring.security.user.name=admin <span class="token punctuation">-</span>Dspring.security.user.password=admin123
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建topic名称命令" tabindex="-1"><a class="header-anchor" href="#创建topic名称命令" aria-hidden="true">#</a> 创建topic名称命令</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> rmqbroker <span class="token function">sh</span> mqadmin updateTopic <span class="token punctuation">\</span>
  <span class="token parameter variable">-n</span> rmqnamesrv:9876 <span class="token punctuation">\</span>
  <span class="token parameter variable">-t</span> SMS_SEND_TOPIC <span class="token punctuation">\</span>
  <span class="token parameter variable">-c</span> DefaultCluster
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="原理图片" tabindex="-1"><a class="header-anchor" href="#原理图片" aria-hidden="true">#</a> 原理图片</h2>
<figure><img src="https://rocketmq.apache.org/assets/images/mainarchi-9b036e7ff5133d050950f25838367a17.png" alt="Domain Model - RocketMQ" tabindex="0" loading="lazy"><figcaption>Domain Model - RocketMQ</figcaption></figure>
<h2 id="核心角色" tabindex="-1"><a class="header-anchor" href="#核心角色" aria-hidden="true">#</a> 核心角色</h2>
<table>
<thead>
<tr>
<th>角色</th>
<th>作用</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>NameServer</strong></td>
<td>注册中心</td>
<td>Broker 的地址注册、Topic 路由发现</td>
</tr>
<tr>
<td><strong>Broker</strong></td>
<td>消息存储/转发服务器</td>
<td>真正存消息（基于 CommitLog）</td>
</tr>
<tr>
<td><strong>Producer</strong></td>
<td>消息生产者</td>
<td>发送消息到 Broker</td>
</tr>
<tr>
<td><strong>Consumer</strong></td>
<td>消息消费者</td>
<td>从 Broker 拉取消息</td>
</tr>
</tbody>
</table>
<h2 id="rocketmq-的消息流转原理-非常重要" tabindex="-1"><a class="header-anchor" href="#rocketmq-的消息流转原理-非常重要" aria-hidden="true">#</a> RocketMQ 的消息流转原理（非常重要）</h2>
<blockquote>
<p>① Topic 路由发现</p>
</blockquote>
<blockquote>
<p>Producer → NameServer
Consumer → NameServer
（拿到 Broker 的地址和 Topic 的队列列表）</p>
</blockquote>
<blockquote>
<p>② Producer 发送消息</p>
</blockquote>
<blockquote>
<p>Producer 会从路由表中选择一个 Queue（比如 round &gt; robin）</p>
</blockquote>
<blockquote>
<p>将消息发送到对应 Broker</p>
</blockquote>
<blockquote>
<p>Broker 写入 CommitLog（顺序写），性能非常高</p>
</blockquote>
<blockquote>
<p>③ Consumer 拉取消息（Push 其实也是拉）</p>
</blockquote>
<blockquote>
<p>Consumer 每隔一段时间向 Broker 拉取消息（Pull）</p>
</blockquote>
<blockquote>
<p>框架将其封装成 Push 形式（回调）</p>
</blockquote>
<blockquote>
<p>Consumer 还会保存消费进度（Offset）</p>
</blockquote>
<hr>
<h2 id="示例-java" tabindex="-1"><a class="header-anchor" href="#示例-java" aria-hidden="true">#</a> 示例(java)</h2>
<h3 id="message-消息" tabindex="-1"><a class="header-anchor" href="#message-消息" aria-hidden="true">#</a> Message 消息</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SmsSendMessage</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">TOPIC</span> <span class="token operator">=</span> <span class="token string">"SMS_SEND_TOPIC"</span><span class="token punctuation">;</span> <span class="token comment">// 重点：需要增加消息对应的 Topic</span>

    <span class="token doc-comment comment">/**
     * 短信日志编号
     */</span>
    <span class="token annotation punctuation">@NotNull</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">"短信日志编号不能为空"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> logId<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 手机号
     */</span>
    <span class="token annotation punctuation">@NotNull</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">"手机号不能为空"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mobile<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 短信渠道编号
     */</span>
    <span class="token annotation punctuation">@NotNull</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">"短信渠道编号不能为空"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> channelId<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 短信 API 的模板编号
     */</span>
    <span class="token annotation punctuation">@NotNull</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">"短信 API 的模板编号不能为空"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> apiTemplateId<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 短信模板参数
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">KeyValue</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span><span class="token punctuation">></span></span> templateParams<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="smsproducer-生产者" tabindex="-1"><a class="header-anchor" href="#smsproducer-生产者" aria-hidden="true">#</a> SmsProducer 生产者</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Sms 短信相关消息的 Producer
 *
 * <span class="token keyword">@author</span> zzf
 * <span class="token keyword">@date</span> 2021/3/9 16:35
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SmsProducer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisMQTemplate</span> redisMQTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RocketMQTemplate</span> rocketMQTemplate<span class="token punctuation">;</span> <span class="token comment">// 重点：注入 RocketMQTemplate 对象</span>

    <span class="token doc-comment comment">/**
     * 发送 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">SmsChannelRefreshMessage</span></span><span class="token punctuation">}</span> 消息
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendSmsChannelRefreshMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SmsChannelRefreshMessage</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SmsChannelRefreshMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisMQTemplate<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 发送 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">SmsTemplateRefreshMessage</span></span><span class="token punctuation">}</span> 消息
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendSmsTemplateRefreshMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SmsTemplateRefreshMessage</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SmsTemplateRefreshMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisMQTemplate<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 发送 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">SmsSendMessage</span></span><span class="token punctuation">}</span> 消息
     *
     * <span class="token keyword">@param</span> <span class="token parameter">logId</span> 短信日志编号
     * <span class="token keyword">@param</span> <span class="token parameter">mobile</span> 手机号
     * <span class="token keyword">@param</span> <span class="token parameter">channelId</span> 渠道编号
     * <span class="token keyword">@param</span> <span class="token parameter">apiTemplateId</span> 短信模板编号
     * <span class="token keyword">@param</span> <span class="token parameter">templateParams</span> 短信模板参数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendSmsSendMessage</span><span class="token punctuation">(</span><span class="token class-name">Long</span> logId<span class="token punctuation">,</span> <span class="token class-name">String</span> mobile<span class="token punctuation">,</span>
                                   <span class="token class-name">Long</span> channelId<span class="token punctuation">,</span> <span class="token class-name">String</span> apiTemplateId<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">KeyValue</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span><span class="token punctuation">></span></span> templateParams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SmsSendMessage</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SmsSendMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setLogId</span><span class="token punctuation">(</span>logId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setMobile</span><span class="token punctuation">(</span>mobile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        message<span class="token punctuation">.</span><span class="token function">setChannelId</span><span class="token punctuation">(</span>channelId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setApiTemplateId</span><span class="token punctuation">(</span>apiTemplateId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setTemplateParams</span><span class="token punctuation">(</span>templateParams<span class="token punctuation">)</span><span class="token punctuation">;</span>
        rocketMQTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token class-name">SmsSendMessage</span><span class="token punctuation">.</span><span class="token constant">TOPIC</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 重点：使用 RocketMQTemplate 同步发送消息</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="smssendconsumer-消费者" tabindex="-1"><a class="header-anchor" href="#smssendconsumer-消费者" aria-hidden="true">#</a> SmsSendConsumer 消费者</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 针对 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">SmsSendMessage</span></span><span class="token punctuation">}</span> 的消费者
 *
 * <span class="token keyword">@author</span> zzf
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RocketMQMessageListener</span><span class="token punctuation">(</span>
        topic <span class="token operator">=</span> <span class="token class-name">SmsSendMessage</span><span class="token punctuation">.</span><span class="token constant">TOPIC</span><span class="token punctuation">,</span>
        consumerGroup <span class="token operator">=</span> <span class="token class-name">SmsSendMessage</span><span class="token punctuation">.</span><span class="token constant">TOPIC</span> <span class="token operator">+</span> <span class="token string">"_CONSUMER"</span>
<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SmsSendConsumer</span> <span class="token keyword">implements</span> <span class="token class-name">RocketMQListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SmsSendMessage</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">SmsSendService</span> smsSendService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token class-name">SmsSendMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"[onMessage][消息内容({})]"</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        smsSendService<span class="token punctuation">.</span><span class="token function">doSendSms</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<div class="language-http line-numbers-mode" data-ext="http"><pre v-pre class="language-http"><code>### 请求 /system/sms-template/send-sms 接口 => 成功
POST {{baseUrl}}/system/sms-template/send-sms
<span class="token header"><span class="token header-name keyword">Authorization</span><span class="token punctuation">:</span> <span class="token header-value">Bearer {{token}}</span></span>
<span class="token header"><span class="token header-name keyword">Content-Type</span><span class="token punctuation">:</span> <span class="token header-value">application/json</span></span>
<span class="token header"><span class="token header-name keyword">tenant-id</span><span class="token punctuation">:</span> <span class="token header-value">{{adminTenentId}}</span></span>
<span class="token application-json">
<span class="token punctuation">{</span>
  <span class="token string-property property">"templateCode"</span><span class="token operator">:</span> <span class="token string">"test_02"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"mobile"</span><span class="token operator">:</span> <span class="token string">"15601691390"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"templateParams"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"operation"</span><span class="token operator">:</span> <span class="token string">"登录222"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"code"</span><span class="token operator">:</span> <span class="token string">"12345633333"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


