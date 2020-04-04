import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp({
  apiKey: 'AIzaSyDIl04ey3vGb3zMISQxkvLB2zWZVggxxGs',
  authDomain: 'project-5760468166739261631.firebaseapp.com',
  databaseURL: 'https://project-5760468166739261631.firebaseio.com',
  projectId: 'project-5760468166739261631',
  storageBucket: 'project-5760468166739261631.appspot.com',
  messagingSenderId: '392225760455'
})

export const db = firebase.firestore()
export const storage = firebase.storage()

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(firestorePlugin)
}
