(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"013f":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-layout",[n("q-page-container",[n("q-page",{staticClass:"flex flex-center"},[n("q-card",{staticClass:"my-card",attrs:{flat:""}},[n("q-card-section",[n("h4",{staticClass:"text-center text-weight-thin"},[t._v("Ste. Gen Sitter")])]),n("q-card-section",[n("q-input",{attrs:{type:"email",label:"Username"},scopedSlots:t._u([{key:"before",fn:function(){return[n("q-icon",{attrs:{name:"eva-person-outline"}})]},proxy:!0}]),model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),n("q-input",{attrs:{type:"password",label:"Password"},scopedSlots:t._u([{key:"before",fn:function(){return[n("q-icon",{attrs:{name:"eva-lock-outline"}})]},proxy:!0}]),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t.loginError?n("q-banner",{staticClass:"text-white bg-red",attrs:{dense:""}},[t._v(" Login Error ")]):t._e(),n("q-card-actions",[n("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"Login",loading:t.loading},on:{click:function(e){return t.loginUser()}}})],1),n("div",{staticClass:"text-center"},[t._v("Don't have an Account? "),n("router-link",{attrs:{to:"/register-local-user"}},[t._v("Create One")])],1)],1)],1)],1)],1)},o=[],a=n("5f87"),s={name:"Login",data:function(){return{username:"",password:"",loading:!1,loginError:!1}},methods:{loginUser:function(){var t=this;this.loading=!0,Object(a["b"])(this.username,this.password).then((function(e){Object(a["a"])(e.user.uid).then((function(e){e.forEach((function(e){t.$store.commit("setUserKey",e.id),t.$store.commit("setCurrentUser",e.data()),t.$store.commit("setCurrentLocation","Home"),"sitter"===e.data().type?t.$router.push("/sitter"):t.$router.push("/parent")}))})),t.loading=!1})).catch((function(e){console.error("error: ",e),t.loading=!1,t.loginError=!0}))}}},i=s,c=(n("1139"),n("2877")),u=Object(c["a"])(i,r,o,!1,null,null,null);e["default"]=u.exports},1139:function(t,e,n){"use strict";var r=n("13df"),o=n.n(r);o.a},"13df":function(t,e,n){},"5f87":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return s})),n.d(e,"c",(function(){return i}));var r=n("2591"),o=n("fc1b");new r["a"].auth.GoogleAuthProvider,new r["a"].auth.FacebookAuthProvider;function a(t,e){return r["a"].auth().signInWithEmailAndPassword(t,e)}function s(t){return o["b"].collection("Users").where("authKey","==",t).get()}function i(){return r["a"].auth().signOut()}}}]);