import { Box } from "@mui/material";
import ButtonPost from "./ButtonPost";
const ContentPost = ({ item, socket }) => {
  return (
    <>
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.border.dialog}`,
          gap: "5px",
          borderRadius: "10px",
          fontSize: "1.7rem",
          color: "#ffffff",
          backgroundColor: (theme) => theme.palette.feed.background.first,

          padding: "20px",
          color: (theme) => theme.palette.text.color.first,
        }}
      >
        <div
          className="content-html"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
        <ButtonPost socket={socket} item={item} />
      </Box>
    </>
  );
};
export default ContentPost;
