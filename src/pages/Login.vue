<template>
  <q-layout>
      <q-page-container>
        <q-page class="flex flex-center">
            <q-card flat>

              <q-card-section>
                <h4 class="text-center text-weight-thin">Warson Woods Jobs</h4>
              </q-card-section>

              <q-card-section>
                <q-input
                  type="email"
                  label="Username"
                  v-model="username">
                    <template v-slot:before>
                      <q-icon name="eva-person-outline" />
                    </template>
                </q-input>

                <q-input
                  type="password"
                  label="Password"
                  v-model="password">
                    <template v-slot:before>
                      <q-icon name="eva-lock-outline" />
                    </template>
                </q-input>

              </q-card-section>

              <q-banner v-if="loginError" dense class="text-white bg-red"> Login Error </q-banner>

              <q-card-actions>
                  <q-btn color="primary" class="full-width" label="Login" :loading="loading" @click="loginUser()"/>
              </q-card-actions>

              <div class="text-center">Don't have an Account? <router-link to="/register-local-user">Create One</router-link></div>

              <div class="row">
                <div class="col q-pt-sm"><q-separator/></div>
                <div class="col text-center">OR</div>
                <div class="col q-pt-sm"><q-separator/></div>
              </div>

              <q-card-actions>
                <google-login />
              </q-card-actions>

              <!-- <q-card-actions>
                <facebook-login-mobile />
              </q-card-actions> -->

            </q-card>
        </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../boot/firebase'
import GoogleLogin from '../components/GoogleLogin'
// import FacebookLoginMobile from '../components/FacebookLoginMobile.vue'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      loginError: false
    }
  },
  components: {
    'google-login': GoogleLogin
    // 'facebook-login-mobile': FacebookLoginMobile
  },
  methods: {
    loginUser () {
      this.loading = true
      signInWithEmailAndPassword(getAuth(), this.username, this.password).then((userCredential) => {
        const docRef = doc(db, 'Users', userCredential.user.uid)
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
          }
        })
      })
    }
  }
}
</script>

<style lang="css" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
