import { ref, firebaseAuth } from "config/constants";

const auth = () => {
  return firebaseAuth().signInWithPopup(
    new firebaseAuth.FacebookAuthProvider()
  );
};

export default auth;

export const checkIfAuthed = store => store.getState().users.isAuthed;

export const logout = () => {
  return firebaseAuth().signOut();
};

export const saveUser = user => {
  return ref
    .child(`users/${user.uid}`)
    .set(user)
    .then(() => user);
};
