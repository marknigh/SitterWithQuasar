<template>
<div>
  <q-chip dense square>
    <q-avatar color="green" text-color="white">{{jobsWon.length}}</q-avatar>
    Jobs Won
  </q-chip>
  <q-chip dense square>
    <q-avatar color="red" text-color="white">{{jobsApplied.length}}</q-avatar>
    Jobs Applied
  </q-chip>
</div>
</template>

<script>
import { db } from '../boot/firebase'

export default {
  name: 'SitterJobsWon',
  props: ['sitter'],
  data () {
    return {
      jobsWon: [],
      jobsApplied: []
    }
  },
  firestore () {
    return {
      jobsWon: db.collection('Jobs').where('awarded', '==', this.sitter),
      jobsApplied: db.collection('Jobs').where('applied', 'array-contains', this.sitter)
    }
  }
}
</script>

<style>
</style>
