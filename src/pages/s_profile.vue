<template>
  <q-page padding>

        <q-input v-model="sitter.email" label="Username" placeholder="Username" />
        <q-input v-model="sitter.name" label="Name" placeholder="Name" />
        <q-input v-model="sitter.address" label="Address" placeholder="Address" />
        <q-input v-model="sitter.city" label="City" placeholder="City" />
        <q-input v-model="sitter.state" label="State" placeholder="State" />
        <q-input v-model="sitter.zip" label="Zip" placeholder="Zip" />
        <q-input v-model="sitter.mobile" label="Mobile Phone" mask="(###) ### - ####" fill-mask placeholder="Mobile Phone" />

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

        <div class="row q-pa-md">
          <q-item-label>
            Your Current Profile Picture
          </q-item-label>
          <q-btn round @click="changePic" icon v-if="!loadPic">
            <q-avatar size="42px">
              <img :src="sitter.photoURL" />
              <q-badge align="top" color="red" floating><q-icon name="eva-close-circle-outline" color="white" /></q-badge>
            </q-avatar>
          </q-btn>
        </div>

        <div v-if="loadPic">
          <q-input ref="upload" v-model="file" type="file" @change="uploadPhotoURL" />
        </div>

        <q-btn color="primary" class="full-width q-mt-md" label="Save" @click="save()" />

  </q-page>
</template>

<script>
import { db, storage } from '../boot/firebase'
import { date } from 'quasar'
import { UpdateUserProfile } from '../utils/profile'

export default {
  name: 'SitterProfile',
  data () {
    return {
      sitter: {},
      gradeOptions: ['5', '6', '7', '8', 'High School', 'College'],
      sexOptions: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }],
      loadPic: false,
      file: null
    }
  },
  async created () {
    try {
      let docReference = await db.collection('Users').doc(this.$store.getters.getKey).get()
      this.sitter = docReference.data()
      this.sitter.id = docReference.id
    } catch (error) {
      console.log('error: ', error)
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
    save () {
      UpdateUserProfile(this.sitter).then(() => {
        this.$store.commit('setCurrentUser', this.sitter)
        this.$q.notify({
          message: 'Your Profile Was Saved',
          icon: 'eva-done-all-outline',
          position: 'center',
          color: 'secondary',
          timeout: 1000
        })
      })
    },
    changePic () {
      this.loadPic = true
    },
    uploadPhotoURL (event) {
      let file = event.target.files[0]
      var storageRef = storage.ref()
      var imageRef = storageRef.child('userImages/' + this.$store.getters.getKey)
      imageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.sitter.photoURL = downloadURL
        })
      })
    }
  }
}
</script>

<style>
</style>
