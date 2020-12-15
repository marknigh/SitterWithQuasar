<template>
  <div class="row" v-if="isLoading == false">
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
  props: {
    who: {
      type: String
    },
    job: {
      type: Object
    }
  },
  data () {
    return {
      sitter: {},
      currentSitterKey: this.$store.getters.getKey,
      isLoading: true
    }
  },
  async created () {
    try {
      let docRef = await db.collection('Users').doc(this.who).get()
      this.sitter = docRef.data()
      this.sitter.id = docRef.id
      this.isLoading = false
    } catch (error) {
      console.log('error: ', error)
    }
  }
}
</script>

<style>
</style>
