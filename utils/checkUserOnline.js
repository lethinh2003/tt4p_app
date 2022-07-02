const checkUserOnline = (user, array) => {
  let check = false;
  for (let i = 0; i < array.length; i++) {
    if (user.account === array[i].account) {
      check = true;
      return check;
    }
  }
  return check;
};

export default checkUserOnline;
