<template>
  <q-btn color="blue" icon="eva-facebook" left class="full-width" label="Login with Facebook" @click="loginWithFacebook"/>
</template>

<script>
import { getUserData, loginUserAuthFacebook } from '../utils/auth'

export default {
  name: 'FacebookLogin',
  methods: {
    loginWithFacebook () {
      loginUserAuthFacebook().then((userInfo) => {
        getUserData(userInfo.user.uid).then((snapshot) => {
          if (snapshot.empty) {
            this.$q.localStorage.set('reg_email', userInfo.user.email)
            this.$q.localStorage.set('reg_uid', userInfo.user.uid)
            this.$router.push('/register')
          } else {
            snapshot.forEach(doc => {
              ('doc: ', doc.data())
              this.$store.commit('setUserKey', doc.id)
              this.$store.commit('setCurrentUser', doc.data())
              if (doc.data().type === 'sitter') {
                this.$router.push('/sitter')
              } else {
                this.$router.push('/parent')
              }
            })
          }
        })
      }).catch((error) => {
        ('error: ', error)
        this.loginError = true
      })
    }
  }
}
</script>
