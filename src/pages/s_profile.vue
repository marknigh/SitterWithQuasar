<template>
  <q-page padding>

    <profile-pic :sitter="sitter"/>
    <q-input v-model="sitter.email" label="Username" disable/>
    <q-input v-model="sitter.name" label="Full Name" />
    <q-input v-model="sitter.address" label="Address" />
    <q-input v-model="sitter.city" label="City" />
    <q-input v-model="sitter.state" label="State" />
    <q-input v-model="sitter.zip" label="Zip" />
    <q-input v-model="sitter.mobile" label="Mobile Phone" mask="(###) ### - ####" fill-mask />

    <div class="q-pa-md row justify-around">
      <q-option-group
        type="radio"
        v-model="sitter.sex"
        inline
        :options="sexOptions"/>
    </div>

    <q-input v-model="sDate" stack-label label="Birthday">
      <template v-slot:append>
        <q-icon name="eva-calendar-outline" class="cursor-pointer">
          <q-popup-proxy>
            <q-date v-model="sitter.birthday" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input v-model="ageCalculation" label="Age" placeholder="Age" readonly/>

    <q-select
      v-model="sitter.grade"
      label="Grade"
      radio
      :options="gradeOptions"
    />

    <q-input v-model="sitter.school" label="School" placeholder="School" />

    <div class="q-pa-md row justify-around">
      <q-checkbox class="col" v-model="sitter.baby" label="Baby" />
      <q-checkbox class="col" v-model="sitter.home" label="Home" />
      <q-checkbox class="col" v-model="sitter.pet" label="Pet" />
    </div>

    <q-input v-model="sitter.notes" type="text" label="About Me" placeholder="About Me" autogrow/>

    <q-btn color="primary" class="full-width q-mt-md" label="Save" @click="save()" />

  </q-page>
</template>

<script>
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../boot/firebase'
import { date } from 'quasar'
import ProfilePic from '../components/ProfilePic'

export default {
  name: 'SitterProfile',
  data () {
    return {
      sitter: {},
      gradeOptions: ['5', '6', '7', '8', 'High School', 'College'],
      sexOptions: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]
    }
  },
  components: {
    'profile-pic': ProfilePic
  },
  async created () {
    try {
      let docRef = doc(db, 'Users', this.$store.getters.getKey)
      let docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        this.sitter = docSnap.data()
        this.sitter.id = docSnap.id
        this.$store.commit('setCurrentLocation', 'Your Profile')
      } else {
      }
    } catch (error) {
    }
  },
  computed: {
    sDate () {
      return date.formatDate(this.sitter.birthday, 'MM-DD-YYYY')
    },
    ageCalculation () {
      var ageDifms = Date.now() - new Date(this.sDate).getTime()
      var ageDate = new Date(ageDifms)
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
  },
  methods: {
    async save () {
      try {
        const sitterProfile = doc(db, 'Users', this.sitter.id)
        await updateDoc(sitterProfile, this.sitter)
        this.$store.commit('setCurrentUser', this.sitter)
        this.$q.notify({
          message: 'Your Profile Was Saved',
          icon: 'eva-done-all-outline',
          position: 'center',
          color: 'secondary',
          timeout: 1000
        })
      } catch (error) {
      }
    }
  }
}
</script>

<style>
</style>
