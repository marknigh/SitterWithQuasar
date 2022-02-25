<template>
  <span> {{ name }}</span>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
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
    const parentRef = doc(db, 'Users', this.parentID)
    const parentDoc = await getDoc(parentRef)
    if (parentDoc.exists) {
      this.name = parentDoc.data().name
    } else {
      this.name = 'Unknown'
    }
  }
}
</script>
