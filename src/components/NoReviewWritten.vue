<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/no-reviews.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">No Reviews Have Been Written.<strong> Be the First!!</strong></p>
    <q-btn color="secondary" label="Write Review" @click="openReviewDialog()" />
    <write-review :dialog="dialog" :sitter="sitter" @closedDialog="dialog = !dialog"/>
  </div>
</template>

<script>
import WriteReview from './WriteReview'

export default {
  name: 'NoReviewsWritten',
  data () {
    return {
      dialog: false
    }
  },
  components: {
    'write-review': WriteReview
  },
  props: {
    sitter: {
      type: Object
    }
  },
  methods: {
    openReviewDialog () {
      console.log('writeReivew')
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
