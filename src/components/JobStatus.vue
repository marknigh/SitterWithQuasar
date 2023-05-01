<template>
  <div>
    <q-checkbox
      v-model="active"
      checked-icon="task_alt"
      unchecked-icon="highlight_off"
      @update:model-value="toggleStatus($event)"
    />
  </div>
</template>

<script>
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../boot/firebase'

export default {
  name: 'JobStatus',
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: this.job.active
    }
  },
  methods: {
    toggleStatus (event) {
      let message
      event ? message = 'Would You Like To Mark This Job as Active' : message = 'Would You Like to Mark This Job As Inactive'
      this.$q.dialog({
        title: 'Change Job Status',
        message: message,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.updateDocument(event)
      }).onOk(() => {
        // ('>>>> second OK catcher')
      }).onCancel(() => {
        this.active = !this.active
      })
    },
    async updateDocument (event) {
      this.active = event
      const docRef = doc(db, 'Jobs', this.job.id)
      await updateDoc(docRef, {
        'active': event
      })
    }
  }
}
</script>
