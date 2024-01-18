import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "自动化维运",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Linux运维",
        icon: "pen-to-square",
        prefix: "运维/",
        children: [
          {
            text: "Linux-LVM 磁盘扩容",
            icon: "pen-to-square",
            link: "1"
          },
          {
            text: "Ubuntu防火墙设置",
            icon: "pen-to-square",
            link: "2"
          },
          {
            text: "minio文件服务器",
            icon: "pen-to-square",
            link:
              "3"
          },
          {
            text: "Linux自动备份",
            icon: "pen-to-square",
            link: "4"
          },
        ],
      },
      {
        text: "应用软件部署",
        icon: "pen-to-square",
        prefix: "软件部署/",
        children: [
          {
            text: "docker安装nginx，并配置SSL证书",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "docker安装nginx服务器,代理访问minio",
            icon: "pen-to-square",
            link: "2",
          },
          {
            text: "docker安装mysql",
            icon: "pen-to-square",
            link: "3",
          },
          {
            text: "MySQL数据备份",
            icon: "pen-to-square",
            link: "4",
          },
          {
            text: "docker安装weejewel/wg-easy",
            icon: "pen-to-square",
            link: "5",
          },

        ],
      },
      { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      "tomato",
      "strawberry",
    ],
  },
  {
    text: "后端文档",
    icon: "pen-to-square",
    prefix: "/demo/",
    children: [
      {
        text: "java",
        icon: "pen-to-square",
        prefix: "java/",
        children: [
          {
            text: "SpringBoot上传文件到minio服务器",
            icon: "pen-to-square",
            link: "disable"
          },
        ]
      },
    ]
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
