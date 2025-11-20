import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as i,c,d as n,e as s,b as o,a}from"./app-HMLpIP8o.js";const p={},d=a(`<h1 id="docker安装mysql8-0" tabindex="-1"><a class="header-anchor" href="#docker安装mysql8-0" aria-hidden="true">#</a> docker安装MySQL8.0</h1><h3 id="_1、下载mysql" tabindex="-1"><a class="header-anchor" href="#_1、下载mysql" aria-hidden="true">#</a> 1、下载MySQL</h3><p><strong>注意：在修改数据库配置文件时，也要修改本文档（要让服务器配置文件和文档同步）</strong></p><p><strong>/home/mes/mydata/mysql</strong> 数据和配置文件在这个目录下面</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>docker pull mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、使用-p-创建多级目录-即-mydata-目录下创建-mysql-目录-mysql-目录下又创建-log-、data-、conf-三个目录" tabindex="-1"><a class="header-anchor" href="#_2、使用-p-创建多级目录-即-mydata-目录下创建-mysql-目录-mysql-目录下又创建-log-、data-、conf-三个目录" aria-hidden="true">#</a> 2、使用 <code>-p</code> 创建多级目录，即 <code>mydata</code> 目录下创建 <code>mysql</code> 目录， mysql 目录下又创建 <code>log 、data 、conf</code> 三个目录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mydata/mysql/log
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mydata/mysql/data
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mydata/mysql/conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动容器,不用docker-compose命令创建</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> mysql8.0 <span class="token comment">#容器名字为mysql8.0</span>
<span class="token parameter variable">-v</span> /mydata/mysql/log:/var/log/mysql <span class="token comment">#mysql日志挂载到宿主机/mydata/mysql/log</span>
<span class="token parameter variable">-v</span> /mydata/mysql/data:/var/lib/mysql <span class="token comment">#mysql数据挂载到宿主机/mydata/mysql/data</span>
<span class="token parameter variable">-v</span> /mydata/mysql/conf:/etc/mysql/conf.d <span class="token comment">#mysql配置文件挂载到宿主机/mydata/mysql/conf</span>
<span class="token parameter variable">-p</span> <span class="token number">3309</span>:3306 <span class="token comment">#容器内暴露为3306,宿主机暴露为3308</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token parameter variable">-d</span> mysql:latest <span class="token comment">#-d是docker启动容器就启动 mysql:latest版本 latest最新版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">777</span> conf data log <span class="token comment">#给三个文件夹权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、创建my-cnf" tabindex="-1"><a class="header-anchor" href="#_3、创建my-cnf" aria-hidden="true">#</a> 3、创建my.cnf</h3><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span>
skip-host-cache          # 禁用主机缓存，提高安全性
skip-name-resolve        # 禁用域名解析，提高性能
<span class="token key attr-name">datadir</span><span class="token punctuation">=</span><span class="token value attr-value">/var/lib/mysql   # 数据库文件存放目录</span>
<span class="token key attr-name">socket</span><span class="token punctuation">=</span><span class="token value attr-value">/var/run/mysqld/mysqld.sock # MySQL套接字文件位置</span>
<span class="token key attr-name">secure-file-priv</span><span class="token punctuation">=</span><span class="token value attr-value">/var/lib/mysql-files # 指定安全的文件读写目录</span>

<span class="token key attr-name">character-set-server</span><span class="token punctuation">=</span><span class="token value attr-value">utf8 # 设置数据库字符集为utf8</span>
<span class="token key attr-name">default_authentication_plugin</span><span class="token punctuation">=</span><span class="token value attr-value">mysql_native_password # 默认身份验证插件</span>
<span class="token key attr-name">expire_logs_days</span><span class="token punctuation">=</span><span class="token value attr-value">7       #日志文件过期时间，7天</span>
<span class="token key attr-name">sql_mode</span><span class="token punctuation">=</span><span class="token value attr-value">STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION  #SQL模式设置，强制严格模式</span>
<span class="token key attr-name">bind-address</span><span class="token punctuation">=</span><span class="token value attr-value">0.0.0.0              # 允许监听所有可用IP地址</span>
<span class="token key attr-name">max_connections</span><span class="token punctuation">=</span><span class="token value attr-value">1000     # 最大并发连接数</span>

<span class="token key attr-name">pid-file</span><span class="token punctuation">=</span><span class="token value attr-value">/var/run/mysqld/mysqld.pid # MySQL进程ID文件位置</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">client</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">socket</span><span class="token punctuation">=</span><span class="token value attr-value">/var/run/mysqld/mysqld.sock # 客户端连接MySQL时使用的套接字文件</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysql</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">default-character-set</span><span class="token punctuation">=</span><span class="token value attr-value">utf8 # 客户端默认字符集</span>

<span class="token comment">#!includedir /etc/mysql/conf.d/ # 包含其他MySQL配置文件的目录，通常用于自定义配置</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、创建docker-compose-yml文件-正式环境数据库使用的数这种方式部署" tabindex="-1"><a class="header-anchor" href="#_4、创建docker-compose-yml文件-正式环境数据库使用的数这种方式部署" aria-hidden="true">#</a> 4、创建docker-compose.yml文件（<strong>正式环境数据库使用的数这种方式部署</strong>）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> docker-compose.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
    <span class="token key atrule">mysql</span><span class="token punctuation">:</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span>latest
        <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mysql8
        <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
        <span class="token key atrule">environment</span><span class="token punctuation">:</span>
            <span class="token comment"># 使用Docker Secrets管理的MySQL root密码</span>
            <span class="token key atrule">MYSQL_ROOT_PASSWORD_FILE</span><span class="token punctuation">:</span> /run/secrets/mysql_root_password
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">&quot;3309:3306&quot;</span>
        <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
            <span class="token comment"># 命名卷用于持久化MySQL数据,数据文件</span>
            <span class="token punctuation">-</span> ./mysql/data<span class="token punctuation">:</span>/var/lib/mysql
            <span class="token comment"># 命名卷用于持久化MySQL配置文件</span>
            <span class="token punctuation">-</span> ./mysql/conf<span class="token punctuation">:</span>/etc/mysql/conf.d
            <span class="token comment"># 命名卷用于持久化MySQL日志文件</span>
            <span class="token punctuation">-</span> ./mysql/log<span class="token punctuation">:</span>/var/log/mysql
            <span class="token comment"># 命名卷用于持久化MySQL文件</span>
            <span class="token punctuation">-</span> ./mysql/mysql_files<span class="token punctuation">:</span>/var/lib/mysql<span class="token punctuation">-</span>files
        <span class="token key atrule">secrets</span><span class="token punctuation">:</span>
            <span class="token comment"># 引用Docker Secrets中的MySQL root密码</span>
            <span class="token punctuation">-</span> mysql_root_password
            <span class="token comment"># 引用Docker Secrets中的自定义MySQL用户名</span>
            <span class="token punctuation">-</span> mysql_user
            <span class="token comment"># 引用Docker Secrets中的自定义MySQL用户密码</span>
            <span class="token punctuation">-</span> mysql_password
<span class="token key atrule">secrets</span><span class="token punctuation">:</span>
    <span class="token key atrule">mysql_root_password</span><span class="token punctuation">:</span>
        <span class="token key atrule">file</span><span class="token punctuation">:</span> /home/mes/mydata/mysql/secrets/mysql_root_password.txt <span class="token comment"># MySQL root密码存储在这里</span>
    <span class="token key atrule">mysql_user</span><span class="token punctuation">:</span>
        <span class="token key atrule">file</span><span class="token punctuation">:</span> /home/mes/mydata/mysql/secrets/mysql_user.txt <span class="token comment"># 自定义MySQL用户名存储在这里</span>
    <span class="token key atrule">mysql_password</span><span class="token punctuation">:</span>
        <span class="token key atrule">file</span><span class="token punctuation">:</span> /home/mes/mydata/mysql/secrets/mysql_password.txt <span class="token comment"># 自定义MySQL用户密码存储在这里</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> <span class="token comment">#启动docker-compose.yml </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、连接mysql" tabindex="-1"><a class="header-anchor" href="#_5、连接mysql" aria-hidden="true">#</a> 5、连接mysql</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看docker容器</span>
<span class="token function">docker</span> <span class="token function">ps</span>

<span class="token comment"># 进入容器</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> 02c5820c70bc /bin/bash

<span class="token comment"># 连接mysql</span>
mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>
（skip-grant-tables配置，没有密码）

<span class="token comment"># 清空root密码</span>
update user <span class="token builtin class-name">set</span> <span class="token assign-left variable">authentication_string</span><span class="token operator">=</span><span class="token string">&#39;&#39;</span> where <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span> 
flush privileges<span class="token punctuation">;</span>

<span class="token comment"># 退出mysql, 删除/etc/my.cnf文件里的 skip-grant-tables ，重启 mysql 服务，再次登陆的时候是空密码登陆：</span>
<span class="token comment"># 修改密码</span>
ALTER <span class="token environment constant">USER</span> <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY <span class="token string">&#39;123456&#39;</span><span class="token punctuation">;</span>
flush privileges<span class="token punctuation">;</span>

<span class="token comment"># 退出mysql</span>
<span class="token builtin class-name">exit</span><span class="token punctuation">;</span>

<span class="token comment"># 退出容器</span>
<span class="token builtin class-name">exit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),r={id:"_6、mysql报错-host-is-not-allowed-to-connect-to-this-mysql-server-解决办法",tabindex:"-1"},m=n("a",{class:"header-anchor",href:"#_6、mysql报错-host-is-not-allowed-to-connect-to-this-mysql-server-解决办法","aria-hidden":"true"},"#",-1),u={href:"https://www.cnblogs.com/xjmm/p/12518798.html",target:"_blank",rel:"noopener noreferrer"},v=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入容器，连接mysql，选择mysql库，查询表</span>
use mysql<span class="token punctuation">;</span>
show tables<span class="token punctuation">;</span>

<span class="token comment"># 查询账号host</span>
<span class="token keyword">select</span> <span class="token function">host</span> from user<span class="token punctuation">;</span>（user为root，host为localhost的话，说明mysql只允许本机连接）

<span class="token comment"># 设置host = % 任何程序可访问</span>
update user <span class="token builtin class-name">set</span> <span class="token function">host</span> <span class="token operator">=</span><span class="token string">&#39;%&#39;</span> where user <span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span>

<span class="token comment"># 刷新权限</span>
flush privileges<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="复制容器文件到宿主机" tabindex="-1"><a class="header-anchor" href="#复制容器文件到宿主机" aria-hidden="true">#</a> 复制容器文件到宿主机</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#把容器指定位置的东西复制出来 </span>
<span class="token function">docker</span> <span class="token function">cp</span> 5eff66eec7e12:/etc/nginx/nginx.conf  /data/conf/nginx.conf
<span class="token comment">#把外面的内容复制到容器里面</span>
<span class="token function">docker</span> <span class="token function">cp</span>  /data/conf/nginx.conf  5eff66eec7e12:/etc/nginx/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function k(b,y){const e=t("ExternalLinkIcon");return i(),c("div",null,[d,n("h3",r,[m,s(" 6、"),n("a",u,[s(`MySQL报错"Host ' is not allowed to connect to this MySQL server"`),o(e)]),s(" 解决办法")]),v])}const q=l(p,[["render",k],["__file","3.html.vue"]]);export{q as default};
