<template><div><h1 id="使用rsync备份数据库" tabindex="-1"><a class="header-anchor" href="#使用rsync备份数据库" aria-hidden="true">#</a> 使用rsync备份数据库</h1>
<h2 id="备份文件和备份脚本" tabindex="-1"><a class="header-anchor" href="#备份文件和备份脚本" aria-hidden="true">#</a> 备份文件和备份脚本</h2>
<h3 id="备份文件存放地址" tabindex="-1"><a class="header-anchor" href="#备份文件存放地址" aria-hidden="true">#</a> 备份文件存放地址：</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/backup/mysql_backup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="备份脚本" tabindex="-1"><a class="header-anchor" href="#备份脚本" aria-hidden="true">#</a> 备份脚本</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/backup/backup_sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="备份脚本代码" tabindex="-1"><a class="header-anchor" href="#备份脚本代码" aria-hidden="true">#</a> 备份脚本代码</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 设置日志文件路径</span>
<span class="token assign-left variable">LOG_FILE</span><span class="token operator">=</span><span class="token string">"/backup/log/mysql_backup_log_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d<span class="token variable">)</span></span>.log"</span>

<span class="token comment"># 设置挂载目录路径</span>
<span class="token assign-left variable">MOUNTED_MYSQL_DATA_DIR</span><span class="token operator">=</span><span class="token string">"/mysql/data/"</span>

<span class="token comment"># 设置备份目录</span>
<span class="token assign-left variable">BACKUP_DIR</span><span class="token operator">=</span><span class="token string">"/backup/mysql_backup"</span>

<span class="token comment"># 确保日志目录存在</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">dirname</span> <span class="token string">"<span class="token variable">$LOG_FILE</span>"</span><span class="token variable">)</span></span>

<span class="token comment"># 日志记录：开始备份</span>
<span class="token builtin class-name">echo</span> <span class="token string">"[<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">'%Y-%m-%d %H:%M:%S'</span><span class="token variable">)</span></span>] 开始备份 MySQL 数据..."</span> <span class="token operator">>></span> <span class="token variable">$LOG_FILE</span>

<span class="token comment"># 使用时间戳生成备份文件名</span>
<span class="token assign-left variable">BACKUP_FILE</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$BACKUP_DIR</span>/mysql_backup_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d%H%M%S<span class="token variable">)</span></span>.tar.gz"</span>

<span class="token comment"># 执行备份：使用 rsync 进行增量备份并压缩成 tar.gz 文件</span>
<span class="token function">rsync</span> <span class="token parameter variable">-avz</span> <span class="token parameter variable">--delete</span>  <span class="token variable">$MOUNTED_MYSQL_DATA_DIR</span>/ <span class="token variable">$BACKUP_DIR</span>/temp_backup/ <span class="token operator">>></span> <span class="token variable">$LOG_FILE</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>

<span class="token comment"># 打包备份文件</span>
<span class="token function">tar</span> <span class="token parameter variable">-czf</span> <span class="token variable">$BACKUP_FILE</span> <span class="token parameter variable">-C</span> <span class="token variable">$BACKUP_DIR</span> temp_backup/ <span class="token operator">>></span> <span class="token variable">$LOG_FILE</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>

<span class="token comment"># 删除临时备份文件</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">$BACKUP_DIR</span>/temp_backup

<span class="token comment"># 日志记录：备份完成</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"[<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">'%Y-%m-%d %H:%M:%S'</span><span class="token variable">)</span></span>] 备份成功: <span class="token variable">$BACKUP_FILE</span>"</span> <span class="token operator">>></span> <span class="token variable">$LOG_FILE</span>
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"[<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">'%Y-%m-%d %H:%M:%S'</span><span class="token variable">)</span></span>] 备份失败"</span> <span class="token operator">>></span> <span class="token variable">$LOG_FILE</span>
  <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自动化备份" tabindex="-1"><a class="header-anchor" href="#自动化备份" aria-hidden="true">#</a> 自动化备份</h2>
<h3 id="打开自动化文件" tabindex="-1"><a class="header-anchor" href="#打开自动化文件" aria-hidden="true">#</a> 打开自动化文件</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-e</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="添加早上八点和晚上八点备份" tabindex="-1"><a class="header-anchor" href="#添加早上八点和晚上八点备份" aria-hidden="true">#</a> 添加早上八点和晚上八点备份</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">0</span> <span class="token number">8</span> * * * /backup/backup_sh/backup.sh <span class="token operator">>></span> /backup/log/backup_log_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token punctuation">\</span>%Y<span class="token punctuation">\</span>%m<span class="token punctuation">\</span>%d<span class="token variable">)</span></span>.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>
<span class="token number">0</span> <span class="token number">20</span> * * * /backup/backup_sh/backup.sh <span class="token operator">>></span> /backup/log/backup_log_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token punctuation">\</span>%Y<span class="token punctuation">\</span>%m<span class="token punctuation">\</span>%d<span class="token variable">)</span></span>.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


