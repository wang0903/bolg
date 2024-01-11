export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-a0278738","v-6e19edb7","v-df8b6e0c","v-9cbdd5fa","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-7f25ca3a","v-7d70f19b","v-7bbc18fc","v-7a07405d","v-95ea737e","v-995424bc","v-184f4da6","v-4e65ec78","v-c151bf32","v-07296a04","v-33d62ebc","v-438ffe52","v-1473bf53"]}},"star":{"/":{"path":"/star/","keys":["v-7bbc18fc","v-a0278738","v-9cbdd5fa","v-6e19edb7","v-df8b6e0c"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-a0278738","v-9cbdd5fa","v-6e19edb7","v-df8b6e0c","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-7f25ca3a","v-7d70f19b","v-7bbc18fc","v-7a07405d","v-95ea737e","v-995424bc"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

