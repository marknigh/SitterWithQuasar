import { db } from '../boot/firebase'

function UpdateUserProfile (profileData) {
  return db.collection('Users').doc(profileData.id).set(profileData)
}

export { UpdateUserProfile }
