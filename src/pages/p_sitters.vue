<template>
  <q-page v-if="!loading" padding>

      <q-list highlight inset-separator>
        <q-item class="q-pa-md" clickable v-ripple v-for="sitter in sitters" :key="sitter.id" @click="sitterDetails(sitter)">
          <q-item-section avatar>
            <q-avatar>
              <img :src="sitter.photoURL">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ sitter.name }}</q-item-label>
            <q-item-label caption>Grade: {{ sitter.grade }}</q-item-label>
            <q-item-label caption>Age: {{ AgeCalculation(sitter.birthday) }}</q-item-label>
          </q-item-section>

        </q-item>
      </q-list>

  </q-page>
</template>

<script>
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../boot/firebase'

export default {
  name: 'p_sitters',
  data () {
    return {
      sitters: [],
      loading: false
    }
  },
  async created () {
    this.loading = true
    this.$q.loading.show()
    const q = query(collection(db, 'Users'), where('type', '==', 'sitter'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((documentSnapshot) => {
      const sitter = documentSnapshot.data()
      sitter.id = documentSnapshot.id
      this.$store.commit('setCurrentLocation', 'All Active Sitters')
      this.sitters.push(sitter)
    })
    this.loading = false
    this.$q.loading.hide()
  },
  methods: {
    AgeCalculation (birthday) {
      if (birthday) {
        var ageDifms = Date.now() - new Date(birthday).getTime()
        var ageDate = new Date(ageDifms)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      }
    },
    sitterDetails (sitter) {
      this.$store.commit('setSitterDetails', sitter)
      this.$router.push({ name: 'sitterDetails' })
    }
  }
}
</script>

<style>
</style>
