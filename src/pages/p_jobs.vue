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
          <q-item class="q-pt-lg" v-for="job in filterJobs" :key="job.id" clickable v-ripple @click="EditJob(job)">

            <q-item-section thumbnail>
              <job-status :job="job"></job-status>
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ job.title }}</q-item-label>
              <q-item-label caption> {{ jobDaysOld(job.entryDate) }} </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label> {{ displayDate(job.startDate) }} </q-item-label>
              <q-item-label> Applied: {{ job.applied ? job.applied.length : 0 }} <q-icon v-if="job.awarded" color="yellow" name="eva-award"/> </q-item-label>
            </q-item-section>

          </q-item>
        </q-list>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn round color="secondary" icon="eva-plus-outline" size="lg" @click="NewJob()" />
        </q-page-sticky>
    </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import { date } from 'quasar'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import JobStatus from '../components/JobStatus.vue'

export default {
  name: 'p_jobs',
  data () {
    return {
      jobs: [],
      selectOptions: ['Active', 'All'],
      filter: 'Active'
    }
  },
  components: {
    'job-status': JobStatus
  },
  async created () {
    const q = query(collection(db, 'Jobs'), where('parentID', '==', this.$store.getters.getKey))
    await onSnapshot(q, (querySnapshot) => {
      this.jobs = []
      querySnapshot.forEach((document) => {
        let job = document.data()
        job.id = document.id
        this.$store.commit('setCurrentLocation', 'Your Active Jobs')
        this.jobs.push(job)
      })
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
    displayDate (value) {
      return date.formatDate(value.toDate(), 'MMMM DD, YYYY')
    },
    NewJob () {
      this.$store.commit('setCurrentLocation', 'New Job')
      this.$router.push({ path: '/parent/newjob/' })
    },
    EditJob (job) {
      this.$router.push({ path: `/parent/jobs/editjob/${job.id}` })
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
  }
}
</script>

<style>

</style>
