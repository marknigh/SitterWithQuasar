<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { Plugins } from '../src-capacitor/node_modules/@capacitor/core'
const { SplashScreen } = Plugins
import { messaging } from './boot/firebase'

export default {
  name: 'App',
  mounted () {
    SplashScreen.hide()
  },
  created () {
    messaging.getToken({ vapidKey: 'BFLVw0NkkJefthPReoe22UfDVIoJ1A_ZNVNMJD-lIodiVxkg-9FvIkS6QlEpGi14SsZl2WCQQ2blKxRH8m5e0c0' })
  }
}
</script>

<style>
</style>
