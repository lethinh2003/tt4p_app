import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Comment from "./ButtonPost/Comment";
import Share from "./ButtonPost/Share";
import Save from "./ButtonPost/Save";
const ButtonPost = ({ item }) => {
  const { data: session, status } = useSession();

  return (
    <>
      {item && (
        <>
          <Box
            sx={{
              fontSize: "1.7rem",
              display: "flex",

              alignItems: "center",

              color: (theme) => theme.palette.text.color.second,
            }}
          >
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
