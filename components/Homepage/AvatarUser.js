import { BigHead } from "@bigheads/core";
import { memo, useEffect, useRef, useState } from "react";
import checkUserOnline from "../../utils/checkUserOnline";
import { useSelector } from "react-redux";
import { Badge, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
const AvatarUser = ({ user, sx }) => {
  const listUsersOnline = useSelector((state) => state.usersOnline);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (user) {
      const checkOnline = checkUserOnline(user, listUsersOnline);
      setIsOnline(checkOnline);
    }
  }, [listUsersOnline]);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: isOnline ? "#44b700" : null,
      color: isOnline ? "#44b700" : null,
      boxShadow: isOnline
        ? `0 0 0 2px ${theme.palette.background.paper}`
        : null,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: isOnline ? "1px solid currentColor" : null,
        content: '""',
      },
    },
  }));
  return (
    <>
      {user && (
        <Link href={`/profile/${user.account}`}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Box
              sx={{
                ...sx,
                width: sx && sx.width ? sx.width : "50px",
                height: sx && sx.height ? sx.height : "50px",
                cursor: "pointer",

                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
                border: "2px solid #23303a",
                boxShadow: "0px 3px 15px 0px #e1e1e1",
                maxWidth: "200px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: sx ? sx.width : "50px",
                }}
              >
                <BigHead
                  accessory={user.avatarSVG.accessory}
                  body={user.avatarSVG.body}
                  circleColor={user.avatarSVG.circleColor}
                  clothing={user.avatarSVG.clothing}
                  clothingColor={user.avatarSVG.clothingColor}
                  eyebrows={user.avatarSVG.eyebrows}
                  eyes={user.avatarSVG.eyes}
                  faceMask={user.avatarSVG.faceMask}
                  faceMaskColor={user.avatarSVG.faceMaskColor}
                  facialHair={user.avatarSVG.facialHair}
                  graphic={user.avatarSVG.graphic}
                  hair={user.avatarSVG.hair}
                  hairColor={user.avatarSVG.hairColor}
                  hat={user.avatarSVG.hat}
                  hatColor={user.avatarSVG.hatColor}
                  lashes={user.avatarSVG.lashes}
                  lipColor={user.avatarSVG.lipColor}
                  mask={user.avatarSVG.mask}
                  mouth={user.avatarSVG.mouth}
                  skinTone={user.avatarSVG.skinTone}
                />
              </Box>
            </Box>
          </StyledBadge>
        </Link>
      )}
    </>
  );
};
export default memo(AvatarUser);
