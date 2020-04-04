<template>
  <div v-if="reviews.length > 0" class="col text-center block">
    <span> ({{ score }}) </span>
    <q-rating v-model="score" :max="10" color="primary" readonly/>
    <span @click="showReviews"> <q-icon name="eva-chevron-down-outline"/></span>
    <span @click="writeReview"> <q-icon name="eva-edit-2-outline"/></span>
  </div>
  <div v-else>
    <p class="col text-center block"> No Reviews Have Been Written </p>
  </div>
</template>

<script>
import { db } from '../boot/firebase'

export default {
  name: 'SitterRatingScore',
  props: ['sitter'],
  data () {
    return {
      reviews: []
    }
  },
  firestore () {
    return {
      reviews: db.collection('Reviews').where('sitter', '==', this.sitter)
    }
  },
  methods: {
    showReviews () {
      console.log('showReviews')
      this.$emit('showReviews')
    },
    writeReview () {
      this.$emit('writeReview')
    }
  },
  computed: {
    score () {
      if (this.reviews.length > 0) {
        return Math.round(this.reviews.reduce((a, b) => a + b.rating, 0) / this.reviews.length)
      } else {
        return 'No Reviews Have Been Written'
      }
    }
  }
}
</script>
