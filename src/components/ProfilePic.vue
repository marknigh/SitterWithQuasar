<template>
  <q-card flat>
    <q-card-section class="text-center">
      <div @click="launchPicker()">
        <input type="file"
          ref="file"
          :name="uploadFieldName"
          @change="uploadPic($event.target.name, $event.target.files)"
          style="display:none">
          <q-avatar size="64px">
            <img :src="sitter.photoURL" />
          </q-avatar>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { Plugins, CameraResultType, CameraSource } from '../../src-capacitor/node_modules/@capacitor/core'
import { storage } from '../boot/firebase'

const { Camera } = Plugins

export default {
  name: 'ProfilePic',
  props: {
    sitter: {
      type: Object
    }
  },
  data () {
    return {
      key: 'value',
      imageSrc: String,
      loadPic: false,
      file: null,
      uploadFieldName: 'file'
    }
  },
  methods: {
    launchPicker () {
      if (this.$q.platform.is.mobile) {
        this.capturePic()
      } else {
        this.$refs.file.click()
      }
    },
    async capturePic () {
      console.log('capturePic')
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      })
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      console.log('image.base64String: ', image)
      let file = image.dataUrl
      console.log('file: ', file)
      var storageRef = storage.ref()
      var imageRef = storageRef.child('userImages/' + this.$store.getters.getKey)
      imageRef.putString(file, 'data_url', { contentType: 'image/jpg' }).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.sitter.photoURL = downloadURL
        })
      })
    },
    async uploadPic (name, files) {
      console.log('event: ', name, files)
      let file = event.target.files[0]
      console.log('file: ', file)
      var storageRef = storage.ref()
      var imageRef = storageRef.child('userImages/' + this.$store.getters.getKey)
      try {
        let snapshot = await imageRef.put(file)
        let downloadURL = await snapshot.ref.getDownloadURL()
        this.sitter.photoURL = downloadURL
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
