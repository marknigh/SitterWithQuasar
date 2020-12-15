<template>
  <div class="row">
    <q-chip :clickable="!job.awarded" :icon-right="sitter.id === job.awarded ? 'eva-award-outline' : null" @click="!job.awarded ? awardJob(sitter.id): null">
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
  name: 'ParentWhoApplied',
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
      currentSitterKey: this.$store.getters.getKey
    }
  },
  async created () {
    let documentSnapshot = await db.collection('Users').doc(this.who).get()
    this.sitter = documentSnapshot.data()
    this.sitter.id = documentSnapshot.id
  },
  methods: {
    awardJob (id) {
      this.$emit('awardJob', id)
    }
  }
}
</script>

<style>
</style>
