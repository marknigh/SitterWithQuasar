const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp()

exports.newJobPosted = functions.firestore.document('Jobs/{jobId}')
  .onCreate(async (snapshot, context) => {
    ('snapshot: ', snapshot)
    ('context: ', context)

    const tokenArray = []
    const db = admin.firestore()
    const tokenReference = await db.collection('Tokens').get()

    tokenReference.forEach((data) => {
      tokenArray.push(data.id)
    })

    var message = {
      tokens: tokenArray,
      notification: {
        title: 'Warson Woods Job Alert',
        body: 'A Parent has recently posted a new job'
      },
      data: {
        jobId: context.params.jobId
      }
    }

    admin.messaging().sendMulticast(message).then((response) => {
      ('success')
      return 'success'
    }).catch((error) => {
      ('error', error)
    })

})
