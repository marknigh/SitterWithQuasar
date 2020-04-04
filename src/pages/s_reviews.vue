<template>
  <q-page v-if="reviews.length > 0" padding>
    <q-list>

      <q-item v-for="r in reviews" :key="r.id">

        <q-item-section>
          <q-item-label> <parent-name :parentID="r.parentID" /> </q-item-label>
          <q-item-label> {{ r.title }}</q-item-label>
          <q-item-label caption lines="2">{{ r.review }}</q-item-label>
          <div class="row no-wrap">
            <q-rating v-model="r.rating" :max="10" color="primary" readonly/> ({{ r.rating }})
          </div>
        </q-item-section>

        <q-separator spaced primary />

      </q-item>

    </q-list>
  </q-page>

  <q-page v-else class="flex flex-center">
        <div class="text-h6 text-weight-thin">No Reviews Have Been Written About You</div>
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import ParentName from '../components/ParentName'

export default {
  name: 'SitterReviews',
  data () {
    return {
      sitterKey: this.$store.getters.getKey,
      reviews: []
    }
  },
  components: {
    'parent-name': ParentName
  },
  firestore () {
    return {
      reviews: db.collection('Reviews').where('sitter', '==', this.sitterKey)
    }
  }
}
</script>

<style>
</style>
