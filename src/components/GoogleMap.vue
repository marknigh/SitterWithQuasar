<template>
  <div class="google-maps">
    <div id="map"></div>
  </div>
</template>

<script>
import gmapsInit from '../boot/google-maps'
import { db } from '../boot/firebase'

export default {
  name: 'GoogleMap',
  props: ['parentID'],
  data () {
    return {
      google: null,
      map: null,
      geocoder: null,
      parent: '',
      parentAddress: '',
      mapConfig: {
        zoom: 10,
        center: { lat: 38.627003, lng: -90.199402 }
      }
    }
  },
  async mounted () {
    let docRef = await db.collection('Users').doc(this.parentID).get()
    this.parent = docRef.data()
    this.parentAddress = this.parent.address + ' ' + this.parent.zip
    const google = await gmapsInit()
    console.log('google', google)
    const map = new google.maps.Map(this.$el, this.mapConfig)
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: this.parentAddress }, (results, status) => {
      if (status !== 'OK' || !results[0]) {
        console.log('geocode:', results, status)
      }
      map.setCenter(results[0].geometry.location)
      map.fitBounds(results[0].geometry.viewport)
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      })
      marker.setMap(map)
    })
  }
}
</script>

<style lang="stylus" scoped>
.google-maps
  height: 300px;
</style>
