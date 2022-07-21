import { BigHead } from "@bigheads/core";
import { Box, DialogContentText } from "@mui/material";
import FaceMask from "./FaceMask";
import FaceMaskColor from "./FaceMaskColor";
import Body from "./Body";
import LipColor from "./LipColor";
import SkinTone from "./SkinTone";
import Mask from "./Mask";
import Hair from "./Hair";
import HairColor from "./HairColor";
import Clothing from "./Clothing";
import ClothingColor from "./ClothingColor";
import Eyes from "./Eyes";
import Eyebrows from "./Eyebrows";
import Mouth from "./Mouth";
import FacialHair from "./FacialHair";
import Accessory from "./Accessory";
import Hat from "./Hat";
import HatColor from "./HatColor";
import Lashes from "./Lashes";
const ChangeAvatar = ({ avatarSVG, sx, setAvatarSVG }) => {
  const faceMask = [true, false];
  const mask = [true, false];
  const faceMaskColor = ["white", "black", "green", "red", "blue"];
  const body = ["breasts", "chest"];
  const lipColor = ["red", "purple", "pink", "turqoise", "green"];
  const skinTone = ["light", "yellow", "brown", "dark", "red", "black"];
  const hair = [
    "none",
    "long",
    "bun",
    "short",
    "pixie",
    "balding",
    "buzz",
    "afro",
    "bob",
  ];
  const hairColor = [
    "blonde",
    "orange",
    "black",
    "white",
    "brown",
    "blue",
    "pink",
  ];
  const clothing = [
    "naked",
    "shirt",
    "dressShirt",
    "vneck",
    "tankTop",
    "dress",
  ];
  const clothingColor = ["white", "blue", "black", "green", "red"];
  const eyes = [
    "normal",
    "leftTwitch",
    "happy",
    "content",
    "squint",
    "simple",
    "dizzy",
    "wink",
    "heart",
  ];
  const eyeBrows = ["raised", "leftLowered", "serious", "angry", "concerned"];
  const mouth = [
    "grin",
    "sad",
    "openSmile",
    "lips",
    "open",
    "serious",
    "tongue",
  ];
  const facialHair = ["none", "none2", "none3", "stubble", "mediumBeard"];
  const accessory = ["none", "roundGlasses", "tinyGlasses", "shades"];
  const hat = ["none", "none2", "none3", "none4", "none5", "beanie", "turban"];
  const hatColor = ["white", "blue", "black", "green", "red"];
  const lashes = [true, false];

  return (
    <>
      <DialogContentText>Background</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {mask.map((item, i) => (
          <Mask item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Face mask</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {faceMask.map((item, i) => (
          <FaceMask item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Face mask color</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {faceMaskColor.map((item, i) => (
          <FaceMaskColor item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Body</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {body.map((item, i) => (
          <Body item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Lip color</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {lipColor.map((item, i) => (
          <LipColor item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Skin tone</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {skinTone.map((item, i) => (
          <SkinTone item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Hair</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {hair.map((item, i) => (
          <Hair item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Hair Color</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {hairColor.map((item, i) => (
          <HairColor item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Clothing</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {clothing.map((item, i) => (
          <Clothing item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Clothing Color</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {clothingColor.map((item, i) => (
          <ClothingColor item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Eyes</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {eyes.map((item, i) => (
          <Eyes item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Eyebrows</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {eyeBrows.map((item, i) => (
          <Eyebrows item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Mouth</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {mouth.map((item, i) => (
          <Mouth item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Facial Hair</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {facialHair.map((item, i) => (
          <FacialHair item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Accessory</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {accessory.map((item, i) => (
          <Accessory item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Hat</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {hat.map((item, i) => (
          <Hat item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Hat Color</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {hatColor.map((item, i) => (
          <HatColor item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
      <DialogContentText>Lashes</DialogContentText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {lashes.map((item, i) => (
          <Lashes item={item} avatarSVG={avatarSVG} sx={sx} key={i} />
        ))}
      </Box>
    </>
  );
};
export default ChangeAvatar;
