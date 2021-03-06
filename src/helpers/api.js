import { ref } from "config/constants";

const saveToDucks = duck => {
  const duckId = ref.child("ducks").push().key;
  const duckPromise = ref.child(`ducks/${duckId}`).set({ ...duck, duckId });

  return { duckId, duckPromise };
};

const saveToUsersDucks = (duck, duckId) => {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`).set({ ...duck, duckId });
};

const saveLikeCount = duckId => {
  return ref.child(`likeCount/${duckId}`).set(0);
};

export const saveDuck = duck => {
  const { duckId, duckPromise } = saveToDucks(duck);

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId)
  ]).then(() => ({ ...duck, duckId }));
};

export const listenToFeed = (callback, errorCallback) => {
  ref.child("ducks").on(
    "value",
    snapshot => {
      const feed = snapshot.val() || {};
      const sortedIds = Object.keys(feed).sort((a, b) => {
        return feed[b].timestamp - feed[a].timestamp;
      });
      callback({ feed, sortedIds });
    },
    errorCallback
  );
};

export const fetchUsersLikes = uid => {
  return ref
    .child(`usersLikes/${uid}`)
    .once("value")
    .then(snapshot => snapshot.val() || {});
};

export const saveToUsersLikes = (uid, duckId) => {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true);
};

export const deleteFromUsersLikes = (uid, duckId) => {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null);
};

export const incrementNumberOfLikes = duckId => {
  return ref
    .child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue + 1);
};

export const decrementNumberOfLikes = duckId => {
  return ref
    .child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1);
};

export const fetchUser = uid => {
  return ref
    .child(`users/${uid}`)
    .once("value")
    .then(snapshot => snapshot.val());
};

export const fetchUsersDucks = uid => {
  return ref
    .child(`usersDucks/${uid}`)
    .once("value")
    .then(snapshot => snapshot.val() || {});
};

export const fetchDuck = duckId => {
  return ref
    .child(`ducks/${duckId}`)
    .once("value")
    .then(snapshot => snapshot.val());
};

export const fetchLikeCount = duckId => {
  return ref
    .child(`likeCount/${duckId}`)
    .once("value")
    .then(snapshot => snapshot.val() || 0);
};

export const postReply = (duckId, reply) => {
  const replyId = ref.child(`replies/${duckId}`).push().key;
  const replyWithId = { ...reply, replyId };

  const replyPromise = ref
    .child(`replies/${duckId}/${replyId}`)
    .set(replyWithId);

  return {
    replyWithId,
    replyPromise
  };
};

export const fetchReplies = duckId => {
  return ref
    .child(`replies/${duckId}`)
    .once("value")
    .then(snapshot => snapshot.val() || {});
};
