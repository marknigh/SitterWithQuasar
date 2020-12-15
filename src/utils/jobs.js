import { db } from '../boot/firebase'
import firebase from 'firebase'

function deleteJob (id) {
  return db.collection('Jobs').doc(id).delete()
}

function closeJob (id) {
  return db.collection('Jobs').doc(id).update('active', false)
}

function updateJob (id, job) {
  return db.collection('Jobs').doc(id).set(job)
}

function awardJob (id, job, name) {
  return db.collection('Jobs').doc(id).update({ 'awarded': name })
}

function removeAward (job) {
  return db.collection('Jobs').doc(job.id).update({
    awarded: firebase.firestore.FieldValue.delete()
  })
}

export { deleteJob, updateJob, awardJob, removeAward, closeJob }
