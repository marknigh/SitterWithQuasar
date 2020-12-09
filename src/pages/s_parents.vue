<template>
  <q-page padding>
    <q-list highlight inset-separator>

      <q-item clickable v-ripple v-for="parent in parents" :key="parent.id" @click="viewParent(parent)">

        <q-item-section>
          <q-item-label>{{ parent.name }}</q-item-label>
          <q-item-label caption> {{ parent.dateJoined | displayDate }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>

  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import { date } from 'quasar'

export default {
  name: 's_parents',
  data () {
    return {
      parents: []
    }
  },
  async created () {
    try {
      let querySnapshot = await db.collection('Users').where('type', '==', 'parent').get()
      querySnapshot.forEach((document) => {
        let parent = document.data()
        parent.parentID = document.id
        this.parents.push(parent)
      })
    } catch (error) {
      console.log('error: ', error)
    }
  },
  filters: {
    displayDate (value) {
      return 'Member Since: ' + date.formatDate(new Date(value.seconds * 1000), 'MMMM YYYY')
    }
  },
  methods: {
    viewParent (parent) {
      this.$router.push({ name: 'viewParent', params: { parent: parent } })
    }
  }
}
</script>

<style>
</style>
