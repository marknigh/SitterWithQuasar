<template>
  <q-page class="flex flex-center">
    <div class="text-h5 text-weight-thin">Warson Woods Jobs</div>
  </q-page>
</template>

<style>
</style>

<script>
// import { Plugins } from '@capacitor/core'
// import { db } from '../boot/firebase'
// const { PushNotifications } = Plugins
// import { useQuasar } from 'quasar'

export default {
  name: 'PageIndex'
  // mounted () {
  //   const $q = useQuasar()
  //   $q.dark.set(true)
  // }
  // mounted () {
  //   if (this.$q.platform !== 'web' && this.$store.getters.getType === 'sitter') {
  //     this.registerPush()

  //     PushNotifications.addListener('registration', (token) => {
  //       db.collection('Tokens').doc(token.value).set({ userID: this.$store.getters.getKey }).then((response) => {
  //         console.warn('token successfully uploaded to firestore')
  //       }).catch((error) => {
  //         console.warn('if error, token could already be uploaded to server: ', error)
  //       })
  //     })

  //     PushNotifications.addListener('pushNotificationReceived',
  //       (notification) => {
  //         this.$q.notify({
  //           message: 'New Job Alert!',
  //           color: 'info',
  //           textColor: 'white',
  //           position: 'top-right',
  //           actions: [
  //             { label: 'Apply',
  //               color: 'white',
  //               handler: () => { this.$router.push({ name: 'viewJob', params: { id: notification.data.jobId } }) }
  //             },
  //             { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
  //           ]
  //         })
  //       }
  //     )

  //     PushNotifications.addListener('pushNotificationActionPerformed',
  //       (notification) => {
  //         const data = notification.notification.data
  //         this.$router.push({ name: 'viewJob', params: { id: data.jobId } })
  //       }
  //     )
  //   }
  // },
  // methods: {
  //   registerPush () {
  //     PushNotifications.requestPermission().then((permission) => {
  //       if (permission.granted) {
  //         // Register with Apple / Google to receive push via APNS/FCM
  //         PushNotifications.register()
  //       } else {
  //         // No permission for push granted
  //       }
  //     })
  //   }
  // }
}
</script>
