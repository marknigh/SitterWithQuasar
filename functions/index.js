const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.applicationDefault() });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.newJobAddedToDb = functions.firestore.document('TestCollections/{jobId}').onCreate( (snapshot, context) => {
  console.log('snapshot: ', snapshot.data())
  console.log('id: ', snapshot.id)
  console.log('change: ', context)  

  var message = {
    notification: {
      title: 'New Job Alert',
      body: 'A New Job Has Been Entered'
    },
    android: {
      notification: {
        icon: 'stock_ticker_update',
        color: '#7e55c3',
        click_action: 'news_intent'
      }
    },
  }

  admin.messaging().sendMulticast(message).then((response) => {
    console.log('Successfully sent message: ', response)
    return 'Success'
  }).catch((error) => {
    console.log('Error sending message: ', error)
  })
})