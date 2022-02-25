<template>
  <q-page padding class="flex flex-center">
    <q-card flat>
      <q-card-section>

        <div class="text-center">
          <q-avatar size="100px">
            <img src="../assets/inside-a-circle-reverse.png" />
          </q-avatar>
        </div>

        <div class="text-h6 text-center">
          {{ parent.name }}
        </div>

        <div class="text-center">
          {{ parent.dateJoined | displayDate }}
        </div>

        <div class="text-center">
          {{ parent.address }}
        </div>

        <div class="text-center">
          {{ parent.city }}&#44;
          {{ parent.state }}&#46;
          {{ parent.zip }}
        </div>

        <div class="text-center">
          Children: {{ parent.children }}
          Pets: {{ parent.num_pets }}
        </div>

        <div class="text-center">
          <span> Interest: </span>
          <q-icon v-if="parent.baby" name='child_friendly' style="font-size: 24px;" />
          <q-icon v-if="parent.home" name='home' style="font-size: 24px;" />
          <q-icon v-if="parent.pet" name='pets' style="font-size: 24px;" />
        </div>

        <div class="text-center">
          <q-chip dense square><q-avatar color="primary" text-color="white">{{ numberOfJobsCreated }}</q-avatar> Jobs Created</q-chip>
          <q-chip dense square><q-avatar color="secondary" text-color="white">{{ numberOfAwardedJobs }}</q-avatar> Jobs Awarded</q-chip>
        </div>

      </q-card-section>
    </q-card>

  </q-page>
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
  filters: {
    displayDate (value) {
      return 'Member Since: ' + date.formatDate(new Date(value.seconds * 1000), 'MMMM YYYY')
    }
  },
  computed: {
    numberOfAwardedJobs () {
      return (this.jobs.filter((job) => { return job.awarded })).length
    }
  }
}
</script>

<style>
</style>
