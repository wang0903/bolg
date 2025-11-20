<template><div><h1 id="traefik" tabindex="-1"><a class="header-anchor" href="#traefik" aria-hidden="true">#</a> traefik</h1>
<h1 id="traefik安装" tabindex="-1"><a class="header-anchor" href="#traefik安装" aria-hidden="true">#</a> traefik安装</h1>
<h2 id="_1、创建traefik-values-yaml-修改values-yaml配置" tabindex="-1"><a class="header-anchor" href="#_1、创建traefik-values-yaml-修改values-yaml配置" aria-hidden="true">#</a> 1、创建traefik-values.yaml 修改values.yaml配置</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">certificatesResolvers</span><span class="token punctuation">:</span>
  <span class="token key atrule">myresolver</span><span class="token punctuation">:</span>
    <span class="token key atrule">acme</span><span class="token punctuation">:</span>
      <span class="token key atrule">email</span><span class="token punctuation">:</span> admin@xxxxxx.com
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> /data/acme.json
      <span class="token key atrule">httpChallenge</span><span class="token punctuation">:</span>
        <span class="token key atrule">entryPoint</span><span class="token punctuation">:</span> web

<span class="token key atrule">additionalArguments</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">"--entrypoints.web.address=:80"</span>
  <span class="token punctuation">-</span> <span class="token string">"--entrypoints.websecure.address=:443"</span>
  <span class="token punctuation">-</span> <span class="token string">"--entrypoints.web.http.redirections.entryPoint.to=websecure"</span>
  <span class="token punctuation">-</span> <span class="token string">"--entrypoints.web.http.redirections.entryPoint.scheme=https"</span>
  <span class="token punctuation">-</span> <span class="token string">"--log.level=INFO"</span>
  <span class="token punctuation">-</span> <span class="token string">"--accesslog=true"</span>
  <span class="token punctuation">-</span> <span class="token string">"--metrics.prometheus=true"</span>

<span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> LoadBalancer

<span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">websecure</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

<span class="token key atrule">ingressRoute</span><span class="token punctuation">:</span>
  <span class="token key atrule">dashboard</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">domain</span><span class="token punctuation">:</span> traefik<span class="token punctuation">-</span>dashboard.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、安装" tabindex="-1"><a class="header-anchor" href="#_2、安装" aria-hidden="true">#</a> 2、安装</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> traefik traefik/traefik <span class="token punctuation">\</span>
  <span class="token parameter variable">-f</span> traefik-values.yaml <span class="token punctuation">\</span>
  <span class="token parameter variable">--namespace</span> tgpord<span class="token punctuation">\</span>
  --create-namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建证书文件之后</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm upgrade <span class="token operator">&lt;</span>release-name<span class="token operator">></span> <span class="token operator">&lt;</span>chart-name<span class="token operator">></span> <span class="token punctuation">\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">tls.enabled</span><span class="token operator">=</span>true <span class="token punctuation">\</span>
  <span class="token parameter variable">--set</span> <span class="token assign-left variable">tls.secretName</span><span class="token operator">=</span>your-tls-secret-name <span class="token punctuation">\</span>
  <span class="token parameter variable">--namespace</span> default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>   helm repo update
   helm upgrade traefik traefik/traefik <span class="token punctuation">-</span>f traefik<span class="token punctuation">-</span>values.yaml <span class="token punctuation">-</span>n tgpord
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、创建-ingressroute-资源-前端文件" tabindex="-1"><a class="header-anchor" href="#_3、创建-ingressroute-资源-前端文件" aria-hidden="true">#</a> 3、创建 IngressRoute 资源,前端文件</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRoute
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>web<span class="token punctuation">-</span>ingressroute
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> websecure
  <span class="token key atrule">routes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">match</span><span class="token punctuation">:</span> Host(`k8s.xxxxxxxxx.com`) <span class="token comment"># 匹配所有前端路径,填写域名</span>
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> Rule
      <span class="token key atrule">services</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>web  <span class="token comment"># 前端服务名称</span>
          <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>       <span class="token comment"># 前端服务的端口</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token key atrule">certResolver</span><span class="token punctuation">:</span> myresolver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、创建-ingressroute-资源-后端文件" tabindex="-1"><a class="header-anchor" href="#_3、创建-ingressroute-资源-后端文件" aria-hidden="true">#</a> 3、创建 IngressRoute 资源,后端文件</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRoute
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>server<span class="token punctuation">-</span>ingressroute
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">traefik.ingress.kubernetes.io/router.entrypoints</span><span class="token punctuation">:</span> websecure
    <span class="token key atrule">traefik.ingress.kubernetes.io/router.middlewares</span><span class="token punctuation">:</span> tgpord<span class="token punctuation">-</span>tg<span class="token punctuation">-</span>middleware<span class="token punctuation">-</span>rewrite
    <span class="token key atrule">traefik.ingress.kubernetes.io/router.tls</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> websecure
  <span class="token key atrule">routes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">match</span><span class="token punctuation">:</span> Host(`k8s.xxxxxxxxx.com`) <span class="token important">&amp;&amp;</span> PathPrefix(`/app<span class="token punctuation">-</span>api`) <span class="token punctuation">|</span><span class="token punctuation">|</span> PathPrefix(`/admin<span class="token punctuation">-</span>api`) <span class="token comment"># 仅匹配后端的 API 请求</span>
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> Rule
      <span class="token key atrule">services</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>server <span class="token comment"># 后端服务名称</span>
          <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">48080</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token key atrule">certResolver</span><span class="token punctuation">:</span> myresolver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、创建-middleware-资源" tabindex="-1"><a class="header-anchor" href="#_4、创建-middleware-资源" aria-hidden="true">#</a> 4、创建 Middleware 资源</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Middleware
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tg<span class="token punctuation">-</span>middleware<span class="token punctuation">-</span>rewrite
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> tgpord
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replacePathRegex</span><span class="token punctuation">:</span>
    <span class="token key atrule">regex</span><span class="token punctuation">:</span> <span class="token string">"^/(.*?)-api/(.*)"</span>
    <span class="token key atrule">replacement</span><span class="token punctuation">:</span> <span class="token string">"/$2"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、验证-loadbalancer-类型的服务已配置" tabindex="-1"><a class="header-anchor" href="#_5、验证-loadbalancer-类型的服务已配置" aria-hidden="true">#</a> 5、验证 LoadBalancer 类型的服务已配置</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl get svc <span class="token parameter variable">-n</span> traefik
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


