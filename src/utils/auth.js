import firebase from 'firebase'
import { db, auth } from '../boot/firebase'
import { cfaSignOut } from 'capacitor-firebase-auth'

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

function registrationAuth (email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

function createUserInDB (user) {
  return db.collection('Users').add(user)
}

function loginUserAuth (email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

function loginUserAuthGoogle () {
  return auth.signInWithPopup(googleProvider)
}

function loginUserAuthFacebook () {
  return firebase.auth().signInWithPopup(facebookProvider)
}

function getUserData (id) {
  return db.collection('Users').doc(id).get()
}

function getUserDataRegister (docRef) {
  return docRef.get()
}

function signOutAuth () {
  cfaSignOut().subscribe()
}

function alertMessage (error) {
  switch (error.code) {
    case 'auth/user-not-found': return 'No User Found. Please Click the Create One link below'
    case 'auth/wrong-password': return 'Username or Password is Incorrect'
    default:
      return 'Sorry and error has occurred. Please try again'
  }
}

export { registrationAuth, createUserInDB, loginUserAuth, getUserData, signOutAuth, alertMessage, loginUserAuthGoogle, loginUserAuthFacebook, getUserDataRegister }
