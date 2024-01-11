export const data = JSON.parse("{\"key\":\"v-5ca36714\",\"path\":\"/posts/apple/017.Linux-LVM%20%E7%A3%81%E7%9B%98%E6%89%A9%E5%AE%B9.html\",\"title\":\"Linux LVM 磁盘扩容\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"Linux LVM 磁盘扩容 LVM 的基本概念 物理卷 Physical Volume (PV)： 可以在上面建立卷组的媒介，可以是硬盘分区，也可以是硬盘本身或者回环文件（loopback file）。物理卷包括一个特殊的 header，其余部分被切割为一块块物理区域（physical extents） 卷组 Volume group (VG)： 将一组物理卷收集为一个管理单元 逻辑卷 Logical volume (LV)： 虚拟分区，由物理区域（physical extents）组成 物理区域 Physical extent (PE)： 硬盘可供指派给逻辑卷的最小单位（通常为 4MB）\"},\"headers\":[{\"level\":2,\"title\":\"LVM 的基本概念\",\"slug\":\"lvm-的基本概念\",\"link\":\"#lvm-的基本概念\",\"children\":[]},{\"level\":2,\"title\":\"磁盘操作相关命令\",\"slug\":\"磁盘操作相关命令\",\"link\":\"#磁盘操作相关命令\",\"children\":[]},{\"level\":2,\"title\":\"开始 LVM 扩容\",\"slug\":\"开始-lvm-扩容\",\"link\":\"#开始-lvm-扩容\",\"children\":[{\"level\":3,\"title\":\"查看 fdisk\",\"slug\":\"查看-fdisk\",\"link\":\"#查看-fdisk\",\"children\":[]},{\"level\":3,\"title\":\"查看所有储存设备\",\"slug\":\"查看所有储存设备\",\"link\":\"#查看所有储存设备\",\"children\":[]},{\"level\":3,\"title\":\"创建 sdb 分区\",\"slug\":\"创建-sdb-分区\",\"link\":\"#创建-sdb-分区\",\"children\":[]},{\"level\":3,\"title\":\"格式化磁盘\",\"slug\":\"格式化磁盘\",\"link\":\"#格式化磁盘\",\"children\":[]},{\"level\":3,\"title\":\"创建 PV\",\"slug\":\"创建-pv\",\"link\":\"#创建-pv\",\"children\":[]},{\"level\":3,\"title\":\"查看卷组\",\"slug\":\"查看卷组\",\"link\":\"#查看卷组\",\"children\":[]},{\"level\":3,\"title\":\"扩容 VG\",\"slug\":\"扩容-vg\",\"link\":\"#扩容-vg\",\"children\":[]},{\"level\":3,\"title\":\"扩容 LV\",\"slug\":\"扩容-lv\",\"link\":\"#扩容-lv\",\"children\":[]}]}],\"readingTime\":{\"minutes\":6.14,\"words\":1843},\"filePathRelative\":\"posts/apple/017.Linux-LVM 磁盘扩容.md\",\"excerpt\":\"<h1> Linux LVM 磁盘扩容</h1>\\n<h2> LVM 的基本概念</h2>\\n<ul>\\n<li><strong>物理卷 Physical Volume (PV)：</strong> 可以在上面建立卷组的媒介，可以是硬盘分区，也可以是硬盘本身或者回环文件（loopback file）。物理卷包括一个特殊的 header，其余部分被切割为一块块物理区域（physical extents）</li>\\n<li><strong>卷组 Volume group (VG)：</strong> 将一组物理卷收集为一个管理单元</li>\\n<li><strong>逻辑卷 Logical volume (LV)：</strong> 虚拟分区，由物理区域（physical extents）组成</li>\\n<li><strong>物理区域 Physical extent (PE)：</strong> 硬盘可供指派给逻辑卷的最小单位（通常为 4MB）</li>\\n</ul>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
