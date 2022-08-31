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
          padding: "5px 0px",
          marginTop: "10px",
          fontSize: "1.7rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          borderTop: (theme) => `1px solid ${theme.palette.border.dialog}`,
          color: (theme) => theme.palette.text.color.second,
        }}
      >
        <Heart item={item} socket={socket} />
        <Comment />
        <Share item={item} />
        <Save item={item} socket={socket} />
      </Box>
    </>
  );
};
export default ButtonPost;
