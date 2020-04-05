<template>
    <q-page padding>

      <q-list>

        <div class="row">
          <div class="col-8"></div>
          <div class="col-4">
            <q-select
              v-model="filter"
              dense
              options-dense
              :options="selectOptions"
              >
            </q-select>
          </div>
        </div>

        <q-item v-for="job in filterJobs" :key="job.id" clickable v-ripple @click.native="editJob(job)">

          <q-item-section>
            <q-item-label> {{ job.title }}</q-item-label>
            <q-item-label caption> {{ jobDaysOld(job.entryDate) }} </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label> {{ job.startDate | displayDate }} </q-item-label>
            <q-item-label> Applied: {{ job.applied ? job.applied.length : 0 }} <q-icon v-if="job.awarded" color="yellow" name="eva-award"/> </q-item-label>
          </q-item-section>

          <q-separator spaced primary />

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
  firestore () {
    return {
      jobs: db.collection('Jobs').where('parentID', '==', this.$store.getters.getKey)
    }
  },
  computed: {
    filterJobs () {
      if (this.filter === 'Active') {
        return (this.jobs.filter((job) => { return (job.active === true) }))
      } else {
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
