import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { IconButton, ClickAwayListener, Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
const Icon = ({ setContent }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmotion, setIsEmotion] = useState(false);
  //
  const handleClickEmotion = () => {
    setIsEmotion(!isEmotion);
  };
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setContent((prev) => prev + emojiObject.emoji);
  };

  return (
    <>
      <IconButton onClick={() => handleClickEmotion()}>
        <EmojiEmotionsIcon />
      </IconButton>
      {isEmotion && (
        <ClickAwayListener onClickAway={handleClickEmotion}>
          <Box
            sx={{
              zIndex: "1000",
              top: "0",
              position: "absolute",
              right: 0,
            }}
          >
            <Picker onEmojiClick={onEmojiClick} />
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
};
export default Icon;
