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
