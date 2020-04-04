<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-card flat>

          <q-card-section>
            <h4 class="text-center text-weight-thin">Ste. Gen Register</h4>
            <div class="row justify-around">
              <q-radio class="text-center" v-model="type" val="sitter" label="Sitter" />
              <q-radio class="text-center" v-model="type" val="parent" label="Parent" />
            </div>
          </q-card-section>

          <q-card-section>
            <parent-register v-if="type == 'parent'" @completeReg="saveUser"/>
            <sitter-register v-else-if="type == 'sitter'" @completeReg="saveUser" />
          </q-card-section>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import ParentRegister from '../components/ParentRegister'
import SitterRegister from '../components/SitterRegister'
import { LocalStorage } from 'quasar'
import { createUserInDB, getUserDataRegister } from '../utils/auth'

export default {
  name: 'ParentRegister',
  components: {
    'parent-register': ParentRegister,
    'sitter-register': SitterRegister
  },
  data () {
    return {
      type: null
    }
  },
  methods: {
    saveUser (user) {
      user.authKey = LocalStorage.getItem('reg_uid')
      user.email = LocalStorage.getItem('reg_email')
      user.type = this.type
      createUserInDB(user).then((user) => {
        getUserDataRegister(user).then((doc) => {
          console.log('user => ', doc)
          this.$store.commit('setUserKey', doc.id)
          this.$store.commit('setCurrentUser', doc.data())
          if (doc.data().type === 'sitter') {
            this.$router.push('/sitter')
          } else {
            this.$router.push('/parent')
          }
        })
      })
    }
  }
}
</script>

<style>
</style>
