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
  components: {
    'parent-sitter-review-list': ParentSitterReviewList
  },
  data () {
    return {
      sitters: {},
      reviews: [],
      loading: false
    }
  },
  async created () {
    this.sitter = this.$store.getters.getSitterDetails
    this.loading = true
    this.$q.loading.show()
    const reviewRef = collection(db, 'Reviews')
    const q = query(reviewRef, where('sitter', '==', this.$route.params.id))
    let querySnapshot = await getDocs(q)
    querySnapshot.forEach((docRefence) => {
      this.reviews.push(docRefence.data())
    })
    // this.$store.commit('setCurrentLocation', this.sitter.name + ' Reviews')
    this.$q.loading.hide()
    this.loading = false
  }

}
</script>
