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
import { doc, getDoc } from 'firebase/firestore'
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
    const docRef = doc(db, 'Users', this.who)
    let docSnap = await getDoc(docRef)
    this.sitter = docSnap.data()
    this.sitter.id = docSnap.id
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
