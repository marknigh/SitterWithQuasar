<template>
  <div style="display: inline">
    <q-dialog v-model="dialogOpen">
      <q-card class="bg-white text-blue">
        <q-bar class="bg-blue text-white">
          <q-space />
          <q-btn dense flat icon="close" @click="closeDialog()"></q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-body1 text-weight-bolder">Write Review for {{ sitter.name }}</div>
        </q-card-section>

        <q-card-section>
          <q-rating
            v-model="rating"
            size="1.5em"
            icon="star"
            :max="10"
            color="primary"
          />
        </q-card-section>

        <q-card-section>
          <q-input v-model="title" type="text" label="A Title for your Review" />
          <q-input v-model="review" autogrow type="text" label="Please Write a Review" />
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" icon="check" label="Save Review" @click="saveView" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../boot/firebase'

export default {
  name: 'WriteReview',
  props: {
    sitter: {
      type: Object
    },
    writeReviewDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogOpen: {
      get () {
        return this.writeReviewDialog
      }
    }
  },
  data () {
    return {
      maximizedToggle: true,
      rating: 0,
      review: '',
      title: ''
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closedDialog')
    },
    async saveView () {
      try {
        const colRef = collection(db, 'Reviews')
        await addDoc(colRef, {
          date: new Date(),
          parentID: this.$store.getters.getKey,
          sitter: this.sitter.id,
          review: this.review,
          rating: this.rating,
          title: this.title
        })
        this.$emit('closedDialog')
      } catch (error) {
      }
    }
  }
}
</script>

<style>
</style>
