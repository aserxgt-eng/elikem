/**
 * Authentication service — thin wrapper around Firebase Auth.
 * Keeping these calls in one place makes it easy to swap providers later
 * and keeps components free of direct Firebase imports.
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { AppUser } from '@/lib/types';

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function loginWithEmail(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function registerWithEmail(
  displayName: string,
  email: string,
  password: string
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName });

  // Create the corresponding Firestore user profile document.
  const userRef = doc(db, 'users', credential.user.uid);
  await setDoc(userRef, {
    uid: credential.user.uid,
    email,
    displayName,
    role: 'admin', // First-party registrants default to admin; adjust for multi-tenant setups.
    createdAt: serverTimestamp(),
  });

  return credential.user;
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function logout() {
  await signOut(auth);
}

export async function fetchUserProfile(uid: string): Promise<AppUser | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return snap.data() as AppUser;
}
