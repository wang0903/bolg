import { defineClientConfig } from "@vuepress/client";
import { VPLink } from "D:/JavaWeb/bolg/node_modules/.pnpm/vuepress-shared@2.0.0-rc.11_vuepress@2.0.0-rc.0/node_modules/vuepress-shared/lib/client/index.js";

import { HopeIcon, Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "D:/JavaWeb/bolg/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.11_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-theme-hope/lib/bundle/export.js";

import { defineAutoCatalogGetter } from "D:/JavaWeb/bolg/node_modules/.pnpm/vuepress-plugin-auto-catalog@2.0.0-rc.11_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-auto-catalog/lib/client/index.js"
import { h } from "vue"
import { BlogCategory, BlogHome, BlogType, BloggerInfo, Timeline, setupBlog } from "D:/JavaWeb/bolg/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.11_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-theme-hope/lib/bundle/modules/blog/export.js";
import "D:/JavaWeb/bolg/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.11_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-theme-hope/lib/bundle/modules/blog/styles/all.scss";
import { GlobalEncrypt, LocalEncrypt } from "D:/JavaWeb/bolg/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.11_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/export.js";
import "D:/JavaWeb/bolg/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.11_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/styles/all.scss"

import "D:/JavaWeb/bolg/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.11_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-theme-hope/lib/bundle/styles/all.scss";

defineAutoCatalogGetter((meta) => {
  const title = meta.t;
  const shouldIndex = meta.I !== false;
  const icon = meta.i;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(HopeIcon, { icon }), title] : null,
    order: meta.O,
    index: meta.I,
  } : null;
});

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // provide HopeIcon as global component
    app.component("HopeIcon", HopeIcon);
    // provide VPLink as global component
    app.component("VPLink", VPLink);

    app.component("BloggerInfo", BloggerInfo);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    BlogCategory,
    BlogHome,
    BlogType,
    Timeline,
  }
});