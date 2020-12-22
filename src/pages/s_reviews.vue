<template>
  <q-page v-if="reviews.length > 0 && isLoading == false" padding>
    <q-list>
      <q-item v-for="review in reviews" :key="review.id">

        <q-item-section>
          <q-item-label> {{ review.title }} </q-item-label>
          <q-item-label> <q-rating v-model="review.rating" :max="10" color="accent" readonly> </q-rating> ({{ review.rating }}) </q-item-label>
          <q-item-label> <q-avatar size="18px" color="info"> <q-icon name="person" /> </q-avatar> <parent-name :parentID="review.parentID" /> </q-item-label>
          <q-item-label caption> Reviewed on {{ review.date | formatDate }} </q-item-label>
        </q-item-section>

      </q-item>
    </q-list>
  </q-page>

  <q-page v-else-if="reviews.length == 0 && isLoading == false" class="flex flex-center">
    <div class="text-h6 text-weight-thin">No Reviews Have Been Written About You</div>
  </q-page>

  <q-page v-else class="flex flex-center">
    <q-spinner
      color="primary"
      size="3rem"
      :thickness="5"
    />
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import ParentName from '../components/ParentName'
import { date } from 'quasar'

export default {
  name: 'SitterReviews',
  data () {
    return {
      sitterKey: this.$store.getters.getKey,
      reviews: [],
      isLoading: true
    }
  },
  components: {
    'parent-name': ParentName
  },
  filters: {
    formatDate: function (value) {
      let convertDate = value.toDate()
      return date.formatDate(convertDate, 'MMMM, DD YYYY')
    }
  },
  async created () {
    try {
      let querySnapshot = await db.collection('Reviews').where('sitter', '==', this.sitterKey).get()
      querySnapshot.forEach((document) => {
        let review = document.data()
        review.id = document.id
        this.reviews.push(review)
      })
      this.isLoading = false
    } catch (error) {
      console.log('error: ', error)
      this.isLoading = false
    }
    this.$store.commit('setCurrentLocation', 'Your Reviews')
  }
}
</script>

<style>
</style>
