<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
          <q-card flat class="my-card">

            <q-card-section>
              <h6 class="text-center text-weight-thin">Register with a Username and Password</h6>
            </q-card-section>

            <q-card-section>

              <q-input
                helper="Email Format"
                label="Username"
                v-model="username"
                bottom-slots error-message="A Username is Required" :error="userNameErrors">
                  <template v-slot:before>
                    <q-icon name="eva-person-outline" />
                  </template>
              </q-input>

              <q-input
                icon="lock"
                type="password"
                label="Password"
                v-model="password"
                bottom-slots error-message="A Password must be greater than 6 characters" :error="passwordErrors">
                  <template v-slot:before>
                    <q-icon name="eva-lock-outline" />
                  </template>
              </q-input>

              <q-input
                icon="lock"
                type="password"
                label="Confirm Password"
                v-model="confirmPassword"
                bottom-slots error-message="Password do not match" :error="confirmPasswordErrors">
                  <template v-slot:before>
                    <q-icon name="eva-lock" />
                  </template>
              </q-input>

            </q-card-section>

            <q-card-actions>
                <q-btn :loading="loading" color="primary" class="full-width" label="Register" @click="registerUser"/>
            </q-card-actions>

            <div class="text-center">Already Have An Account? <router-link to="/">Sign In</router-link></div>

          </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from 'firebase'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'RegisterLocalAuthUser',
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      loading: false
    }
  },
  validations: {
    username: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { sameAsPassword: sameAs('password') }
  },
  computed: {
    userNameErrors () {
      return (this.$v.username.$invalid && this.$v.username.$dirty)
    },
    passwordErrors () {
      return (this.$v.password.$invalid && this.$v.password.$dirty)
    },
    confirmPasswordErrors () {
      return (!this.$v.confirmPassword.sameAsPassword && this.$v.confirmPassword.$dirty)
    }
  },
  methods: {
    async registerUser () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('errors')
      } else {
        this.loading = true
        try {
          let userInfo = await firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
          this.$q.localStorage.set('reg_email', userInfo.user.email)
          this.$q.localStorage.set('reg_uid', userInfo.user.uid)
          this.loading = false
          this.$router.push('/register-user-type')
        } catch (error) {
          console.log('error: ', error)
          this.loading = false
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'error',
            position: 'top-right',
            message: 'Username Already In Use'
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.my-card
  width 100%
  max-width 350px
</style>
