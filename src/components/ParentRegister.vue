<template>
  <div>
    <q-card-section>
      <q-input v-model="register.email" label="username" readonly/>
      <q-input v-model="register.name" label="Name" bottom-slots error-message="A Name is Required" :error="nameErrors"/>
      <q-input v-model="register.address" label="Address" bottom-slots error-message="An Address is Required" :error="addressErrors"/>
      <q-input v-model="register.city" label="City" error-message="A City is Required" :error="cityErrors"/>
      <q-input v-model="register.state" label="State" error-message="A State is Required" :error="stateErrors"/>
      <q-input v-model="register.zip" label="Zip" error-message="A Zip is Required" :error="zipErrors"/>
    </q-card-section>

    <q-card-actions>
      <q-btn color="primary" class="full-width" label="Complete Registration" @click="completeRegistration"/>
    </q-card-actions>

  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ParentRegister',
  data () {
    return {
      readOnly: false,
      register: {
        email: this.$q.localStorage.getItem('reg_email'),
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        active: true,
        dateJoined: new Date()
      }
    }
  },
  validations: {
    register: {
      name: { required },
      address: { required },
      city: { required },
      state: { required },
      zip: { required }
    }
  },
  computed: {
    nameErrors () {
      return (this.$v.register.name.$invalid && this.$v.register.name.$dirty)
    },
    addressErrors () {
      return (this.$v.register.address.$invalid && this.$v.register.address.$dirty)
    },
    cityErrors () {
      return (this.$v.register.city.$invalid && this.$v.register.city.$dirty)
    },
    stateErrors () {
      return (this.$v.register.state.$invalid && this.$v.register.state.$dirty)
    },
    zipErrors () {
      return (this.$v.register.zip.$invalid && this.$v.register.zip.$dirty)
    }
  },
  methods: {
    completeRegistration () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('errors')
      } else {
        this.$emit('completeReg', this.register)
      }
    }
  }
}
</script>

<style>
</style>
