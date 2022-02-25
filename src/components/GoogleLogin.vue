<template>
  <q-btn color="red" icon="eva-google" left class="full-width" label="Login with Google" @click="loginWithGoogle"/>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../boot/firebase'

export default {
  name: 'GoogleLogin',
  methods: {
    loginWithGoogle () {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider).then((userInfo) => {
        const docRef = doc(db, 'Users', userInfo.user.uid)
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            this.$store.commit('setUserKey', docSnap.id)
            this.$store.commit('setCurrentUser', docSnap.data())
            this.$store.commit('setCurrentLocation', 'Home')
            if (docSnap.data().type === 'sitter') {
              this.$router.push('/sitter')
            } else {
              this.$router.push('/parent')
            }
          } else {
            this.$q.localStorage.set('reg_email', userInfo.user.email)
            this.$q.localStorage.set('reg_uid', userInfo.user.uid)
            this.$router.push('/register')
          }
        })
      })
    }
  }
}
</script>
