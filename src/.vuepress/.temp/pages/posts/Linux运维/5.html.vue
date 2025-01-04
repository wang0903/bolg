<template><div><h1 id="自动删除镜像步骤" tabindex="-1"><a class="header-anchor" href="#自动删除镜像步骤" aria-hidden="true">#</a> 自动删除镜像步骤</h1>
<h2 id="_1、创建脚本文件" tabindex="-1"><a class="header-anchor" href="#_1、创建脚本文件" aria-hidden="true">#</a> 1、创建脚本文件</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> cleanup_images.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="脚本代码" tabindex="-1"><a class="header-anchor" href="#脚本代码" aria-hidden="true">#</a> 脚本代码</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>   <span class="token comment">#!/bin/bash</span>

    <span class="token comment"># 定义要删除的镜像名称,要删除的镜像数组</span>
    <span class="token assign-left variable">IMAGE_NAMES</span><span class="token operator">=</span><span class="token punctuation">(</span>
        <span class="token string">"xxxxx"</span>
        <span class="token string">"xxxx"</span>
        <span class="token string">"xxx"</span>
        <span class="token string">"xxxx"</span>
    <span class="token punctuation">)</span>

    <span class="token comment"># 获取当前时间戳</span>
    <span class="token assign-left variable">current_timestamp</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%s<span class="token variable">)</span></span>

    <span class="token comment"># 遍历每个镜像名称</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">image_name</span> <span class="token keyword">in</span> <span class="token string">"<span class="token variable">${IMAGE_NAMES<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>"</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token comment"># 获取所有包含指定名称的镜像</span>
        <span class="token function">docker</span> images <span class="token parameter variable">--filter</span> <span class="token string">"reference=*<span class="token variable">$image_name</span>*"</span> <span class="token parameter variable">--format</span> <span class="token string">"{{.ID}} {{.CreatedAt}}"</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token function">id</span> created_at<span class="token punctuation">;</span> <span class="token keyword">do</span>
            <span class="token comment"># 将创建时间转换为时间戳</span>
            <span class="token comment"># 去掉时区信息并转换为时间戳</span>
            <span class="token assign-left variable">created_timestamp</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">"<span class="token variable">${created_at<span class="token operator">%</span> *}</span>"</span> +%s <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null<span class="token variable">)</span></span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token builtin class-name">echo</span> <span class="token string">"Failed to parse date: <span class="token variable">$created_at</span>"</span>
                <span class="token builtin class-name">continue</span>
            <span class="token keyword">fi</span>
            <span class="token comment"># 计算时间差（秒）</span>
            <span class="token assign-left variable">time_diff</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span>current_timestamp <span class="token operator">-</span> created_timestamp<span class="token variable">))</span></span>
            <span class="token comment"># 如果时间差大于5天（432000秒）</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$time_diff</span> <span class="token parameter variable">-gt</span> <span class="token number">432000</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token builtin class-name">echo</span> <span class="token string">"Deleting image ID: <span class="token variable">$id</span> (Name: <span class="token variable">$image_name</span>)"</span>
                <span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> <span class="token variable">$id</span>
            <span class="token keyword">fi</span>
        <span class="token keyword">done</span>
    <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、给运行权限" tabindex="-1"><a class="header-anchor" href="#_3、给运行权限" aria-hidden="true">#</a> 3、给运行权限</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">chmod</span> +x cleanup_images.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4、自动删除" tabindex="-1"><a class="header-anchor" href="#_4、自动删除" aria-hidden="true">#</a> 4、自动删除</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">crontab</span> <span class="token parameter variable">-e</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5、添加删除路径" tabindex="-1"><a class="header-anchor" href="#_5、添加删除路径" aria-hidden="true">#</a> 5、添加删除路径</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">0</span> <span class="token number">0</span> * * * /usr/local/bincleanup_images.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


