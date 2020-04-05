<template>
  <q-page padding>

    <q-list highlight inset-separator>

      <q-item clickable v-ripple v-for="sitter in sitters" :key="sitter.id" @click="sitterDetails(sitter)">
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
import { db } from '../boot/firebase'

export default {
  name: 'p_sitters',
  data () {
    return {
      sitters: []
    }
  },
  firestore () {
    return {
      sitters: db.collection('Users').where('type', '==', 'sitter')
    }
  },
  methods: {
    AgeCalculation (birthday) {
      if (birthday) {
        var ageDifms = Date.now() - new Date(birthday).getTime()
        var ageDate = new Date(ageDifms)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      }
    },
    itemSubLabel (sitter) {
      return ('Grade: ' + sitter.grade + ' ' + 'Age: ' + this.AgeCalculation(sitter.birthday))
    },
    sitterDetails (sitterInfo) {
      this.$router.push({ name: 'sitterDetails', params: { sitter: sitterInfo } })
    }
  }
}
</script>

<style>
</style>
