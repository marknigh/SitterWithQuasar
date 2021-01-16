<template>
  <q-btn :loading="loading" color="blue" icon="eva-facebook" left class="full-width" label="Login with Facebook" @click="loginWithFacebook"/>
</template>

<script>
import { getUserData } from '../utils/auth'
import { cfaSignIn } from 'capacitor-firebase-auth'

export default {
  name: 'FacebookLoginMobile',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    loginWithFacebook () {
      this.loading = true
      cfaSignIn('facebook.com').subscribe((userInfo) => {
        getUserData(userInfo.uid).then((doc) => {
          if (!doc.exists) {
            this.$q.localStorage.set('reg_email', userInfo.email)
            this.$q.localStorage.set('reg_uid', userInfo.uid)
            this.loading = false
            this.$router.push('/register-user-type')
          } else {
            this.$store.commit('setUserKey', doc.id)
            this.$store.commit('setCurrentUser', doc.data())
            this.loading = false
            if (doc.data().type === 'sitter') {
              this.$router.push('/sitter')
            } else {
              this.$router.push('/parent')
            }
          }
        })
      }).catch(() => {
        this.loginError = true
      })
    }
  }
}
</script>
