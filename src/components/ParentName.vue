<template>
  <span> {{ name }}</span>
</template>

<script>
import { db } from '../boot/firebase'

export default {
  name: 'GetParentName',
  props: ['parentID'],
  data () {
    return {
      name: ''
    }
  },
  async created () {
    const userRef = await db.collection('Users').doc(this.parentID)
    const docRef = await userRef.get()
    if (docRef.exists) {
      this.name = docRef.data().name
    } else {
      this.name = 'Unknown'
    }
  }
}
</script>
