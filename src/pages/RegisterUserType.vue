<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-card flat>

          <q-card-section>
            <h4 class="text-center text-primary">Welcome</h4>
            <h6 class="text-center text-body2">This is your first time with us. Please take a moment so we can learn more about you!</h6>
            <h6 class="text-center text-body2">Are you registering as a Parent or Sitter?</h6>
            <div class="row justify-around">
              <q-option-group
                :options="options"
                type="radio"
                v-model="type"
                :error="typeError"
              />
            </div>
          </q-card-section>

          <q-card-section>
            <q-banner v-if="typeError" dense class="bg-red text-white text-center"> Please Choose a Type! </q-banner>
          </q-card-section>

          <q-card-section>
            <q-btn color="primary" class="full-width" label="Next" @click="nextPage()" />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'RegisterUserType',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      type: null,
      options: [
        { label: 'Sitter', value: 'sitter' },
        { label: 'Parent', value: 'parent' }
      ]
    }
  },
  validations () {
    return {
      type: { required }
    }
  },
  computed: {
    typeError () {
      return (this.$v.type.$invalid && this.$v.type.$dirty)
    }
  },
  methods: {
    nextPage (type) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        if (this.type === 'sitter') {
          this.$router.push('/register-sitter')
        } else {
          this.$router.push('/register-parent')
        }
      }
    }
  }
}
</script>

<style>
</style>
