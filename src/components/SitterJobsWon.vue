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
import { collection, getDocs, query, where } from 'firebase/firestore'
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
      jobsWon: 0,
      jobsApplied: 0
    }
  },
  async created () {
    const jobRef = collection(db, 'Jobs')
    const awardedQuery = query(jobRef, where('awarded', '==', this.sitter.id))
    const appliedQuery = query(jobRef, where('applied', 'array-contains', this.sitter.id))
    let awardedSnapshot = await getDocs(awardedQuery)
    let appliedSnapshot = await getDocs(appliedQuery)
    this.jobsWon = awardedSnapshot.size
    this.jobsApplied = appliedSnapshot.size
  }
}
</script>

<style>
</style>
