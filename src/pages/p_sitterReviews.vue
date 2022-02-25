<template>
  <q-page padding>
    <parent-sitter-review-list v-if="!loading" :reviews="reviews" :sitter="sitter"/>
  </q-page>
</template>

<script>
import { query, collection, where, getDocs } from 'firebase/firestore'
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
      reviews: [],
      loading: false
    }
  },
  async created () {
    this.loading = true
    this.$q.loading.show()
    const reviewRef = collection(db, 'Reviews')
    const q = query(reviewRef, where('sitter', '==', this.sitter.id))
    let querySnapshot = await getDocs(q)
    querySnapshot.forEach((docRefence) => {
      this.reviews.push(docRefence.data())
    })
    this.$store.commit('setCurrentLocation', this.sitter.name + ' Reviews')
    this.$q.loading.hide()
    this.loading = false
  }

}
</script>
