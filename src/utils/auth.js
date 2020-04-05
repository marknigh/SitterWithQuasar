import firebase from 'firebase'
import { db } from '../boot/firebase'

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
  return firebase.auth().signInWithPopup(googleProvider)
}

function loginUserAuthFacebook () {
  return firebase.auth().signInWithPopup(facebookProvider)
}

function getUserData (id) {
  return db.collection('Users').where('authKey', '==', id).get()
}

function getUserDataRegister (docRef) {
  console.log('getUserDataRegister: ', docRef)
  return docRef.get()
}

function signOutAuth () {
  return firebase.auth().signOut()
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
