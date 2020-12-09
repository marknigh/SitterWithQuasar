<template>
  <div v-if="reviews.length > 0">
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
    <div class="text-center">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-fab color="accent" icon="eva-plus-outline" direction="up">
          <q-fab-action color="amber" text-color="black" @click="openReviewDialog()" icon="eva-edit-outline" />
        </q-fab>
      </q-page-sticky>
      <write-review :dialog="dialog" :sitter="sitter" @closedDialog="dialog = !dialog"/>
    </div>
  </div>
  <div v-else>
    <no-reviews-written :sitter="sitter"/>
  </div>
</template>

<script>
import ParentName from '../components/ParentName'
import { date } from 'quasar'
import NoReviewsWritten from '../components/NoReviewWritten'
import WriteReview from '../components/WriteReview'

export default {
  name: 'ParentSitterReviewList',
  components: {
    'parent-name': ParentName,
    'no-reviews-written': NoReviewsWritten,
    'write-review': WriteReview
  },
  props: {
    reviews: {
      type: Array
    },
    sitter: {
      type: Object
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  filters: {
    formatDate: function (value) {
      let convertDate = value.toDate()
      return date.formatDate(convertDate, 'MMMM, DD YYYY')
    }
  },
  methods: {
    openReviewDialog () {
      this.dialog = true
    }
  }
}
</script>

<style>
</style>
