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

              <!-- <div class="row">
                <div class="col q-pt-sm"><q-separator/></div>
                <div class="col text-center">OR</div>
                <div class="col q-pt-sm"><q-separator/></div>
              </div>

              <q-card-actions>
                <google-login />
              </q-card-actions>

              <q-card-actions>
                <facebook-login />
              </q-card-actions> -->

            </q-card>
        </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
import { loginUserAuth, getUserData } from '../utils/auth'
// import GoogleLogin from '../components/GoogleLogin'
// import FacebookLogin from '../components/FacebookLogin.vue'

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
  methods: {
    loginUser () {
      this.loading = true
      loginUserAuth(this.username, this.password).then((userInfo) => {
        getUserData(userInfo.user.uid).then((snapshot) => {
          snapshot.forEach(doc => {
            this.$store.commit('setUserKey', doc.id)
            this.$store.commit('setCurrentUser', doc.data())
            this.$store.commit('setCurrentLocation', 'Home')
            if (doc.data().type === 'sitter') {
              this.$router.push('/sitter')
            } else {
              this.$router.push('/parent')
            }
          })
        })
        this.loading = false
      }).catch((error) => {
        console.error('error: ', error)
        this.loading = false
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
