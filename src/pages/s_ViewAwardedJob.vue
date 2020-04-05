<template>
  <q-page padding>
    <q-card flat v-if="!isLoading">
      <q-card-section>
        <div class="text-h6 text-center">
          <parent-name :parentID="viewJob.parentID"></parent-name>
        </div>
        <div class="text-subtitle1 text-center">
          {{ viewJob.title }}
        </div>
        <div class="text-subtitle2 text-center">
          {{ viewJob.description }}
        </div>
        <div class="text-center">
          <q-icon name="eva-calendar-outline"/> {{ sDateDisplay }} &#8226;
          <q-icon name="eva-clock-outline"/> {{ convertTime(viewJob.startTime) }}
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <google-map :parentID="viewJob.parentID"></google-map>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
import ParentName from '../components/ParentName'
import { db } from '../boot/firebase'
import { convertTime } from '../utils/misc'
import { date } from 'quasar'
import GoogleMap from '../components/GoogleMap'

export default {
  name: 'ViewAwardedJob',
  props: ['id'],
  components: {
    'parent-name': ParentName,
    'google-map': GoogleMap
  },
  data () {
    return {
      viewJob: null,
      sitterKey: this.$store.getters.getKey,
      sDateDisplay: null,
      isLoading: true
    }
  },
  created () {
    this.getJob()
  },
  methods: {
    getJob () {
      db.collection('Jobs').doc(this.id).onSnapshot((doc) => {
        this.viewJob = doc.data()
        this.sDateDisplay = date.formatDate(this.viewJob.startDate.toDate(), 'MM-DD-YYYY')
        this.isLoading = false
      })
    },
    convertTime (time) {
      return convertTime(time)
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
