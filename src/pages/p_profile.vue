<template>
  <q-page v-if="!loading" padding>
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
      <q-btn :loading="saving" class="full-width" color="primary" label="save" @click="savedProfile"/>
    </div>
  </q-page>

  <q-page v-else class="flex flex-center">
    <q-spinner
      color="primary"
      size="3rem"
      :thickness="5"
    />
  </q-page>
</template>

<script>
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { date } from 'quasar'
import { db } from '../boot/firebase'

export default {
  name: 'p_profile',
  data () {
    return {
      profile: {},
      dateJoined: undefined,
      saving: false,
      loading: true
    }
  },
  async created () {
    try {
      const docRef = doc(db, 'Users', this.$store.getters.getKey)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.profile = docSnap.data()
        this.profile.id = docSnap.id
        this.dateJoined = 'Member Since: ' + date.formatDate(new Date(this.profile.dateJoined.seconds * 1000), 'MMMM DD, YYYY')
        this.$store.commit('setCurrentLocation', 'Your Profile')
        this.loading = false
      }
    } catch (error) {
      this.loading = false
    }
  },
  methods: {
    async savedProfile () {
      this.saving = true
      try {
        const parentRef = doc(db, 'Users', this.profile.id)
        await updateDoc(parentRef, this.profile)
        this.$store.commit('setCurrentUser', this.profile)
        this.saving = false
        this.$q.notify({
          message: 'Your Profile Was Saved',
          icon: 'eva-checkmark-circle-2-outline',
          position: 'center',
          color: 'secondary',
          timeout: 1000
        })
      } catch (error) {
        this.saving = false
      }
    }
  }
}
</script>

<style>
</style>
