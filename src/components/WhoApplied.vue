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
  props: {
    who: {
      type: {}
    }
  },
  data () {
    return {
      sitter: {},
      currentSitterKey: this.$store.getters.getKey
    }
  },
  async created () {
    let docRef = await db.collecion('Users').doc(this.who)
    this.sitter = docRef.data()
  }
}
</script>

<style>
</style>
