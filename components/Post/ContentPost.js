import { Box } from "@mui/material";
import ButtonPost from "./ButtonPost";
const ContentPost = ({ item, socket }) => {
  return (
    <>
      <Box
        sx={{
          border: (theme) => `3px solid ${theme.palette.border.feeds}`,
          gap: "5px",
          borderRadius: "10px",

          boxShadow: (theme) =>
            `0px 3px 10px 1px ${theme.palette.feeds.boxShadow}`,

          fontSize: "1.7rem",
          color: "#ffffff",
          backgroundColor: "#ffffff",

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
