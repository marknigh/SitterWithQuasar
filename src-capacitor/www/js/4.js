(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"013f":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-layout",[o("q-page-container",[o("q-page",{staticClass:"flex flex-center"},[o("q-card",{staticClass:"my-card",attrs:{flat:""}},[o("q-card-section",[o("h4",{staticClass:"text-center text-weight-thin"},[t._v("Ste. Gen Sitter")])]),o("q-card-section",[o("q-input",{attrs:{type:"email",label:"Username"},scopedSlots:t._u([{key:"before",fn:function(){return[o("q-icon",{attrs:{name:"eva-person-outline"}})]},proxy:!0}]),model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),o("q-input",{attrs:{type:"password",label:"Password"},scopedSlots:t._u([{key:"before",fn:function(){return[o("q-icon",{attrs:{name:"eva-lock-outline"}})]},proxy:!0}]),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t.loginError?o("q-banner",{staticClass:"text-white bg-red",attrs:{dense:""}},[t._v(" Login Error ")]):t._e(),o("q-card-actions",[o("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"Login",loading:t.loading},on:{click:function(e){return t.loginUser()}}})],1),o("div",{staticClass:"text-center"},[t._v("Don't have an Account? "),o("router-link",{attrs:{to:"/register-local-user"}},[t._v("Create One")])],1),o("div",{staticClass:"row"},[o("div",{staticClass:"col q-pt-sm"},[o("q-separator")],1),o("div",{staticClass:"col text-center"},[t._v("OR")]),o("div",{staticClass:"col q-pt-sm"},[o("q-separator")],1)]),o("q-card-actions",[o("google-login")],1),o("q-card-actions",[o("facebook-login")],1)],1)],1)],1)],1)},r=[],a=o("5f87"),s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-btn",{staticClass:"full-width",attrs:{color:"red",icon:"eva-google",left:"",label:"Login with Google"},on:{click:t.loginWithGoogle}})},i=[],c={name:"GoogleLogin",methods:{loginWithGoogle:function(){var t=this;Object(a["d"])(this.$q.platform).then((function(e){Object(a["a"])(e.user.uid).then((function(o){o.empty?(t.$q.localStorage.set("reg_email",e.user.email),t.$q.localStorage.set("reg_uid",e.user.uid),t.$router.push("/register")):o.forEach((function(e){console.log("doc: ",e.data()),t.$store.commit("setUserKey",e.id),t.$store.commit("setCurrentUser",e.data()),t.$store.commit("setCurrentLocation","Home"),"sitter"===e.data().type?t.$router.push("/sitter"):t.$router.push("/parent")}))}))})).catch((function(e){console.log("error: ",e),t.loginError=!0}))}}},l=c,u=o("2877"),d=Object(u["a"])(l,s,i,!1,null,null,null),f=d.exports,g=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-btn",{staticClass:"full-width",attrs:{color:"blue",icon:"eva-facebook",left:"",label:"Login with Facebook"},on:{click:t.loginWithFacebook}})},h=[],p={name:"FacebookLogin",methods:{loginWithFacebook:function(){var t=this;Object(a["c"])().then((function(e){Object(a["a"])(e.user.uid).then((function(o){o.empty?(t.$q.localStorage.set("reg_email",e.user.email),t.$q.localStorage.set("reg_uid",e.user.uid),t.$router.push("/register")):o.forEach((function(e){console.log("doc: ",e.data()),t.$store.commit("setUserKey",e.id),t.$store.commit("setCurrentUser",e.data()),"sitter"===e.data().type?t.$router.push("/sitter"):t.$router.push("/parent")}))}))})).catch((function(e){console.log("error: ",e),t.loginError=!0}))}}},m=p,b=Object(u["a"])(m,g,h,!1,null,null,null),v=b.exports,q={name:"Login",data:function(){return{username:"",password:"",loading:!1,loginError:!1}},components:{"google-login":f,"facebook-login":v},methods:{loginUser:function(){var t=this;this.loading=!0,Object(a["b"])(this.username,this.password).then((function(e){Object(a["a"])(e.user.uid).then((function(e){e.forEach((function(e){t.$store.commit("setUserKey",e.id),t.$store.commit("setCurrentUser",e.data()),t.$store.commit("setCurrentLocation","Home"),"sitter"===e.data().type?t.$router.push("/sitter"):t.$router.push("/parent")}))})),t.loading=!1})).catch((function(e){console.log("error: ",e),t.loading=!1,t.loginError=!0}))}}},w=q,$=(o("1139"),Object(u["a"])(w,n,r,!1,null,null,null));e["default"]=$.exports},1139:function(t,e,o){"use strict";var n=o("13df"),r=o.n(n);r.a},"13df":function(t,e,o){},"5f87":function(t,e,o){"use strict";o.d(e,"b",(function(){return i})),o.d(e,"a",(function(){return u})),o.d(e,"e",(function(){return d})),o.d(e,"d",(function(){return c})),o.d(e,"c",(function(){return l}));var n=o("2591"),r=o("fc1b"),a=new n["a"].auth.GoogleAuthProvider,s=new n["a"].auth.FacebookAuthProvider;function i(t,e){return n["a"].auth().signInWithEmailAndPassword(t,e)}function c(t){return t.is.desktop?(console.log(t),n["a"].auth().signInWithPopup(a)):n["a"].auth().signInWithRedirect(a)}function l(){return n["a"].auth().signInWithPopup(s)}function u(t){return r["a"].collection("Users").where("authKey","==",t).get()}function d(){return n["a"].auth().signOut()}}}]);