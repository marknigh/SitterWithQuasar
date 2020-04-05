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
      apiKey: process.env.GOOGLE_MAP_API_KEY,
      google: null,
      map: null,
      geocoder: null,
      parentAddress: '',
      parent: '',
      mapConfig: {
        zoom: 15,
        center: { lat: 38.627003, lng: -90.199402 }
      }
    }
  },
  async mounted () {
    try {
      const parent = await this.$bind('parent', db.collection('Users').doc(this.parentID))
      const address = parent.address + ' ' + parent.zip
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(this.$el, this.mapConfig)

      geocoder.geocode({ address: address }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status)
        }

        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        })
        marker.setMap(map)
      })
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.google-maps
  height: 300px;
</style>
