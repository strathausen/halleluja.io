webpackJsonp([2],{"73AI":function(t,e,s){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content"},[e("nuxt-link",{attrs:{to:"/"}},[this._v(" < returneth to thy search")]),e("h1",[this._v(this._s(this.post.title))]),e("div",{domProps:{innerHTML:this._s(this.post.body)}})],1)};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},AdbY:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("go9F"),n=s("73AI"),i=!1;var o=function(t){i||s("pRUM")},r=s("VU/8")(a.a,n.a,!1,o,"data-v-69fef2f4",null);r.options.__file="pages/content/_article.vue",e.default=r.exports},f1md:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".content[data-v-69fef2f4]{max-width:700px}",""])},go9F:function(t,e,s){"use strict";e.a={asyncData:async function({app:t,params:e,payload:s}){return{post:await t.$axios.$get(`/api/content/${e.article}`)}}}},pRUM:function(t,e,s){var a=s("f1md");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("5a8fb448",a,!1,{sourceMap:!1})}});