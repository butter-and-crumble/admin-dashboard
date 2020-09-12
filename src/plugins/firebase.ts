import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

// firebase init
const config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_KEY_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_KEY_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_ID
}

firebase.initializeApp(config)

// firebase functions
const functions = firebase.functions()

// firebase auth
const auth = firebase.auth()

// firebase db
const db = firebase.firestore()

// firebase collections
const blackouts = db.collection('blackouts')
const orders = db.collection('orders')
export {
    auth,
    db,
    firebase,
    blackouts,
    orders,
    functions
}
