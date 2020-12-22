<template>
  <q-page class="flex flex-center">
    <div class="text-h3 text-weight-thin">Ste. Gen Sitter!</div>
  </q-page>
</template>

<style>
</style>

<script>
import { Plugins } from '../../src-capacitor/node_modules/@capacitor/core'
import { db } from '../boot/firebase'
const { PushNotifications } = Plugins

export default {
  name: 'PageIndex',
  mounted () {
    if (this.$q.platform !== 'web') {
      this.registerPush()
    }

    PushNotifications.addListener('registration', (token) => {
      db.collection('Tokens').doc(token.value).set({ userID: this.$store.getters.getKey }).then((response) => {
        console.warn('token successfully uploaded to firestore')
      }).catch((error) => {
        console.warn('if error, token could already be uploaded to server: ', error)
      })
    })

    PushNotifications.addListener('pushNotificationReceived',
      async (notification) => {
        this.$q.notify({
          message: 'New Job Alert!',
          color: 'primary',
          textColor: 'white',
          position: 'top-right',
          actions: [
            { label: 'Apply',
              color: 'white',
              handler: () => { this.$router.push({ name: 'viewJob', params: { id: notification.data.jobId } }) }
            },
            { label: 'Dismiss', color: 'red', handler: () => { /* ... */ } }
          ]
        })
      }
    )

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        const data = notification.notification.data
        this.$router.push({ name: 'viewJob', params: { id: data.jobId } })
      }
    )
  },
  methods: {
    registerPush () {
      PushNotifications.requestPermission().then((permission) => {
        if (permission.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register()
        } else {
          // No permission for push granted
        }
      })
    }
  }
}
</script>
