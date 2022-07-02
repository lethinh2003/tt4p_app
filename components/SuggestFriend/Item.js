import { Avatar, Box, Button, Typography, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getListFollowings } from "../../redux/actions/getListFollowings";
import { BigHead } from "@bigheads/core";
import checkUserOnline from "../../utils/checkUserOnline";
const Item = ({ item }) => {
  const dispatch = useDispatch();
  const dataUserFollowing = useSelector((state) => state.userFollowing);
  const listUsersOnline = useSelector((state) => state.usersOnline);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(<Oval width={20} />);
  useEffect(() => {
    if (dataUserFollowing) {
      if (dataUserFollowing.includes(item._id)) {
        setMessage("Unfollow");
      } else {
        setMessage("Follow");
      }
    }
  }, [dataUserFollowing]);
  useEffect(() => {
    const checkOnline = checkUserOnline(item, listUsersOnline);
    setIsOnline(checkOnline);
  }, [listUsersOnline]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: isOnline ? "#44b700" : "#cb1760",
      color: isOnline ? "#44b700" : "#cb1760",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
  }));

  const handleClickFollow = async (item) => {
    try {
      setMessage("Loading");
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/follows`,
        {
          userId: item._id,
        }
      );
      if (res.data.code === 1) {
        setMessage("Unfollow");
        toast.info("Follow success");
        dispatch(
          getListFollowings({
            type: "GET_LIST_FOLLOWINGS",
            data: item._id,
          })
        );
      } else {
        setMessage("Follow");
        toast.info("Unfollow success");
        dispatch(
          getListFollowings({
            type: "REMOVE_ITEM_LIST_FOLLOWINGS",
            data: item._id,
          })
        );
      }
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          width: "100%",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",

                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
                border: "2px solid #23303a",
                boxShadow: "0px 3px 15px 0px #23303a",
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
                  accessory={item.avatarSVG.accessory}
                  body={item.avatarSVG.body}
                  circleColor={item.avatarSVG.circleColor}
                  clothing={item.avatarSVG.clothing}
                  clothingColor={item.avatarSVG.clothingColor}
                  eyebrows={item.avatarSVG.eyebrows}
                  eyes={item.avatarSVG.eyes}
                  faceMask={item.avatarSVG.faceMask}
                  faceMaskColor={item.avatarSVG.faceMaskColor}
                  facialHair={item.avatarSVG.facialHair}
                  graphic={item.avatarSVG.graphic}
                  hair={item.avatarSVG.hair}
                  hairColor={item.avatarSVG.hairColor}
                  hat={item.avatarSVG.hat}
                  hatColor={item.avatarSVG.hatColor}
                  lashes={item.avatarSVG.lashes}
                  lipColor={item.avatarSVG.lipColor}
                  mask={item.avatarSVG.mask}
                  mouth={item.avatarSVG.mouth}
                  skinTone={item.avatarSVG.skinTone}
                />
              </Box>
            </Box>
          </StyledBadge>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.first,
              }}
            >
              {item.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
                color: (theme) => theme.palette.text.color.second,
              }}
            >
              @{item.account}
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            pointerEvents: isLoading ? "none" : "visible",
            opacity: isLoading ? 0.6 : 1,
          }}
          onClick={() => handleClickFollow(item)}
        >
          {isLoading && <>{/* <Oval width={15} /> */}</>}
          {message}
        </Button>
      </Box>
    </>
  );
};
export default Item;
