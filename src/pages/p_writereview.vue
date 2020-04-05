<template>
  <q-page padding class="flex flex-center">
    <q-card>

      <q-toolbar class="bg-secondary text-white">Write Review for {{ sitter.name }}</q-toolbar>

      <q-card-section>
        <q-input v-model="review.title" type="text" label="Title" />
      </q-card-section>

      <q-card-section>
        <q-rating v-model="review.rating" size="2em" :max="10" color="primary"/>
      </q-card-section>

      <q-card-section>
        <q-input v-model="review.desription" type="text" label="Description"  />
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'WriteReview',
  props: ['sitter'],
  data () {
    return {
      review: {
        title: '',
        sitter: this.sitter.id,
        rating: 0,
        parent: this.$store.getters.getKey
      }
    }
  }
}
</script>

<style>
</style>
