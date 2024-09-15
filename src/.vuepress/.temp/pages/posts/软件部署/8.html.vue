<template><div><h1 id="devops自动化部署" tabindex="-1"><a class="header-anchor" href="#devops自动化部署" aria-hidden="true">#</a> DevOps自动化部署</h1>
<h2 id="一、软件开发过程-涉及工具" tabindex="-1"><a class="header-anchor" href="#一、软件开发过程-涉及工具" aria-hidden="true">#</a> 一、软件开发过程&amp;涉及工具</h2>
<figure><img src="@source/.vuepress/public/assets/images/devops/1.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<p>最终可以给DevOps下一个定义：DevOps 强调的是高效组织团队之间如何通过自动化的工具协作和沟通来完成软件的生命周期管理，从而更快、更频繁地交付更稳定的软件,自动化的工具协作和沟通来完成软件的生命周期管理</p>
<h2 id="二、code阶段工具" tabindex="-1"><a class="header-anchor" href="#二、code阶段工具" aria-hidden="true">#</a> 二、Code阶段工具</h2>
<p>在code阶段，我们需要将不同版本的代码存储到一个仓库中，常见的版本控制工具就是SVN或者Git，这里我们采用Git作为版本控制工具，GitLab作为远程仓库</p>
<h3 id="_2-1、git安装" tabindex="-1"><a class="header-anchor" href="#_2-1、git安装" aria-hidden="true">#</a> 2.1、Git安装</h3>
<p><a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">git官网<ExternalLinkIcon/></a></p>
<h3 id="_2-2-gitlab安装" tabindex="-1"><a class="header-anchor" href="#_2-2-gitlab安装" aria-hidden="true">#</a> 2.2 GitLab安装</h3>
<p>单独准备服务器，采用Docker安装</p>
<ul>
<li>查看GitLab镜像</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> search gitlab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>拉取GitLab镜像</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull registry.gitlab.cn/omnibus/gitlab-jh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>准备docker-compose.yml文件</li>
</ul>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">gitlab</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">'registry.gitlab.cn/omnibus/gitlab-jh'</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> <span class="token string">'gitlab'</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> <span class="token string">'gitlab'</span> <span class="token comment">#宿主机名字</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">GITLAB_OMNIBUS_CONFIG</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        # 设置外部URL，用于GitLab的访问地址
        external_url 'http://192.168.1.142'
        # 启用SMTP配置
        gitlab_rails['smtp_enable'] = true
        gitlab_rails['smtp_address'] = 'smtphz.qiye.163.com'  #SMTP服务器地址
        gitlab_rails['smtp_port'] = 25  #SMTP服务器端口
        gitlab_rails['smtp_user_name'] = 'binggui@dingshenggroup.com'  #SMTP帐户用户名
        gitlab_rails['smtp_password'] = '18285426,'  #SMTP帐户密码
        gitlab_rails['smtp_domain'] = 'xxxxxx'  #SMTP域
        gitlab_rails['smtp_authentication'] = 'login'  #SMTP服务器身份验证类型
        gitlab_rails['smtp_enable_starttls_auto'] = true #是否启用 STARTTLS。通常设置为 true
        gitlab_rails['smtp_tls'] = false #是否使用TLS。通常设置为 false</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">'80:80'</span>
      <span class="token punctuation">-</span> <span class="token string">'443:443'</span>
      <span class="token punctuation">-</span> <span class="token string">'2222:22'</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">'/srv/gitlab/config:/etc/gitlab'</span>  <span class="token comment"># GitLab配置文件</span>
      <span class="token punctuation">-</span> <span class="token string">'/srv/gitlab/logs:/var/log/gitlab'</span>  <span class="token comment"># GitLab日志文件</span>
      <span class="token punctuation">-</span> <span class="token string">'/srv/gitlab/data:/var/opt/gitlab'</span>  <span class="token comment"># GitLab数据文件</span>
      <span class="token punctuation">-</span> <span class="token string">'/srv/gitlab/data/backups:/var/opt/gitlab/backups'</span> <span class="token comment">#备份目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>启动</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>访问GitLab首页</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/2.png" alt="访问" tabindex="0" loading="lazy"><figcaption>访问</figcaption></figure>
<ul>
<li>查看root用户初始密码</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> gitlab <span class="token function">cat</span> /etc/gitlab/initial_root_password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/.vuepress/public/assets/images/devops/3.png" alt="初始密码" tabindex="0" loading="lazy"><figcaption>初始密码</figcaption></figure>
<ul>
<li>登录root用户</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/4.png" alt="登录" tabindex="0" loading="lazy"><figcaption>登录</figcaption></figure>
<ul>
<li>第一次登录后需要修改密码</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/5.png" alt="修改密码" tabindex="0" loading="lazy"><figcaption>修改密码</figcaption></figure>
<p>搞定后，即可像Gitee、GitHub一样使用。</p>
<h2 id="三、build阶段工具" tabindex="-1"><a class="header-anchor" href="#三、build阶段工具" aria-hidden="true">#</a> 三、Build阶段工具</h2>
<p>构建Java项目的工具一般有两种选择，一个是Maven，一个是Gradle。</p>
<p>这里我们选择Maven作为项目的编译工具。</p>
<p>具体安装Maven流程不做阐述，但是需要确保配置好Maven仓库私服以及JDK编译版本。JDK比较高的也要相应的安装高版本Maven</p>
<h2 id="四、operate阶段工具" tabindex="-1"><a class="header-anchor" href="#四、operate阶段工具" aria-hidden="true">#</a> 四、Operate阶段工具</h2>
<p>部署过程，会采用Docker进行部署，暂时只安装Docker即可，后续还需安装Kubenetes</p>
<h3 id="_4-1-docker安装" tabindex="-1"><a class="header-anchor" href="#_4-1-docker安装" aria-hidden="true">#</a> 4.1 Docker安装</h3>
<ul>
<li>
<p>准备测试环境&amp;生产环境</p>
</li>
<li>
<p>下载Docker依赖组件</p>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> yum-utils device-mapper-persistent-data lvm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>设置下载Docker的镜像源为阿里云</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>安装Docker服务</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>安装成功后，启动Docker并设置开机自启</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 启动Docker服务</span>
systemctl start <span class="token function">docker</span>
<span class="token comment"># 设置开机自动启动</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>测试安装成功</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/6.png" alt="测试" tabindex="0" loading="lazy"><figcaption>测试</figcaption></figure>
<h3 id="_4-2-docker-compose安装" tabindex="-1"><a class="header-anchor" href="#_4-2-docker-compose安装" aria-hidden="true">#</a> 4.2 Docker-Compose安装</h3>
<p><a href="https://github.com/docker/compose" target="_blank" rel="noopener noreferrer">Docker-Compose官网<ExternalLinkIcon/></a></p>
<ul>
<li>
<p>将下载好的docker-compose-Linux-x86_64文件移动到Linux操作系统：……</p>
</li>
<li>
<p>设置docker-compose-Linux-x86_64文件权限，并移动到/usr/local/bin目录中</p>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 设置文件权限</span>
<span class="token function">chmod</span> a+x docker-compose-Linux-x86_64
<span class="token comment"># 移动到/usr/bin目录下，并重命名为docker-compose</span>
<span class="token function">mv</span> docker-compose-Linux-x86_64 /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>测试是否安装成功</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="五、integrate工具" tabindex="-1"><a class="header-anchor" href="#五、integrate工具" aria-hidden="true">#</a> 五、Integrate工具</h2>
<p>持续集成、持续部署的工具很多，其中Jenkins是一个开源的持续集成平台。</p>
<p>Jenkins涉及到将编写完毕的代码发布到测试环境和生产环境的任务，并且还涉及到了构建项目等任务。</p>
<p>Jenkins需要大量的插件保证工作，安装成本较高，下面会基于Docker搭建Jenkins。</p>
<h3 id="_5-1-jenkins介绍" tabindex="-1"><a class="header-anchor" href="#_5-1-jenkins介绍" aria-hidden="true">#</a> 5.1 Jenkins介绍</h3>
<p>Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具
Jenkins应用广泛，大多数互联网公司都采用Jenkins配合GitLab、Docker、K8s作为实现DevOps的核心工具。
Jenkins最强大的就在于插件，Jenkins官方提供了大量的插件库，来自动化CI/CD过程中的各种琐碎功能
Jenkins最主要的工作就是将GitLab上可以构建的工程代码拉取并且进行构建，再根据流程可以选择发布到测试环境或是生产环境。
一般是GitLab上的代码经过大量的测试后，确定发行版本，再发布到生产环境。
CI/CD可以理解为：</p>
<ul>
<li>
<p>CI过程即是通过Jenkins将代码拉取、构建、制作镜像交给测试人员测试。</p>
<ul>
<li>持续集成：让软件代码可以持续的集成到主干上，并自动构建和测试。</li>
</ul>
</li>
<li>
<p>CD过程即是通过Jenkins将打好标签的发行版本代码拉取、构建、制作镜像交给运维人员部署。</p>
<ul>
<li>持续交付：让经过持续集成的代码可以进行手动部署。</li>
<li>持续部署：让可以持续交付的代码随时随地的自动化部署。</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/7.png" alt="CI CD" tabindex="0" loading="lazy"><figcaption>CI CD</figcaption></figure>
<h3 id="_5-2-jenkins安装" tabindex="-1"><a class="header-anchor" href="#_5-2-jenkins安装" aria-hidden="true">#</a> 5.2 Jenkins安装</h3>
<ul>
<li>拉取Jenkins镜像</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull jenkins/jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>编写docker-compose.yml</li>
</ul>
</li>
</ul>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.1'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">jenkins</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> jenkins/jenkins<span class="token punctuation">:</span>2.426.3<span class="token punctuation">-</span>lts
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> jenkins
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always <span class="token comment"># 添加这一行，设置容器的重启策略为"always"</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"8080:8080"</span>
      <span class="token punctuation">-</span> <span class="token string">"50000:50000"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/mes/jenkins_home<span class="token punctuation">:</span>/var/jenkins_home
      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock
      <span class="token punctuation">-</span> /usr/bin/docker<span class="token punctuation">:</span>/usr/bin/docker
      <span class="token punctuation">-</span> /etc/docker/daemon.json<span class="token punctuation">:</span>/etc/docker/daemon.json
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> jenkins<span class="token punctuation">-</span>net
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">jenkins_home</span><span class="token punctuation">:</span>
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">jenkins-net</span><span class="token punctuation">:</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>首次启动会因为数据卷data目录没有权限导致启动失败，设置data目录写权限</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/8.png" alt="权限" tabindex="0" loading="lazy"><figcaption>权限</figcaption></figure>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token parameter variable">-R</span> a+w data/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>重新启动Jenkins容器后，由于Jenkins需要下载大量内容，但是由于默认下载地址下载速度较慢，需要重新设置下载地址为国内镜像站</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code># 修改数据卷中的hudson.model.UpdateCenter.xml文件
&lt;?xml version='<span class="token number">1.1</span>' encoding='UTF<span class="token number">-8</span>'?>
&lt;sites>
  &lt;site>
    &lt;id>default&lt;/id>
    &lt;url>https<span class="token operator">:</span><span class="token comment">//updates.jenkins.io/update-center.json&lt;/url></span>
  &lt;/site>
&lt;/sites>
# 将下载地址替换为http<span class="token operator">:</span><span class="token comment">//mirror.esuni.jp/jenkins/updates/update-center.json</span>
&lt;?xml version='<span class="token number">1.1</span>' encoding='UTF<span class="token number">-8</span>'?>
&lt;sites>
  &lt;site>
    &lt;id>default&lt;/id>
    &lt;url>http<span class="token operator">:</span><span class="token comment">//mirror.esuni.jp/jenkins/updates/update-center.json&lt;/url></span>
  &lt;/site>
&lt;/sites>
# 清华大学的插件源也可以https<span class="token operator">:</span><span class="token comment">//mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>再次重启Jenkins容器，访问Jenkins（需要稍微等会）</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/9.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/10.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>查看密码登录Jenkins，并登录下载插件</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> jenkins <span class="token function">cat</span> /var/jenkins_home/secrets/initialAdminPassword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/.vuepress/public/assets/images/devops/11.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/12.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>选择需要安装的插件</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/13.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/14.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/15.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>下载完毕设置信息进入首页（可能会出现下载失败的插件）</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/16.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/17.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/18.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_5-3-jenkins入门配置" tabindex="-1"><a class="header-anchor" href="#_5-3-jenkins入门配置" aria-hidden="true">#</a> 5.3 Jenkins入门配置</h3>
<p>由于Jenkins需要从Git拉取代码、需要本地构建、甚至需要直接发布自定义镜像到Docker仓库，所以Jenkins需要配置大量内容</p>
<h3 id="_5-3-1-构建任务" tabindex="-1"><a class="header-anchor" href="#_5-3-1-构建任务" aria-hidden="true">#</a> 5.3.1 构建任务</h3>
<ul>
<li>
<p>准备好GitLab仓库中的项目，并且通过Jenkins配置项目的实现当前项目的DevOps基本流程</p>
</li>
<li>
<p>构建Maven工程发布到GitLab（Gitee、Github均可）</p>
</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/19.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>Jenkins点击左侧导航新建任务</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/20.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>选择自由风格构建任务</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/21.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>
<p>Jenkins需要将Git上存放的源码存储到Jenkins服务所在磁盘的本地</p>
<ul>
<li>配置任务源码拉取的地址</li>
</ul>
</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/22.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>Jenkins立即构建</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/23.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>查看构建工程的日志，点击上述③的任务条即可</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/24.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<p>可以看到源码已经拉取带Jenkins本地，可以根据第三行日志信息，查看Jenkins本地拉取到的源码。</p>
<ul>
<li>查看Jenkins容器中/var/jenkins_home/workspace/test的源码</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/25.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_5-3-2-配置maven构建代码" tabindex="-1"><a class="header-anchor" href="#_5-3-2-配置maven构建代码" aria-hidden="true">#</a> 5.3.2 配置Maven构建代码</h3>
<p>代码拉取到Jenkins本地后，需要在Jenkins中对代码进行构建，这里需要Maven的环境，而Maven需要Java的环境，接下来需要在Jenkins中安装JDK和Maven，并且配置到Jenkins服务。</p>
<ul>
<li>准备JDK、Maven压缩包通过数据卷映射到Jenkins容器内部</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/26.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>解压压缩包，并配置Maven的settings.xml</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 阿里云镜像地址 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirror</span><span class="token punctuation">></span></span>  
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>alimaven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>  
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>aliyun maven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>  
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">></span></span>http://maven.aliyun.com/nexus/content/groups/public/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrorOf</span><span class="token punctuation">></span></span>central<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrorOf</span><span class="token punctuation">></span></span>          
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirror</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- JDK1.8编译插件 --></span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Jenkins配置JDK&amp;Maven并保存</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/27.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/28.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>配置Jenkins任务构建代码</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/29.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/30.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>立即构建测试，查看target下的jar包</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/31.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/32.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_5-3-3-配置publish发布-远程操作" tabindex="-1"><a class="header-anchor" href="#_5-3-3-配置publish发布-远程操作" aria-hidden="true">#</a> 5.3.3 配置Publish发布&amp;远程操作</h3>
<p>jar包构建好之后，就可以根据情况发布到测试或生产环境，这里需要用到之前下载好的插件Publish Over SSH。</p>
<ul>
<li>配置Publish Over SSH连接测试、生产环境</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/33.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>配置任务的构建后操作，发布jar包到目标服务</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/34.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/35.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>立即构建任务，并去目标服务查看</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/36.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/37.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h2 id="六、ci、cd入门操作" tabindex="-1"><a class="header-anchor" href="#六、ci、cd入门操作" aria-hidden="true">#</a> 六、CI、CD入门操作</h2>
<p>基于Jenkins拉取GitLab的SpringBoot代码进行构建发布到测试环境实现持续集成</p>
<p>基于Jenkins拉取GitLab指定发行版本的SpringBoot代码进行构建发布到生产环境实现CD实现持续部署</p>
<h3 id="_6-1-持续集成" tabindex="-1"><a class="header-anchor" href="#_6-1-持续集成" aria-hidden="true">#</a> 6.1 持续集成</h3>
<p>为了让程序代码可以自动推送到测试环境基于Docker服务运行，需要添加Docker配置和脚本文件让程序可以在集成到主干的同时运行起来。</p>
<ul>
<li>添加Dockerfile文件</li>
</ul>
<div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre v-pre class="language-Dockerfile"><code>FROM eclipse-temurin:21-jre

## 创建目录，并使用它作为工作目录
RUN mkdir -p /yudao-server
WORKDIR /yudao-server
## 将后端项目的 Jar 文件，复制到镜像中
COPY ./target/yudao-server.jar app.jar

## 设置 TZ 时区
ENV TZ=Asia/Shanghai
## 设置 JAVA_OPTS 环境变量，可通过 docker run -e &quot;JAVA_OPTS=&quot; 进行覆盖
ENV JAVA_OPTS=&quot;-Xms512m -Xmx512m -Djava.security.egd=file:/dev/./urandom&quot;

## 应用参数
ENV ARGS=&quot;&quot;

## 暴露后端项目的 48080 端口
EXPOSE 8080

## 启动后端项目
CMD java ${JAVA_OPTS} -jar app.jar $ARGS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>添加docker-compose.yml文件</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/38.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>追加Jenkins构建后操作脚本命令</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/39.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>发布到GitLab后由Jenkins立即构建并托送到目标服务器</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/40.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>测试部署到目标服务器程序</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/41.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/42.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_6-2-持续交付、部署" tabindex="-1"><a class="header-anchor" href="#_6-2-持续交付、部署" aria-hidden="true">#</a> 6.2 持续交付、部署</h3>
<p>程序代码在经过多次集成操作到达最终可以交付，持续交付整体流程和持续集成类似，不过需要选取指定的发行版本</p>
<ul>
<li>下载Git Parameter插件</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/43.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>设置项目参数化构建</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/44.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/45.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>给项目添加tag版本</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/46.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>任务构建时，采用Shell方式构建，拉取指定tag版本代码</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/47.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>基于Parameter构建任务，任务发布到目标服务器</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/48.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h2 id="七、集成sonar-qube" tabindex="-1"><a class="header-anchor" href="#七、集成sonar-qube" aria-hidden="true">#</a> 七、集成Sonar Qube</h2>
<h3 id="_7-1-sonar-qube介绍" tabindex="-1"><a class="header-anchor" href="#_7-1-sonar-qube介绍" aria-hidden="true">#</a> 7.1 Sonar Qube介绍</h3>
<ul>
<li>
<p>Sonar Qube是一个开源的代码分析平台，支持Java、Python、PHP、JavaScript、CSS等25种以上的语言，可以检测出重复代码、代码漏洞、代码规范和安全性漏洞的问题。</p>
</li>
<li>
<p>Sonar Qube可以与多种软件整合进行代码扫描，比如Maven，Gradle，Git，Jenkins等，并且会将代码检测结果推送回Sonar Qube并且在系统提供的UI界面上显示出来</p>
</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/49.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_7-2-sonar-qube环境搭建" tabindex="-1"><a class="header-anchor" href="#_7-2-sonar-qube环境搭建" aria-hidden="true">#</a> 7.2 Sonar Qube环境搭建</h3>
<h3 id="_7-2-1-sonar-qube安装" tabindex="-1"><a class="header-anchor" href="#_7-2-1-sonar-qube安装" aria-hidden="true">#</a> 7.2.1 Sonar Qube安装</h3>
<p>Sonar Qube在7.9版本中已经放弃了对MySQL的支持，并且建议在商业环境中采用PostgreSQL，那么安装Sonar Qube时需要依赖PostgreSQL。
并且这里会安装Sonar Qube的长期支持版本</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull postgres
<span class="token function">docker</span> pull sonarqube
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>编写docker-compoe.yml</li>
</ul>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3.1"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> db
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 5432<span class="token punctuation">:</span><span class="token number">5432</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> sonarnet
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">POSTGRES_USER</span><span class="token punctuation">:</span> sonar
      <span class="token key atrule">POSTGRES_PASSWORD</span><span class="token punctuation">:</span> sonar
  <span class="token key atrule">sonarqube</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> sonarqube<span class="token punctuation">:</span>9.9.6<span class="token punctuation">-</span>community
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> sonarqube
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"9000:9000"</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> sonarnet
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">SONAR_JDBC_URL</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>postgresql<span class="token punctuation">:</span>//db<span class="token punctuation">:</span>5432/sonar
      <span class="token key atrule">SONAR_JDBC_USERNAME</span><span class="token punctuation">:</span> sonar
      <span class="token key atrule">SONAR_JDBC_PASSWORD</span><span class="token punctuation">:</span> sonar
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">sonarnet</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>启动容器</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>需要设置sysctl.conf文件信息</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/50.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/51.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>并执行命令刷新</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sysctl</span> <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>重新启动需要一定时间启动，可以可以查看容器日志，看到如下内容代表启动成功</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/52.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>访问Sonar Qube首页</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/53.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>还需要重新设置一次密码</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/54.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>Sonar Qube首页</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/55.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h4 id="_7-2-2-安装中文插件" tabindex="-1"><a class="header-anchor" href="#_7-2-2-安装中文插件" aria-hidden="true">#</a> 7.2.2 安装中文插件</h4>
<figure><img src="@source/.vuepress/public/assets/images/devops/56.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<p>安装成功后需要重启，安装失败重新点击install重装即可。
安装成功后，会查看到重启按钮，点击即可</p>
<figure><img src="@source/.vuepress/public/assets/images/devops/57.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>重启后查看效果</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/58.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_7-3-sonar-qube基本使用" tabindex="-1"><a class="header-anchor" href="#_7-3-sonar-qube基本使用" aria-hidden="true">#</a> 7.3 Sonar Qube基本使用</h3>
<p>Sonar Qube的使用方式很多，Maven可以整合，也可以采用sonar-scanner的方式，再查看Sonar Qube的检测效果</p>
<h4 id="_7-3-1-maven实现代码检测" tabindex="-1"><a class="header-anchor" href="#_7-3-1-maven实现代码检测" aria-hidden="true">#</a> 7.3.1 Maven实现代码检测</h4>
<ul>
<li>修改Maven的settings.xml文件配置Sonar Qube信息</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>sonar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeByDefault</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeByDefault</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sonar.login</span><span class="token punctuation">></span></span>admin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sonar.login</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sonar.password</span><span class="token punctuation">></span></span>123456789<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sonar.password</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sonar.host.url</span><span class="token punctuation">></span></span>http://192.168.11.11:9000<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sonar.host.url</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在代码位置执行命令：mvn sonar:sonar</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/59.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>查看Sonar Qube界面检测结果</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/60.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>7.3.2 Sonar-scanner实现代码检测</li>
</ul>
<p><a href="https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/" target="_blank" rel="noopener noreferrer">Sonar-scanner官网<ExternalLinkIcon/></a>
下载4.6.x版本即可，要求Linux版本
解压并配置sonar服务端信息
由于是zip压缩包，需要安装unzip解压插件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">unzip</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>解压压缩包</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">unzip</span> sonar-scanner-cli/sonar-scanner-cli-4.6.0.2311-linux.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>配置sonarQube服务端地址，修改conf下的sonar-scanner.properties</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/61.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>执行命令检测代码</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 在项目所在目录执行以下命令</span>
~/sonar-scanner/bin/sonar-scanner <span class="token parameter variable">-Dsonar.sources</span><span class="token operator">=</span>./ <span class="token parameter variable">-Dsonar.projectname</span><span class="token operator">=</span>demo <span class="token parameter variable">-Dsonar.projectKey</span><span class="token operator">=</span>java <span class="token parameter variable">-Dsonar.java.binaries</span><span class="token operator">=</span>target/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查看SonarQube界面检测结果</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/62.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_7-4-jenkins集成sonar-qube" tabindex="-1"><a class="header-anchor" href="#_7-4-jenkins集成sonar-qube" aria-hidden="true">#</a> 7.4 Jenkins集成Sonar Qube</h3>
<p>Jenkins继承Sonar Qube实现代码扫描需要先下载整合插件</p>
<h4 id="_7-4-1-jenkins安装插件" tabindex="-1"><a class="header-anchor" href="#_7-4-1-jenkins安装插件" aria-hidden="true">#</a> 7.4.1 Jenkins安装插件</h4>
<figure><img src="@source/.vuepress/public/assets/images/devops/63.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/64.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/65.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_7-4-2-jenkins配置sonar-qube" tabindex="-1"><a class="header-anchor" href="#_7-4-2-jenkins配置sonar-qube" aria-hidden="true">#</a> 7.4.2 Jenkins配置Sonar Qube</h3>
<ul>
<li>开启Sonar Qube权限验证</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/66.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>获取Sonar Qube的令牌</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/67.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>配置Jenkins的Sonar Qube信息</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/68.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/69.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/70.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_7-4-3-配置sonar-scanner" tabindex="-1"><a class="header-anchor" href="#_7-4-3-配置sonar-scanner" aria-hidden="true">#</a> 7.4.3 配置Sonar-scanner</h3>
<ul>
<li>将Sonar-scaner添加到Jenkins数据卷中并配置全局配置</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/71.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>配置任务的Sonar-scanner</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/72.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_7-4-4-构建任务" tabindex="-1"><a class="header-anchor" href="#_7-4-4-构建任务" aria-hidden="true">#</a> 7.4.4 构建任务</h3>
<figure><img src="@source/.vuepress/public/assets/images/devops/73.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/74.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h2 id="八、集成harbor" tabindex="-1"><a class="header-anchor" href="#八、集成harbor" aria-hidden="true">#</a> 八、集成Harbor</h2>
<h3 id="_8-1-harbor介绍" tabindex="-1"><a class="header-anchor" href="#_8-1-harbor介绍" aria-hidden="true">#</a> 8.1 Harbor介绍</h3>
<p>前面在部署项目时，我们主要采用Jenkins推送jar包到指定服务器，再通过脚本命令让目标服务器对当前jar进行部署，这种方式在项目较多时，每个目标服务器都需要将jar包制作成自定义镜像再通过docker进行启动，重复操作比较多，会降低项目部署时间。</p>
<p>我们可以通过Harbor作为私有的Docker镜像仓库。让Jenkins统一将项目打包并制作成Docker镜像发布到Harbor仓库中，只需要通知目标服务，让目标服务统一去Harbor仓库上拉取镜像并在本地部署即可。</p>
<p>Docker官方提供了Registry镜像仓库，但是Registry的功能相对简陋。Harbor是VMware公司提供的一款镜像仓库，提供了权限控制、分布式发布、强大的安全扫描与审查机制等功能</p>
<h3 id="_8-2-harbor安装" tabindex="-1"><a class="header-anchor" href="#_8-2-harbor安装" aria-hidden="true">#</a> 8.2 Harbor安装</h3>
<p>这里采用原生的方式安装Harbor。</p>
<p><a href="https://github.com/goharbor/harbor" target="_blank" rel="noopener noreferrer">下载地址<ExternalLinkIcon/></a></p>
<ul>
<li>拖拽到Linux并解压</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> harbor-offline-installer-v2.11.1.tgz <span class="token parameter variable">-C</span> /usr/local/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>修改Harbor配置文件</p>
</li>
<li>
<p>首先复制一份harbor.yml配置</p>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> harbor.yml.tmpl harbor.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>编辑harbor.yml配置文件</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/75.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>启动Harbor</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/.vuepress/public/assets/images/devops/76.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>登录Harbor</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/77.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>首页信息</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/78.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_8-3-harbor使用方式" tabindex="-1"><a class="header-anchor" href="#_8-3-harbor使用方式" aria-hidden="true">#</a> 8.3 Harbor使用方式</h3>
<p>Harbor作为镜像仓库，主要的交互方式就是将镜像上传到Harbor上，以及从Harbor上下载指定镜像</p>
<p>在传输镜像前，可以先使用Harbor提供的权限管理，将项目设置为私有项目，并对不同用户设置不同角色，从而更方便管理镜像。</p>
<h3 id="_8-3-1-添加用户构建项目" tabindex="-1"><a class="header-anchor" href="#_8-3-1-添加用户构建项目" aria-hidden="true">#</a> 8.3.1 添加用户构建项目</h3>
<ul>
<li>创建用户</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/79.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>构建项目（设置为私有）</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/80.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>给项目追加用户</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/81.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>切换测试用户</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/82.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_8-3-2-发布镜像到harbor" tabindex="-1"><a class="header-anchor" href="#_8-3-2-发布镜像到harbor" aria-hidden="true">#</a> 8.3.2 发布镜像到Harbor</h3>
<ul>
<li>修改镜像名称</li>
</ul>
<p>名称要求：harbor地址/项目名/镜像名:版本</p>
<figure><img src="@source/.vuepress/public/assets/images/devops/83.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>修改daemon.json，支持Docker仓库，并重启Docker</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/84.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>设置登录仓库信息</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> login <span class="token parameter variable">-u</span> 用户名 <span class="token parameter variable">-p</span> 密码 Harbor地址
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>推送镜像到Harbor</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/85.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/86.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_8-3-3-从harbor拉取镜像ls" tabindex="-1"><a class="header-anchor" href="#_8-3-3-从harbor拉取镜像ls" aria-hidden="true">#</a> 8.3.3 从Harbor拉取镜像ls</h3>
<ul>
<li>跟传统方式一样，不过需要先配置/etc/docker/daemon.json文件</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
        <span class="token property">"registry-mirrors"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"https://pee6w651.mirror.aliyuncs.com"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">"insecure-registries"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"192.168.11.11:80"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/.vuepress/public/assets/images/devops/87.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_8-3-4-jenkins容器使用宿主机docker" tabindex="-1"><a class="header-anchor" href="#_8-3-4-jenkins容器使用宿主机docker" aria-hidden="true">#</a> 8.3.4 Jenkins容器使用宿主机Docker</h3>
<p>构建镜像和发布镜像到harbor都需要使用到docker命令。而在Jenkins容器内部安装Docker官方推荐直接采用宿主机带的Docker即可。</p>
<p>设置Jenkins容器使用宿主机Docker</p>
<ul>
<li>设置宿主机docker.sock权限：</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chown</span> root:root /var/run/docker.sock
<span class="token function">sudo</span> <span class="token function">chmod</span> o+rw /var/run/docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-5-添加构建操作" tabindex="-1"><a class="header-anchor" href="#_8-3-5-添加构建操作" aria-hidden="true">#</a> 8.3.5 添加构建操作</h3>
<figure><img src="@source/.vuepress/public/assets/images/devops/88.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_8-3-6-编写部署脚本" tabindex="-1"><a class="header-anchor" href="#_8-3-6-编写部署脚本" aria-hidden="true">#</a> 8.3.6 编写部署脚本</h3>
<ul>
<li>编写脚本文件，添加到目标服务器</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">harbor_url</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token assign-left variable">harbor_project_name</span><span class="token operator">=</span><span class="token variable">$2</span>
<span class="token assign-left variable">project_name</span><span class="token operator">=</span><span class="token variable">$3</span>
<span class="token assign-left variable">tag</span><span class="token operator">=</span><span class="token variable">$4</span>
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token variable">$5</span>

<span class="token assign-left variable">imageName</span><span class="token operator">=</span><span class="token variable">$harbor_url</span>/<span class="token variable">$harbor_project_name</span>/<span class="token variable">$project_name</span><span class="token builtin class-name">:</span><span class="token variable">$tag</span>

<span class="token assign-left variable">containerId</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token operator">|</span> <span class="token function">grep</span> $<span class="token punctuation">{</span>project_name<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1}'</span><span class="token variable">`</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$containerId</span>"</span> <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">docker</span> stop <span class="token variable">$containerId</span>
    <span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable">$containerId</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"Delete Container Success"</span>
<span class="token keyword">fi</span>

<span class="token assign-left variable">imageId</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> $<span class="token punctuation">{</span>project_name<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $3}'</span><span class="token variable">`</span></span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$imageId</span>"</span> <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> <span class="token variable">$imageId</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"Delete Image Success"</span>
<span class="token keyword">fi</span>

<span class="token function">docker</span> login <span class="token parameter variable">-u</span> DevOps <span class="token parameter variable">-p</span> P@ssw0rd <span class="token variable">$harbor_url</span>

<span class="token function">docker</span> pull <span class="token variable">$imageName</span>

<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token variable">$port</span><span class="token builtin class-name">:</span><span class="token variable">$port</span> <span class="token parameter variable">--name</span> <span class="token variable">$project_name</span> <span class="token variable">$imageName</span>

<span class="token builtin class-name">echo</span> <span class="token string">"Start Container Success"</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$project_name</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>并设置权限为可执行</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> a+x deploy.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/.vuepress/public/assets/images/devops/89.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_8-3-7-配置构建后操作" tabindex="-1"><a class="header-anchor" href="#_8-3-7-配置构建后操作" aria-hidden="true">#</a> 8.3.7 配置构建后操作</h3>
<figure><img src="@source/.vuepress/public/assets/images/devops/90.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h2 id="九、jenkins流水线" tabindex="-1"><a class="header-anchor" href="#九、jenkins流水线" aria-hidden="true">#</a> 九、Jenkins流水线</h2>
<h3 id="_9-1-jenkins流水线任务介绍" tabindex="-1"><a class="header-anchor" href="#_9-1-jenkins流水线任务介绍" aria-hidden="true">#</a> 9.1 Jenkins流水线任务介绍</h3>
<p>之前采用Jenkins的自由风格构建的项目，每个步骤流程都要通过不同的方式设置，并且构建过程中整体流程是不可见的，无法确认每个流程花费的时间，并且问题不方便定位问题。</p>
<p>Jenkins的Pipeline可以让项目的发布整体流程可视化，明确执行的阶段，可以快速的定位问题。并且整个项目的生命周期可以通过一个Jenkinsfile文件管理，而且Jenkinsfile文件是可以放在项目中维护。</p>
<p>所以Pipeline相对自由风格或者其他的项目风格更容易操作。</p>
<h3 id="_9-2-jenkins流水线任务" tabindex="-1"><a class="header-anchor" href="#_9-2-jenkins流水线任务" aria-hidden="true">#</a> 9.2 Jenkins流水线任务</h3>
<h3 id="_9-2-1-构建jenkins流水线任务" tabindex="-1"><a class="header-anchor" href="#_9-2-1-构建jenkins流水线任务" aria-hidden="true">#</a> 9.2.1 构建Jenkins流水线任务</h3>
<ul>
<li>构建任务</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/91.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>生成Groovy脚本</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/92.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>构建后查看视图</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/93.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_9-2-2-groovy脚本" tabindex="-1"><a class="header-anchor" href="#_9-2-2-groovy脚本" aria-hidden="true">#</a> 9.2.2 Groovy脚本</h3>
<ul>
<li>Groovy脚本基础语法</li>
</ul>
<div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre v-pre class="language-Groovy"><code>// 所有脚本命令包含在pipeline{}中
pipeline {  
// 指定任务在哪个节点执行（Jenkins支持分布式）
    agent any
    
    // 配置全局环境，指定变量名=变量值信息
    environment{
      host = '192.168.11.11'
    }

    // 存放所有任务的合集
    stages {
    // 单个任务
        stage('任务1') {
        // 实现任务的具体流程
            steps {
                echo 'do something'
            }
        }
// 单个任务
        stage('任务2') {
       // 实现任务的具体流程
            steps {
                echo 'do something'
            }
        }
        // ……
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>编写例子测试</li>
</ul>
<div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre v-pre class="language-Groovy"><code>pipeline {
    agent any

    // 存放所有任务的合集
    stages {
        stage('拉取Git代码') {
            steps {
                echo '拉取Git代码'
            }
        }

        stage('检测代码质量') {
            steps {
                echo '检测代码质量'
            }
        }

        stage('构建代码') {
            steps {
                echo '构建代码'
            }
        }

        stage('制作自定义镜像并发布Harbor') {
            steps {
                echo '制作自定义镜像并发布Harbor'
            }
        }

        stage('基于Harbor部署工程') {
            steps {
                echo '基于Harbor部署工程'
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/.vuepress/public/assets/images/devops/94.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>查看效果</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/95.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>涉及到特定脚本，Jenkins给予了充足的提示，可以自动生成命令</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/96.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_9-2-3-jenkinsfile实现" tabindex="-1"><a class="header-anchor" href="#_9-2-3-jenkinsfile实现" aria-hidden="true">#</a> 9.2.3 Jenkinsfile实现</h3>
<p>Jenkinsfile方式需要将脚本内容编写到项目中的Jenkinsfile文件中，每次构建会自动拉取项目并且获取项目中Jenkinsfile文件对项目进行构建</p>
<ul>
<li>配置pipeline</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/97.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>准备Jenkinsfile</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/98.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>测试效果</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/99.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_9-3-jenkins流水线任务实现" tabindex="-1"><a class="header-anchor" href="#_9-3-jenkins流水线任务实现" aria-hidden="true">#</a> 9.3 Jenkins流水线任务实现</h3>
<h3 id="_9-3-1-参数化构建" tabindex="-1"><a class="header-anchor" href="#_9-3-1-参数化构建" aria-hidden="true">#</a> 9.3.1 参数化构建</h3>
<p>添加参数化构建，方便选择不的项目版本</p>
<figure><img src="@source/.vuepress/public/assets/images/devops/100.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<h3 id="_9-3-2-拉取git代码" tabindex="-1"><a class="header-anchor" href="#_9-3-2-拉取git代码" aria-hidden="true">#</a> 9.3.2 拉取Git代码</h3>
<p>通过流水线语法生成Checkout代码的脚本</p>
<figure><img src="@source/.vuepress/public/assets/images/devops/101.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/102.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li tag="">将*/master更改为标签$</li>
</ul>
<div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre v-pre class="language-Groovy"><code>pipeline {
    agent any
    stages {

        stage('拉取Git代码') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '${tag}']], extensions: [], userRemoteConfigs: [[url: 'http://49.233.115.171:8929/root/test.git']]])
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-3-构建代码" tabindex="-1"><a class="header-anchor" href="#_9-3-3-构建代码" aria-hidden="true">#</a> 9.3.3 构建代码</h3>
<p>通过脚本执行mvn的构建命令</p>
<div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre v-pre class="language-Groovy"><code>pipeline {
    agent any

    stages {

        stage('拉取Git代码') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '${tag}']], extensions: [], userRemoteConfigs: [[url: 'http://49.233.115.171:8929/root/test.git']]])
            }
        }

        stage('构建代码') {
            steps {
                sh '/var/jenkins_home/maven/bin/mvn clean package -DskipTests'
            }
        }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-4-代码质量检测" tabindex="-1"><a class="header-anchor" href="#_9-3-4-代码质量检测" aria-hidden="true">#</a> 9.3.4 代码质量检测</h3>
<ul>
<li>通过脚本执行sonar-scanner命令即可</li>
</ul>
<div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre v-pre class="language-Groovy"><code>pipeline {
    agent any

    stages {

        stage('拉取Git代码') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '${tag}']], extensions: [], userRemoteConfigs: [[url: 'http://49.233.115.171:8929/root/test.git']]])
            }
        }

        stage('构建代码') {
            steps {
                sh '/var/jenkins_home/maven/bin/mvn clean package -DskipTests'
            }
        }

        stage('检测代码质量') {
            steps {
                sh '/var/jenkins_home/sonar-scanner/bin/sonar-scanner -Dsonar.sources=./ -Dsonar.projectname=${JOB_NAME} -Dsonar.projectKey=${JOB_NAME} -Dsonar.java.binaries=target/ -Dsonar.login=31388be45653876c1f51ec02f0d478e2d9d0e1fa' 
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-5-制作自定义镜像并发布" tabindex="-1"><a class="header-anchor" href="#_9-3-5-制作自定义镜像并发布" aria-hidden="true">#</a> 9.3.5 制作自定义镜像并发布</h3>
<ul>
<li>生成自定义镜像脚本</li>
</ul>
<div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre v-pre class="language-Groovy"><code>pipeline {
    agent any
    environment{
        harborHost = '192.168.11.11:80'
        harborRepo = 'repository'
        harborUser = 'DevOps'
        harborPasswd = 'P@ssw0rd'
    }

    // 存放所有任务的合集
    stages {

        stage('拉取Git代码') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '${tag}']], extensions: [], userRemoteConfigs: [[url: 'http://49.233.115.171:8929/root/test.git']]])
            }
        }

        stage('构建代码') {
            steps {
                sh '/var/jenkins_home/maven/bin/mvn clean package -DskipTests'
            }
        }

        stage('检测代码质量') {
            steps {
                sh '/var/jenkins_home/sonar-scanner/bin/sonar-scanner -Dsonar.sources=./ -Dsonar.projectname=${JOB_NAME} -Dsonar.projectKey=${JOB_NAME} -Dsonar.java.binaries=target/ -Dsonar.login=31388be45653876c1f51ec02f0d478e2d9d0e1fa' 
            }
        }

        stage('制作自定义镜像并发布Harbor') {
            steps {
                sh '''cp ./target/*.jar ./docker/
                cd ./docker
                docker build -t ${JOB_NAME}:${tag} ./'''

                sh '''docker login -u ${harborUser} -p ${harborPasswd} ${harborHost}
                docker tag ${JOB_NAME}:${tag} ${harborHost}/${harborRepo}/${JOB_NAME}:${tag}
                docker push ${harborHost}/${harborRepo}/${JOB_NAME}:${tag}'''
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>生成Publish Over SSH脚本</li>
</ul>
<div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre v-pre class="language-Groovy"><code>pipeline {
    agent any
    environment{
        harborHost = '192.168.11.11:80'
        harborRepo = 'repository'
        harborUser = 'DevOps'
        harborPasswd = 'P@ssw0rd'
    }

    // 存放所有任务的合集
    stages {

        stage('拉取Git代码') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '${tag}']], extensions: [], userRemoteConfigs: [[url: 'http://49.233.115.171:8929/root/test.git']]])
            }
        }

        stage('构建代码') {
            steps {
                sh '/var/jenkins_home/maven/bin/mvn clean package -DskipTests'
            }
        }docker

        stage('检测代码质量') {
            steps {
                sh '/var/jenkins_home/sonar-scanner/bin/sonar-scanner -Dsonar.sources=./ -Dsonar.projectname=${JOB_NAME} -Dsonar.projectKey=${JOB_NAME} -Dsonar.java.binaries=target/ -Dsonar.login=7d66af4b39cfe4f52ac0a915d4c9d5c513207098' 
            }
        }

        stage('制作自定义镜像并发布Harbor') {
            steps {
                sh '''cp ./target/*.jar ./docker/
                cd ./docker
                docker build -t ${JOB_NAME}:${tag} ./'''

                sh '''docker login -u ${harborUser} -p ${harborPasswd} ${harborHost}
                docker tag ${JOB_NAME}:${tag} ${harborHost}/${harborRepo}/${JOB_NAME}:${tag}
                docker push ${harborHost}/${harborRepo}/${JOB_NAME}:${tag}'''
            }
        }
        
        stage('目标服务器拉取镜像并运行') {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'testEnvironment', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: &quot;/usr/bin/deploy.sh $harborHost $harborRepo $JOB_NAME $tag $port &quot;, execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>由于采用变量，记得使用双引号</li>
</ul>
<h3 id="_9-4-jenkins流水线整合钉钉" tabindex="-1"><a class="header-anchor" href="#_9-4-jenkins流水线整合钉钉" aria-hidden="true">#</a> 9.4 Jenkins流水线整合钉钉</h3>
<p>在程序部署成功后，可以通过钉钉的机器人及时向群众发送部署的最终结果通知</p>
<ul>
<li>安装插件</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/104.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>钉钉内部创建群组并构建机器人</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/105.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/106.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<figure><img src="@source/.vuepress/public/assets/images/devops/107.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
<ul>
<li>最终或获取到Webhook信息</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>https://oapi.dingtalk.com/robot/send?access_token<span class="token operator">=</span>kej4ehkj34gjhg34jh5bh5jb34hj53b4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>系统配置添加钉钉通知</p>
</li>
<li>
<p>任务中追加流水线配置</p>
</li>
</ul>
<div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre v-pre class="language-Groovy"><code>pipeline {
    agent any

    environment {
        sonarLogin = '2bab7bf7d5af25e2c2ca2f178af2c3c55c64d5d8'
        harborUser = 'admin'
        harborPassword = 'Harbor12345'
        harborHost = '192.168.11.12:8888'
        harborRepo = 'repository'
    }

    stages {
        stage('拉取Git代码'){
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '$tag']], extensions: [], userRemoteConfigs: [[url: 'http://49.233.115.171:8929/root/lsx.git']]])
            }
        }
        stage('Maven构建代码'){
            steps {
                sh '/var/jenkins_home/maven/bin/mvn clean package -DskipTests'
            }
        }
        stage('SonarQube检测代码'){
            steps {
                sh '/var/jenkins_home/sonar-scanner/bin/sonar-scanner -Dsonar.sources=./ -Dsonar.projectname=${JOB_NAME} -Dsonar.projectKey=${JOB_NAME} -Dsonar.java.binaries=target/ -Dsonar.login=${sonarLogin}'
            }
        }
        stage('制作自定义镜像'){
            steps {
                sh '''cd docker
                mv ../target/*.jar ./
                docker build -t ${JOB_NAME}:$tag .
                '''
            }
        }

        stage('推送自定义镜像'){
            steps {
                sh '''docker login -u ${harborUser} -p ${harborPassword} ${harborHost}
                docker tag ${JOB_NAME}:$tag ${harborHost}/${harborRepo}/${JOB_NAME}:$tag
                docker push ${harborHost}/${harborRepo}/${JOB_NAME}:$tag'''
            }
        }

        stage('通知目标服务器'){
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'centos-docker', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: &quot;/usr/bin/deploy.sh $harborHost $harborRepo $JOB_NAME $tag $port&quot;, execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }  
        }
    }
    post {
        success {
            dingtalk (
                robot: 'Jenkins-DingDing',
                type:'MARKDOWN',
                title: &quot;success: ${JOB_NAME}&quot;,
                text: [&quot;- 成功构建:${JOB_NAME}项目!\n- 版本:${tag}\n- 持续时间:${currentBuild.durationString}\n- 任务:#${JOB_NAME}&quot;]
            )
        }
        failure {
            dingtalk (
                robot: 'Jenkins-DingDing',
                type:'MARKDOWN',
                title: &quot;fail: ${JOB_NAME}&quot;,
                text: [&quot;- 失败构建:${JOB_NAME}项目!\n- 版本:${tag}\n- 持续时间:${currentBuild.durationString}\n- 任务:#${JOB_NAME}&quot;]
            )
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查看效果</li>
</ul>
<figure><img src="@source/.vuepress/public/assets/images/devops/108.png" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure>
</div></template>


