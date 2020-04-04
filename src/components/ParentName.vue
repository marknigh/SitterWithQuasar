<template>
  <span> {{ name.name }}</span>
</template>

<script>
import { db } from '../boot/firebase'

export default {
  name: 'GetParentName',
  props: ['parentID'],
  data () {
    return {
      name: {}
    }
  },
  firestore () {
    return {
      name: db.collection('Users').doc(this.parentID)
    }
  }
}
</script>
