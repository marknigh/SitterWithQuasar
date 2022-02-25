<template>
  <div v-if="reviews.length > 0" class="col text-center block">
    <span> ({{ score }}) </span>
    <q-rating v-model="score" :max="10" color="primary" readonly/>
  </div>
  <div v-else>
    <p class="col text-center block"> No Reviews Have Been Written </p>
  </div>
</template>

<script>
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../boot/firebase'

export default {
  name: 'SitterRatingScore',
  props: {
    sitter: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      reviews: []
    }
  },
  async created () {
    const reviewRef = collection(db, 'Reviews')
    const q = query(reviewRef, where('sitter', '==', this.sitter.id))
    let querySnapshot = await getDocs(q)
    querySnapshot.forEach((documentSnapshot) => {
      let review = documentSnapshot.data()
      review.id = documentSnapshot.id
      this.reviews.push(review)
    })
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
