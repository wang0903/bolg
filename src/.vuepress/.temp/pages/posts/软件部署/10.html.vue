<template><div><h1 id="xtrabackup备份mysql数据库" tabindex="-1"><a class="header-anchor" href="#xtrabackup备份mysql数据库" aria-hidden="true">#</a> xtrabackup备份MySQL数据库</h1>
<h4 id="备份脚本-backup-sh" tabindex="-1"><a class="header-anchor" href="#备份脚本-backup-sh" aria-hidden="true">#</a> 备份脚本 <code v-pre>backup.sh</code></h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 设置变量</span>
<span class="token assign-left variable">BACKUP_DIR</span><span class="token operator">=</span><span class="token string">"/home/tg/xtrabackup/backups"</span> <span class="token comment">#这个是宿主机的路径</span>
<span class="token assign-left variable">MYSQL_USER</span><span class="token operator">=</span><span class="token string">"root"</span>
<span class="token assign-left variable">MYSQL_PASSWORD</span><span class="token operator">=</span><span class="token string">"rootpassword"</span>
<span class="token assign-left variable">MYSQL_DATA_DIR</span><span class="token operator">=</span><span class="token string">"/var/lib/mysql"</span>
<span class="token assign-left variable">FULL_BACKUP_DIR</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$BACKUP_DIR</span>/full_backup"</span>
<span class="token assign-left variable">INC_BACKUP_DIR</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$BACKUP_DIR</span>/inc_backup"</span>
<span class="token assign-left variable">LOG_FILE</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$BACKUP_DIR</span>/backup.log"</span>
<span class="token assign-left variable">TIMESTAMP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%F_%T"</span><span class="token variable">)</span></span>

<span class="token comment"># 日志记录函数</span>
<span class="token function-name function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"[<span class="token variable">$TIMESTAMP</span>] <span class="token variable">$1</span>"</span> <span class="token operator">|</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> <span class="token variable">$LOG_FILE</span>
<span class="token punctuation">}</span>

<span class="token comment"># 函数：进行全量备份</span>
<span class="token function-name function">full_backup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log <span class="token string">"开始全量备份..."</span>
    <span class="token assign-left variable">FULL_BACKUP_SUBDIR</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$FULL_BACKUP_DIR</span>/<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%Y-%m-%d"</span><span class="token variable">)</span></span>"</span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">$FULL_BACKUP_SUBDIR</span>
    xtrabackup <span class="token parameter variable">--backup</span> --target-dir<span class="token operator">=</span><span class="token variable">$FULL_BACKUP_SUBDIR</span> <span class="token parameter variable">--datadir</span><span class="token operator">=</span><span class="token variable">$MYSQL_DATA_DIR</span> <span class="token parameter variable">--user</span><span class="token operator">=</span><span class="token variable">$MYSQL_USER</span> <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token variable">$MYSQL_PASSWORD</span> <span class="token operator"><span class="token file-descriptor important">2</span>>></span> <span class="token variable">$LOG_FILE</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        log <span class="token string">"全量备份完成"</span>
    <span class="token keyword">else</span>
        log <span class="token string">"全量备份失败"</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># 函数：进行增量备份</span>
<span class="token function-name function">incremental_backup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log <span class="token string">"开始增量备份..."</span>
    <span class="token assign-left variable">INC_BACKUP_SUBDIR</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$INC_BACKUP_DIR</span>/<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%Y-%m-%d_%H-%M-%S"</span><span class="token variable">)</span></span>"</span>
    <span class="token assign-left variable">LAST_FULL_BACKUP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> <span class="token parameter variable">-td</span> $FULL_BACKUP_DIR/* <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">1</span><span class="token variable">)</span></span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">$INC_BACKUP_SUBDIR</span>
    xtrabackup <span class="token parameter variable">--backup</span> --target-dir<span class="token operator">=</span><span class="token variable">$INC_BACKUP_SUBDIR</span> --incremental-basedir<span class="token operator">=</span><span class="token variable">$LAST_FULL_BACKUP</span> <span class="token parameter variable">--datadir</span><span class="token operator">=</span><span class="token variable">$MYSQL_DATA_DIR</span> <span class="token parameter variable">--user</span><span class="token operator">=</span><span class="token variable">$MYSQL_USER</span> <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token variable">$MYSQL_PASSWORD</span> <span class="token operator"><span class="token file-descriptor important">2</span>>></span> <span class="token variable">$LOG_FILE</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        log <span class="token string">"增量备份完成"</span>
    <span class="token keyword">else</span>
        log <span class="token string">"增量备份失败"</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># 函数：删除旧的备份</span>
<span class="token function-name function">cleanup_old_backups</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log <span class="token string">"删除超过5天的全量备份..."</span>
    <span class="token function">find</span> <span class="token variable">$FULL_BACKUP_DIR</span> <span class="token parameter variable">-maxdepth</span> <span class="token number">1</span> <span class="token parameter variable">-type</span> d <span class="token parameter variable">-mtime</span> +5 <span class="token parameter variable">-exec</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\</span><span class="token punctuation">;</span>
    log <span class="token string">"旧的全量备份已删除"</span>
<span class="token punctuation">}</span>

<span class="token comment"># 检查当前是星期几</span>
<span class="token assign-left variable">DAY_OF_WEEK</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%u"</span><span class="token variable">)</span></span>

<span class="token comment"># 如果是周日进行全量备份，其余时间进行增量备份</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$DAY_OF_WEEK</span>"</span> <span class="token parameter variable">-eq</span> <span class="token number">7</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    full_backup
    cleanup_old_backups
<span class="token keyword">else</span>
    incremental_backup
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-编写恢复备份脚本" tabindex="-1"><a class="header-anchor" href="#_2-编写恢复备份脚本" aria-hidden="true">#</a> 2. 编写恢复备份脚本</h3>
<h4 id="恢复备份脚本-restore-sh" tabindex="-1"><a class="header-anchor" href="#恢复备份脚本-restore-sh" aria-hidden="true">#</a> 恢复备份脚本 <code v-pre>restore.sh</code></h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 设置变量</span>
<span class="token assign-left variable">BACKUP_DIR</span><span class="token operator">=</span><span class="token string">"/home/tg/xtrabackup/backups"</span>
<span class="token assign-left variable">MYSQL_DATA_DIR</span><span class="token operator">=</span><span class="token string">"/var/lib/mysql"</span>
<span class="token assign-left variable">RESTORE_DIR</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$BACKUP_DIR</span>/restore"</span>
<span class="token assign-left variable">LOG_FILE</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$BACKUP_DIR</span>/restore.log"</span>
<span class="token assign-left variable">TIMESTAMP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%F_%T"</span><span class="token variable">)</span></span>

<span class="token comment"># 日志记录函数</span>
<span class="token function-name function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"[<span class="token variable">$TIMESTAMP</span>] <span class="token variable">$1</span>"</span> <span class="token operator">|</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> <span class="token variable">$LOG_FILE</span>
<span class="token punctuation">}</span>

<span class="token comment"># 函数：应用增量备份</span>
<span class="token function-name function">apply_incremental_backup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log <span class="token string">"应用增量备份..."</span>
    <span class="token assign-left variable">LATEST_FULL_BACKUP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> <span class="token parameter variable">-td</span> $FULL_BACKUP_DIR/* <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">1</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">LAST_INC_BACKUP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> <span class="token parameter variable">-td</span> $INC_BACKUP_DIR/* <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">1</span><span class="token variable">)</span></span>
    xtrabackup <span class="token parameter variable">--prepare</span> --target-dir<span class="token operator">=</span><span class="token variable">$LATEST_FULL_BACKUP</span> --incremental-dir<span class="token operator">=</span><span class="token variable">$LAST_INC_BACKUP</span> <span class="token operator"><span class="token file-descriptor important">2</span>>></span> <span class="token variable">$LOG_FILE</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        log <span class="token string">"增量备份应用完成"</span>
    <span class="token keyword">else</span>
        log <span class="token string">"增量备份应用失败"</span>
        <span class="token builtin class-name">exit</span> <span class="token number">1</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># 函数：恢复备份</span>
<span class="token function-name function">restore_backup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log <span class="token string">"开始恢复备份..."</span>
    xtrabackup --copy-back --target-dir<span class="token operator">=</span><span class="token variable">$LATEST_FULL_BACKUP</span> <span class="token parameter variable">--datadir</span><span class="token operator">=</span><span class="token variable">$MYSQL_DATA_DIR</span> <span class="token operator"><span class="token file-descriptor important">2</span>>></span> <span class="token variable">$LOG_FILE</span>
    <span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql:mysql <span class="token variable">$MYSQL_DATA_DIR</span>
    log <span class="token string">"备份恢复完成，请手动启动 MySQL 服务"</span>
<span class="token punctuation">}</span>

<span class="token comment"># 恢复备份</span>
apply_incremental_backup
restore_backup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确保这两个脚本都具有可执行权限：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> +x backup.sh restore.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要进行备份恢复，您需要执行恢复备份脚本。在容器内部执行以下命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> xtrabackup /restore.sh <span class="token comment">#注意不要随意进行备份恢复</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-更新-docker-compose-文件" tabindex="-1"><a class="header-anchor" href="#_3-更新-docker-compose-文件" aria-hidden="true">#</a> 3. 更新 Docker Compose 文件</h3>
<p>更新 Docker Compose 文件，以确保备份和恢复备份脚本都被挂载到容器内：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">xtrabackup</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> percona/percona<span class="token punctuation">-</span>xtrabackup<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> xtrabackup
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mysql/data<span class="token punctuation">:</span>/var/lib/mysql<span class="token punctuation">:</span>ro  <span class="token comment"># 挂载 MySQL 数据目录</span>
      <span class="token punctuation">-</span> /home/mes/xtrabackup/backups<span class="token punctuation">:</span>/backups  <span class="token comment"># 挂载备份目录</span>
      <span class="token punctuation">-</span> /home/mes/xtrabackup/backup.sh<span class="token punctuation">:</span>/backup.sh  <span class="token comment"># 挂载备份脚本</span>
      <span class="token punctuation">-</span> /home/mes/xtrabackup/restore.sh<span class="token punctuation">:</span>/restore.sh  <span class="token comment"># 挂载恢复备份脚本</span>
    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> tail <span class="token punctuation">-</span>f /dev/null  <span class="token comment"># 防止容器退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-设置计划任务" tabindex="-1"><a class="header-anchor" href="#_4-设置计划任务" aria-hidden="true">#</a> 4. 设置计划任务</h3>
<p>用宿主机设置计划任务，如果要用容器需要自己制作一个容器，这种比较麻烦，修改都需要重新重启容器和修改容器配置</p>
<p>使用 <code v-pre>cron</code> 设置计划任务，以每天的上午 8 点和下午 8 点执行备份脚本：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-e</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 <code v-pre>crontab</code> 文件中添加以下行：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">0</span> <span class="token number">8,20</span> * * * /backup.sh <span class="token operator">>></span> /backups/backup.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-启动容器并验证" tabindex="-1"><a class="header-anchor" href="#_5-启动容器并验证" aria-hidden="true">#</a> 5. 启动容器并验证</h3>
<p>重新启动容器，并手动运行恢复备份脚本来验证备份和恢复功能：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> restart xtrabackup
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> xtrabackup /restore.sh <span class="token comment">#需要恢复时在运行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>确保恢复备份后，您需要手动启动 MySQL 服务-</p>
<p>。</p>
</div></template>


