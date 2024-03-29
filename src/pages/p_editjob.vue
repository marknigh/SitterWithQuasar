<template>
  <q-page padding>
    <div v-if="isLoading == false">
      <div class="row">
        <q-input :readonly="disabledField" class="col" v-model="editJob.title" label="Title"></q-input>
      </div>

      <div class="row">
        <q-input :readonly="disabledField" class="col" v-model="editJob.description" label="Description"></q-input>
      </div>

        <div class="row justify-between q-pa-sm">
          <q-toggle :disable="disabledField" class="col" v-model="editJob.baby" label="Baby"/>
          <q-toggle :disable="disabledField" class="col" v-model="editJob.home" label="Home"/>
          <q-toggle :disable="disabledField" class="col" v-model="editJob.pet" label="Pet"/>
        </div>

        <div class="row">
          <q-input :readonly="disabledField" class="col" v-model="sDateDisplay" stack-label label="Start Date">
            <template v-slot:before v-if="!disabledField">
              <q-icon name="eva-calendar-outline" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="sDate" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="row">
          <q-input :readonly="disabledField" class="col" v-model="sTime" label="Start Time">
            <template v-slot:before v-if="!disabledField">
              <q-icon name="eva-clock-outline" class="cursor-pointer">
                <q-popup-proxy>
                  <q-time
                    v-model="editJob.startTime"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="row q-pt-md text-center">
          <p class="bg-warning full-width text-white text-subtitle2"> APPLIED </p>
        </div>

        <div class="row">
          <template v-for="who in editJob.applied" :key="who.id">
            <p-who-applied :who="who" :job="editJob" @awardJob="awardJob(who)"></p-who-applied>
          </template>
        </div>

        <div class="row q-pt-md text-center">
          <q-separator/>
        </div>

        <div class="q-pa-sm">
          <q-btn class="full-width" :disable="disabledField" color="primary" label="save" @click="saveJob"/>
        </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import ParentWhoApplied from '../components/ParentWhoApplied'
import { updateJob } from '../utils/jobs'
import { db } from '../boot/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default {
  name: 'EditJob',
  // props: ['id'],
  components: {
    'p-who-applied': ParentWhoApplied
  },
  data () {
    return {
      disabledField: false,
      sDateDisplay: null,
      sDate: null,
      sTime: null,
      editJob: null,
      isLoading: true
    }
  },
  async created () {
    try {
      const docRef = doc(db, 'Jobs', this.$route.params.id)
      const docSnap = await getDoc(docRef)
      this.editJob = { id: docSnap.id, ...docSnap.data() }
      this.sDateDisplay = date.formatDate(this.editJob.startDate.toDate(), 'MM-DD-YYYY')
      this.sDate = date.formatDate(this.editJob.startDate.toDate(), 'YYYY/MM/DD')
      this.sTime = this.convertTime()
      if (this.editJob.awarded) {
        this.disabledField = true
      }
      this.$store.commit('setCurrentLocation', 'Edit Job')
      this.isLoading = false
    } catch (error) {
    }
  },
  watch: {
    sDate () {
      this.sDateDisplay = date.formatDate(this.sDate, 'MM-DD-YYYY')
    },
    'editJob.startTime' () {
      this.convertTime()
    }
  },
  methods: {
    convertTime () {
      let justTheHour = this.editJob.startTime.substring(0, 2)
      if (justTheHour > 12) {
        const twelveHour = justTheHour - 12
        this.sTime = '0' + twelveHour + this.editJob.startTime.substring(2) + ' pm'
        return this.sTime
      } else {
        this.sTime = this.editJob.startTime + ' am'
        return this.sTime
      }
    },
    async saveJob () {
      const newDate = date.buildDate({ year: Number(this.sDate.substr(0, 4)), month: Number(this.sDate.substr(5, 2)), date: Number(this.sDate.substr(8, 2)) })
      this.editJob.startDate = newDate
      try {
        await updateJob(this.id, this.editJob)
        this.$q.notify({
          message: 'Your Job Was Updated',
          icon: 'eva-checkmark-circle-2-outline',
          position: 'top-right',
          color: 'positive',
          timeout: 1000
        })
      } catch (err) {
      }
    },
    awardJob (who) {
      this.$q.dialog({
        title: 'Award a Job?',
        message: 'Would you like to Award this Job. This can NOT be undone?',
        cancel: true
      }).onOk(async () => {
        await db.collection('Jobs').doc(this.id).update({ 'awarded': who })
        this.$set(this.editJob, 'awarded', who)
      }).onCancel(() => {
        ('pressed cancelled')
      })
    }
  }
}
</script>

<style>
</style>
