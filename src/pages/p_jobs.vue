<template>
    <q-page padding>
        <q-list>
          <div class="row">
            <div class="col-6"></div>
            <div class="col-6">
              <q-select
                bottom-slots
                label="Filter"
                v-model="filter"
                dense
                options-dense
                :options="selectOptions"
              >
              </q-select>
            </div>
          </div>
          <q-item class="q-pt-lg" v-for="job in filterJobs" :key="job.id" clickable v-ripple @click="editJob(job)">

            <q-item-section>
              <q-item-label> {{ job.title }}</q-item-label>
              <q-item-label caption> {{ jobDaysOld(job.entryDate) }} </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label> {{ job.startDate | displayDate }} </q-item-label>
              <q-item-label> Applied: {{ job.applied ? job.applied.length : 0 }} <q-icon v-if="job.awarded" color="yellow" name="eva-award"/> </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn round color="secondary" icon="eva-plus-outline" size="lg" @click.native="newJob()" />
        </q-page-sticky>
    </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import { date } from 'quasar'

export default {
  name: 'p_jobs',
  data () {
    return {
      jobs: [],
      selectOptions: ['Active', 'All'],
      filter: 'Active'
    }
  },
  async created () {
    const querySnapshot = await db.collection('Jobs').where('parentID', '==', this.$store.getters.getKey).get()
    querySnapshot.forEach((document) => {
      let job = document.data()
      job.id = document.id
      this.$store.commit('setCurrentLocation', 'Your Active Jobs')
      this.jobs.push(job)
    })
  },
  computed: {
    filterJobs () {
      if (this.filter === 'Active') {
        this.$store.commit('setCurrentLocation', 'All Active Jobs')
        return (this.jobs.filter((job) => { return (job.active === true) }))
      } else {
        this.$store.commit('setCurrentLocation', 'All Jobs')
        return this.jobs
      }
    }
  },
  methods: {
    newJob () {
      this.$router.push('/parent/newjob')
    },
    editJob (job) {
      this.$router.push({ name: 'editJob', params: { id: job.id } })
    },
    jobDaysOld (startDate) {
      const today = new Date()
      const daysOld = date.getDateDiff(today, new Date(startDate.seconds * 1000))
      if (daysOld === 0) {
        return 'This Job was created today'
      } else if (daysOld === 1) {
        return 'This Job is 1 day old'
      } else {
        return 'This Job is ' + daysOld + ' days old'
      }
    }
  },
  filters: {
    displayDate (value) {
      return date.formatDate(value.toDate(), 'MMMM DD, YYYY')
    }
  }
}
</script>

<style>

</style>
