export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-036ea26a","v-43796585","v-452e3e24","v-46e316c3","v-4897ef62","v-4a4cc801","v-995424bc","v-95ea737e","v-a0278738","v-9cbdd5fa","v-6e19edb7","v-df8b6e0c","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-184f4da6","v-c151bf32","v-33d62ebc","v-438ffe52","v-1473bf53"]}},"star":{"/":{"path":"/star/","keys":["v-452e3e24","v-036ea26a","v-43796585","v-46e316c3","v-4897ef62","v-4a4cc801","v-995424bc","v-95ea737e","v-a0278738","v-9cbdd5fa","v-6e19edb7","v-df8b6e0c"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-036ea26a","v-43796585","v-452e3e24","v-46e316c3","v-4897ef62","v-4a4cc801","v-995424bc","v-95ea737e","v-a0278738","v-9cbdd5fa","v-6e19edb7","v-df8b6e0c","v-f0ec4556","v-24b7c48d","v-2bc6566a"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

