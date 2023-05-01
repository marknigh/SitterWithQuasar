<template>
  <q-btn :loading="loading" color="red" icon="eva-google" left class="full-width" label="Login with Google" @click="loginWithGoogle"/>
</template>

<script>
import { cfaSignIn } from 'capacitor-firebase-auth'
import { getUserData } from '../utils/auth'

export default {
  name: 'GoogleLoginMobile',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    loginWithGoogle () {
      this.loading = true
      cfaSignIn('google.com').subscribe((user) => {
        ('user:', user)
        getUserData(user.uid).then((doc) => {
          if (!doc.exists) {
            this.$q.localStorage.set('reg_email', user.email)
            this.$q.localStorage.set('reg_uid', user.uid)
            this.loading = false
            this.$router.push('/register-user-type')
          } else {
            this.$store.commit('setUserKey', doc.id)
            this.$store.commit('setCurrentUser', doc.data())
            this.$store.commit('setCurrentLocation', 'Home')
            this.loading = false
            if (doc.data().type === 'sitter') {
              this.$router.push('/sitter')
            } else {
              this.$router.push('/parent')
            }
          }
        })
      })
    }
  }
}
</script>
