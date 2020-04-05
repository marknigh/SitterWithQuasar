<template>
  <div class="row">
    <q-chip v-if="this.who === job.awarded" icon-right="eva-award-outline">
      <q-avatar>
        <img :src="sitter.photoURL">
      </q-avatar>
      {{ sitter.name}}
    </q-chip>
    <q-chip v-else>
      <q-avatar>
        <img :src="sitter.photoURL">
      </q-avatar>
      {{ sitter.name}}
    </q-chip>
  </div>
</template>

<script>
import { db } from '../boot/firebase'

export default {
  name: 'WhoApplied',
  props: ['who', 'job'],
  data () {
    return {
      sitter: {},
      currentSitterKey: this.$store.getters.getKey
    }
  },
  firestore () {
    return {
      sitter: db.collection('Users').doc(this.who)
    }
  }
}
</script>

<style>
</style>
