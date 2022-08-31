import { useSelector } from "react-redux";
import AvatarUser from "../Homepage/AvatarUser";
import { BigHead } from "@bigheads/core";
import { Badge, Box, Typography } from "@mui/material";
import MenuMobile from "./MenuMobile";
import { memo, useState } from "react";
import { useRouter } from "next/router";

const AccountMobile = () => {
  const router = useRouter();

  const dataUser = useSelector((state) => state.user.data);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleClickMenu = () => {
    if (isOpenMenu) {
      router.push(`/profile/${dataUser.data.account}`);
    } else {
      setIsOpenMenu(true);
    }
  };

  return (
    <>
      {isOpenMenu && (
        <MenuMobile setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />
      )}
      {dataUser && (
        <Box
          onClick={() => handleClickMenu()}
          sx={{
            width: "50px",
            height: "50px",
            cursor: "pointer",
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
            border: (theme) => `2px solid ${theme.palette.border.dialog}`,
            maxWidth: "200px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50px",
            }}
          >
            <BigHead
              accessory={dataUser.data.avatarSVG.accessory}
              body={dataUser.data.avatarSVG.body}
              circleColor={dataUser.data.avatarSVG.circleColor}
              clothing={dataUser.data.avatarSVG.clothing}
              clothingColor={dataUser.data.avatarSVG.clothingColor}
              eyebrows={dataUser.data.avatarSVG.eyebrows}
              eyes={dataUser.data.avatarSVG.eyes}
              faceMask={dataUser.data.avatarSVG.faceMask}
              faceMaskColor={dataUser.data.avatarSVG.faceMaskColor}
              facialHair={dataUser.data.avatarSVG.facialHair}
              graphic={dataUser.data.avatarSVG.graphic}
              hair={dataUser.data.avatarSVG.hair}
              hairColor={dataUser.data.avatarSVG.hairColor}
              hat={dataUser.data.avatarSVG.hat}
              hatColor={dataUser.data.avatarSVG.hatColor}
              lashes={dataUser.data.avatarSVG.lashes}
              lipColor={dataUser.data.avatarSVG.lipColor}
              mask={dataUser.data.avatarSVG.mask}
              mouth={dataUser.data.avatarSVG.mouth}
              skinTone={dataUser.data.avatarSVG.skinTone}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
export default memo(AccountMobile);
