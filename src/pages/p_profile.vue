<template>
  <q-page padding>
    <q-input v-model="profile.email" label="Username" disabled :hint="dateJoined" />
    <q-input v-model="profile.name" label="Name" />
    <q-input v-model="profile.address" label="Address" />
    <q-input v-model="profile.city" label="City" />
    <q-input v-model="profile.state" label="State" />
    <q-input v-model="profile.zip" label="Zip" />

    <div class="q-pa-md justify-around">
      <q-toggle v-model="profile.baby" label="Baby"/>
      <q-toggle v-model="profile.home" label="home"/>
      <q-toggle v-model="profile.pet" label="pet"/>
    </div>

    <q-select v-model="profile.children" label="No. of Children" :options="['1','2','3','4']"></q-select>
    <q-select v-model="profile.num_pets" label="No. of Pets" :options="['0','1','2','3','4']"></q-select>

    <q-checkbox v-model="profile.terms" label="Agree to Terms"></q-checkbox>
    <div class="q-pa-md">
      <q-btn class="full-width" color="primary" label="save" @click="savedProfile"/>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { db } from '../boot/firebase'
import { UpdateUserProfile } from '../utils/profile'

export default {
  name: 'p_profile',
  data () {
    return {
      profile: {},
      dateJoined: undefined
    }
  },
  async created () {
    try {
      let docReference = await db.collection('Users').doc(this.$store.getters.getKey).get()
      this.profile = docReference.data()
      this.profile.id = docReference.id
      this.dateJoined = 'Member Since: ' + date.formatDate(new Date(this.profile.dateJoined.seconds * 1000), 'MMMM DD, YYYY')
      this.$store.commit('setCurrentLocation', this.profile.name + ' Profile')
    } catch (error) {
      console.log('error: ', error)
    }
  },
  methods: {
    savedProfile () {
      UpdateUserProfile(this.profile).then(() => {
        this.$store.commit('setCurrentUser', this.profile)
        this.$q.notify({
          message: 'Your Profile Was Saved',
          icon: 'eva-checkmark-circle-2-outline',
          position: 'center',
          color: 'secondary',
          timeout: 1000
        })
      })
    }
  }
}
</script>

<style>
</style>
