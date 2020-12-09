<template>
  <div>
    <q-chip dense square>
      <q-avatar color="green" text-color="white">{{ jobsWon }}</q-avatar>
      Jobs Won
    </q-chip>
    <q-chip dense square>
      <q-avatar color="red" text-color="white">{{ jobsApplied }}</q-avatar>
      Jobs Applied
    </q-chip>
  </div>
</template>

<script>
import { db } from '../boot/firebase'

export default {
  name: 'SitterJobsWon',
  props: {
    sitter: {
      type: Object
    }
  },
  data () {
    return {
      jobsWon: Number,
      jobsApplied: Number
    }
  },
  async created () {
    let querySnapshot = await db.collection('Jobs').where('awarded', '==', this.sitter.id).get()
    let querySnapshot1 = await db.collection('Jobs').where('applied', 'array-contains', this.sitter.id).get()
    this.jobsWon = querySnapshot.size
    this.jobsApplied = querySnapshot1.size
  }
}
</script>

<style>
</style>
