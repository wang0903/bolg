import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "后端文章",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "前端文章",
      icon: "book",
      prefix: "front/",
      children: "structure",
    },
    {
      text: "运维文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "网络安全",
      icon: "book",
      prefix: "safety/",
      children: "structure",
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    },
  ],
});
