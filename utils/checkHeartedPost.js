const checkHeartedPost = (userID, array) => {
  let check = false;
  for (let i = 0; i < array.length; i++) {
    if (userID === array[i].user[0]) {
      check = true;
      return check;
    }
  }
  return check;
};

export default checkHeartedPost;
