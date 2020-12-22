<template>
  <q-page padding v-if="isLoading == false">

    <q-list>

      <div class="row">
        <div class="col-8"></div>
        <div class="col-4">
          <q-select
            bottom-slots
            label="Filter"
            v-model="filter"
            dense
            options-dense
            :options="selectOptions"
          >
            <template v-slot:append>
              <q-icon v-if="filter !== ''" name="close" @click.stop="filter = ''" class="cursor-pointer" />
            </template>
          </q-select>
        </div>
      </div>

      <q-item v-for="job in filterJobs" :key="job.id" clickable @click.native="viewJob(job)">

        <q-item-section>
          <parent-name :parentID="job.parentID" />
          <q-item-label caption lines="3"> {{ job.title }}</q-item-label>
          <q-item-label caption>{{ job.description }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label> {{ job.startDate | displayDate }} </q-item-label>
          <q-item-label caption> Applied: {{ job.applied ? job.applied.length : 0 }} <q-icon v-if="job.awarded" color="yellow" name="eva-award"/> </q-item-label>
        </q-item-section>

      </q-item>

    </q-list>

  </q-page>
  <q-page v-else class="flex flex-center">
    <q-spinner
      color="primary"
      size="5rem"
    />
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import { date } from 'quasar'
import GetParentname from '../components/ParentName'

export default {
  name: 's_jobs',
  data () {
    return {
      jobs: [],
      selectOptions: ['Active', 'My Wins', 'All'],
      filter: 'Active',
      sitterKey: this.$store.getters.getKey,
      isLoading: true
    }
  },
  components: {
    'parent-name': GetParentname
  },
  async created () {
    const querySnapshot = await db.collection('Jobs').get()
    querySnapshot.forEach((doc) => {
      let jobs = doc.data()
      jobs.id = doc.id
      this.jobs.push(jobs)
    })
    this.isLoading = false
  },
  methods: {
    viewJob (job) {
      if (job.awarded === this.sitterKey) {
        this.$router.push({ name: 'viewAwardedJob', params: { id: job.id } })
      } else {
        this.$router.push({ name: 'viewJob', params: { id: job.id } })
      }
    }
  },
  filters: {
    displayDate (value) {
      return date.formatDate(value.toDate(), 'MMMM DD, YYYY')
    }
  },
  computed: {
    filterJobs () {
      if (this.filter === 'My Wins') {
        this.$store.commit('setCurrentLocation', 'Won Jobs')
        return (this.jobs.filter((job) => { return (job.awarded === this.sitterKey && job.active === true) }))
      } else if (this.filter === 'Active') {
        this.$store.commit('setCurrentLocation', 'All Jobs')
        return (this.jobs.filter((job) => { return (job.active === true) }))
      } else {
        return this.jobs
      }
    }
  }
}
</script>

<style>

</style>
