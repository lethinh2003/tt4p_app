import { Box } from "@mui/material";
import Comment from "./ButtonPost/Comment";
import Heart from "./ButtonPost/Heart";
import Save from "./ButtonPost/Save";
import Share from "./ButtonPost/Share";
const ButtonPost = ({ item, socket }) => {
  return (
    <>
      <Box
        sx={{
          fontSize: "1.7rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",

          color: (theme) => theme.palette.text.color.second,
        }}
      >
        <Heart item={item} socket={socket} />
        <Comment />
        <Share />
        <Save />
      </Box>
    </>
  );
};
export default ButtonPost;
