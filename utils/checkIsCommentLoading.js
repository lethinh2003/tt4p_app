const checkIsCommentLoading = (id, arr) => {
  let check = false;
  for (let i = 0; i < arr.length; i++) {
    if (id === arr[i]) {
      check = true;
      return check;
    }
  }
  return check;
};
export default checkIsCommentLoading;
