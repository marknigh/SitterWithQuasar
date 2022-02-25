<template>
  <div class="row" v-if="isLoading == false">
    <q-chip v-if="this.who === job.awarded" icon-right="eva-award-outline">
      <q-avatar>
        <img :src="sitter.photoURL">
      </q-avatar>
      {{ sitter.name}}
    </q-chip>
    <q-chip v-else>
      <q-avatar>
        <img :src="sitter.photoURL">
      </q-avatar>
      {{ sitter.name}}
    </q-chip>
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../boot/firebase'

export default {
  name: 'WhoApplied',
  props: {
    who: {
      type: String
    },
    job: {
      type: Object
    }
  },
  data () {
    return {
      sitter: {},
      isLoading: true
    }
  },
  created () {
    this.getSitterInfo()
  },
  methods: {
    async getSitterInfo () {
      try {
        const docRef = doc(db, 'Users', this.who)
        const docSnap = await getDoc(docRef)
        this.sitter = docSnap.data()
        this.sitter.id = docSnap.id
        this.isLoading = false
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}
</script>

<style>
</style>
