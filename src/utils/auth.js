import { GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, getAuth } from 'firebase/auth'
import { cfaSignOut } from 'capacitor-firebase-auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../boot/firebase'

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

function registrationAuth (email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

async function createUserInDB (user) {
  return setDoc(doc(db, 'users', user))
}

function loginUserAuth (email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

function loginUserAuthGoogle () {
  return signInWithPopup(googleProvider)
}

function loginUserAuthFacebook () {
  return signInWithPopup(facebookProvider)
}

async function getUserData (id) {
  ('getUserData: ', id)
  const docRef = doc(db, 'id', id)
  return getDoc(docRef)
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
