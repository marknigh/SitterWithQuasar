import { db } from '../boot/firebase'
import firebase from 'firebase'

function createJob (job) {
  console.log('job.js -> createJob: job: ', job)
  return db.collection('Jobs').add(job)
}

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
  console.log('jobs.js: ', id, job, name)
  return db.collection('Jobs').doc(id).update({ 'awarded': name })
}

function removeAward (job) {
  console.log('job: ', job)
  return db.collection('Jobs').doc(job.id).update({
    awarded: firebase.firestore.FieldValue.delete()
  })
}

export { createJob, deleteJob, updateJob, awardJob, removeAward, closeJob }
