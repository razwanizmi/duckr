export const formatUserInfo = (name, avatar, uid) => ({
  name,
  avatar,
  uid
});

export const formatDuck = (text, { name, avatar, uid }) => {
  return {
    text,
    name,
    avatar,
    uid,
    timeStamp: Date.now()
  };
};
