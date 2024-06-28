<template><div><h1 id="linux-lvm-磁盘扩容" tabindex="-1"><a class="header-anchor" href="#linux-lvm-磁盘扩容" aria-hidden="true">#</a> Linux LVM 磁盘扩容</h1>
<h3 id="lvm-的基本概念" tabindex="-1"><a class="header-anchor" href="#lvm-的基本概念" aria-hidden="true">#</a> LVM 的基本概念</h3>
<ul>
<li><strong>物理卷 Physical Volume (PV)：</strong> 可以在上面建立卷组的媒介，可以是硬盘分区，也可以是硬盘本身或者回环文件（loopback file）。物理卷包括一个特殊的 header，其余部分被切割为一块块物理区域（physical extents）</li>
<li><strong>卷组 Volume group (VG)：</strong> 将一组物理卷收集为一个管理单元</li>
<li><strong>逻辑卷 Logical volume (LV)：</strong> 虚拟分区，由物理区域（physical extents）组成</li>
<li><strong>物理区域 Physical extent (PE)：</strong> 硬盘可供指派给逻辑卷的最小单位（通常为 4MB）</li>
</ul>
<h2 id="磁盘操作相关命令" tabindex="-1"><a class="header-anchor" href="#磁盘操作相关命令" aria-hidden="true">#</a> 磁盘操作相关命令</h2>
<ul>
<li>查看挂载点</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">df</span> <span class="token parameter variable">-h</span>

<span class="token comment"># 输出如下</span>
Filesystem                         Size  Used Avail Use% Mounted on
udev                               955M     <span class="token number">0</span>  955M   <span class="token number">0</span>% /dev
tmpfs                              198M  <span class="token number">1</span>.8M  196M   <span class="token number">1</span>% /run
<span class="token comment">## 此处为我们磁盘的挂载点</span>
/dev/mapper/ubuntu--vg-ubuntu--lv   19G  <span class="token number">6</span>.0G   12G  <span class="token number">35</span>% /
tmpfs                              986M     <span class="token number">0</span>  986M   <span class="token number">0</span>% /dev/shm
tmpfs                              <span class="token number">5</span>.0M     <span class="token number">0</span>  <span class="token number">5</span>.0M   <span class="token number">0</span>% /run/lock
tmpfs                              986M     <span class="token number">0</span>  986M   <span class="token number">0</span>% /sys/fs/cgroup
/dev/loop1                          91M   91M     <span class="token number">0</span> <span class="token number">100</span>% /snap/core/6350
/dev/loop0                          89M   89M     <span class="token number">0</span> <span class="token number">100</span>% /snap/core/6964
/dev/sda2                          976M  143M  767M  <span class="token number">16</span>% /boot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>显示当前的 logical volume：<code v-pre>lvdisplay</code></li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lvdisplay

<span class="token comment"># 输出如下</span>
--- Logical volume ---
LV Path                /dev/ubuntu-vg/ubuntu-lv
LV Name                ubuntu-lv
VG Name                ubuntu-vg
LV UUID                e2fKkR-oZeH-WV2A-ltCi-P76v-N9yv-aUtIg1
LV Write Access        read/write
LV Creation host, <span class="token function">time</span> ubuntu-server, <span class="token number">2019</span>-05-14 03:13:57 +0800
LV Status              available
<span class="token comment"># open                 1</span>
LV Size                <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB
Current LE             <span class="token number">4863</span>
Segments               <span class="token number">1</span>
Allocation             inherit
Read ahead sectors     auto
- currently <span class="token builtin class-name">set</span> to     <span class="token number">256</span>
Block device           <span class="token number">253</span>:0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>显示当前的 volume group</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>vgdisplay

<span class="token comment"># 输出如下</span>
--- Volume group ---
VG Name               ubuntu-vg
System ID             
Format                lvm2
Metadata Areas        <span class="token number">1</span>
Metadata Sequence No  <span class="token number">2</span>
VG Access             read/write
VG Status             resizable
MAX LV                <span class="token number">0</span>
Cur LV                <span class="token number">1</span>
Open LV               <span class="token number">1</span>
Max PV                <span class="token number">0</span>
Cur PV                <span class="token number">1</span>
Act PV                <span class="token number">1</span>
<span class="token comment">## 这里应该是你当前的可用空间大小，待扩容完毕，这里显示的应该是最终的大小</span>
VG Size               <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB
PE Size               <span class="token number">4.00</span> MiB
Total PE              <span class="token number">4863</span>
Alloc PE / Size       <span class="token number">4863</span> / <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB
Free  PE / Size       <span class="token number">0</span> / <span class="token number">0</span>   
VG UUID               dhI9ns-7lOI-pXf8-IOWL-F96N-JIYG-ZF6u82
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>显示当前的 physical volume</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pvdisplay

<span class="token comment"># 输出如下</span>
--- Physical volume ---
PV Name               /dev/sda3
VG Name               ubuntu-vg
PV Size               <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB / not usable <span class="token number">0</span>   
Allocatable           <span class="token function">yes</span> <span class="token punctuation">(</span>but full<span class="token punctuation">)</span>
PE Size               <span class="token number">4.00</span> MiB
Total PE              <span class="token number">4863</span>
Free PE               <span class="token number">0</span>
Allocated PE          <span class="token number">4863</span>
PV UUID               TDFe2b-xsce-R8So-ldxR-ohcp-fx5J-n2JNOa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开始-lvm-扩容" tabindex="-1"><a class="header-anchor" href="#开始-lvm-扩容" aria-hidden="true">#</a> 开始 LVM 扩容</h2>
<h3 id="查看-fdisk" tabindex="-1"><a class="header-anchor" href="#查看-fdisk" aria-hidden="true">#</a> 查看 fdisk</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">fdisk</span> <span class="token parameter variable">-l</span>

<span class="token comment"># 输出如下</span>
Disk /dev/loop0: <span class="token number">88.4</span> MiB, <span class="token number">92733440</span> bytes, <span class="token number">181120</span> sectors
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes

Disk /dev/loop1: <span class="token number">91</span> MiB, <span class="token number">95408128</span> bytes, <span class="token number">186344</span> sectors
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes

Disk /dev/sda: <span class="token number">20</span> GiB, <span class="token number">21474836480</span> bytes, <span class="token number">41943040</span> sectors
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
Disklabel type: gpt
Disk identifier: F96F20D7-1F28-4B03-87CF-4FA3E81FDE29

Device       Start      End  Sectors Size Type
/dev/sda1     <span class="token number">2048</span>     <span class="token number">4095</span>     <span class="token number">2048</span>   1M BIOS boot
/dev/sda2     <span class="token number">4096</span>  <span class="token number">2101247</span>  <span class="token number">2097152</span>   1G Linux filesystem
/dev/sda3  <span class="token number">2101248</span> <span class="token number">41940991</span> <span class="token number">39839744</span>  19G Linux filesystem

Disk /dev/mapper/ubuntu--vg-ubuntu--lv: <span class="token number">19</span> GiB, <span class="token number">20396900352</span> bytes, <span class="token number">39837696</span> sectors
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看所有储存设备" tabindex="-1"><a class="header-anchor" href="#查看所有储存设备" aria-hidden="true">#</a> 查看所有储存设备</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">fdisk</span> <span class="token parameter variable">-l</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">'/dev'</span>

<span class="token comment"># 输出如下</span>
Disk /dev/loop0: <span class="token number">88.4</span> MiB, <span class="token number">92733440</span> bytes, <span class="token number">181120</span> sectors
Disk /dev/loop1: <span class="token number">91</span> MiB, <span class="token number">95408128</span> bytes, <span class="token number">186344</span> sectors
<span class="token comment">## 目前只有一块磁盘 sda</span>
Disk /dev/sda: <span class="token number">20</span> GiB, <span class="token number">21474836480</span> bytes, <span class="token number">41943040</span> sectors
/dev/sda1     <span class="token number">2048</span>     <span class="token number">4095</span>     <span class="token number">2048</span>   1M BIOS boot
/dev/sda2     <span class="token number">4096</span>  <span class="token number">2101247</span>  <span class="token number">2097152</span>   1G Linux filesystem
/dev/sda3  <span class="token number">2101248</span> <span class="token number">41940991</span> <span class="token number">39839744</span>  19G Linux filesystem
Disk /dev/mapper/ubuntu--vg-ubuntu--lv: <span class="token number">19</span> GiB, <span class="token number">20396900352</span> bytes, <span class="token number">39837696</span> sectors
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 在虚拟机中挂载多一块磁盘，再操作</span>
<span class="token function">fdisk</span> <span class="token parameter variable">-l</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">'/dev'</span>

<span class="token comment"># 输出如下</span>
Disk /dev/loop0: <span class="token number">88.4</span> MiB, <span class="token number">92733440</span> bytes, <span class="token number">181120</span> sectors
Disk /dev/loop1: <span class="token number">91</span> MiB, <span class="token number">95408128</span> bytes, <span class="token number">186344</span> sectors
<span class="token comment">## 挂载的第一块磁盘 sda</span>
Disk /dev/sda: <span class="token number">20</span> GiB, <span class="token number">21474836480</span> bytes, <span class="token number">41943040</span> sectors
/dev/sda1     <span class="token number">2048</span>     <span class="token number">4095</span>     <span class="token number">2048</span>   1M BIOS boot
/dev/sda2     <span class="token number">4096</span>  <span class="token number">2101247</span>  <span class="token number">2097152</span>   1G Linux filesystem
/dev/sda3  <span class="token number">2101248</span> <span class="token number">41940991</span> <span class="token number">39839744</span>  19G Linux filesystem
<span class="token comment">## 挂载的第二块磁盘 sdb</span>
Disk /dev/sdb: <span class="token number">20</span> GiB, <span class="token number">21474836480</span> bytes, <span class="token number">41943040</span> sectors
Disk /dev/mapper/ubuntu--vg-ubuntu--lv: <span class="token number">19</span> GiB, <span class="token number">20396900352</span> bytes, <span class="token number">39837696</span> sectors
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建-sdb-分区" tabindex="-1"><a class="header-anchor" href="#创建-sdb-分区" aria-hidden="true">#</a> 创建 sdb 分区</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">fdisk</span> /dev/sdb

<span class="token comment"># 输出如下</span>
Welcome to <span class="token function">fdisk</span> <span class="token punctuation">(</span>util-linux <span class="token number">2.31</span>.1<span class="token punctuation">)</span>.
Changes will remain <span class="token keyword">in</span> memory only, <span class="token keyword">until</span> you decide to <span class="token function">write</span> them.
Be careful before using the <span class="token function">write</span> command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x0de15f1d.

<span class="token comment">## 在此处输入命令</span>
<span class="token comment">## n：新建分区</span>
<span class="token comment">## l: 选择逻辑分区，如果没有，则首先创建主分区（p），然后再添加逻辑分区（硬盘最多四个分区 P-P-P-P 或 P-P-P-E）</span>
Command <span class="token punctuation">(</span>m <span class="token keyword">for</span> <span class="token builtin class-name">help</span><span class="token punctuation">)</span>: n
Partition <span class="token builtin class-name">type</span>
   p   primary <span class="token punctuation">(</span><span class="token number">0</span> primary, <span class="token number">0</span> extended, <span class="token number">4</span> <span class="token function">free</span><span class="token punctuation">)</span>
   e   extended <span class="token punctuation">(</span>container <span class="token keyword">for</span> logical partitions<span class="token punctuation">)</span>
Select <span class="token punctuation">(</span>default p<span class="token punctuation">)</span>:

Using default response p.
Partition number <span class="token punctuation">(</span><span class="token number">1</span>-4, default <span class="token number">1</span><span class="token punctuation">)</span>: 
First sector <span class="token punctuation">(</span><span class="token number">2048</span>-41943039, default <span class="token number">2048</span><span class="token punctuation">)</span>: 
Last sector, +sectors or +size<span class="token punctuation">{</span>K,M,G,T,P<span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token number">2048</span>-41943039, default <span class="token number">41943039</span><span class="token punctuation">)</span>: 

Created a new partition <span class="token number">1</span> of <span class="token builtin class-name">type</span> <span class="token string">'Linux'</span> and of size <span class="token number">20</span> GiB.

<span class="token comment">## 在此处输入命令</span>
<span class="token comment">## w：写入磁盘</span>
Command <span class="token punctuation">(</span>m <span class="token keyword">for</span> <span class="token builtin class-name">help</span><span class="token punctuation">)</span>: w
The partition table has been altered.
Calling ioctl<span class="token punctuation">(</span><span class="token punctuation">)</span> to re-read partition table.
Syncing disks.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="格式化磁盘" tabindex="-1"><a class="header-anchor" href="#格式化磁盘" aria-hidden="true">#</a> 格式化磁盘</h3>
<ul>
<li>查看分区</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">fdisk</span> <span class="token parameter variable">-l</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">'/dev'</span>

<span class="token comment"># 输出如下</span>
Disk /dev/loop0: <span class="token number">88.4</span> MiB, <span class="token number">92733440</span> bytes, <span class="token number">181120</span> sectors
Disk /dev/loop1: <span class="token number">91</span> MiB, <span class="token number">95408128</span> bytes, <span class="token number">186344</span> sectors
Disk /dev/sda: <span class="token number">20</span> GiB, <span class="token number">21474836480</span> bytes, <span class="token number">41943040</span> sectors
/dev/sda1     <span class="token number">2048</span>     <span class="token number">4095</span>     <span class="token number">2048</span>   1M BIOS boot
/dev/sda2     <span class="token number">4096</span>  <span class="token number">2101247</span>  <span class="token number">2097152</span>   1G Linux filesystem
/dev/sda3  <span class="token number">2101248</span> <span class="token number">41940991</span> <span class="token number">39839744</span>  19G Linux filesystem
Disk /dev/sdb: <span class="token number">20</span> GiB, <span class="token number">21474836480</span> bytes, <span class="token number">41943040</span> sectors
<span class="token comment">## 此时可以看见新创建的分区 /dev/sdb1</span>
/dev/sdb1        <span class="token number">2048</span> <span class="token number">41943039</span> <span class="token number">41940992</span>  20G <span class="token number">83</span> Linux
Disk /dev/mapper/ubuntu--vg-ubuntu--lv: <span class="token number">19</span> GiB, <span class="token number">20396900352</span> bytes, <span class="token number">39837696</span> sectors
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>格式化</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkfs</span> <span class="token parameter variable">-t</span> ext4 /dev/sdb1

<span class="token comment"># 输出如下</span>
<span class="token function">mke2fs</span> <span class="token number">1.44</span>.1 <span class="token punctuation">(</span><span class="token number">24</span>-Mar-2018<span class="token punctuation">)</span>
Creating filesystem with <span class="token number">5242624</span> 4k blocks and <span class="token number">1310720</span> inodes
Filesystem UUID: 6f11063f-c118-4099-90fc-2b083c181b23
Superblock backups stored on blocks: 
        <span class="token number">32768</span>, <span class="token number">98304</span>, <span class="token number">163840</span>, <span class="token number">229376</span>, <span class="token number">294912</span>, <span class="token number">819200</span>, <span class="token number">884736</span>, <span class="token number">1605632</span>, <span class="token number">2654208</span>, 
        <span class="token number">4096000</span>

Allocating group tables: <span class="token keyword">done</span>                            
Writing inode tables: <span class="token keyword">done</span>                            
Creating journal <span class="token punctuation">(</span><span class="token number">32768</span> blocks<span class="token punctuation">)</span>: <span class="token keyword">done</span>
Writing superblocks and filesystem accounting information: <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建-pv" tabindex="-1"><a class="header-anchor" href="#创建-pv" aria-hidden="true">#</a> 创建 PV</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pvcreate /dev/sdb1

<span class="token comment"># 输出如下</span>
WARNING: ext4 signature detected on /dev/sdb1 at offset <span class="token number">1080</span>. Wipe it? <span class="token punctuation">[</span>y/n<span class="token punctuation">]</span>: y
  Wiping ext4 signature on /dev/sdb1.
  Physical volume <span class="token string">"/dev/sdb1"</span> successfully created.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看卷组" tabindex="-1"><a class="header-anchor" href="#查看卷组" aria-hidden="true">#</a> 查看卷组</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pvscan

<span class="token comment"># 输出如下</span>
PV /dev/sda3   VG ubuntu-vg       lvm2 <span class="token punctuation">[</span><span class="token operator">&lt;</span><span class="token number">19.00</span> GiB / <span class="token number">0</span>    free<span class="token punctuation">]</span>
PV /dev/sdb1                      lvm2 <span class="token punctuation">[</span><span class="token operator">&lt;</span><span class="token number">20.00</span> GiB<span class="token punctuation">]</span>
Total: <span class="token number">2</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span><span class="token number">39.00</span> GiB<span class="token punctuation">]</span> / <span class="token keyword">in</span> use: <span class="token number">1</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span><span class="token number">19.00</span> GiB<span class="token punctuation">]</span> / <span class="token keyword">in</span> no VG: <span class="token number">1</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span><span class="token number">20.00</span> GiB<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩容-vg" tabindex="-1"><a class="header-anchor" href="#扩容-vg" aria-hidden="true">#</a> 扩容 VG</h3>
<ul>
<li>查看 VG</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>vgdisplay

<span class="token comment"># 输出如下</span>
--- Volume group ---
<span class="token comment">## 我们需要用到 VG Name</span>
VG Name               ubuntu-vg
System ID             
Format                lvm2
Metadata Areas        <span class="token number">1</span>
Metadata Sequence No  <span class="token number">2</span>
VG Access             read/write
VG Status             resizable
MAX LV                <span class="token number">0</span>
Cur LV                <span class="token number">1</span>
Open LV               <span class="token number">1</span>
Max PV                <span class="token number">0</span>
Cur PV                <span class="token number">1</span>
Act PV                <span class="token number">1</span>
VG Size               <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB
PE Size               <span class="token number">4.00</span> MiB
Total PE              <span class="token number">4863</span>
Alloc PE / Size       <span class="token number">4863</span> / <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB
Free  PE / Size       <span class="token number">0</span> / <span class="token number">0</span>   
VG UUID               dhI9ns-7lOI-pXf8-IOWL-F96N-JIYG-ZF6u82
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>扩容 VG</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>vgextend ubuntu-vg /dev/sdb1

<span class="token comment"># 输出如下</span>
Volume group <span class="token string">"ubuntu-vg"</span> successfully extended
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩容-lv" tabindex="-1"><a class="header-anchor" href="#扩容-lv" aria-hidden="true">#</a> 扩容 LV</h3>
<ul>
<li>查看 VG</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>vgdisplay

<span class="token comment"># 输出如下</span>
--- Volume group ---
VG Name               ubuntu-vg
System ID             
Format                lvm2
Metadata Areas        <span class="token number">2</span>
Metadata Sequence No  <span class="token number">3</span>
VG Access             read/write
VG Status             resizable
MAX LV                <span class="token number">0</span>
Cur LV                <span class="token number">1</span>
Open LV               <span class="token number">1</span>
Max PV                <span class="token number">0</span>
Cur PV                <span class="token number">2</span>
Act PV                <span class="token number">2</span>
VG Size               <span class="token number">38.99</span> GiB
PE Size               <span class="token number">4.00</span> MiB
Total PE              <span class="token number">9982</span>
Alloc PE / Size       <span class="token number">4863</span> / <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB
<span class="token comment">## 这里是可以扩容的大小</span>
Free  PE / Size       <span class="token number">5119</span> / <span class="token operator">&lt;</span><span class="token number">20.00</span> GiB
VG UUID               dhI9ns-7lOI-pXf8-IOWL-F96N-JIYG-ZF6u82
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查看 LV</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lvdisplay

<span class="token comment"># 输出如下</span>
--- Logical volume ---
<span class="token comment">## 我们需要用到 LV Path</span>
LV Path                /dev/ubuntu-vg/ubuntu-lv
LV Name                ubuntu-lv
VG Name                ubuntu-vg
LV UUID                e2fKkR-oZeH-WV2A-ltCi-P76v-N9yv-aUtIg1
LV Write Access        read/write
LV Creation host, <span class="token function">time</span> ubuntu-server, <span class="token number">2019</span>-05-14 03:13:57 +0800
LV Status              available
<span class="token comment"># open                 1</span>
LV Size                <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB
Current LE             <span class="token number">4863</span>
Segments               <span class="token number">1</span>
Allocation             inherit
Read ahead sectors     auto
- currently <span class="token builtin class-name">set</span> to     <span class="token number">256</span>
Block device           <span class="token number">253</span>:0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>扩容 LV</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 按固定大小追加</span>
lvextend <span class="token parameter variable">-L</span> +10G /dev/ubuntu-vg/ubuntu-lv

<span class="token comment"># 按百分比追加</span>
lvextend <span class="token parameter variable">-l</span> +100%FREE /dev/ubuntu-vg/ubuntu-lv

<span class="token comment"># 输出如下</span>
Size of logical volume ubuntu-vg/ubuntu-lv changed from <span class="token operator">&lt;</span><span class="token number">19.00</span> GiB <span class="token punctuation">(</span><span class="token number">4863</span> extents<span class="token punctuation">)</span> to <span class="token number">38.99</span> GiB <span class="token punctuation">(</span><span class="token number">9982</span> extents<span class="token punctuation">)</span>.
Logical volume ubuntu-vg/ubuntu-lv successfully resized.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>刷新分区</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>resize2fs /dev/ubuntu-vg/ubuntu-lv
<span class="token comment">#当格式为 xfs 要使用以下命令刷新</span>
xfs_growfs  /dev/ubuntu-vg/ubuntu-lv
<span class="token comment"># 输出如下</span>
Filesystem at /dev/ubuntu-vg/ubuntu-lv is mounted on /<span class="token punctuation">;</span> on-line resizing required
old_desc_blocks <span class="token operator">=</span> <span class="token number">3</span>, new_desc_blocks <span class="token operator">=</span> <span class="token number">5</span>
The filesystem on /dev/ubuntu-vg/ubuntu-lv is now <span class="token number">10221568</span> <span class="token punctuation">(</span>4k<span class="token punctuation">)</span> blocks long.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>验证是否成功</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lvdisplay

--- Logical volume ---
LV Path                /dev/ubuntu-vg/ubuntu-lv
LV Name                ubuntu-lv
VG Name                ubuntu-vg
LV UUID                e2fKkR-oZeH-WV2A-ltCi-P76v-N9yv-aUtIg1
LV Write Access        read/write
LV Creation host, <span class="token function">time</span> ubuntu-server, <span class="token number">2019</span>-05-14 03:13:57 +0800
LV Status              available
<span class="token comment"># open                 1</span>
<span class="token comment">## 可以看到磁盘扩容成功了</span>
LV Size                <span class="token number">38.99</span> GiB
Current LE             <span class="token number">9982</span>
Segments               <span class="token number">2</span>
Allocation             inherit
Read ahead sectors     auto
- currently <span class="token builtin class-name">set</span> to     <span class="token number">256</span>
Block device           <span class="token number">253</span>:0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注意：</strong> 不要卸载扩容的磁盘，可能出现丢失数据或是系统无法启动</p>
</blockquote>
</div></template>


