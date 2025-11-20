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
        prefix: "linux运维/",
        children: [
          {
            text: "Linux-LVM 磁盘扩容",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "Ubuntu防火墙设置",
            icon: "pen-to-square",
            link: "2",
          },
          {
            text: "minio文件服务器",
            icon: "pen-to-square",
            link: "3",
          },
          {
            text: "Linux自动备份",
            icon: "pen-to-square",
            link: "4",
          },
          {
            text: "Linux自动删除docker镜像",
            icon: "pen-to-square",
            link: "5",
          },
          {
            text: "Linux运维日常记录",
            icon: "pen-to-square",
            link: "6",
          },
          {
            text: "rsync备份数据库",
            icon: "pen-to-square",
            link: "7",
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
          {
            text: "Prometheus、Alertmanager、grafana部署",
            icon: "pen-to-square",
            link: "6",
          },
          {
            text: "ELFK部署",
            icon: "pen-to-square",
            link: "7",
          },
          {
            text: "DevOps自动化部署",
            icon: "pen-to-square",
            link: "8",
          },
          {
            text: "微服务K8S部署",
            icon: "pen-to-square",
            link: "9",
          },
          {
            text: "xtrabackup备份MySQL数据库",
            icon: "pen-to-square",
            link: "10",
          },
          {
            text: "weave和xxl-job-admin安装与使用",
            icon: "pen-to-square",
            link: "11",
          },
        ],
      },
      {
        text: "K8S学习",
        icon: "pen-to-square",
        prefix: "k8s学习/",
        children: [
          {
            text: "k8s学习文档",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "traefik学习",
            icon: "pen-to-square",
            link: "2",
          },
          {
            text: "kubesphere实现流水线部署",
            icon: "pen-to-square",
            link: "3",
          },
          {
            text: "项目实现jenkins+K8S部署",
            icon: "pen-to-square",
            link: "4",
          },
          {
            text: "k8s安装kube-prometheus-stack",
            icon: "pen-to-square",
            link: "5",
          },
          {
            text: "RKE2安装K8S集群",
            icon: "pen-to-square",
            link: "6",
          },
        ],
      },
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
        prefix: "java文章",
        children: [
          {
            text: "SpringBoot上传文件到minio服务器",
            icon: "pen-to-square",
            link: "3",
          },
          {
            text: "成品去重和根据时间来查询",
            icon: "pen-to-square",
            link: "2",
          },
          {
            text: "根据类型统计重量接口和返回数据",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "将数据求和存入数组中",
            icon: "pen-to-square",
            link: "4",
          },
          {
            text: "根据批号批量查询数据",
            icon: "pen-to-square",
            link: "5",
          },
          {
            text: "查询ID与批号同时存在才能更新数据",
            icon: "pen-to-square",
            link: "6",
          },
          {
            text: "根据类型等于1的数据判断返回给前端",
            icon: "pen-to-square",
            link: "7",
          },
          {
            text: "查出数据库type4类型为0",
            icon: "pen-to-square",
            link: "8",
          },
          {
            text: "Java默认插入子表数据",
            icon: "pen-to-square",
            link: "9",
          },
          {
            text: "根据ID批量修改状态",
            icon: "pen-to-square",
            link: "10",
          },
          {
            text: "根据字符串字段批量修改状态",
            icon: "pen-to-square",
            link: "11",
          },
          {
            text: "java处理oracle date时间类型",
            icon: "pen-to-square",
            link: "12",
          },
          {
            text: "EasyExce的LocalTime、LocalDate和Timestamp转换器",
            icon: "pen-to-square",
            link: "13",
          },
          {
            text: "java处理时间类型转换",
            icon: "pen-to-square",
            link: "14",
          },
          {
            text: "前端默认时间查询,后端默认时间导出",
            icon: "pen-to-square",
            link: "15",
          },
          {
            text: "安装部署MQ",
            icon: "pen-to-square",
            link: "16",
          },
        ],
      },
    ],
  },
  {
    text: "前端文档",
    icon: "pen-to-square",
    prefix: "/front/",
    children: [
      {
        text: "vue",
        icon: "pen-to-square",
        prefix: "vue文章",
        children: [],
      },
    ],
  },
  {
    text: "网络安全",
    icon: "pen-to-square",
    prefix: "/safety/",
    children: [
      {
        text: "安全检测",
        icon: "pen-to-square",
        //prefix: "漏洞检测",
        children: [
          {
            text: "awvs和nessus安装",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "安装v2rayA",
            icon: "pen-to-square",
            link: "2",
          },
        ],
      },
    ],
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
