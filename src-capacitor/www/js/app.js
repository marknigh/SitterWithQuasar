(function(e){function t(t){for(var r,a,u=t[0],i=t[1],s=t[2],p=0,f=[];p<u.length;p++)a=u[p],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);l&&l(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={2:0},o={2:0},c=[];function u(e){return i.p+"js/"+({}[e]||e)+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={3:1,4:1,5:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{1:"31d6cfe0",3:"9e2636d4",4:"3766730b",5:"3766730b",6:"31d6cfe0",7:"31d6cfe0",8:"31d6cfe0",9:"31d6cfe0",10:"31d6cfe0",11:"31d6cfe0",12:"31d6cfe0",13:"31d6cfe0",14:"31d6cfe0",15:"31d6cfe0",16:"31d6cfe0",17:"31d6cfe0",18:"31d6cfe0",19:"31d6cfe0",20:"31d6cfe0",21:"31d6cfe0",22:"31d6cfe0",23:"31d6cfe0",24:"31d6cfe0"}[e]+".css",o=i.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var s=c[u],p=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(p===r||p===o))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],p=s.getAttribute("data-href");if(p===r||p===o)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var r=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],l.parentNode.removeChild(l),n(c)},l.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(l)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=c);var s,p=document.createElement("script");p.charset="utf-8",p.timeout=120,i.nc&&p.setAttribute("nonce",i.nc),p.src=u(e);var f=new Error;s=function(t){p.onerror=p.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:p})}),12e4);p.onerror=p.onload=s,document.head.appendChild(p)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],p=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var l=p;c.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},"0d33":function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n("551c"),n("06db");var r,a,o="AIzaSyAS46t2Eixw7L15BIVnQRF7jshCClA9amY",c="gmapsCallback",u=!!window.google,i=new Promise((function(e,t){r=e,a=t}));function s(){if(u)return i;u=!0,window[c]=function(){return r(window.google)};var e=document.createElement("script");return e.async=!0,e.defer=!0,e.src="https://maps.googleapis.com/maps/api/js?key=".concat(o,"&callback=").concat(c),e.onerror=a,document.querySelector("head").appendChild(e),i}},"2f39":function(e,t,n){"use strict";n.r(t);var r=n("a34a"),a=n.n(r),o=(n("a481"),n("96cf"),n("c973")),c=n.n(o),u=(n("7d6e"),n("e54f"),n("43b9"),n("4439"),n("4605"),n("f580"),n("5b2b"),n("8753"),n("2967"),n("7e67"),n("d770"),n("dd82"),n("922c"),n("d7fb"),n("a533"),n("c32e"),n("a151"),n("8bc7"),n("e80f"),n("5fec"),n("e42f"),n("57fc"),n("d67f"),n("880e"),n("1c10"),n("9482"),n("e797"),n("4848"),n("53d0"),n("63b1"),n("e9fd"),n("195c"),n("64e9"),n("33c5"),n("4f62"),n("0dbc"),n("7c38"),n("0756"),n("4953"),n("81db"),n("2e52"),n("22485"),n("7797"),n("12a1"),n("ce96"),n("70ca"),n("2318"),n("24bd"),n("8f27"),n("3064"),n("c9a2"),n("8767"),n("4a8e"),n("b828"),n("3c1c"),n("21cb"),n("c00e"),n("e4a8"),n("e4d3"),n("f4d9"),n("fffd"),n("f645"),n("639e"),n("34ee"),n("b794"),n("af24"),n("7c9c"),n("7bb2"),n("64f7"),n("c382"),n("053c"),n("c48f"),n("f5d1"),n("3cec"),n("c00ee"),n("d450"),n("ca07"),n("14e3"),n("9393"),n("9227"),n("1dba"),n("674a"),n("de26"),n("6721"),n("9cb5"),n("ed9b"),n("fc83"),n("98e5"),n("605a"),n("ba60"),n("df07"),n("7903"),n("e046"),n("58af"),n("7713"),n("0571"),n("3e27"),n("6837"),n("3fc9"),n("0693"),n("bf41"),n("62f2"),n("7e6d"),n("2b0e")),i=n("b05d"),s=n("4d5a"),p=n("e359"),f=n("9404"),l=n("09e3"),d=n("9989"),h=n("65c6"),b=n("6ac5"),m=n("9c40"),g=n("0016"),v=n("1c1c"),w=n("66e5"),y=n("4074"),Q=n("0170"),x=n("de1d"),k=n("de5e"),P=n("cb32"),S=n("27f9"),j=n("9564"),C=n("ddd8"),A=n("8f8e"),L=n("52ee"),I=n("7cbe"),T=n("f09f"),O=n("a370"),U=n("4b7e"),E=n("eb85"),B=n("ca78"),q=n("b047"),_=n("daf4"),D=n("3786"),V=n("ee89"),N=n("adad"),R=n("823b"),z=n("9f0a"),J=n("068f"),M=n("58a8"),F=n("0d59"),G=n("4983"),K=n("6a67"),$=n("54e1"),H=n("24e8"),W=n("2c91"),Y=n("d847"),Z=n("c294"),X=n("72db"),ee=n("293e"),te=n("639d"),ne=n("714f"),re=n("2eeb"),ae=n("7f67"),oe=n("2a19"),ce=n("436b"),ue=n("f508"),ie=n("18d6"),se=n("5dab");u["a"].use(i["a"],{config:{},components:{QLayout:s["a"],QHeader:p["a"],QDrawer:f["a"],QPageContainer:l["a"],QPage:d["a"],QToolbar:h["a"],QToolbarTitle:b["a"],QBtn:m["a"],QIcon:g["a"],QList:v["a"],QItem:w["a"],QItemSection:y["a"],QItemLabel:Q["a"],QSlideItem:x["a"],QPageSticky:k["a"],QAvatar:P["a"],QInput:S["a"],QToggle:j["a"],QSelect:C["a"],QCheckbox:A["a"],QDate:L["a"],QPopupProxy:I["a"],QCard:T["a"],QCardSection:O["a"],QCardActions:U["a"],QSeparator:E["a"],QTime:B["a"],QChip:q["a"],QRating:_["a"],QRadio:D["a"],QUploader:V["a"],QTabPanels:N["a"],QTabPanel:R["a"],QOptionGroup:z["a"],QImg:J["a"],QBadge:M["a"],QSpinner:F["a"],QScrollArea:G["a"],QBtnToggle:K["a"],QBanner:$["a"],QDialog:H["a"],QSpace:W["a"],QBar:Y["a"],QFab:Z["a"],QFabAction:X["a"],QSkeleton:ee["a"],QParallax:te["a"]},directives:{Ripple:ne["a"],GoBack:re["a"],ClosePopup:ae["a"]},plugins:{Notify:oe["a"],Dialog:ce["a"],Loading:ue["a"],LocalStorage:ie["a"],AppVisibility:se["a"]}});var pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},fe=[],le={name:"App"},de=le,he=n("2877"),be=Object(he["a"])(de,pe,fe,!1,null,null,null),me=be.exports,ge=n("2f62"),ve=n("0e44");u["a"].use(ge["a"]);var we=function(){var e=new ge["a"].Store({state:{userLoggedIn:null,key:null,type:null,currentUser:{},currentLocation:""},mutations:{clearUser:function(e){e.key=null,e.userLoggedIn=!1,e.type=null,e.currentUser=null},setUserKey:function(e,t){e.key=t},setUserType:function(e,t){e.type=t},setUserLoggedIn:function(e){e.userLoggedIn=!0},setCurrentUser:function(e,t){e.currentUser=t},setCurrentLocation:function(e,t){e.currentLocation=t}},getters:{getKey:function(e){return e.key},getType:function(e){return e.type},getUserLoggedIn:function(e){return e.userLoggedIn},getCurrentUser:function(e){return e.currentUser},getCurrentLocation:function(e){return e.currentLocation}},plugins:[Object(ve["a"])()]});return e},ye=(n("551c"),n("06db"),n("8c4f")),Qe=n("fc1b"),xe=[{path:"/parent",component:function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"a3e5"))},meta:{requiresAuth:!0},children:[{path:"",component:function(){return n.e(1).then(n.bind(null,"8b24"))}},{path:"/parent/sitters",component:function(){return n.e(22).then(n.bind(null,"da20"))}},{path:"/parent/sitters/details",name:"sitterDetails",props:!0,component:function(){return n.e(21).then(n.bind(null,"1834"))}},{path:"/parent/sitters/reviews",name:"sitterReviews",props:!0,component:function(){return n.e(7).then(n.bind(null,"3dfe"))}},{path:"/parent/profile",component:function(){return n.e(20).then(n.bind(null,"af6c"))}},{path:"/parent/jobs",component:function(){return n.e(18).then(n.bind(null,"2cea"))}},{path:"/parent/jobs/editjob",name:"editJob",props:!0,component:function(){return n.e(17).then(n.bind(null,"2ba7"))}},{path:"/parent/newjob",component:function(){return Promise.all([n.e(0),n.e(19)]).then(n.bind(null,"716b"))}}]},{path:"/sitter",component:function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"144d"))},meta:{requiresAuth:!0},children:[{path:"",component:function(){return n.e(1).then(n.bind(null,"8b24"))}},{path:"/sitter/profile",component:function(){return n.e(24).then(n.bind(null,"9c69"))}},{path:"/sitter/parents",component:function(){return n.e(23).then(n.bind(null,"21b6"))}},{path:"/sitter/parents/viewparent",name:"viewParent",props:!0,component:function(){return n.e(10).then(n.bind(null,"e294"))}},{path:"/sitter/jobs",component:function(){return n.e(12).then(n.bind(null,"632a"))}},{path:"/sitter/job/viewjob/:id",name:"viewJob",component:function(){return n.e(6).then(n.bind(null,"c577"))}},{path:"/sitter/job/viewawardedjob",name:"viewAwardedJob",props:!0,component:function(){return n.e(3).then(n.bind(null,"fe62"))}},{path:"/sitter/reviews",component:function(){return n.e(13).then(n.bind(null,"dab5"))}}]},{path:"/",component:function(){return n.e(4).then(n.bind(null,"013f"))},meta:{requiresAuth:!1}},{path:"/register-user-type",component:function(){return Promise.all([n.e(0),n.e(16)]).then(n.bind(null,"fd14"))}},{path:"/register-local-user",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"9e9c"))}},{path:"/register-parent",component:function(){return Promise.all([n.e(0),n.e(14)]).then(n.bind(null,"d610"))}},{path:"/register-sitter",component:function(){return Promise.all([n.e(0),n.e(15)]).then(n.bind(null,"c9c5"))}}];xe.push({path:"*",component:function(){return n.e(11).then(n.bind(null,"e51e"))}});var ke=xe;u["a"].use(ye["a"]);var Pe=function(){var e=new ye["a"]({scrollBehavior:function(){return{y:0}},routes:ke,mode:"hash",base:""});return e.beforeEach(function(){var e=c()(a.a.mark((function e(t,n,r){var o,c;return a.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,t){Qe["a"].onAuthStateChanged((function(t){e(t)}))}));case 2:o=e.sent,c=t.matched.some((function(e){return e.meta.requiresAuth})),c&&!o?r({path:"/"}):r();case 5:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()),e},Se=n("e2a3"),je=Se["c"].SplashScreen,Ce=function(){return Ae.apply(this,arguments)};function Ae(){return Ae=c()(a.a.mark((function e(){var t,n,r;return a.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("function"!==typeof we){e.next=6;break}return e.next=3,we({Vue:u["a"]});case 3:e.t0=e.sent,e.next=7;break;case 6:e.t0=we;case 7:if(t=e.t0,"function"!==typeof Pe){e.next=14;break}return e.next=11,Pe({Vue:u["a"],store:t});case 11:e.t1=e.sent,e.next=15;break;case 14:e.t1=Pe;case 15:return n=e.t1,t.$router=n,r={router:n,store:t,render:function(e){return e(me)},mounted:function(){je.hide()}},r.el="#q-app",e.abrupt("return",{app:r,store:t,router:n});case 20:case"end":return e.stop()}}),e)}))),Ae.apply(this,arguments)}var Le=n("0d33"),Ie=n("1dce"),Te=n.n(Ie),Oe=function(){var e=c()(a.a.mark((function e(t){var n;return a.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.app,t.router,n=t.Vue,n.use(Te.a);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ue=function(){var e=c()(a.a.mark((function e(t){var n,r;return a.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.app,n=t.router,r=t.store,t.Vue,n.beforeEach((function(e,t,n){e.matched.some((function(e){return e.meta.requiresAuth}))&&null==r.getters.getCurrentUser?n("/"):n()}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function Ee(){return Be.apply(this,arguments)}function Be(){return Be=c()(a.a.mark((function e(){var t,n,r,o,c,i,s,p,f;return a.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Ce();case 2:t=e.sent,n=t.app,r=t.store,o=t.router,c=!0,i=function(e){c=!1,window.location.href=e},s=window.location.href.replace(window.location.origin,""),p=[Qe["c"],Le["a"],Oe,Ue],f=0;case 11:if(!(!0===c&&f<p.length)){e.next=29;break}if("function"===typeof p[f]){e.next=14;break}return e.abrupt("continue",26);case 14:return e.prev=14,e.next=17,p[f]({app:n,router:o,store:r,Vue:u["a"],ssrContext:null,redirect:i,urlPath:s});case 17:e.next=26;break;case 19:if(e.prev=19,e.t0=e["catch"](14),!e.t0||!e.t0.url){e.next=24;break}return window.location.href=e.t0.url,e.abrupt("return");case 24:return console.error("[Quasar] boot error:",e.t0),e.abrupt("return");case 26:f++,e.next=11;break;case 29:if(!1!==c){e.next=31;break}return e.abrupt("return");case 31:u["a"].prototype.$q.capacitor=window.Capacitor,new u["a"](n);case 33:case"end":return e.stop()}}),e,null,[[14,19]])}))),Be.apply(this,arguments)}Ee()},"7e6d":function(e,t,n){},fc1b:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return c})),n.d(t,"d",(function(){return u}));var r=n("2591"),a={apiKey:"AIzaSyDIl04ey3vGb3zMISQxkvLB2zWZVggxxGs",authDomain:"project-5760468166739261631.firebaseapp.com",databaseURL:"https://project-5760468166739261631.firebaseio.com",projectId:"project-5760468166739261631",storageBucket:"project-5760468166739261631.appspot.com",messagingSenderId:"392225760455",appId:"1:392225760455:web:ad4230abd6313a62070ae2"};r["a"].initializeApp(a);var o=r["a"].auth();o.setPersistence(r["a"].auth.Auth.Persistence.LOCAL);var c=r["a"].firestore(),u=r["a"].storage();r["a"].messaging;t["c"]=function(e){e.app,e.router,e.Vue}}});