<template>
  <q-page padding>
    <div class="row">
      <q-input class="col" v-model="newJob.title" label="Title" bottom-slots error-message="A Title is Required" :error="titleErrors"></q-input>
    </div>

    <div class="row">
      <q-input class="col" v-model="newJob.description" label="Description" bottom-slots error-message="A Description is Required" :error="descErrors"></q-input>
    </div>

      <div class="row justify-between q-py-md">
        <q-toggle class="col" v-model="newJob.baby" label="Baby"/>
        <q-toggle class="col" v-model="newJob.home" label="Home"/>
        <q-toggle class="col" v-model="newJob.pet" label="Pet"/>
      </div>

      <div class="row">
        <q-input class="col" hint="click icon" v-model="sDateDisplay" stack-label label="Start Date" error-message="A Start Date is Required" :error="startDateErrors">
          <template v-slot:append>
            <q-icon name="eva-calendar-outline" class="cursor-pointer">
              <q-popup-proxy>
                <q-date v-model="sDate" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="row">
        <q-input class="col" hint="click icon" v-model="sTime" label="Start Time" error-message="A Start Time is Required" :error="startTimeErrors">
          <template v-slot:append>
            <q-icon name="eva-clock-outline" class="cursor-pointer">
              <q-popup-proxy>
                <q-time
                  v-model="newJob.startTime"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="q-pt-xl">
        <q-btn class="full-width" color="primary" label="save" @click="saveJob"/>
      </div>

  </q-page>
</template>

<script>
import { date } from 'quasar'
import { db } from '../boot/firebase'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'NewJob',
  data () {
    return {
      sDate: null,
      sDateDisplay: null,
      sTime: null,
      newJob: {
        entryDate: new Date(),
        description: '',
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        baby: true,
        pet: true,
        home: true,
        active: true,
        applied: [],
        parentID: this.$store.getters.getKey
      }

    }
  },
  validations: {
    newJob: {
      title: { required },
      description: { required }
    },
    sDateDisplay: { required },
    sTime: { required }
  },
  watch: {
    sDate () {
      this.sDateDisplay = date.formatDate(this.sDate, 'MM-DD-YYYY')
    },
    'newJob.startTime' () {
      let justTheHour = this.newJob.startTime.substring(0, 2)
      if (justTheHour > 12) {
        const twelveHour = justTheHour - 12
        this.sTime = twelveHour + this.newJob.startTime.substring(2) + ' pm'
        return this.sTime
      } else {
        this.sTime = this.newJob.startTime + ' am'
        return this.sTime
      }
    }
  },
  computed: {
    titleErrors () {
      return (this.$v.newJob.title.$invalid && this.$v.newJob.title.$dirty)
    },
    descErrors () {
      return (this.$v.newJob.description.$invalid && this.$v.newJob.description.$dirty)
    },
    startDateErrors () {
      return (this.$v.sDateDisplay.$invalid && this.$v.sDateDisplay.$dirty)
    },
    startTimeErrors () {
      return (this.$v.sTime.$invalid && this.$v.sTime.$dirty)
    }
  },
  methods: {
    async saveJob () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        const newDate = date.buildDate({ year: Number(this.sDate.substr(0, 4)), month: Number(this.sDate.substr(5, 2)), date: Number(this.sDate.substr(8, 2)) })
        this.newJob.startDate = newDate
        try {
          let docReference = await db.collection('Jobs').add(this.newJob)
          this.$q.notify({
            message: 'Your Job Was Save',
            icon: 'eva-done-all-outline',
            position: 'bottom',
            color: 'secondary',
            timeout: 2000
          })
          setTimeout(() => {
            this.$router.push({ name: 'editJob', params: { id: docReference.id } })
          }, 3000)
        } catch (error) {
          console.log('error: ', error)
        }
      }
    }
  }
}
</script>

<style>
</style>
