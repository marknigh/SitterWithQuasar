<template>

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

</template>

<script>
import { db } from '../boot/firebase'
import ParentName from '../components/ParentName'

export default {
  name: 'ParentSitterReviewList',
  components: { 'parent-name': ParentName },
  props: ['sitterKey'],
  data () {
    return {
      reviews: []
    }
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
