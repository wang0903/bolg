<template><div><h1 id="traefik" tabindex="-1"><a class="header-anchor" href="#traefik" aria-hidden="true">#</a> traefik</h1>
<h2 id="traefik网络架构案例代码" tabindex="-1"><a class="header-anchor" href="#traefik网络架构案例代码" aria-hidden="true">#</a> traefik网络架构案例代码</h2>
<h3 id="traefik-deployment代码" tabindex="-1"><a class="header-anchor" href="#traefik-deployment代码" aria-hidden="true">#</a> traefik-deployment代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik<span class="token punctuation">-</span>ingress<span class="token punctuation">-</span>controller

<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> traefik

<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> traefik
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> traefik
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">dnsPolicy</span><span class="token punctuation">:</span> ClusterFirstWithHostNet     <span class="token comment"># 调整策略</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> traefik<span class="token punctuation">-</span>ingress<span class="token punctuation">-</span>controller
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik
          <span class="token key atrule">image</span><span class="token punctuation">:</span> traefik<span class="token punctuation">:</span>v2.9
          <span class="token key atrule">args</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>api.insecure
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>accesslog
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>entrypoints.web.Address=<span class="token punctuation">:</span><span class="token number">8000</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>entrypoints.websecure.Address=<span class="token punctuation">:</span><span class="token number">4443</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>providers.kubernetescrd
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>certificatesresolvers.myresolver.acme.tlschallenge
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>certificatesresolvers.myresolver.acme.email=foo@you.com
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>certificatesresolvers.myresolver.acme.storage=acme.json
<span class="token comment">#             Please note that this is the staging Let's Encrypt server.</span>
<span class="token comment">#             Once you get things working, you should remove that whole line altogether.</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>certificatesresolvers.myresolver.acme.caserver=https<span class="token punctuation">:</span>//acme<span class="token punctuation">-</span>staging<span class="token punctuation">-</span>v02.api.letsencrypt.org/directory
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> web
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8000</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> websecure
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">4443</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
      <span class="token comment"># 修改为指定 运行 traefik controller 节点</span>
      <span class="token key atrule">nodeName</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>n4


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="traefik-service-代码" tabindex="-1"><a class="header-anchor" href="#traefik-service-代码" aria-hidden="true">#</a> traefik-service 代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik

<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">name</span><span class="token punctuation">:</span> web
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">name</span><span class="token punctuation">:</span> websecure
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">4443</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> traefik

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kubernetes-crd-rbac代码" tabindex="-1"><a class="header-anchor" href="#kubernetes-crd-rbac代码" aria-hidden="true">#</a> kubernetes-crd-rbac代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik<span class="token punctuation">-</span>ingress<span class="token punctuation">-</span>controller

<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">""</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> services
      <span class="token punctuation">-</span> endpoints
      <span class="token punctuation">-</span> secrets
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> get
      <span class="token punctuation">-</span> list
      <span class="token punctuation">-</span> watch
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> extensions
      <span class="token punctuation">-</span> networking.k8s.io
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ingresses
      <span class="token punctuation">-</span> ingressclasses
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> get
      <span class="token punctuation">-</span> list
      <span class="token punctuation">-</span> watch
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> extensions
      <span class="token punctuation">-</span> networking.k8s.io
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ingresses/status
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> update
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> traefik.containo.us
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> middlewares
      <span class="token punctuation">-</span> middlewaretcps
      <span class="token punctuation">-</span> ingressroutes
      <span class="token punctuation">-</span> traefikservices
      <span class="token punctuation">-</span> ingressroutetcps
      <span class="token punctuation">-</span> ingressrouteudps
      <span class="token punctuation">-</span> tlsoptions
      <span class="token punctuation">-</span> tlsstores
      <span class="token punctuation">-</span> serverstransports
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> get
      <span class="token punctuation">-</span> list
      <span class="token punctuation">-</span> watch

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik<span class="token punctuation">-</span>ingress<span class="token punctuation">-</span>controller

<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik<span class="token punctuation">-</span>ingress<span class="token punctuation">-</span>controller
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik<span class="token punctuation">-</span>ingress<span class="token punctuation">-</span>controller
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kubernetes-crd-definition-v1代码" tabindex="-1"><a class="header-anchor" href="#kubernetes-crd-definition-v1代码" aria-hidden="true">#</a> kubernetes-crd-definition-v1代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingressroutes.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRoute
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> IngressRouteList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> ingressroutes
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> ingressroute
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> IngressRoute is the CRD implementation of a Traefik HTTP Router.
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> IngressRouteSpec defines the desired state of IngressRoute.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'EntryPoints defines the list of entry point names to
                  bind to. Entry points have to be configured in the static configuration.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/entrypoints/
                  <span class="token key atrule">Default</span><span class="token punctuation">:</span> all.'
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">routes</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> Routes defines the list of routes.
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">description</span><span class="token punctuation">:</span> Route holds the HTTP route configuration.
                  <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                    <span class="token key atrule">kind</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> Kind defines the kind of the route. Rule is the
                        only supported kind.
                      <span class="token key atrule">enum</span><span class="token punctuation">:</span>
                      <span class="token punctuation">-</span> Rule
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">match</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Match defines the router''s rule. More info<span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/routers/<span class="token comment">#rule'</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">middlewares</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Middlewares defines the list of references to
                        <span class="token key atrule">Middleware resources. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/providers/kubernetes<span class="token punctuation">-</span>crd/<span class="token comment">#kind-middleware'</span>
                      <span class="token key atrule">items</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> MiddlewareRef is a reference to a Middleware
                          resource.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">name</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Middleware
                              resource.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                              Middleware resource.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">required</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> name
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                    <span class="token key atrule">priority</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Priority defines the router''s priority. More
                        <span class="token key atrule">info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/routers/<span class="token comment">#priority'</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token key atrule">services</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> Services defines the list of Service. It can contain
                        any combination of TraefikService and/or reference to a Kubernetes
                        Service.
                      <span class="token key atrule">items</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Service defines an upstream HTTP service to proxy
                          traffic to.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Kind defines the kind of the Service.
                            <span class="token key atrule">enum</span><span class="token punctuation">:</span>
                            <span class="token punctuation">-</span> Service
                            <span class="token punctuation">-</span> TraefikService
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">name</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Kubernetes
                              Service or TraefikService. The differentiation between
                              the two is specified in the Kind field.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                              Kubernetes Service or TraefikService.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">passHostHeader</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> PassHostHeader defines whether the client
                              Host header is forwarded to the upstream Kubernetes
                              Service. By default<span class="token punctuation">,</span> passHostHeader is true.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">port</span><span class="token punctuation">:</span>
                            <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                            <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                            <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Port defines the port of a Kubernetes Service.
                              This can be a reference to a named port.
                            <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                          <span class="token key atrule">responseForwarding</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> ResponseForwarding defines how Traefik forwards
                              the response from the upstream Kubernetes Service to
                              the client.
                            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                              <span class="token key atrule">flushInterval</span><span class="token punctuation">:</span>
                                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'FlushInterval defines the interval<span class="token punctuation">,</span>
                                  in milliseconds<span class="token punctuation">,</span> in between flushes to the client
                                  while copying the response body. A negative value
                                  means to flush immediately after each write to the
                                  client. This configuration is ignored when ReverseProxy
                                  recognizes a response as a streaming response; for
                                  such responses<span class="token punctuation">,</span> writes are flushed to the client
                                  <span class="token key atrule">immediately. Default</span><span class="token punctuation">:</span> 100ms'
                                <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                          <span class="token key atrule">scheme</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Scheme defines the scheme to use for the
                              request to the upstream Kubernetes Service. It defaults
                              to https when Kubernetes Service port is 443<span class="token punctuation">,</span> http otherwise.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">serversTransport</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> ServersTransport defines the name of ServersTransport
                              resource to use. It allows to configure the transport
                              between Traefik and your servers. Can only be used on
                              a Kubernetes Service.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">sticky</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Sticky defines the sticky sessions configuration.
                              <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/services/<span class="token comment">#sticky-sessions'</span>
                            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                              <span class="token key atrule">cookie</span><span class="token punctuation">:</span>
                                <span class="token key atrule">description</span><span class="token punctuation">:</span> Cookie defines the sticky cookie configuration.
                                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">httpOnly</span><span class="token punctuation">:</span>
                                    <span class="token key atrule">description</span><span class="token punctuation">:</span> HTTPOnly defines whether the cookie
                                      can be accessed by client<span class="token punctuation">-</span>side APIs<span class="token punctuation">,</span> such as
                                      JavaScript.
                                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                                  <span class="token key atrule">name</span><span class="token punctuation">:</span>
                                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the Cookie name.
                                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                                  <span class="token key atrule">sameSite</span><span class="token punctuation">:</span>
                                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'SameSite defines the same site policy.
                                      <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//developer.mozilla.org/en<span class="token punctuation">-</span>US/docs/Web/HTTP/Headers/Set<span class="token punctuation">-</span>Cookie/SameSite'
                                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                                  <span class="token key atrule">secure</span><span class="token punctuation">:</span>
                                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Secure defines whether the cookie
                                      can only be transmitted over an encrypted connection
                                      (i.e. HTTPS).
                                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                          <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Strategy defines the load balancing strategy
                              between the servers. RoundRobin is the only supported
                              value at the moment.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">weight</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Weight defines the weight and should only
                              be specified when Name references a TraefikService object
                              (and to be precise<span class="token punctuation">,</span> one that embeds a Weighted Round
                              Robin).
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                        <span class="token key atrule">required</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> name
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">required</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> kind
                  <span class="token punctuation">-</span> match
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">tls</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'TLS defines the TLS configuration. More info: https://doc.traefik.io/traefik/v2.9/routing/routers/#tls'</span>
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">certResolver</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'CertResolver defines the name of the certificate
                      resolver to use. Cert resolvers have to be configured in the
                      <span class="token key atrule">static configuration. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/acme/<span class="token comment">#certificate-resolvers'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">domains</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Domains defines the list of domains that will be
                      <span class="token key atrule">used to issue certificates. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/routers/<span class="token comment">#domains'</span>
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> Domain holds a domain name with SANs.
                      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                        <span class="token key atrule">main</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Main defines the main domain name.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">sans</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> SANs defines the subject alternative domain
                            names.
                          <span class="token key atrule">items</span><span class="token punctuation">:</span>
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">options</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Options defines the reference to a TLSOption<span class="token punctuation">,</span> that
                      specifies the parameters of the TLS connection. If not defined<span class="token punctuation">,</span>
                      <span class="token key atrule">the `default` TLSOption is used. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/tls/<span class="token comment">#tls-options'</span>
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">name</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Name defines the name of the referenced TLSOption.
                          <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/providers/kubernetes<span class="token punctuation">-</span>crd/<span class="token comment">#kind-tlsoption'</span>
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Namespace defines the namespace of the referenced
                          <span class="token key atrule">TLSOption. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/providers/kubernetes<span class="token punctuation">-</span>crd/<span class="token comment">#kind-tlsoption'</span>
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">required</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> name
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">secretName</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> SecretName is the name of the referenced Kubernetes
                      Secret to specify the certificate details.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">store</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Store defines the reference to the TLSStore<span class="token punctuation">,</span> that
                      will be used to store certificates. Please note that only `default`
                      TLSStore can be used.
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">name</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Name defines the name of the referenced TLSStore.
                          <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/providers/kubernetes<span class="token punctuation">-</span>crd/<span class="token comment">#kind-tlsstore'</span>
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Namespace defines the namespace of the referenced
                          <span class="token key atrule">TLSStore. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/providers/kubernetes<span class="token punctuation">-</span>crd/<span class="token comment">#kind-tlsstore'</span>
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">required</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> name
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
            <span class="token key atrule">required</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> routes
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingressroutetcps.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRouteTCP
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> IngressRouteTCPList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> ingressroutetcps
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> ingressroutetcp
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> IngressRouteTCP is the CRD implementation of a Traefik TCP Router.
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> IngressRouteTCPSpec defines the desired state of IngressRouteTCP.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'EntryPoints defines the list of entry point names to
                  bind to. Entry points have to be configured in the static configuration.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/entrypoints/
                  <span class="token key atrule">Default</span><span class="token punctuation">:</span> all.'
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">routes</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> Routes defines the list of routes.
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">description</span><span class="token punctuation">:</span> RouteTCP holds the TCP route configuration.
                  <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                    <span class="token key atrule">match</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Match defines the router''s rule. More info<span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/routers/<span class="token comment">#rule_1'</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">middlewares</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> Middlewares defines the list of references to MiddlewareTCP
                        resources.
                      <span class="token key atrule">items</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> ObjectReference is a generic reference to a Traefik
                          resource.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">name</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Traefik
                              resource.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                              Traefik resource.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">required</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> name
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                    <span class="token key atrule">priority</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Priority defines the router''s priority. More
                        <span class="token key atrule">info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/routers/<span class="token comment">#priority_1'</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token key atrule">services</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> Services defines the list of TCP services.
                      <span class="token key atrule">items</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> ServiceTCP defines an upstream TCP service to
                          proxy traffic to.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">name</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Kubernetes
                              Service.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                              Kubernetes Service.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">port</span><span class="token punctuation">:</span>
                            <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                            <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                            <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Port defines the port of a Kubernetes Service.
                              This can be a reference to a named port.
                            <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                          <span class="token key atrule">proxyProtocol</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'ProxyProtocol defines the PROXY protocol
                              <span class="token key atrule">configuration. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/services/<span class="token comment">#proxy-protocol'</span>
                            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                              <span class="token key atrule">version</span><span class="token punctuation">:</span>
                                <span class="token key atrule">description</span><span class="token punctuation">:</span> Version defines the PROXY Protocol version
                                  to use.
                                <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                          <span class="token key atrule">terminationDelay</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> TerminationDelay defines the deadline that
                              the proxy sets<span class="token punctuation">,</span> after one of its connected peers indicates
                              it has closed the writing capability of its connection<span class="token punctuation">,</span>
                              to close the reading capability as well<span class="token punctuation">,</span> hence fully
                              terminating the connection. It is a duration in milliseconds<span class="token punctuation">,</span>
                              defaulting to 100. A negative value means an infinite
                              deadline (i.e. the reading capability is never closed).
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                          <span class="token key atrule">weight</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Weight defines the weight used when balancing
                              requests between multiple Kubernetes Service.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                        <span class="token key atrule">required</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> name
                        <span class="token punctuation">-</span> port
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">required</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> match
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">tls</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'TLS defines the TLS configuration on a layer 4 / TCP
                  <span class="token key atrule">Route. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/routers/<span class="token comment">#tls_1'</span>
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">certResolver</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'CertResolver defines the name of the certificate
                      resolver to use. Cert resolvers have to be configured in the
                      <span class="token key atrule">static configuration. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/acme/<span class="token comment">#certificate-resolvers'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">domains</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Domains defines the list of domains that will be
                      <span class="token key atrule">used to issue certificates. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/routers/<span class="token comment">#domains'</span>
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> Domain holds a domain name with SANs.
                      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                        <span class="token key atrule">main</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Main defines the main domain name.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">sans</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> SANs defines the subject alternative domain
                            names.
                          <span class="token key atrule">items</span><span class="token punctuation">:</span>
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">options</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Options defines the reference to a TLSOption<span class="token punctuation">,</span> that
                      specifies the parameters of the TLS connection. If not defined<span class="token punctuation">,</span>
                      <span class="token key atrule">the `default` TLSOption is used. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/tls/<span class="token comment">#tls-options'</span>
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">name</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Traefik
                          resource.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                          Traefik resource.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">required</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> name
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">passthrough</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Passthrough defines whether a TLS router will terminate
                      the TLS connection.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">secretName</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> SecretName is the name of the referenced Kubernetes
                      Secret to specify the certificate details.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">store</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Store defines the reference to the TLSStore<span class="token punctuation">,</span> that
                      will be used to store certificates. Please note that only `default`
                      TLSStore can be used.
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">name</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Traefik
                          resource.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                          Traefik resource.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">required</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> name
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
            <span class="token key atrule">required</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> routes
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingressrouteudps.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRouteUDP
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> IngressRouteUDPList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> ingressrouteudps
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> ingressrouteudp
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> IngressRouteUDP is a CRD implementation of a Traefik UDP Router.
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> IngressRouteUDPSpec defines the desired state of a IngressRouteUDP.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'EntryPoints defines the list of entry point names to
                  bind to. Entry points have to be configured in the static configuration.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/entrypoints/
                  <span class="token key atrule">Default</span><span class="token punctuation">:</span> all.'
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">routes</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> Routes defines the list of routes.
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">description</span><span class="token punctuation">:</span> RouteUDP holds the UDP route configuration.
                  <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                    <span class="token key atrule">services</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> Services defines the list of UDP services.
                      <span class="token key atrule">items</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> ServiceUDP defines an upstream UDP service to
                          proxy traffic to.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">name</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Kubernetes
                              Service.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                              Kubernetes Service.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">port</span><span class="token punctuation">:</span>
                            <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                            <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                            <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Port defines the port of a Kubernetes Service.
                              This can be a reference to a named port.
                            <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                          <span class="token key atrule">weight</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Weight defines the weight used when balancing
                              requests between multiple Kubernetes Service.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                        <span class="token key atrule">required</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> name
                        <span class="token punctuation">-</span> port
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
            <span class="token key atrule">required</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> routes
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> middlewares.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Middleware
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> MiddlewareList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> middlewares
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> middleware
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Middleware is the CRD implementation of a Traefik Middleware.
          <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/overview/'
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> MiddlewareSpec defines the desired state of a Middleware.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">addPrefix</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'AddPrefix holds the add prefix middleware configuration.
                  This middleware updates the path of a request before forwarding
                  <span class="token key atrule">it. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/addprefix/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">prefix</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Prefix is the string to add before the current path
                      in the requested URL. It should include a leading slash (/).
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">basicAuth</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'BasicAuth holds the basic auth middleware configuration.
                  This middleware restricts access to your services to known users.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/basicauth/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">headerField</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'HeaderField defines a header field to store the
                      <span class="token key atrule">authenticated user. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/basicauth/<span class="token comment">#headerfield'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">realm</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Realm allows the protected resources on a server
                      to be partitioned into a set of protection spaces<span class="token punctuation">,</span> each with
                      <span class="token key atrule">its own authentication scheme. Default</span><span class="token punctuation">:</span> traefik.'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">removeHeader</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'RemoveHeader sets the removeHeader option to true
                      to remove the authorization header before forwarding the request
                      <span class="token key atrule">to your service. Default</span><span class="token punctuation">:</span> false.'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">secret</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Secret is the name of the referenced Kubernetes Secret
                      containing user credentials.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">buffering</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Buffering holds the buffering middleware configuration.
                  This middleware retries or limits the size of requests that can
                  <span class="token key atrule">be forwarded to backends. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/buffering/<span class="token comment">#maxrequestbodybytes'</span>
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">maxRequestBodyBytes</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'MaxRequestBodyBytes defines the maximum allowed
                      body size for the request (in bytes). If the request exceeds
                      the allowed size<span class="token punctuation">,</span> it is not forwarded to the service<span class="token punctuation">,</span> and the
                      <span class="token key atrule">client gets a 413 (Request Entity Too Large) response. Default</span><span class="token punctuation">:</span>
                      0 (no maximum).'
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">maxResponseBodyBytes</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'MaxResponseBodyBytes defines the maximum allowed
                      response size from the service (in bytes). If the response exceeds
                      the allowed size<span class="token punctuation">,</span> it is not forwarded to the client. The client
                      <span class="token key atrule">gets a 500 (Internal Server Error) response instead. Default</span><span class="token punctuation">:</span>
                      0 (no maximum).'
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">memRequestBodyBytes</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'MemRequestBodyBytes defines the threshold (in bytes)
                      from which the request will be buffered on disk instead of in
                      <span class="token key atrule">memory. Default</span><span class="token punctuation">:</span> 1048576 (1Mi).'
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">memResponseBodyBytes</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'MemResponseBodyBytes defines the threshold (in bytes)
                      from which the response will be buffered on disk instead of
                      <span class="token key atrule">in memory. Default</span><span class="token punctuation">:</span> 1048576 (1Mi).'
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">retryExpression</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'RetryExpression defines the retry conditions. It
                      is a logical combination of functions with operators AND (<span class="token important">&amp;&amp;)</span>
                      <span class="token key atrule">and OR (||). More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/buffering/<span class="token comment">#retryexpression'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">chain</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Chain holds the configuration of the chain middleware.
                  This middleware enables to define reusable combinations of other
                  <span class="token key atrule">pieces of middleware. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/chain/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">middlewares</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Middlewares is the list of MiddlewareRef which composes
                      the chain.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> MiddlewareRef is a reference to a Middleware resource.
                      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                        <span class="token key atrule">name</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Middleware
                            resource.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                            Middleware resource.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">required</span><span class="token punctuation">:</span>
                      <span class="token punctuation">-</span> name
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">circuitBreaker</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> CircuitBreaker holds the circuit breaker configuration.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">checkPeriod</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> CheckPeriod is the interval between successive checks
                      of the circuit breaker condition (when in standby state).
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                  <span class="token key atrule">expression</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Expression is the condition that triggers the tripped
                      state.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">fallbackDuration</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> FallbackDuration is the duration for which the circuit
                      breaker will wait before trying to recover (from a tripped state).
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                  <span class="token key atrule">recoveryDuration</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> RecoveryDuration is the duration for which the circuit
                      breaker will try to recover (as soon as it is in recovering
                      state).
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">compress</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Compress holds the compress middleware configuration.
                  This middleware compresses responses before sending them to the
                  client<span class="token punctuation">,</span> <span class="token key atrule">using gzip compression. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/compress/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">excludedContentTypes</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ExcludedContentTypes defines the list of content
                      types to compare the Content<span class="token punctuation">-</span>Type header of the incoming requests
                      and responses before compressing.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">minResponseBodyBytes</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'MinResponseBodyBytes defines the minimum amount
                      <span class="token key atrule">of bytes a response body must have to be compressed. Default</span><span class="token punctuation">:</span>
                      1024.'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">contentType</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> ContentType holds the content<span class="token punctuation">-</span>type middleware configuration.
                  This middleware exists to enable the correct behavior until at least
                  the default one can be changed in a future version.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">autoDetect</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AutoDetect specifies whether to let the `Content<span class="token punctuation">-</span>Type`
                      header<span class="token punctuation">,</span> if it has not been set by the backend<span class="token punctuation">,</span> be automatically
                      set to a value derived from the contents of the response. As
                      a proxy<span class="token punctuation">,</span> the default behavior should be to leave the header
                      alone<span class="token punctuation">,</span> regardless of what the backend did with it. However<span class="token punctuation">,</span>
                      the historic default was to always auto<span class="token punctuation">-</span>detect and set the header
                      if it was nil<span class="token punctuation">,</span> and it is going to be kept that way in order
                      to support users currently relying on it.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">digestAuth</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'DigestAuth holds the digest auth middleware configuration.
                  This middleware restricts access to your services to known users.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/digestauth/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">headerField</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'HeaderField defines a header field to store the
                      <span class="token key atrule">authenticated user. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/basicauth/<span class="token comment">#headerfield'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">realm</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Realm allows the protected resources on a server
                      to be partitioned into a set of protection spaces<span class="token punctuation">,</span> each with
                      <span class="token key atrule">its own authentication scheme. Default</span><span class="token punctuation">:</span> traefik.'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">removeHeader</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> RemoveHeader defines whether to remove the authorization
                      header before forwarding the request to the backend.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">secret</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Secret is the name of the referenced Kubernetes Secret
                      containing user credentials.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">errors</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'ErrorPage holds the custom error middleware configuration.
                  This middleware returns a custom page in lieu of the default<span class="token punctuation">,</span> according
                  <span class="token key atrule">to configured ranges of HTTP Status codes. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/errorpages/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">query</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Query defines the URL for the error page (hosted
                      by service). The <span class="token punctuation">{</span>status<span class="token punctuation">}</span> variable can be used in order to insert
                      the status code in the URL.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">service</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Service defines the reference to a Kubernetes Service
                      <span class="token key atrule">that will serve the error page. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/errorpages/<span class="token comment">#service'</span>
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">kind</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Kind defines the kind of the Service.
                        <span class="token key atrule">enum</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> Service
                        <span class="token punctuation">-</span> TraefikService
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">name</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Kubernetes
                          Service or TraefikService. The differentiation between the
                          two is specified in the Kind field.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                          Kubernetes Service or TraefikService.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">passHostHeader</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> PassHostHeader defines whether the client Host
                          header is forwarded to the upstream Kubernetes Service.
                          By default<span class="token punctuation">,</span> passHostHeader is true.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                      <span class="token key atrule">port</span><span class="token punctuation">:</span>
                        <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                        <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Port defines the port of a Kubernetes Service.
                          This can be a reference to a named port.
                        <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                      <span class="token key atrule">responseForwarding</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> ResponseForwarding defines how Traefik forwards
                          the response from the upstream Kubernetes Service to the
                          client.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">flushInterval</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'FlushInterval defines the interval<span class="token punctuation">,</span> in milliseconds<span class="token punctuation">,</span>
                              in between flushes to the client while copying the response
                              body. A negative value means to flush immediately after
                              each write to the client. This configuration is ignored
                              when ReverseProxy recognizes a response as a streaming
                              response; for such responses<span class="token punctuation">,</span> writes are flushed to
                              <span class="token key atrule">the client immediately. Default</span><span class="token punctuation">:</span> 100ms'
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">scheme</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Scheme defines the scheme to use for the request
                          to the upstream Kubernetes Service. It defaults to https
                          when Kubernetes Service port is 443<span class="token punctuation">,</span> http otherwise.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">serversTransport</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> ServersTransport defines the name of ServersTransport
                          resource to use. It allows to configure the transport between
                          Traefik and your servers. Can only be used on a Kubernetes
                          Service.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">sticky</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Sticky defines the sticky sessions configuration.
                          <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/services/<span class="token comment">#sticky-sessions'</span>
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">cookie</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Cookie defines the sticky cookie configuration.
                            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                              <span class="token key atrule">httpOnly</span><span class="token punctuation">:</span>
                                <span class="token key atrule">description</span><span class="token punctuation">:</span> HTTPOnly defines whether the cookie can
                                  be accessed by client<span class="token punctuation">-</span>side APIs<span class="token punctuation">,</span> such as JavaScript.
                                <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                              <span class="token key atrule">name</span><span class="token punctuation">:</span>
                                <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the Cookie name.
                                <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                              <span class="token key atrule">sameSite</span><span class="token punctuation">:</span>
                                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'SameSite defines the same site policy.
                                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//developer.mozilla.org/en<span class="token punctuation">-</span>US/docs/Web/HTTP/Headers/Set<span class="token punctuation">-</span>Cookie/SameSite'
                                <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                              <span class="token key atrule">secure</span><span class="token punctuation">:</span>
                                <span class="token key atrule">description</span><span class="token punctuation">:</span> Secure defines whether the cookie can
                                  only be transmitted over an encrypted connection
                                  (i.e. HTTPS).
                                <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Strategy defines the load balancing strategy
                          between the servers. RoundRobin is the only supported value
                          at the moment.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">weight</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Weight defines the weight and should only be
                          specified when Name references a TraefikService object (and
                          to be precise<span class="token punctuation">,</span> one that embeds a Weighted Round Robin).
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token key atrule">required</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> name
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">status</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Status defines which status or range of statuses
                      should result in an error page. It can be either a status code
                      as a number (500)<span class="token punctuation">,</span> as multiple comma<span class="token punctuation">-</span>separated numbers (500<span class="token punctuation">,</span>502)<span class="token punctuation">,</span>
                      as ranges by separating two codes with a dash (500<span class="token punctuation">-</span>599)<span class="token punctuation">,</span> or
                      a combination of the two (404<span class="token punctuation">,</span><span class="token number">418</span><span class="token punctuation">,</span>500<span class="token punctuation">-</span>599).
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">forwardAuth</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'ForwardAuth holds the forward auth middleware configuration.
                  This middleware delegates the request authentication to a Service.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/forwardauth/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">address</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Address defines the authentication server address.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">authRequestHeaders</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AuthRequestHeaders defines the list of the headers
                      to copy from the request to the authentication server. If not
                      set or empty then all request headers are passed.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">authResponseHeaders</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AuthResponseHeaders defines the list of headers to
                      copy from the authentication server response and set on forwarded
                      request<span class="token punctuation">,</span> replacing any existing conflicting headers.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">authResponseHeadersRegex</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'AuthResponseHeadersRegex defines the regex to match
                      headers to copy from the authentication server response and
                      set on forwarded request<span class="token punctuation">,</span> after stripping all headers that match
                      <span class="token key atrule">the regex. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/forwardauth/<span class="token comment">#authresponseheadersregex'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> TLS defines the configuration used to secure the
                      connection to the authentication server.
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">caOptional</span><span class="token punctuation">:</span>
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                      <span class="token key atrule">caSecret</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> CASecret is the name of the referenced Kubernetes
                          Secret containing the CA to validate the server certificate.
                          The CA certificate is extracted from key `tls.ca` or `ca.crt`.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">certSecret</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> CertSecret is the name of the referenced Kubernetes
                          Secret containing the client certificate. The client certificate
                          is extracted from the keys `tls.crt` and `tls.key`.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">insecureSkipVerify</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> InsecureSkipVerify defines whether the server
                          certificates should be validated.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">trustForwardHeader</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'TrustForwardHeader defines whether to trust (ie<span class="token punctuation">:</span>
                      forward) all X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>* headers.'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">headers</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Headers holds the headers middleware configuration.
                  This middleware manages the requests and responses headers. More
                  <span class="token key atrule">info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/headers/<span class="token comment">#customrequestheaders'</span>
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">accessControlAllowCredentials</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AccessControlAllowCredentials defines whether the
                      request can include user credentials.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">accessControlAllowHeaders</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AccessControlAllowHeaders defines the Access<span class="token punctuation">-</span>Control<span class="token punctuation">-</span>Request<span class="token punctuation">-</span>Headers
                      values sent in preflight response.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">accessControlAllowMethods</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AccessControlAllowMethods defines the Access<span class="token punctuation">-</span>Control<span class="token punctuation">-</span>Request<span class="token punctuation">-</span>Method
                      values sent in preflight response.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">accessControlAllowOriginList</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AccessControlAllowOriginList is a list of allowable
                      origins. Can also be a wildcard origin "<span class="token important">*".</span>
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">accessControlAllowOriginListRegex</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AccessControlAllowOriginListRegex is a list of allowable
                      origins written following the Regular Expression syntax (https<span class="token punctuation">:</span>//golang.org/pkg/regexp/).
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">accessControlExposeHeaders</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AccessControlExposeHeaders defines the Access<span class="token punctuation">-</span>Control<span class="token punctuation">-</span>Expose<span class="token punctuation">-</span>Headers
                      values sent in preflight response.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">accessControlMaxAge</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AccessControlMaxAge defines the time that a preflight
                      request may be cached.
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">addVaryHeader</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AddVaryHeader defines whether the Vary header is
                      automatically added/updated when the AccessControlAllowOriginList
                      is set.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">allowedHosts</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> AllowedHosts defines the fully qualified list of
                      allowed domain names.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">browserXssFilter</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> BrowserXSSFilter defines whether to add the X<span class="token punctuation">-</span>XSS<span class="token punctuation">-</span>Protection
                      header with the value 1; mode=block.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">contentSecurityPolicy</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ContentSecurityPolicy defines the Content<span class="token punctuation">-</span>Security<span class="token punctuation">-</span>Policy
                      header value.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">contentTypeNosniff</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ContentTypeNosniff defines whether to add the X<span class="token punctuation">-</span>Content<span class="token punctuation">-</span>Type<span class="token punctuation">-</span>Options
                      header with the nosniff value.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">customBrowserXSSValue</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> CustomBrowserXSSValue defines the X<span class="token punctuation">-</span>XSS<span class="token punctuation">-</span>Protection
                      header value. This overrides the BrowserXssFilter option.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">customFrameOptionsValue</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> CustomFrameOptionsValue defines the X<span class="token punctuation">-</span>Frame<span class="token punctuation">-</span>Options
                      header value. This overrides the FrameDeny option.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">customRequestHeaders</span><span class="token punctuation">:</span>
                    <span class="token key atrule">additionalProperties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> CustomRequestHeaders defines the header names and
                      values to apply to the request.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">customResponseHeaders</span><span class="token punctuation">:</span>
                    <span class="token key atrule">additionalProperties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> CustomResponseHeaders defines the header names and
                      values to apply to the response.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">featurePolicy</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'Deprecated: use PermissionsPolicy instead.'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">forceSTSHeader</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ForceSTSHeader defines whether to add the STS header
                      even when the connection is HTTP.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">frameDeny</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> FrameDeny defines whether to add the X<span class="token punctuation">-</span>Frame<span class="token punctuation">-</span>Options
                      header with the DENY value.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">hostsProxyHeaders</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> HostsProxyHeaders defines the header keys that may
                      hold a proxied hostname value for the request.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">isDevelopment</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> IsDevelopment defines whether to mitigate the unwanted
                      effects of the AllowedHosts<span class="token punctuation">,</span> SSL<span class="token punctuation">,</span> and STS options when developing.
                      Usually testing takes place using HTTP<span class="token punctuation">,</span> not HTTPS<span class="token punctuation">,</span> and on localhost<span class="token punctuation">,</span>
                      not your production domain. If you would like your development
                      environment to mimic production with complete Host blocking<span class="token punctuation">,</span>
                      SSL redirects<span class="token punctuation">,</span> and STS headers<span class="token punctuation">,</span> leave this as false.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">permissionsPolicy</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> PermissionsPolicy defines the Permissions<span class="token punctuation">-</span>Policy
                      header value. This allows sites to control browser features.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">publicKey</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> PublicKey is the public key that implements HPKP
                      to prevent MITM attacks with forged certificates.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">referrerPolicy</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ReferrerPolicy defines the Referrer<span class="token punctuation">-</span>Policy header
                      value. This allows sites to control whether browsers forward
                      the Referer header to other sites.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">sslForceHost</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'Deprecated: use RedirectRegex instead.'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">sslHost</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'Deprecated: use RedirectRegex instead.'</span>
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">sslProxyHeaders</span><span class="token punctuation">:</span>
                    <span class="token key atrule">additionalProperties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'SSLProxyHeaders defines the header keys with associated
                      values that would indicate a valid HTTPS request. It can be
                      <span class="token key atrule">useful when using other proxies (example</span><span class="token punctuation">:</span> <span class="token key atrule">"X-Forwarded-Proto"</span><span class="token punctuation">:</span>
                      "https").'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">sslRedirect</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Deprecated<span class="token punctuation">:</span> use EntryPoint redirection or RedirectScheme
                      instead.'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">sslTemporaryRedirect</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Deprecated<span class="token punctuation">:</span> use EntryPoint redirection or RedirectScheme
                      instead.'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">stsIncludeSubdomains</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> STSIncludeSubdomains defines whether the includeSubDomains
                      directive is appended to the Strict<span class="token punctuation">-</span>Transport<span class="token punctuation">-</span>Security header.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">stsPreload</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> STSPreload defines whether the preload flag is appended
                      to the Strict<span class="token punctuation">-</span>Transport<span class="token punctuation">-</span>Security header.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">stsSeconds</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> STSSeconds defines the max<span class="token punctuation">-</span>age of the Strict<span class="token punctuation">-</span>Transport<span class="token punctuation">-</span>Security
                      header. If set to 0<span class="token punctuation">,</span> the header is not set.
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">inFlightReq</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'InFlightReq holds the in<span class="token punctuation">-</span>flight request middleware configuration.
                  This middleware limits the number of requests being processed and
                  <span class="token key atrule">served concurrently. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/inflightreq/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">amount</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Amount defines the maximum amount of allowed simultaneous
                      in<span class="token punctuation">-</span>flight request. The middleware responds with HTTP 429 Too
                      Many Requests if there are already amount requests in progress
                      (based on the same sourceCriterion strategy).
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">sourceCriterion</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'SourceCriterion defines what criterion is used to
                      group requests as originating from a common source. If several
                      strategies are defined at the same time<span class="token punctuation">,</span> an error will be raised.
                      If none are set<span class="token punctuation">,</span> the default is to use the requestHost. More
                      <span class="token key atrule">info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/inflightreq/<span class="token comment">#sourcecriterion'</span>
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">ipStrategy</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'IPStrategy holds the IP strategy configuration
                          <span class="token key atrule">used by Traefik to determine the client IP. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/ipwhitelist/<span class="token comment">#ipstrategy'</span>
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">depth</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Depth tells Traefik to use the X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>For
                              header and take the IP located at the depth position
                              (starting from the right).
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                          <span class="token key atrule">excludedIPs</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> ExcludedIPs configures Traefik to scan the
                              X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>For header and select the first IP not in
                              the list.
                            <span class="token key atrule">items</span><span class="token punctuation">:</span>
                              <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">requestHeaderName</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> RequestHeaderName defines the name of the header
                          used to group incoming requests.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">requestHost</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> RequestHost defines whether to consider the request
                          Host as the source.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">ipWhiteList</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'IPWhiteList holds the IP whitelist middleware configuration.
                  This middleware accepts / refuses requests based on the client IP.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/ipwhitelist/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">ipStrategy</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'IPStrategy holds the IP strategy configuration used
                      <span class="token key atrule">by Traefik to determine the client IP. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/ipwhitelist/<span class="token comment">#ipstrategy'</span>
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">depth</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Depth tells Traefik to use the X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>For
                          header and take the IP located at the depth position (starting
                          from the right).
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                      <span class="token key atrule">excludedIPs</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> ExcludedIPs configures Traefik to scan the X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>For
                          header and select the first IP not in the list.
                        <span class="token key atrule">items</span><span class="token punctuation">:</span>
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">sourceRange</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> SourceRange defines the set of allowed IPs (or ranges
                      of allowed IPs by using CIDR notation).
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">passTLSClientCert</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'PassTLSClientCert holds the pass TLS client cert middleware
                  configuration. This middleware adds the selected data from the passed
                  <span class="token key atrule">client TLS certificate to a header. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/passtlsclientcert/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">info</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Info selects the specific client certificate details
                      you want to add to the X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>Tls<span class="token punctuation">-</span>Client<span class="token punctuation">-</span>Cert<span class="token punctuation">-</span>Info header.
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">issuer</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Issuer defines the client certificate issuer
                          details to add to the X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>Tls<span class="token punctuation">-</span>Client<span class="token punctuation">-</span>Cert<span class="token punctuation">-</span>Info header.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">commonName</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> CommonName defines whether to add the organizationalUnit
                              information into the issuer.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">country</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Country defines whether to add the country
                              information into the issuer.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">domainComponent</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> DomainComponent defines whether to add the
                              domainComponent information into the issuer.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">locality</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Locality defines whether to add the locality
                              information into the issuer.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">organization</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Organization defines whether to add the organization
                              information into the issuer.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">province</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Province defines whether to add the province
                              information into the issuer.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">serialNumber</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> SerialNumber defines whether to add the serialNumber
                              information into the issuer.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">notAfter</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> NotAfter defines whether to add the Not After
                          information from the Validity part.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                      <span class="token key atrule">notBefore</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> NotBefore defines whether to add the Not Before
                          information from the Validity part.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                      <span class="token key atrule">sans</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Sans defines whether to add the Subject Alternative
                          Name information from the Subject Alternative Name part.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                      <span class="token key atrule">serialNumber</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> SerialNumber defines whether to add the client
                          serialNumber information.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                      <span class="token key atrule">subject</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Subject defines the client certificate subject
                          details to add to the X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>Tls<span class="token punctuation">-</span>Client<span class="token punctuation">-</span>Cert<span class="token punctuation">-</span>Info header.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">commonName</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> CommonName defines whether to add the organizationalUnit
                              information into the subject.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">country</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Country defines whether to add the country
                              information into the subject.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">domainComponent</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> DomainComponent defines whether to add the
                              domainComponent information into the subject.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">locality</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Locality defines whether to add the locality
                              information into the subject.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">organization</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Organization defines whether to add the organization
                              information into the subject.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">organizationalUnit</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> OrganizationalUnit defines whether to add
                              the organizationalUnit information into the subject.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">province</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Province defines whether to add the province
                              information into the subject.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">serialNumber</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> SerialNumber defines whether to add the serialNumber
                              information into the subject.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">pem</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> PEM sets the X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>Tls<span class="token punctuation">-</span>Client<span class="token punctuation">-</span>Cert header with
                      the certificate.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">plugin</span><span class="token punctuation">:</span>
                <span class="token key atrule">additionalProperties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">x-kubernetes-preserve-unknown-fields</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Plugin defines the middleware plugin configuration.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/plugins/'
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">rateLimit</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'RateLimit holds the rate limit configuration. This middleware
                  ensures that services will receive a fair amount of requests<span class="token punctuation">,</span> and
                  <span class="token key atrule">allows one to define what fair is. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/ratelimit/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">average</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Average is the maximum rate<span class="token punctuation">,</span> by default in requests/s<span class="token punctuation">,</span>
                      allowed for the given source. It defaults to 0<span class="token punctuation">,</span> which means
                      no rate limiting. The rate is actually defined by dividing Average
                      by Period. So for a rate below 1req/s<span class="token punctuation">,</span> one needs to define a
                      Period larger than a second.
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">burst</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Burst is the maximum number of requests allowed to
                      arrive in the same arbitrarily small period of time. It defaults
                      to 1.
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">period</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Period<span class="token punctuation">,</span> in combination with Average<span class="token punctuation">,</span> defines the
                      actual maximum rate<span class="token punctuation">,</span> <span class="token key atrule">such as</span><span class="token punctuation">:</span> r = Average / Period. It defaults
                      to a second.'
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                  <span class="token key atrule">sourceCriterion</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> SourceCriterion defines what criterion is used to
                      group requests as originating from a common source. If several
                      strategies are defined at the same time<span class="token punctuation">,</span> an error will be raised.
                      If none are set<span class="token punctuation">,</span> the default is to use the request's remote
                      address field (as an ipStrategy).
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">ipStrategy</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'IPStrategy holds the IP strategy configuration
                          <span class="token key atrule">used by Traefik to determine the client IP. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/ipwhitelist/<span class="token comment">#ipstrategy'</span>
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">depth</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Depth tells Traefik to use the X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>For
                              header and take the IP located at the depth position
                              (starting from the right).
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                          <span class="token key atrule">excludedIPs</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> ExcludedIPs configures Traefik to scan the
                              X<span class="token punctuation">-</span>Forwarded<span class="token punctuation">-</span>For header and select the first IP not in
                              the list.
                            <span class="token key atrule">items</span><span class="token punctuation">:</span>
                              <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                      <span class="token key atrule">requestHeaderName</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> RequestHeaderName defines the name of the header
                          used to group incoming requests.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">requestHost</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> RequestHost defines whether to consider the request
                          Host as the source.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">redirectRegex</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'RedirectRegex holds the redirect regex middleware configuration.
                  This middleware redirects a request using regex matching and replacement.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/redirectregex/<span class="token comment">#regex'</span>
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">permanent</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Permanent defines whether the redirection is permanent
                      (301).
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">regex</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Regex defines the regex used to match and capture
                      elements from the request URL.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">replacement</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Replacement defines how to modify the URL to have
                      the new target URL.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">redirectScheme</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'RedirectScheme holds the redirect scheme middleware
                  configuration. This middleware redirects requests from a scheme/port
                  <span class="token key atrule">to another. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/redirectscheme/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">permanent</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Permanent defines whether the redirection is permanent
                      (301).
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">port</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Port defines the port of the new URL.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">scheme</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Scheme defines the scheme of the new URL.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">replacePath</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'ReplacePath holds the replace path middleware configuration.
                  This middleware replaces the path of the request URL and store the
                  <span class="token key atrule">original path in an X-Replaced-Path header. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/replacepath/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">path</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Path defines the path to use as replacement in the
                      request URL.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">replacePathRegex</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'ReplacePathRegex holds the replace path regex middleware
                  configuration. This middleware replaces the path of a URL using
                  <span class="token key atrule">regex matching and replacement. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/replacepathregex/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">regex</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Regex defines the regular expression used to match
                      and capture the path from the request URL.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">replacement</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Replacement defines the replacement path format<span class="token punctuation">,</span>
                      which can include captured variables.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">retry</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Retry holds the retry middleware configuration. This
                  middleware reissues requests a given number of times to a backend
                  server if that server does not reply. As soon as the server answers<span class="token punctuation">,</span>
                  the middleware stops retrying<span class="token punctuation">,</span> regardless of the response status.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/retry/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">attempts</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Attempts defines how many times the request should
                      be retried.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">initialInterval</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> InitialInterval defines the first wait time in the
                      exponential backoff series. The maximum interval is calculated
                      as twice the initialInterval. If unspecified<span class="token punctuation">,</span> requests will
                      be retried immediately. The value of initialInterval should
                      be provided in seconds or as a valid duration format<span class="token punctuation">,</span> see https<span class="token punctuation">:</span>//pkg.go.dev/time<span class="token comment">#ParseDuration.</span>
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">stripPrefix</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'StripPrefix holds the strip prefix middleware configuration.
                  This middleware removes the specified prefixes from the URL path.
                  <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/stripprefix/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">forceSlash</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'ForceSlash ensures that the resulting stripped path
                      is not the empty string<span class="token punctuation">,</span> by replacing it with / when necessary.
                      <span class="token key atrule">Default</span><span class="token punctuation">:</span> true.'
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">prefixes</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Prefixes defines the prefixes to strip from the request
                      URL.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">stripPrefixRegex</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'StripPrefixRegex holds the strip prefix regex middleware
                  configuration. This middleware removes the matching prefixes from
                  <span class="token key atrule">the URL path. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/http/stripprefixregex/'
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">regex</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Regex defines the regular expression to match the
                      path prefix from the request URL.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> middlewaretcps.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> MiddlewareTCP
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> MiddlewareTCPList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> middlewaretcps
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> middlewaretcp
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'MiddlewareTCP is the CRD implementation of a Traefik TCP middleware.
          <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/middlewares/overview/'
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> MiddlewareTCPSpec defines the desired state of a MiddlewareTCP.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">inFlightConn</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> InFlightConn defines the InFlightConn middleware configuration.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">amount</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Amount defines the maximum amount of allowed simultaneous
                      connections. The middleware closes the connection if there are
                      already amount connections opened.
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">ipWhiteList</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> IPWhiteList defines the IPWhiteList middleware configuration.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">sourceRange</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> SourceRange defines the allowed IPs (or ranges of
                      allowed IPs by using CIDR notation).
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> serverstransports.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServersTransport
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> ServersTransportList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> serverstransports
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> serverstransport
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'ServersTransport is the CRD implementation of a ServersTransport.
          If no serversTransport is specified<span class="token punctuation">,</span> the default@internal will be used.
          The default@internal serversTransport is created from the static configuration.
          <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/services/<span class="token comment">#serverstransport_1'</span>
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> ServersTransportSpec defines the desired state of a ServersTransport.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">certificatesSecrets</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> CertificatesSecrets defines a list of secret storing
                  client certificates for mTLS.
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">disableHTTP2</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> DisableHTTP2 disables HTTP/2 for connections with backend
                  servers.
                <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
              <span class="token key atrule">forwardingTimeouts</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> ForwardingTimeouts defines the timeouts for requests
                  forwarded to the backend servers.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">dialTimeout</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> DialTimeout is the amount of time to wait until a
                      connection to a backend server can be established.
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                  <span class="token key atrule">idleConnTimeout</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> IdleConnTimeout is the maximum period for which an
                      idle HTTP keep<span class="token punctuation">-</span>alive connection will remain open before closing
                      itself.
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                  <span class="token key atrule">pingTimeout</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> PingTimeout is the timeout after which the HTTP/2
                      connection will be closed if a response to ping is not received.
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                  <span class="token key atrule">readIdleTimeout</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ReadIdleTimeout is the timeout after which a health
                      check using ping frame will be carried out if no frame is received
                      on the HTTP/2 connection.
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                  <span class="token key atrule">responseHeaderTimeout</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ResponseHeaderTimeout is the amount of time to wait
                      for a server's response headers after fully writing the request
                      (including its body<span class="token punctuation">,</span> if any).
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">insecureSkipVerify</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> InsecureSkipVerify disables SSL certificate verification.
                <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
              <span class="token key atrule">maxIdleConnsPerHost</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> MaxIdleConnsPerHost controls the maximum idle (keep<span class="token punctuation">-</span>alive)
                  to keep per<span class="token punctuation">-</span>host.
                <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
              <span class="token key atrule">peerCertURI</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> PeerCertURI defines the peer cert URI used to match against
                  SAN URI during the peer certificate verification.
                <span class="token key atrule">type</span><span class="token punctuation">:</span> string
              <span class="token key atrule">rootCAsSecrets</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> RootCAsSecrets defines a list of CA secret used to validate
                  self<span class="token punctuation">-</span>signed certificate.
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">serverName</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> ServerName defines the server name used to contact the
                  server.
                <span class="token key atrule">type</span><span class="token punctuation">:</span> string
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tlsoptions.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> TLSOption
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> TLSOptionList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> tlsoptions
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> tlsoption
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'TLSOption is the CRD implementation of a Traefik TLS Option<span class="token punctuation">,</span>
          <span class="token key atrule">allowing to configure some parameters of the TLS connection. More info</span><span class="token punctuation">:</span>
          https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/tls/<span class="token comment">#tls-options'</span>
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> TLSOptionSpec defines the desired state of a TLSOption.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">alpnProtocols</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'ALPNProtocols defines the list of supported application
                  level protocols for the TLS handshake<span class="token punctuation">,</span> in order of preference. More
                  <span class="token key atrule">info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/tls/<span class="token comment">#alpn-protocols'</span>
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">cipherSuites</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'CipherSuites defines the list of supported cipher suites
                  <span class="token key atrule">for TLS versions up to TLS 1.2. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/tls/<span class="token comment">#cipher-suites'</span>
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">clientAuth</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> ClientAuth defines the server's policy for TLS Client
                  Authentication.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">clientAuthType</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ClientAuthType defines the client authentication
                      type to apply.
                    <span class="token key atrule">enum</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> NoClientCert
                    <span class="token punctuation">-</span> RequestClientCert
                    <span class="token punctuation">-</span> RequireAnyClientCert
                    <span class="token punctuation">-</span> VerifyClientCertIfGiven
                    <span class="token punctuation">-</span> RequireAndVerifyClientCert
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">secretNames</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> SecretNames defines the names of the referenced Kubernetes
                      Secret storing certificate details.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">curvePreferences</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'CurvePreferences defines the preferred elliptic curves
                  <span class="token key atrule">in a specific order. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/tls/<span class="token comment">#curve-preferences'</span>
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">maxVersion</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'MaxVersion defines the maximum TLS version that Traefik
                  <span class="token key atrule">will accept. Possible values</span><span class="token punctuation">:</span> VersionTLS10<span class="token punctuation">,</span> VersionTLS11<span class="token punctuation">,</span> VersionTLS12<span class="token punctuation">,</span>
                  <span class="token key atrule">VersionTLS13. Default</span><span class="token punctuation">:</span> None.'
                <span class="token key atrule">type</span><span class="token punctuation">:</span> string
              <span class="token key atrule">minVersion</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'MinVersion defines the minimum TLS version that Traefik
                  <span class="token key atrule">will accept. Possible values</span><span class="token punctuation">:</span> VersionTLS10<span class="token punctuation">,</span> VersionTLS11<span class="token punctuation">,</span> VersionTLS12<span class="token punctuation">,</span>
                  <span class="token key atrule">VersionTLS13. Default</span><span class="token punctuation">:</span> VersionTLS10.'
                <span class="token key atrule">type</span><span class="token punctuation">:</span> string
              <span class="token key atrule">preferServerCipherSuites</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> 'PreferServerCipherSuites defines whether the server
                  chooses a cipher suite among his own instead of among the client''s.
                  It is enabled automatically when minVersion or maxVersion is set.
                  <span class="token key atrule">Deprecated</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/golang/go/issues/45430'
                <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
              <span class="token key atrule">sniStrict</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> SniStrict defines whether Traefik allows connections
                  from clients connections that do not specify a server_name extension.
                <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tlsstores.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> TLSStore
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> TLSStoreList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> tlsstores
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> tlsstore
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'TLSStore is the CRD implementation of a Traefik TLS Store. For
          the time being<span class="token punctuation">,</span> only the TLSStore named default is supported. This means
          that you cannot have two stores that are named default in different Kubernetes
          <span class="token key atrule">namespaces. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/https/tls/<span class="token comment">#certificates-stores'</span>
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> TLSStoreSpec defines the desired state of a TLSStore.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">certificates</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> Certificates is a list of secret names<span class="token punctuation">,</span> each secret holding
                  a key/certificate pair to add to the store.
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">description</span><span class="token punctuation">:</span> Certificate holds a secret name for the TLSStore resource.
                  <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                    <span class="token key atrule">secretName</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> SecretName is the name of the referenced Kubernetes
                        Secret to specify the certificate details.
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">required</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> secretName
                  <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
              <span class="token key atrule">defaultCertificate</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> DefaultCertificate defines the default certificate configuration.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">secretName</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> SecretName is the name of the referenced Kubernetes
                      Secret to specify the certificate details.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">required</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> secretName
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">defaultGeneratedCert</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> DefaultGeneratedCert defines the default generated certificate
                  configuration.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">domain</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Domain is the domain definition for the DefaultCertificate.
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">main</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Main defines the main domain name.
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                      <span class="token key atrule">sans</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> SANs defines the subject alternative domain names.
                        <span class="token key atrule">items</span><span class="token punctuation">:</span>
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">resolver</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Resolver is the name of the resolver that will be
                      used to issue the DefaultCertificate.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller-gen.kubebuilder.io/version</span><span class="token punctuation">:</span> v0.6.2
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> traefikservices.traefik.containo.us
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> traefik.containo.us
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> TraefikService
    <span class="token key atrule">listKind</span><span class="token punctuation">:</span> TraefikServiceList
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> traefikservices
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> traefikservice
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1alpha1
    <span class="token key atrule">schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'TraefikService is the CRD implementation of a Traefik Service.
          <span class="token key atrule">TraefikService object allows to</span><span class="token punctuation">:</span> <span class="token punctuation">-</span> Apply weight to Services on load<span class="token punctuation">-</span>balancing
          <span class="token punctuation">-</span> <span class="token key atrule">Mirror traffic on services More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/providers/kubernetes<span class="token punctuation">-</span>crd/<span class="token comment">#kind-traefikservice'</span>
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'APIVersion defines the versioned schema of this representation
              of an object. Servers should convert recognized schemas to the latest
              internal value<span class="token punctuation">,</span> <span class="token key atrule">and may reject unrecognized values. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#resources'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">kind</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Kind is a string value representing the REST resource this
              object represents. Servers may infer this from the endpoint the client
              <span class="token key atrule">submits requests to. Cannot be updated. In CamelCase. More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//git.k8s.io/community/contributors/devel/sig<span class="token punctuation">-</span>architecture/api<span class="token punctuation">-</span>conventions.md<span class="token comment">#types-kinds'</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">spec</span><span class="token punctuation">:</span>
            <span class="token key atrule">description</span><span class="token punctuation">:</span> TraefikServiceSpec defines the desired state of a TraefikService.
            <span class="token key atrule">properties</span><span class="token punctuation">:</span>
              <span class="token key atrule">mirroring</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> Mirroring defines the Mirroring service configuration.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">kind</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Kind defines the kind of the Service.
                    <span class="token key atrule">enum</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> Service
                    <span class="token punctuation">-</span> TraefikService
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">maxBodySize</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> MaxBodySize defines the maximum size allowed for
                      the body of the request. If the body is larger<span class="token punctuation">,</span> the request
                      is not mirrored. Default value is <span class="token punctuation">-</span><span class="token number">1</span><span class="token punctuation">,</span> which means unlimited
                      size.
                    <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                  <span class="token key atrule">mirrors</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Mirrors defines the list of mirrors where Traefik
                      will duplicate the traffic.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> MirrorService holds the mirror configuration.
                      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                        <span class="token key atrule">kind</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Kind defines the kind of the Service.
                          <span class="token key atrule">enum</span><span class="token punctuation">:</span>
                          <span class="token punctuation">-</span> Service
                          <span class="token punctuation">-</span> TraefikService
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">name</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Kubernetes
                            Service or TraefikService. The differentiation between
                            the two is specified in the Kind field.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                            Kubernetes Service or TraefikService.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">passHostHeader</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> PassHostHeader defines whether the client Host
                            header is forwarded to the upstream Kubernetes Service.
                            By default<span class="token punctuation">,</span> passHostHeader is true.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                        <span class="token key atrule">percent</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Percent defines the part of the traffic to
                            <span class="token key atrule">mirror. Supported values</span><span class="token punctuation">:</span> 0 to 100.'
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                        <span class="token key atrule">port</span><span class="token punctuation">:</span>
                          <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                          <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                          <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Port defines the port of a Kubernetes Service.
                            This can be a reference to a named port.
                          <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                        <span class="token key atrule">responseForwarding</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> ResponseForwarding defines how Traefik forwards
                            the response from the upstream Kubernetes Service to the
                            client.
                          <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                            <span class="token key atrule">flushInterval</span><span class="token punctuation">:</span>
                              <span class="token key atrule">description</span><span class="token punctuation">:</span> 'FlushInterval defines the interval<span class="token punctuation">,</span> in
                                milliseconds<span class="token punctuation">,</span> in between flushes to the client while
                                copying the response body. A negative value means
                                to flush immediately after each write to the client.
                                This configuration is ignored when ReverseProxy recognizes
                                a response as a streaming response; for such responses<span class="token punctuation">,</span>
                                <span class="token key atrule">writes are flushed to the client immediately. Default</span><span class="token punctuation">:</span>
                                100ms'
                              <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                        <span class="token key atrule">scheme</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Scheme defines the scheme to use for the request
                            to the upstream Kubernetes Service. It defaults to https
                            when Kubernetes Service port is 443<span class="token punctuation">,</span> http otherwise.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">serversTransport</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> ServersTransport defines the name of ServersTransport
                            resource to use. It allows to configure the transport
                            between Traefik and your servers. Can only be used on
                            a Kubernetes Service.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">sticky</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Sticky defines the sticky sessions configuration.
                            <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/services/<span class="token comment">#sticky-sessions'</span>
                          <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                            <span class="token key atrule">cookie</span><span class="token punctuation">:</span>
                              <span class="token key atrule">description</span><span class="token punctuation">:</span> Cookie defines the sticky cookie configuration.
                              <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                                <span class="token key atrule">httpOnly</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">description</span><span class="token punctuation">:</span> HTTPOnly defines whether the cookie
                                    can be accessed by client<span class="token punctuation">-</span>side APIs<span class="token punctuation">,</span> such as JavaScript.
                                  <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                                <span class="token key atrule">name</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the Cookie name.
                                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                                <span class="token key atrule">sameSite</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">description</span><span class="token punctuation">:</span> 'SameSite defines the same site policy.
                                    <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//developer.mozilla.org/en<span class="token punctuation">-</span>US/docs/Web/HTTP/Headers/Set<span class="token punctuation">-</span>Cookie/SameSite'
                                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                                <span class="token key atrule">secure</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">description</span><span class="token punctuation">:</span> Secure defines whether the cookie can
                                    only be transmitted over an encrypted connection
                                    (i.e. HTTPS).
                                  <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                              <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                        <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Strategy defines the load balancing strategy
                            between the servers. RoundRobin is the only supported
                            value at the moment.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">weight</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Weight defines the weight and should only be
                            specified when Name references a TraefikService object
                            (and to be precise<span class="token punctuation">,</span> one that embeds a Weighted Round Robin).
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                      <span class="token key atrule">required</span><span class="token punctuation">:</span>
                      <span class="token punctuation">-</span> name
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">name</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Kubernetes
                      Service or TraefikService. The differentiation between the two
                      is specified in the Kind field.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                      Kubernetes Service or TraefikService.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">passHostHeader</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> PassHostHeader defines whether the client Host header
                      is forwarded to the upstream Kubernetes Service. By default<span class="token punctuation">,</span>
                      passHostHeader is true.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                  <span class="token key atrule">port</span><span class="token punctuation">:</span>
                    <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Port defines the port of a Kubernetes Service. This
                      can be a reference to a named port.
                    <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                  <span class="token key atrule">responseForwarding</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ResponseForwarding defines how Traefik forwards the
                      response from the upstream Kubernetes Service to the client.
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">flushInterval</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> 'FlushInterval defines the interval<span class="token punctuation">,</span> in milliseconds<span class="token punctuation">,</span>
                          in between flushes to the client while copying the response
                          body. A negative value means to flush immediately after
                          each write to the client. This configuration is ignored
                          when ReverseProxy recognizes a response as a streaming response;
                          for such responses<span class="token punctuation">,</span> writes are flushed to the client immediately.
                          <span class="token key atrule">Default</span><span class="token punctuation">:</span> 100ms'
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">scheme</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Scheme defines the scheme to use for the request
                      to the upstream Kubernetes Service. It defaults to https when
                      Kubernetes Service port is 443<span class="token punctuation">,</span> http otherwise.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">serversTransport</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> ServersTransport defines the name of ServersTransport
                      resource to use. It allows to configure the transport between
                      Traefik and your servers. Can only be used on a Kubernetes Service.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">sticky</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Sticky defines the sticky sessions configuration.
                      <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/services/<span class="token comment">#sticky-sessions'</span>
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">cookie</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Cookie defines the sticky cookie configuration.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">httpOnly</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> HTTPOnly defines whether the cookie can be
                              accessed by client<span class="token punctuation">-</span>side APIs<span class="token punctuation">,</span> such as JavaScript.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">name</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the Cookie name.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">sameSite</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'SameSite defines the same site policy. More
                              <span class="token key atrule">info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//developer.mozilla.org/en<span class="token punctuation">-</span>US/docs/Web/HTTP/Headers/Set<span class="token punctuation">-</span>Cookie/SameSite'
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">secure</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Secure defines whether the cookie can only
                              be transmitted over an encrypted connection (i.e. HTTPS).
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Strategy defines the load balancing strategy between
                      the servers. RoundRobin is the only supported value at the moment.
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                  <span class="token key atrule">weight</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Weight defines the weight and should only be specified
                      when Name references a TraefikService object (and to be precise<span class="token punctuation">,</span>
                      one that embeds a Weighted Round Robin).
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                <span class="token key atrule">required</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> name
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
              <span class="token key atrule">weighted</span><span class="token punctuation">:</span>
                <span class="token key atrule">description</span><span class="token punctuation">:</span> Weighted defines the Weighted Round Robin configuration.
                <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                  <span class="token key atrule">services</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> Services defines the list of Kubernetes Service and/or
                      TraefikService to load<span class="token punctuation">-</span>balance<span class="token punctuation">,</span> with weight.
                    <span class="token key atrule">items</span><span class="token punctuation">:</span>
                      <span class="token key atrule">description</span><span class="token punctuation">:</span> Service defines an upstream HTTP service to proxy
                        traffic to.
                      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                        <span class="token key atrule">kind</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Kind defines the kind of the Service.
                          <span class="token key atrule">enum</span><span class="token punctuation">:</span>
                          <span class="token punctuation">-</span> Service
                          <span class="token punctuation">-</span> TraefikService
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">name</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the name of the referenced Kubernetes
                            Service or TraefikService. The differentiation between
                            the two is specified in the Kind field.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Namespace defines the namespace of the referenced
                            Kubernetes Service or TraefikService.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">passHostHeader</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> PassHostHeader defines whether the client Host
                            header is forwarded to the upstream Kubernetes Service.
                            By default<span class="token punctuation">,</span> passHostHeader is true.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                        <span class="token key atrule">port</span><span class="token punctuation">:</span>
                          <span class="token key atrule">anyOf</span><span class="token punctuation">:</span>
                          <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                          <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Port defines the port of a Kubernetes Service.
                            This can be a reference to a named port.
                          <span class="token key atrule">x-kubernetes-int-or-string</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
                        <span class="token key atrule">responseForwarding</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> ResponseForwarding defines how Traefik forwards
                            the response from the upstream Kubernetes Service to the
                            client.
                          <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                            <span class="token key atrule">flushInterval</span><span class="token punctuation">:</span>
                              <span class="token key atrule">description</span><span class="token punctuation">:</span> 'FlushInterval defines the interval<span class="token punctuation">,</span> in
                                milliseconds<span class="token punctuation">,</span> in between flushes to the client while
                                copying the response body. A negative value means
                                to flush immediately after each write to the client.
                                This configuration is ignored when ReverseProxy recognizes
                                a response as a streaming response; for such responses<span class="token punctuation">,</span>
                                <span class="token key atrule">writes are flushed to the client immediately. Default</span><span class="token punctuation">:</span>
                                100ms'
                              <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                        <span class="token key atrule">scheme</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Scheme defines the scheme to use for the request
                            to the upstream Kubernetes Service. It defaults to https
                            when Kubernetes Service port is 443<span class="token punctuation">,</span> http otherwise.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">serversTransport</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> ServersTransport defines the name of ServersTransport
                            resource to use. It allows to configure the transport
                            between Traefik and your servers. Can only be used on
                            a Kubernetes Service.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">sticky</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Sticky defines the sticky sessions configuration.
                            <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/services/<span class="token comment">#sticky-sessions'</span>
                          <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                            <span class="token key atrule">cookie</span><span class="token punctuation">:</span>
                              <span class="token key atrule">description</span><span class="token punctuation">:</span> Cookie defines the sticky cookie configuration.
                              <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                                <span class="token key atrule">httpOnly</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">description</span><span class="token punctuation">:</span> HTTPOnly defines whether the cookie
                                    can be accessed by client<span class="token punctuation">-</span>side APIs<span class="token punctuation">,</span> such as JavaScript.
                                  <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                                <span class="token key atrule">name</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the Cookie name.
                                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                                <span class="token key atrule">sameSite</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">description</span><span class="token punctuation">:</span> 'SameSite defines the same site policy.
                                    <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//developer.mozilla.org/en<span class="token punctuation">-</span>US/docs/Web/HTTP/Headers/Set<span class="token punctuation">-</span>Cookie/SameSite'
                                  <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                                <span class="token key atrule">secure</span><span class="token punctuation">:</span>
                                  <span class="token key atrule">description</span><span class="token punctuation">:</span> Secure defines whether the cookie can
                                    only be transmitted over an encrypted connection
                                    (i.e. HTTPS).
                                  <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                              <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                        <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Strategy defines the load balancing strategy
                            between the servers. RoundRobin is the only supported
                            value at the moment.
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                        <span class="token key atrule">weight</span><span class="token punctuation">:</span>
                          <span class="token key atrule">description</span><span class="token punctuation">:</span> Weight defines the weight and should only be
                            specified when Name references a TraefikService object
                            (and to be precise<span class="token punctuation">,</span> one that embeds a Weighted Round Robin).
                          <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
                      <span class="token key atrule">required</span><span class="token punctuation">:</span>
                      <span class="token punctuation">-</span> name
                      <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                  <span class="token key atrule">sticky</span><span class="token punctuation">:</span>
                    <span class="token key atrule">description</span><span class="token punctuation">:</span> 'Sticky defines whether sticky sessions are enabled.
                      <span class="token key atrule">More info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//doc.traefik.io/traefik/v2.9/routing/providers/kubernetes<span class="token punctuation">-</span>crd/<span class="token comment">#stickiness-and-load-balancing'</span>
                    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                      <span class="token key atrule">cookie</span><span class="token punctuation">:</span>
                        <span class="token key atrule">description</span><span class="token punctuation">:</span> Cookie defines the sticky cookie configuration.
                        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
                          <span class="token key atrule">httpOnly</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> HTTPOnly defines whether the cookie can be
                              accessed by client<span class="token punctuation">-</span>side APIs<span class="token punctuation">,</span> such as JavaScript.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                          <span class="token key atrule">name</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Name defines the Cookie name.
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">sameSite</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> 'SameSite defines the same site policy. More
                              <span class="token key atrule">info</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//developer.mozilla.org/en<span class="token punctuation">-</span>US/docs/Web/HTTP/Headers/Set<span class="token punctuation">-</span>Cookie/SameSite'
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> string
                          <span class="token key atrule">secure</span><span class="token punctuation">:</span>
                            <span class="token key atrule">description</span><span class="token punctuation">:</span> Secure defines whether the cookie can only
                              be transmitted over an encrypted connection (i.e. HTTPS).
                            <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean
                        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                    <span class="token key atrule">type</span><span class="token punctuation">:</span> object
                <span class="token key atrule">type</span><span class="token punctuation">:</span> object
            <span class="token key atrule">type</span><span class="token punctuation">:</span> object
        <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> metadata
        <span class="token punctuation">-</span> spec
        <span class="token key atrule">type</span><span class="token punctuation">:</span> object
    <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">acceptedNames</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> <span class="token string">""</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">storedVersions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx配置traefik" tabindex="-1"><a class="header-anchor" href="#nginx配置traefik" aria-hidden="true">#</a> nginx配置traefik</h2>
<h3 id="nginx-deployment-代码" tabindex="-1"><a class="header-anchor" href="#nginx-deployment-代码" aria-hidden="true">#</a> nginx-deployment 代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
        <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
            <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> ingress
                    <span class="token key atrule">operator</span><span class="token punctuation">:</span> NotIn
                    <span class="token key atrule">values</span><span class="token punctuation">:</span>
                      <span class="token punctuation">-</span> traefik
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx-ingressroutes-代码" tabindex="-1"><a class="header-anchor" href="#nginx-ingressroutes-代码" aria-hidden="true">#</a> nginx-ingressroutes 代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.containo.us/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRoute
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>web<span class="token punctuation">-</span>route
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> web
  <span class="token key atrule">routes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">match</span><span class="token punctuation">:</span> Host(`nginx.com`)
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> Rule
      <span class="token key atrule">services</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.containo.us/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRoute
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>websecure<span class="token punctuation">-</span>route
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> websecure
  <span class="token key atrule">routes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">match</span><span class="token punctuation">:</span> Host(`nginx.com`)
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> Rule
      <span class="token key atrule">services</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token key atrule">certResolver</span><span class="token punctuation">:</span> myresolver

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx-service-代码" tabindex="-1"><a class="header-anchor" href="#nginx-service-代码" aria-hidden="true">#</a> nginx-service 代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="whoiam-配置-traefik" tabindex="-1"><a class="header-anchor" href="#whoiam-配置-traefik" aria-hidden="true">#</a> whoiam 配置 traefik</h2>
<h3 id="whoiam-deployment-代码" tabindex="-1"><a class="header-anchor" href="#whoiam-deployment-代码" aria-hidden="true">#</a> whoiam-deployment 代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">name</span><span class="token punctuation">:</span> whoami
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> whoami

<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> whoami
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> whoami
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> whoami
          <span class="token key atrule">image</span><span class="token punctuation">:</span> traefik/whoami
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> web
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
        <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
            <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> ingress
                    <span class="token key atrule">operator</span><span class="token punctuation">:</span> NotIn
                    <span class="token key atrule">values</span><span class="token punctuation">:</span>
                      <span class="token punctuation">-</span> traefik

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="whoiam-service-代码" tabindex="-1"><a class="header-anchor" href="#whoiam-service-代码" aria-hidden="true">#</a> whoiam-service 代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> whoami

<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">name</span><span class="token punctuation">:</span> web
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> whoami

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="whoiam-ingressroutes-代码" tabindex="-1"><a class="header-anchor" href="#whoiam-ingressroutes-代码" aria-hidden="true">#</a> whoiam-ingressroutes 代码</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.containo.us/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRoute
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> simpleingressroute
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> web
  <span class="token key atrule">routes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">match</span><span class="token punctuation">:</span> Host(`your.example.com`) <span class="token important">&amp;&amp;</span> PathPrefix(`/notls`)
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Rule
    <span class="token key atrule">services</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> whoami
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.containo.us/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRoute
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingressroutetls
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">entryPoints</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> websecure
  <span class="token key atrule">routes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">match</span><span class="token punctuation">:</span> Host(`your.example.com`) <span class="token important">&amp;&amp;</span> PathPrefix(`/tls`)
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Rule
    <span class="token key atrule">services</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> whoami
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token key atrule">certResolver</span><span class="token punctuation">:</span> myresolver

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


