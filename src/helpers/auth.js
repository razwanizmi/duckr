const auth = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "Razwan Rashidi",
        avatar: "https://avatars1.githubusercontent.com/u/14489814",
        uid: "razwanizmi"
      });
    }, 2000);
  });
};

export default auth;

export const checkIfAuthed = store => store.getState().isAuthed;

export const logout = () => {
  console.log("Logged out!");
}
