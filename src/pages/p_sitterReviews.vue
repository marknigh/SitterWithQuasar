<template>
  <q-page padding>
    <parent-sitter-review-list :reviews="reviews" :sitter="sitter"/>
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import ParentSitterReviewList from '../components/ParentSitterReviewList'

export default {
  name: 'SitterReviews',
  props: {
    sitter: {
      type: Object
    }
  },
  components: {
    'parent-sitter-review-list': ParentSitterReviewList
  },
  data () {
    return {
      reviews: []
    }
  },
  async created () {
    let querySnapshot = await db.collection('Reviews').where('sitter', '==', this.sitter.id).get()
    querySnapshot.forEach((docRefence) => {
      this.reviews.push(docRefence.data())
    })
    this.$store.commit('setCurrentLocation', this.sitter.name + ' Reviews')
  }
}
</script>
