<template>
  <q-page padding>
    <q-card flat v-if="isLoading == false">
      <q-card-section>
        <div class="text-h6 text-center">
          <parent-name :parentID="viewJob.parentID"></parent-name>
        </div>
        <div class="text-subtitle1 text-center">
          {{ viewJob.title }}
        </div>
        <div class="text-subtitle2 text-center">
          <q-icon name="eva-edit-outline" /> {{ viewJob.description }}
        </div>
        <div class="text-center">
          <q-icon name="eva-calendar-outline"/> {{ sDateDisplay }} &#8226;
          <q-icon name="eva-clock-outline"/> {{ convertTime(viewJob.startTime) }}
        </div>
      </q-card-section>
      <q-separator />

      <div v-if="viewJob.applied.length > 0" class="row q-pt-md text-center">
        <p class="bg-warning full-width text-white text-subtitle2"> APPLIED </p>
      </div>

      <div class="row">
        <div v-for="(who, index) in viewJob.applied" :key="index">
          <who-applied :who="who" :job="viewJob" :key="componentKey"></who-applied>
        </div>
      </div>

      <div class="row q-pa-md" v-if="!viewJob.awarded">
        <q-btn v-if="viewJob.applied.includes(sitterKey)" color="primary" class="full-width" label="Remove Me" @click="unApply()" />
        <q-btn v-else color="primary" class="full-width" label="Apply" @click="apply()" />
      </div>

    </q-card>
  </q-page>
</template>

<script>
import ParentName from '../components/ParentName'
import WhoApplied from '../components/WhoApplied'
import { db } from '../boot/firebase'
import { convertTime } from '../utils/misc'
import { date } from 'quasar'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'

export default {
  name: 'ViewJob',
  components: {
    'parent-name': ParentName,
    'who-applied': WhoApplied
  },
  data () {
    return {
      viewJob: {},
      sitterKey: this.$store.getters.getKey,
      sDateDisplay: null,
      isLoading: true,
      componentKey: 0
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.path !== from.path) {
      this.getJob(to.params.id)
    }
    next()
  },
  async created () {
    this.getJob(this.$route.params.id)
  },
  methods: {
    async getJob (id) {
      try {
        const docRef = doc(db, 'Jobs', id)
        const docSnap = await getDoc(docRef)
        this.viewJob = docSnap.data()
        this.viewJob.id = docSnap.id
        this.sDateDisplay = date.formatDate(this.viewJob.startDate.toDate(), 'MM-DD-YYYY')
        this.isLoading = false
      } catch (error) {
        console.error('error: ', error)
      }
      this.$store.commit('setCurrentLocation', 'Job Details')
    },
    async apply () {
      try {
        const docRef = doc(db, 'Jobs', this.viewJob.id)
        await updateDoc(docRef, { applied: arrayUnion(this.sitterKey) })
        this.viewJob.applied.push(this.sitterKey)
      } catch (error) {
        console.error('error: ', error)
      }
    },
    async unApply () {
      const docRef = doc(db, 'Jobs', this.viewJob.id)
      await updateDoc(docRef, { applied: arrayRemove(this.sitterKey) })
      this.viewJob.applied.splice(this.viewJob.applied.indexOf(this.sitterKey), 1)
      this.componentKey += 1
    },
    convertTime (time) {
      return convertTime(time)
    }
  }
}
</script>

<style>
</style>
