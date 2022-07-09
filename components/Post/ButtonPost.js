import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Comment from "./ButtonPost/Comment";
import Share from "./ButtonPost/Share";
import Save from "./ButtonPost/Save";
import Heart from "./ButtonPost/Heart";
const ButtonPost = ({ item, socket }) => {
  const { data: session, status } = useSession();

  return (
    <>
      {item && (
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
            <Heart item={item} session={session} socket={socket} />
            <Comment />
            <Share />
            <Save />
          </Box>
        </>
      )}
    </>
  );
};
export default ButtonPost;
