import * as admin from 'firebase-admin'

export function getFirebaseClient() {
  return admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
}
