const e=JSON.parse('{"key":"v-2e29a37a","path":"/posts/linux%E8%BF%90%E7%BB%B4/1.html","title":"Linux LVM 磁盘扩容","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-01-09T00:00:00.000Z","category":["Linux"],"tag":["LVM","物理卷","LV","LVM扩容"],"star":true,"sticky":true,"description":"Linux LVM 磁盘扩容 LVM 的基本概念 物理卷 Physical Volume (PV)： 可以在上面建立卷组的媒介，可以是硬盘分区，也可以是硬盘本身或者回环文件（loopback file）。物理卷包括一个特殊的 header，其余部分被切割为一块块物理区域（physical extents） 卷组 Volume group (VG)： 将一组物理卷收集为一个管理单元 逻辑卷 Logical volume (LV)： 虚拟分区，由物理区域（physical extents）组成 物理区域 Physical extent (PE)： 硬盘可供指派给逻辑卷的最小单位（通常为 4MB）","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/linux%E8%BF%90%E7%BB%B4/1.html"}],["meta",{"property":"og:title","content":"Linux LVM 磁盘扩容"}],["meta",{"property":"og:description","content":"Linux LVM 磁盘扩容 LVM 的基本概念 物理卷 Physical Volume (PV)： 可以在上面建立卷组的媒介，可以是硬盘分区，也可以是硬盘本身或者回环文件（loopback file）。物理卷包括一个特殊的 header，其余部分被切割为一块块物理区域（physical extents） 卷组 Volume group (VG)： 将一组物理卷收集为一个管理单元 逻辑卷 Logical volume (LV)： 虚拟分区，由物理区域（physical extents）组成 物理区域 Physical extent (PE)： 硬盘可供指派给逻辑卷的最小单位（通常为 4MB）"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-20T03:57:49.000Z"}],["meta",{"property":"article:author","content":"微梦蜉蝣"}],["meta",{"property":"article:tag","content":"LVM"}],["meta",{"property":"article:tag","content":"物理卷"}],["meta",{"property":"article:tag","content":"LV"}],["meta",{"property":"article:tag","content":"LVM扩容"}],["meta",{"property":"article:published_time","content":"2024-01-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-20T03:57:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux LVM 磁盘扩容\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-20T03:57:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"微梦蜉蝣\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":3,"title":"LVM 的基本概念","slug":"lvm-的基本概念","link":"#lvm-的基本概念","children":[]},{"level":2,"title":"磁盘操作相关命令","slug":"磁盘操作相关命令","link":"#磁盘操作相关命令","children":[]},{"level":2,"title":"开始 LVM 扩容","slug":"开始-lvm-扩容","link":"#开始-lvm-扩容","children":[{"level":3,"title":"查看 fdisk","slug":"查看-fdisk","link":"#查看-fdisk","children":[]},{"level":3,"title":"查看所有储存设备","slug":"查看所有储存设备","link":"#查看所有储存设备","children":[]},{"level":3,"title":"创建 sdb 分区","slug":"创建-sdb-分区","link":"#创建-sdb-分区","children":[]},{"level":3,"title":"格式化磁盘","slug":"格式化磁盘","link":"#格式化磁盘","children":[]},{"level":3,"title":"创建 PV","slug":"创建-pv","link":"#创建-pv","children":[]},{"level":3,"title":"查看卷组","slug":"查看卷组","link":"#查看卷组","children":[]},{"level":3,"title":"扩容 VG","slug":"扩容-vg","link":"#扩容-vg","children":[]},{"level":3,"title":"扩容 LV","slug":"扩容-lv","link":"#扩容-lv","children":[]}]}],"git":{"createdTime":1705723069000,"updatedTime":1705723069000,"contributors":[{"name":"wangbinggui","email":"1819493621@qq.com","commits":1}]},"readingTime":{"minutes":6.23,"words":1868},"filePathRelative":"posts/linux运维/1.md","localizedDate":"2024年1月9日","excerpt":"<h1> Linux LVM 磁盘扩容</h1>\\n<h3> LVM 的基本概念</h3>\\n<ul>\\n<li><strong>物理卷 Physical Volume (PV)：</strong> 可以在上面建立卷组的媒介，可以是硬盘分区，也可以是硬盘本身或者回环文件（loopback file）。物理卷包括一个特殊的 header，其余部分被切割为一块块物理区域（physical extents）</li>\\n<li><strong>卷组 Volume group (VG)：</strong> 将一组物理卷收集为一个管理单元</li>\\n<li><strong>逻辑卷 Logical volume (LV)：</strong> 虚拟分区，由物理区域（physical extents）组成</li>\\n<li><strong>物理区域 Physical extent (PE)：</strong> 硬盘可供指派给逻辑卷的最小单位（通常为 4MB）</li>\\n</ul>","autoDesc":true}');export{e as data};