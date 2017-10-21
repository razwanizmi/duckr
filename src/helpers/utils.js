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
    timestamp: Date.now()
  };
};

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
