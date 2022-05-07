import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  DialogContentText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUser } from "../../redux/actions/getUser";
import { getToggleSetting } from "../../redux/actions/getToggleSetting";
import { signOut } from "next-auth/react";
import InfoEditCity from "./InfoEditCity";
import ItemSex from "./InforEditSex";
import Loading from "../Loading/Loading";
import useLoading from "../../utils/useLoading";
import useCity from "../../utils/useCity";

const InfoModalEdit = ({ user, toggle }) => {
  const { city } = useCity();

  const dispatch = useDispatch();
  const { isLoading, setIsLoading } = useLoading();
  const [myCity, setMyCity] = useState(user.city ? user.city : "");
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [name, setName] = useState(user.name ? user.name : "");
  const [sex, setSex] = useState(user.sex ? user.sex : "");
  const [findSex, setFindSex] = useState(user.findSex ? user.findSex : "");

  const sexOption = [
    {
      key: "boy",
      img: "https://i.imgur.com/8buEDaI.png",
    },
    {
      key: "girl",
      img: "https://i.imgur.com/KbX5wJu.png",
    },
    {
      key: "lgbt",
      img: "https://i.imgur.com/RbjB6LH.png",
    },
  ];
  const checkCity = (ct) => {
    const findCity = city.filter((item) => item.province === ct);
    return findCity.length === 1;
  };
  const handleChangeSex = (sex) => {
    setSex(sex);
  };
  const handleChangeFindSex = (sex) => {
    setFindSex(sex);
  };
  const checkSex = (sex) => {
    const listSex = ["boy", "girl", "lgbt"];
    return listSex.includes(sex);
  };
  const handleClickSubmit = async () => {
    const checkCityUser = checkCity(myCity);
    if (!checkCityUser) {
      toast.error("Vui lòng nhập tỉnh/TP hợp lệ");
    } else if (name.length < 2) {
      toast.error("Vui lòng nhập tên hợp lệ");
    } else if (!checkSex(sex) || !checkSex(findSex)) {
      toast.error("Vui lòng nhập giới tính hợp lệ");
    } else {
      try {
        setIsLoading(true);
        const checkUserInRoom = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/check-in-room`,
          {
            account: user.account,
          }
        );
        const updateUser = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/update`,
          {
            name: name,
            bio: bio,
            findSex: findSex,
            city: myCity,
          }
        );
        setIsLoading(false);
        dispatch(getToggleSetting(false));
        dispatch(getUser(user.account));
      } catch (err) {
        setIsLoading(false);
        if (err.response) {
          if (err.response.data.message.name === "TokenExpiredError") {
            toast.error("Tài khoản hết hạn! Vui lòng đăng nhập lại!");
            signOut();
          }
          toast.error(err.response.data.message);
        }
      }
    }
  };
  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      <DialogContentText>Tài khoản</DialogContentText>
      <TextField size="small" fullWidth defaultValue={user.account} disabled />
      <DialogContentText>Năm sinh</DialogContentText>
      <TextField size="small" fullWidth defaultValue={user.date} disabled />
      <DialogContentText>Họ tên</DialogContentText>
      <TextField
        size="small"
        fullWidth
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <DialogContentText>Giới thiệu bản thân</DialogContentText>
      <TextField
        size="small"
        fullWidth
        defaultValue={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder={"Hãy giới thiệu bản thân"}
      />
      <DialogContentText>Giới tính</DialogContentText>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {sexOption &&
          sexOption.map((item, i) => (
            <ItemSex isSelected={sex == item.key} key={i} item={item} />
          ))}
      </Box>
      <DialogContentText>Tìm bạn</DialogContentText>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <AnimateSharedLayout>
          {sexOption &&
            sexOption.map((item, i) => (
              <ItemSex
                isSelected={findSex == item.key}
                key={i}
                item={item}
                onClick={() => handleChangeFindSex(item.key)}
              />
            ))}
        </AnimateSharedLayout>
      </Box>

      <InfoEditCity setMyCity={setMyCity} myCity={myCity} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <Button
          as={motion.div}
          whileHover={{ scale: 1.02 }}
          type="submit"
          onClick={() => handleClickSubmit()}
        >
          Save
        </Button>
      </Box>
    </>
  );
};
export default InfoModalEdit;
