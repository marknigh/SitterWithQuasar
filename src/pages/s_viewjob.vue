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
        <template v-for="who in viewJob.applied">
          <who-applied :who="who" :job="viewJob" :key="who.id"></who-applied>
        </template>
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
import firebase from 'firebase'

export default {
  name: 'ViewJob',
  props: {
    id: {
      type: String
    }
  },
  components: {
    'parent-name': ParentName,
    'who-applied': WhoApplied
  },
  data () {
    return {
      viewJob: {},
      sitterKey: this.$store.getters.getKey,
      sDateDisplay: null,
      isLoading: true
    }
  },
  async created () {
    try {
      let docReference = await db.collection('Jobs').doc(this.id).get()
      this.viewJob = docReference.data()
      this.viewJob.id = docReference.id
      this.sDateDisplay = date.formatDate(this.viewJob.startDate.toDate(), 'MM-DD-YYYY')
      this.isLoading = false
    } catch (error) {
      console.log('error: ', error)
    }
  },
  methods: {
    async apply () {
      try {
        await db.collection('Jobs').doc(this.id).update({ applied: firebase.firestore.FieldValue.arrayUnion(this.sitterKey) })
        this.viewJob.applied.push(this.sitterKey)
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async unApply () {
      await db.collection('Jobs').doc(this.id).update({ applied: firebase.firestore.FieldValue.arrayRemove(this.sitterKey) })
      this.viewJob.applied.pop(this.sitterKey)
    },
    convertTime (time) {
      return convertTime(time)
    }
  }
}
</script>

<style>
</style>
