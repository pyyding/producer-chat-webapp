import firebase from '~/plugins/firebase'

export default function (context) {
	firebase.auth().onAuthStateChanged((googleUser) => {
		if (googleUser) {
			context.store.dispatch('auth/initUserWithEmail', googleUser.email)
		}
	})
}