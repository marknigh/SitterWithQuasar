<template>
  <q-page padding>

    <q-card flat>

      <q-card-section class="text-center">
        <q-avatar size="100px">
          <img :src="sitter.photoURL">
        </q-avatar>
      </q-card-section>

      <q-card-section>
        <div class="text-h6 text-center">{{ sitter.name }}</div>
        <div class="text-body2 text-center"> Joined: <span class="text-bold">{{ dateJoined(sitter.dateJoined) }} </span> </div>
        <div class="row q-gutter-md">
          <div class="col text-center">Age: <span class="text-bold">{{ ageCalculation(sitter.birthday) }} </span> <q-icon name="eva-pin"/> Grade: <span class="text-bold"> {{ sitter.grade }} </span> </div>
        </div>
        <div class="col text-center"> School: <span class="text-bold"> {{ sitter.school }} </span> </div>
        <div>
          <sitter-rating-score :sitter="sitter"></sitter-rating-score>
        </div>
        <div class="col text-center">
          <sitter-jobs-won :sitter="sitter"></sitter-jobs-won>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 text-center">{{ sitter.notes }}</div>
      </q-card-section>

      <q-card-section>
        <div class="col text-center">
          <q-btn color="primary" :label="customBtnLabel" @click="viewReviews" />
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import SitterRatingScore from '../components/SitterRatingScore'
import SitterJobsWon from '../components/SitterJobsWon'

export default {
  name: 'SitterDetails',
  props: {
    sitter: {
      type: Object,
      required: true
    }
  },
  created () {
    this.$store.commit('setCurrentLocation', this.sitter.name)
  },
  computed: {
    customBtnLabel () {
      return this.sitter.name + '\'s Reviews'
    }
  },
  data () {
    return {
    }
  },
  components: {
    'sitter-rating-score': SitterRatingScore,
    'sitter-jobs-won': SitterJobsWon
  },
  methods: {
    ageCalculation (birthday) {
      if (birthday) {
        var ageDifms = Date.now() - new Date(birthday).getTime()
        var ageDate = new Date(ageDifms)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      }
    },
    dateJoined (sitterDateJoined) {
      return date.formatDate(new Date(sitterDateJoined.seconds * 1000), 'MMMM YYYY')
    },
    viewReviews () {
      this.$router.push({ name: 'sitterReviews', params: { sitter: this.sitter } })
    }
  }
}
</script>

<style>
</style>
