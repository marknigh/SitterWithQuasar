<template>
  <q-card flat>
    <q-card-section class="text-center">
      <div @click="launchPicker()">
        <input type="file"
          ref="file"
          :name="uploadFieldName"
          @change="uploadPic($event)"
          style="display:none"
          accept=".png,.jpg">
          <q-avatar size="64px">
            <img :src="sitter.photoURL" />
          </q-avatar>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
// import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { storage, db } from '../boot/firebase'
import { sanitizePic } from '../utils/misc'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateDoc, doc } from 'firebase/firestore'
// const { Camera } = Plugins

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
    // async capturePic () {
    //   ('capturePic')
    //   const image = await Camera.getPhoto({
    //     quality: 50,
    //     resultType: CameraResultType.DataUrl,
    //     source: CameraSource.Camera
    //   })
    //   // image.webPath will contain a path that can be set as an image src.
    //   // You can access the original file using image.path, which can be
    //   // passed to the Filesystem API to read the raw data of the image,
    //   // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    //   ('image.base64String: ', image)
    //   let file = image.dataUrl
    //   ('file: ', file)
    //   var storageRef = storage.ref()
    //   var imageRef = storageRef.child('userImages/' + this.$store.getters.getKey)
    //   imageRef.putString(file, 'data_url', { contentType: 'image/jpg' }).then((snapshot) => {
    //     snapshot.ref.getDownloadURL().then((downloadURL) => {
    //       this.sitter.photoURL = downloadURL
    //     })
    //   })
    // },
    uploadPic (event) {
      sanitizePic(event.target.files[0]).then(() => {
        const imageRef = storageRef(storage, 'userImages/' + this.sitter.id)
        uploadBytes(imageRef, event.target.files[0]).then(() => {
          getDownloadURL(imageRef).then((downloadURL) => {
            const userRef = doc(db, 'Users', this.sitter.id)
            updateDoc(userRef, { photoURL: downloadURL }).then(() => {
              this.$store.commit('setSitterPhoto', downloadURL)
              this.$emit('updatePhotoUrl', downloadURL)
            })
          })
        })
      }).catch(() => {
        this.$q.notify({
          message: 'Wrong File Type',
          icon: 'eva-alert-circle-outline',
          position: 'top-right',
          color: 'negative'
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
