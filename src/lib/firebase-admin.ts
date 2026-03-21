import * as admin from "firebase-admin";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!admin.apps.length) {
  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log("🔥 Firebase Admin Initialized Successfully");
    } catch (error: any) {
      console.error("❌ Firebase Admin Initialization Error:", error.message);
    }
  } else {
    console.warn("⚠️ Firebase Admin credentials missing. Admin features will be unavailable.");
  }
}

export const db = admin.apps.length ? admin.firestore() : null as any;
export const adminAuth = admin.apps.length ? admin.auth() : null as any;
