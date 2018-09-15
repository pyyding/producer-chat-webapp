import axios from 'axios'
import firebase from '~/plugins/firebase'
const googleProvider = new firebase.auth.GoogleAuthProvider()

export default {
  auth: {
    login: (data) => axios.post('auth/login', data),
    loginWithGoogle: () => {
      return firebase.auth().signInWithRedirect(googleProvider)
    }
  }
}
