
<template>
  <p>test</p>
</template>

<script>
import { collection, getDocs, query, where } from 'firebase/firestore'
import { date } from 'quasar'
import { db } from '../boot/firebase'

export default {
  name: 'ViewParent',
  props: ['parent'],
  data () {
    return {
      jobs: [],
      numberOfJobsCreated: 0
    }
  },
  async created () {
    const colRef = collection(db, 'Jobs')
    const q = query(colRef, where('parentID', '==', this.parent.parentID))
    const querySnapShot = await getDocs(q)
    querySnapShot.size > 0 ? this.numberOfJobsCreated = querySnapShot.size : this.numberOfJobsCreated = '0'
    querySnapShot.forEach((document) => {
      let parent = document.data()
      this.jobs.push(parent)
    })
    this.$store.commit('setCurrentLocation', 'Parent Details')
  },
  computed: {
    numberOfAwardedJobs () {
      return (this.jobs.filter((job) => { return job.awarded })).length
    },
    displayDate (value) {
      return 'Member Since: ' + date.formatDate(new Date(value.seconds * 1000), 'MMMM YYYY')
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
