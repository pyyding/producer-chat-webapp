import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: 'AIzaSyC2mW1HaHMyldNStNZQNfdMeMJzddgO5X0',
      authDomain: 'producer-chat.firebaseapp.com',
      databaseURL: 'https://producer-chat.firebaseio.com',
      projectId: 'producer-chat',
      storageBucket: 'producer-chat.appspot.com',
      messagingSenderId: '958668948594'
    }
  )
}

export default firebase
