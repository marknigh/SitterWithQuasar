<template>
  <q-layout>
      <q-page-container>
        <q-page class="flex flex-center">
            <q-card flat class="my-card">

              <q-card-section>
                <h4 class="text-center text-weight-thin">Ste. Gen Sitter</h4>
              </q-card-section>

              <q-card-section>

                <q-input
                  helper="Email Format"
                  label="Username"
                  v-model="username">
                    <template v-slot:before>
                      <q-icon name="eva-person-outline" />
                    </template>
                </q-input>

                <q-input
                  icon="lock"
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
                  <q-btn color="primary" class="full-width" label="Login" @click="loginUser()"/>
              </q-card-actions>

              <div class="text-center">Don't have an Account? <router-link to="/register-local-user">Create One</router-link></div>

              <div class="row">
                <div class="col q-pt-sm"><q-separator/></div>
                <div class="col text-center">OR</div>
                <div class="col q-pt-sm"><q-separator/></div>
              </div>

              <q-card-actions>
                  <q-btn color="red" icon="eva-google" left class="full-width" label="Login with Google" @click="loginWithGoogle"/>
              </q-card-actions>

              <q-card-actions>
                  <q-btn color="blue" icon="eva-facebook" left class="full-width" label="Login with Facebook" @click="loginWithFacebook"/>
              </q-card-actions>

            </q-card>
        </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
import { loginUserAuth, getUserData, loginUserAuthGoogle, loginUserAuthFacebook } from '../utils/auth'

export default {
  name: 'Login',
  data () {
    return {
      loginError: false,
      username: '',
      password: ''
    }
  },
  methods: {
    loginUser () {
      loginUserAuth(this.username, this.password).then((userInfo) => {
        getUserData(userInfo.user.uid).then((snapshot) => {
          snapshot.forEach(doc => {
            console.log('doc: ', doc.data())
            this.$store.commit('setUserKey', doc.id)
            this.$store.commit('setCurrentUser', doc.data())
            if (doc.data().type === 'sitter') {
              this.$router.push('/sitter')
            } else {
              this.$router.push('/parent')
            }
          })
        })
      }).catch((error) => {
        console.log('error: ', error)
        this.loginError = true
      })
    },
    loginWithGoogle () {
      loginUserAuthGoogle().then((userInfo) => {
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
    },
    loginWithFacebook () {
      loginUserAuthFacebook().then((userInfo) => {
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

<style lang="stylus">
.my-card
  width 100%
  max-width 350px
</style>
