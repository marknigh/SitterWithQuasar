<template>
  <q-btn color="red" icon="eva-google" left class="full-width" label="Login with Google" @click="loginWithGoogle"/>
</template>

<script>
import { loginUserAuthGoogle, getUserData } from '../utils/auth'

export default {
  name: 'GoogleLogin',
  methods: {
    loginWithGoogle () {
      loginUserAuthGoogle().then((userInfo) => {
        console.log('userInfor:', userInfo)
        getUserData(userInfo.user.uid).then((snapshot) => {
          if (snapshot.empty) {
            this.$q.localStorage.set('reg_email', userInfo.user.email)
            this.$q.localStorage.set('reg_uid', userInfo.user.uid)
            this.$router.push('/register')
          } else {
            snapshot.forEach(doc => {
              console.log('doc: ', doc.data())
              this.$store.commit('setUserKey', doc.id)
              this.$store.commit('setCurrentUser', doc.data())
              this.$store.commit('setCurrentLocation', 'Home')
              if (doc.data().type === 'sitter') {
                this.$router.push('/sitter')
              } else {
                this.$router.push('/parent')
              }
            })
          }
        })
      }).catch((error) => {
        console.log('error: ', error)
        this.loginError = true
      })
    }
  }
}
</script>
