import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as n,a}from"./app-HMLpIP8o.js";const i={},d=a(`<h1 id="awvs和nessus安装" tabindex="-1"><a class="header-anchor" href="#awvs和nessus安装" aria-hidden="true">#</a> awvs和nessus安装</h1><h2 id="一、docker安装awvs" tabindex="-1"><a class="header-anchor" href="#一、docker安装awvs" aria-hidden="true">#</a> 一、docker安装awvs</h2><h3 id="_1、下载容器" tabindex="-1"><a class="header-anchor" href="#_1、下载容器" aria-hidden="true">#</a> 1、下载容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull secfa/docker-awvs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、启动容器" tabindex="-1"><a class="header-anchor" href="#_2、启动容器" aria-hidden="true">#</a> 2、启动容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">13443</span>:3443 --cap-add LINUX_IMMUTABLE secfa/docker-awvs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、访问" tabindex="-1"><a class="header-anchor" href="#_3、访问" aria-hidden="true">#</a> 3、访问</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>https://YOUR_IP:13443/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、用户和密码" tabindex="-1"><a class="header-anchor" href="#_4、用户和密码" aria-hidden="true">#</a> 4、用户和密码</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Username:admin@admin.com
password:Admin123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>[如何变更凭证]</p><ul><li>1.docker exec -u root -it $docker_names /bin/bash</li><li>2.运行/home/acunetix/.acunetix/change_credentials.sh</li><li>3.输入您的新凭证</li></ul><h2 id="二、docker安装nessus" tabindex="-1"><a class="header-anchor" href="#二、docker安装nessus" aria-hidden="true">#</a> 二、docker安装nessus</h2><h3 id="_1、下载容器-1" tabindex="-1"><a class="header-anchor" href="#_1、下载容器-1" aria-hidden="true">#</a> 1、下载容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull ramisec/nessus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、启动容器-1" tabindex="-1"><a class="header-anchor" href="#_2、启动容器-1" aria-hidden="true">#</a> 2、启动容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span><span class="token operator">=</span>ramisec_nessus <span class="token parameter variable">-p</span> <span class="token number">8834</span>:8834 ramisec/nessus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、获取插件" tabindex="-1"><a class="header-anchor" href="#_3、获取插件" aria-hidden="true">#</a> 3、获取插件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>3.1 获取challenge

1、进入容器

docker exec -it 容器ID /bin/bash

2、切换到nessus安装目录下的sbin文件夹中，

cd /opt/nessus/sbin

3、使用如下命令生成challenge码

./nessuscli fetch --challenge

3d88e6e1b11c0d9323f1bf897634944a20b825d4

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-官方注册获取激活码" tabindex="-1"><a class="header-anchor" href="#_3-2-官方注册获取激活码" aria-hidden="true">#</a> 3.2 官方注册获取激活码</h3><p>地址：https://www.tenablecloud.cn/products/nessus/nessus-essentials</p><p>登录输入的邮箱获取激活码</p><p>3.3 使用challenge码和激活码获取插件下载地址 点我获取插件下载地址</p><p>https://plugins.nessus.org/v2/offline.php</p><p>提交之后，下载license 文件名为【nessus.license】</p><p>下载插件，文件名为【all-2.0.tar.gz】</p><h3 id="_3-4-下载的插件以及许可协议复制到容器内" tabindex="-1"><a class="header-anchor" href="#_3-4-下载的插件以及许可协议复制到容器内" aria-hidden="true">#</a> 3.4 下载的插件以及许可协议复制到容器内</h3><p>将下载的插件文件和许可协议文件复制到Nessus的/opt/nessus/sbin目录下，执行如下命令更新插件。如下所示：</p><p>先将下载的2个文件复制到宿主机的某个文件夹（我是虚拟机，等于从windows机器复制到虚拟机）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>这里会涉及从主机复制东西到容器的命令！！！！！！！！！  

<span class="token comment">#从容器往宿主机copy </span>
<span class="token comment">#sudo docker cp 容器id:/path_in_container /path_on_host </span>
<span class="token comment">#从宿主机往容器copy </span>
<span class="token comment">#sudo docker cp /pathonhost 容器id:/容器的路径</span>

我使用这2个命令

<span class="token function">sudo</span> <span class="token function">docker</span> <span class="token function">cp</span> /opt/nessusfiles/nessus.license 2bcf38bf345e:/opt/nessus/sbin
<span class="token function">sudo</span> <span class="token function">docker</span> <span class="token function">cp</span> /opt/nessusfiles/all-2.0.tar.gz 2bcf38bf345e:/opt/nessus/sbin


查看复制结果：

 执行命令

./nessuscli fetch --register-offline nessus.license 
./nessuscli update all-2.0.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插件更新完成后，重新启动Nessus服务。然后，重新访问Nessus服务，即可成功加载插件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 进入容器 注意sbin目录的位置根据个人的设置进行相应的修改，按提示操作，完了要重启</span>
/opt/nessus/sbin/nessuscli adduser 要添加的用户名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,32),l=[d];function r(c,u){return s(),n("div",null,l)}const v=e(i,[["render",r],["__file","1.html.vue"]]);export{v as default};
