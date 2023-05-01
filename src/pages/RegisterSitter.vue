<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-card flat>
          <q-card-section>
            <p class="text-center text-body2">Please Complete your Sitter Registration</p>
            <q-input v-model="register.email" label="username" readonly/>
            <q-input v-model="register.name" label="Name" bottom-slots error-message="Your Name is Required" :error="nameErrors"/>
            <q-input v-model="sDate" stack-label label="Birthday" bottom-slots error-message="Your Birthday is Required" :error="birthdayErrors">
              <template v-slot:append>
                <q-icon name="eva-calendar-outline" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="register.birthday" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-select
              v-model="register.grade"
              label="Grade"
              radio
              :options="gradeOptions"
              bottom-slots
              error-message="Your Grade is Required"
              :error="gradeErrors"
              />

            <div class="q-pa-md">
              <q-btn-toggle
                v-model="register.gender"
                no-caps
                spread
                toggle-color="primary"
                color="white"
                text-color="black"
                :options="genderOptions"
              />
            </div>
          </q-card-section>

          <q-card-actions>
            <q-btn :loading="saving" color="primary" class="full-width" label="Complete Registration" @click="completeRegistration"/>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../boot/firebase'

export default {
  name: 'RegisterSitter',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      genderOptions: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }],
      gradeOptions: ['5', '6', '7', '8', 'High School', 'College'],
      saving: false,
      register: {
        email: this.$q.localStorage.getItem('reg_email'),
        active: true,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/project-5760468166739261631.appspot.com/o/userImages%2Falt-image.png?alt=media&token=5a89f961-e797-4291-854e-31527b511a6e',
        dateJoined: new Date(),
        gender: '',
        grade: '',
        type: 'sitter'
      }
    }
  },
  validations () {
    return {
      register: {
        name: { required },
        gender: { required },
        grade: { required },
        birthday: { required }
      }
    }
  },
  computed: {
    sDate () {
      return date.formatDate(this.register.birthday, 'MM-DD-YYYY')
    },
    nameErrors () {
      return (this.$v.register.name.$invalid && this.$v.register.name.$dirty)
    },
    genderErrors () {
      return (this.$v.register.gender.$invalid && this.$v.register.gender.$dirty)
    },
    birthdayErrors () {
      return (this.$v.register.birthday.$invalid && this.$v.register.birthday.$dirty)
    },
    gradeErrors () {
      return (this.$v.register.grade.$invalid && this.$v.register.grade.$dirty)
    }
  },
  methods: {
    async completeRegistration () {
      this.$v.$touch()
      if (this.$v.$invalid) {
      } else {
        this.saving = true
        try {
          const docRef = doc(db, 'Users', this.$q.localStorage.getItem('reg_uid'))
          await setDoc(docRef, this.register)
          this.$store.commit('setUserKey', this.$q.localStorage.getItem('reg_uid'))
          this.$store.commit('setCurrentUser', this.register)
          this.$store.commit('setCurrentLocation', 'Home')
          this.saving = false
          this.$router.push('/sitter')
        } catch (error) {
          this.saving = false
        }
      }
    }
  }

}
</script>

<style>
</style>
