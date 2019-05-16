import fb from '~/plugins/firebase'

export default function(context) {
    if (fb) {
        fb.firebase.auth().onAuthStateChanged(googleUser => {
            if (googleUser) {
                if (isAnonymousUser(googleUser)) return
                context.store.dispatch(
                    'auth/initUserWithEmail',
                    googleUser.email
                )
            } else {
                context.store.dispatch('auth/loginAnonymously')
            }
        })
    }
}

function isAnonymousUser(user) {
    return !user.email
}
