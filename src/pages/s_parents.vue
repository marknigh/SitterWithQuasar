<template>
  <q-page padding v-if="isLoading == false">
    <q-list highlight inset-separator>

      <q-item clickable v-ripple v-for="parent in parents" :key="parent.id" @click="viewParent(parent)">

        <q-item-section>
          <q-item-label>{{ parent.name }}</q-item-label>
          <q-item-label caption> Member Since: {{ displayDate(parent.dateJoined) }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>

  </q-page>

  <q-page v-else class="flex flex-center">
    <q-spinner
      color="primary"
      size="5rem"
    />
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import { date } from 'quasar'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default {
  name: 's_parents',
  data () {
    return {
      parents: [],
      isLoading: true
    }
  },
  async created () {
    try {
      const parentColRef = collection(db, 'Users')
      const q = query(parentColRef, where('type', '==', 'parent'))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((document) => {
        let parent = document.data()
        parent.parentID = document.id
        this.parents.push(parent)
      })
      this.isLoading = false
    } catch (error) {
    }
    this.$store.commit('setCurrentLocation', 'All Parents')
  },
  methods: {
    displayDate (value) {
      return date.formatDate(new Date(value.seconds * 1000), 'MMMM DD, YYYY')
    },
    viewParent (parent) {
      this.$router.push({ name: 'viewParent', params: { parent: parent } })
    }
  }
}
</script>

<style>
</style>
