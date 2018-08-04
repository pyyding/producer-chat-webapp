import fb from '~/plugins/firebase'

export default function (context) {
	if (fb) {
		fb.firebase.auth().onAuthStateChanged((googleUser) => {
			if (googleUser) {
				context.store.dispatch('auth/initUserWithEmail', googleUser.email)
			}
		})
	}
}