<template>
  <q-page padding>

  <transition
    appear
    mode="out-in"
    leave-active-class="animated slideOutLeft"
  >
    <q-card v-if="!writeReview" flat>

      <q-card-section class="text-center">
        <q-avatar size="150px">
          <img :src="sitter.photoURL">
        </q-avatar>
      </q-card-section>

      <q-card-section>
        <div class="text-h6 text-center">{{ sitter.name }}</div>
        <div class="text-body2 text-center"> Joined: <span class="text-bold">{{ dateJoined(sitter.dateJoined) }} </span> </div>
        <div class="row q-gutter-md">
            <div class="col text-center">Age: <span class="text-bold">{{ 17 }} </span> <q-icon name="eva-pin"/> Grade: <span class="text-bold"> {{ sitter.grade }} </span> </div>
        </div>
        <div class="col text-center"> School: <span class="text-bold"> {{ sitter.school }} </span> </div>
        <div>
          <sitter-score :sitter="sitter.id" @showReviews="showReviewList" @writeReview="writeReviewForm"></sitter-score>
        </div>
        <div class="col text-center"><sitter-jobs-won :sitter="sitter.id"></sitter-jobs-won></div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 text-center">{{ sitter.notes }}</div>
      </q-card-section>

    </q-card>

    <write-review v-if="writeReview" :sitter="sitter"/>

  </transition>

    <q-scroll-area style="height: 200px" v-show="showReviews" class="overflow-hidden" id="reviews">
        <q-card-section>
          <parent-sitter-review :sitterKey="sitter.id"></parent-sitter-review>
        </q-card-section>
    </q-scroll-area>

<q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white text-blue">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Write Review</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="text" type="text" float-label="Float Label" placeholder="Gigi" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import SitterRatingScore from '../components/SitterRatingScore'
import SitterJobsWon from '../components/SitterJobsWon'
import ParentSitterReviewList from '../components/ParentSitterReviewList'
import WriteReview from './p_writereview'

export default {
  name: 'SitterDetails',
  props: ['sitter'],
  data () {
    return {
      showReviews: false,
      writeReview: false,
      dialog: false,
      maximizedToggle: true
    }
  },
  components: {
    'sitter-score': SitterRatingScore,
    'sitter-jobs-won': SitterJobsWon,
    'parent-sitter-review': ParentSitterReviewList,
    'write-review': WriteReview
  },
  methods: {
    dateJoined (sitterDateJoined) {
      return date.formatDate(new Date(sitterDateJoined.seconds * 1000), 'MMMM YYYY')
    },
    showReviewList () {
      this.showReviews = true
    },
    writeReviewForm () {
      this.showReviews = false
      this.dialog = true
    }
  }
}
</script>

<style>
</style>
