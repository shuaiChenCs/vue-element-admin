(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"02d6":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},e=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"article-detail"},[s("div",{staticClass:"article-header"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:"https://images.sipinoffice.com/common/4CB354CF6EE845A3BFB26A9A82302D40.png",alt:""}})]),s("div",{staticClass:"info"},[s("div",{staticClass:"name"},[t._v("刘鹤鸣")]),s("div",{staticClass:"view-info"},[t._v("文章数 2   视频数 3   浏览量 14")])]),s("div",{staticClass:"article-btn"},[s("button",[t._v("查看名片")])])])])}],n={data:function(){return{}},mounted:function(){wx.ready(function(t){wx.showOptionMenu(),wx.onMenuShareAppMessage({title:"互联网之子",desc:"在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。",link:window.location.href,imgUrl:"http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg",trigger:function(t){},success:function(t){},cancel:function(t){},fail:function(t){}})})},methods:{getCrtUrl:function(){var t=window.location.href,a=t.indexOf("#");return-1!=a?t.substring(0,a):t}}},c=n,o=(s("5279"),s("2877")),l=Object(o["a"])(c,i,e,!1,null,"60ff4589",null);a["default"]=l.exports},"0c16":function(t,a,s){},"1e4b":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"sp"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"fabu"},[s("div",{staticClass:"item"},[s("img",{attrs:{src:this.$imageUrl+"/add_goods@3x.png",alt:""}}),s("div",{staticClass:"des",on:{click:t.addGoods}},[s("p",{staticClass:"main"},[t._v("新建文章")]),s("p",[t._v("精准营销文章")]),s("p",[t._v("转发即可获取浏览数据噢")])])]),s("div",{staticClass:"item"},[s("img",{attrs:{src:this.$imageUrl+"/add_goods@3x.png",alt:""}}),s("div",{staticClass:"des",on:{click:t.addGoods}},[s("p",{staticClass:"main"},[t._v("添加商品")]),s("p",[t._v("上传价廉好物")]),s("p",[t._v("分享您最推荐的日常小物")])])]),s("div",{staticClass:"item"},[s("img",{attrs:{src:this.$imageUrl+"/add_moments@3x.png",alt:""}}),s("div",{staticClass:"des",on:{click:t.addDynamic}},[s("p",{staticClass:"main"},[t._v("发布动态")]),s("p",[t._v("拍摄照片")]),s("p",[t._v("用文字记录您的创业之旅")])])]),s("div",{staticClass:"item"},[s("i",{staticClass:"iconfont iconcard_edit_delete",on:{click:function(a){t.show=!1}}})])]),s("div",{staticClass:"main-content",class:{hastab:t.$hastab}},[s("router-view")],1),t.$hastab?s("div",{staticClass:"sp-tabbar"},t._l(t.tabs,function(a,i){return s("div",{key:i,staticClass:"tab-item",on:{click:function(s){return t.clickHandler(a.label)}}},[s("img",{class:{w8:!a.label},attrs:{src:t.selectedLabelDefault==a.label?a.activeIcon:a.icon,alt:""}}),a.label?s("span",{class:{active:t.selectedLabelDefault==a.label}},[t._v(t._s(a.label))]):t._e()])}),0):t._e()])},e=[],n={data:function(){return{show:!1,selectedLabelDefault:"首页",tabs:[{label:"首页",icon:"".concat(this.$imageUrl,"/tabbar_home02@2x.png"),activeIcon:"".concat(this.$imageUrl,"/tabbar_home01@2x.png")},{label:"通讯录",icon:"".concat(this.$imageUrl,"/tabbar_contacts02@2x.png"),activeIcon:"".concat(this.$imageUrl,"/tabbar_contacts01@2x.png")},{label:"",icon:"".concat(this.$imageUrl,"/tabbar_add@3x.png"),activeIcon:"".concat(this.$imageUrl,"/tabbar_add@3x.png")},{label:"看板",icon:"".concat(this.$imageUrl,"/tabbar_board02@2x.png"),activeIcon:"".concat(this.$imageUrl,"/tabbar_board01@2x.png")},{label:"我的",icon:"".concat(this.$imageUrl,"/tabbar_mine02@2x.png"),activeIcon:"".concat(this.$imageUrl,"/tabbar_mine01@2x.png")}]}},watch:{$route:function(t){}},methods:{addGoods:function(){this.show=!1,this.$router.push("/my/goods/add")},addDynamic:function(){this.show=!1,this.$router.push("/my/dynamic/add")},clickHandler:function(t){""!=t?(this.selectedLabelDefault=t,"首页"==t?this.$router.push("/main"):"通讯录"==t?this.$router.push("/address-book"):"看板"==t?this.$router.push("/board"):"我的"==t&&this.$router.push("/my")):this.show=!0},changeHandler:function(t){}}},c=n,o=(s("6852"),s("2877")),l=Object(o["a"])(c,i,e,!1,null,"66cb7abf",null);a["default"]=l.exports},"251f":function(t,a,s){},5279:function(t,a,s){"use strict";var i=s("251f"),e=s.n(i);e.a},6852:function(t,a,s){"use strict";var i=s("0c16"),e=s.n(i);e.a}}]);
//# sourceMappingURL=home.f7af4094.js.map