<template>
  <q-page padding>

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
      selectOptions: ['Won'],
      filter: '',
      sitterKey: this.$store.getters.getKey
    }
  },
  components: {
    'parent-name': GetParentname
  },
  async created () {
    const response = await db.collection('Jobs').where('active', '==', true).get()
    response.forEach((doc) => {
      this.jobs.push(doc.data())
    })
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
      if (this.filter === 'Won') {
        return (this.jobs.filter((job) => { return (job.awarded === this.sitterKey) }))
      } else {
        return this.jobs
      }
    }
  }
}
</script>

<style>

</style>
