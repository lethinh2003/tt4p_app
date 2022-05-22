import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Oval } from "react-loading-icons";
import { toast } from "react-toastify";
import axios from "axios";
const CreateComment = ({ item }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  //

  const ErrorContent = styled(Typography)({
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: 1.66,
    textAlign: "left",
    margin: "4px 14px 0 14px",
    color: "#f44336",
  });
  const handleClickCreateComment = async () => {
    try {
      if (content.length < 5) {
        return 0;
      }
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/${item._id}`,
        {
          userId: session.user.id,
          content: content,
        }
      );
      setContent("");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Box
        as={motion.div}
        sx={{
          width: "100%",
          pointerEvents: isLoading ? "none" : "visible",
          opacity: isLoading ? 0.6 : 1,
          overflowY: "auto",
          border: (theme) => `1px solid #128eff`,
          gap: "5px",
          borderRadius: "10px",
          display: "flex",
          fontSize: "3rem",
          color: "#ffffff",
          boxShadow: (theme) =>
            `0px 3px 10px 1px ${theme.palette.feeds.boxShadow}`,
          alignItems: "flex-start",
          fontWeight: "bold",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "50px",
            width: "100%",
            borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,
          }}
        >
          <input
            style={{
              fontSize: "1.7rem",
              width: "100%",
              height: "100%",
              border: 0,
              outline: "none",
              backgroundColor: "inherit",
              color: content && content.length < 5 ? "red" : "",
            }}
            value={content}
            type="text"
            placeholder="Type comment"
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            height: "50px",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <IconButton onClick={() => handleClickEmotion()}>
            <EmojiEmotionsIcon />
          </IconButton>
          <Button
            sx={{
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              pointerEvents:
                isLoading || content.length < 5 ? "none" : "visible",
              opacity: isLoading || content.length < 5 ? 0.6 : 1,
            }}
            onClick={() => handleClickCreateComment()}
          >
            {isLoading && (
              <>
                <Oval width={20} />
                Loading
              </>
            )}
            {!isLoading && <>Send</>}
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default CreateComment;
