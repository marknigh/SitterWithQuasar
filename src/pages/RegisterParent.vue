<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-card flat>
          <q-card-section>
            <p class="text-center text-body2">Please Complete your Parent Registration</p>
            <q-input v-model="parent.email" label="parentname" readonly/>
            <q-input v-model="parent.name" label="Name" bottom-slots error-message="A Name is Required" :error="nameErrors"/>
            <q-input v-model="parent.address" label="Address" bottom-slots error-message="An Address is Required" :error="addressErrors"/>
            <q-input v-model="parent.city" label="City" error-message="A City is Required" :error="cityErrors"/>
            <q-input v-model="parent.state" label="State" error-message="A State is Required" :error="stateErrors"/>
            <q-input v-model="parent.zip" label="Zip" error-message="A Zip is Required" :error="zipErrors"/>
          </q-card-section>

          <q-card-actions>
            <q-btn color="primary" class="full-width" label="Complete Registration" @click="completeRegistration"/>
          </q-card-actions>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../boot/firebase'

export default {
  name: 'RegisterParent',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      saving: false,
      parent: {
        email: this.$q.localStorage.getItem('reg_email'),
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        active: true,
        type: 'parent',
        dateJoined: new Date()
      }
    }
  },
  validations () {
    return {
      parent: {
        name: { required },
        address: { required },
        city: { required },
        state: { required },
        zip: { required }
      }
    }
  },
  computed: {
    nameErrors () {
      return (this.$v.parent.name.$invalid && this.$v.parent.name.$dirty)
    },
    addressErrors () {
      return (this.$v.parent.address.$invalid && this.$v.parent.address.$dirty)
    },
    cityErrors () {
      return (this.$v.parent.city.$invalid && this.$v.parent.city.$dirty)
    },
    stateErrors () {
      return (this.$v.parent.state.$invalid && this.$v.parent.state.$dirty)
    },
    zipErrors () {
      return (this.$v.parent.zip.$invalid && this.$v.parent.zip.$dirty)
    }
  },
  methods: {
    async completeRegistration () {
      this.$v.$touch()
      if (this.$v.$invalid) {
      } else {
        this.saving = true
        this.parent.type = 'parent'
        try {
          const docRef = doc(db, 'Users', this.$q.localStorage.getItem('reg_uid'))
          await setDoc(docRef, this.parent)
          this.$store.commit('setUserKey', this.$q.localStorage.getItem('reg_uid'))
          this.$store.commit('setCurrentUser', this.parent)
          this.$store.commit('setCurrentLocation', 'Home')
          this.saving = false
          this.$router.push('/parent')
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
