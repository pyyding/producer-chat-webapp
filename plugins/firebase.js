import firebase from 'firebase'

class FirebaseInstance {
    constructor(firebase, db, providers, serverTimestamp) {
        this.firebase = firebase
        this.db = db
        this.providers = providers
        this.serverTimestamp = serverTimestamp
    }
}

let firebaseInstance

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyC2mW1HaHMyldNStNZQNfdMeMJzddgO5X0',
        authDomain: 'producer-chat.firebaseapp.com',
        databaseURL: 'https://producer-chat.firebaseio.com',
        projectId: 'producer-chat',
        storageBucket: 'producer-chat.appspot.com',
        messagingSenderId: '958668948594'
    })
    const db = firebase.firestore()
    const settings = { /* your settings... */ timestampsInSnapshots: true }
    db.settings(settings)

    const googleProvider = new firebase.auth.GoogleAuthProvider()

    firebaseInstance = new FirebaseInstance(
        firebase,
        db,
        { googleProvider: googleProvider },
        firebase.firestore.FieldValue.serverTimestamp
    )
}

export default firebaseInstance
