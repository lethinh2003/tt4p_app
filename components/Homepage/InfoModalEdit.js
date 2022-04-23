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
import ItemSex from "./ItemSex";
const InfoModalEdit = ({ user, toggle }) => {
  const dispatch = useDispatch();

  const [city, setCity] = useState([
    {
      city: "Cần Thơ",
      province: "Cần Thơ",
      area: "1,408.9",
      population: "1,248,000",
    },
    {
      city: "Đà Nẵng",
      province: "Đà Nẵng",
      area: "1,285.4",
      population: "1,028,000",
    },
    {
      city: "Hải Phòng",
      province: "Hải Phòng",
      area: "1,527.4",
      population: "1,963,300",
    },
    {
      city: "Hà Nội",
      province: "Hà Nội",
      area: "3,324.5",
      population: "7,216,000",
    },
    {
      city: "Hồ Chí Minh",
      province: "Hồ Chí Minh",
      area: "2,095.5",
      population: "8,146,300",
    },
    {
      city: "Bà Rịa",
      province: "Bà Rịa–Vũng Tàu",
      area: "91.46",
      population: "122,424",
    },
    {
      city: "Bạc Liêu",
      province: "Bạc Liêu",
      area: "175.4",
      population: "188,863",
    },
    {
      city: "Bắc Giang",
      province: "Bắc Giang",
      area: "32.21",
      population: "126,810",
    },
    {
      city: "Bắc Ninh",
      province: "Bắc Ninh",
      area: "80.28",
      population: "272,634",
    },
    {
      city: "Bảo Lộc",
      province: "Lâm Đồng",
      area: "232.56",
      population: "153,362",
    },
    {
      city: "Biên Hòa",
      province: "Đồng Nai",
      area: "264.07",
      population: "1,104,495",
    },
    {
      city: "Bến Tre",
      province: "Bến Tre",
      area: "67.48",
      population: "143,312",
    },
    {
      city: "Buôn Ma Thuột",
      province: "Đắk Lắk",
      area: "370.00",
      population: "340,000",
    },
    {
      city: "Cà Mau",
      province: "Cà Mau",
      area: "250.3",
      population: "204,895",
    },
    {
      city: "Cẩm Phả",
      province: "Quảng Ninh",
      area: "486.4",
      population: "195,800",
    },
    {
      city: "Cao Lãnh",
      province: "Đồng Tháp",
      area: "107.195",
      population: "149,837",
    },
    {
      city: "Châu Đốc",
      province: "An Giang",
      area: "105.290",
      population: "157,298",
    },
    {
      city: "Đà Lạt",
      province: "Lâm Đồng",
      area: "393.29",
      population: "256,393",
    },
    {
      city: "Điện Biên Phủ",
      province: "Điện Biên",
      area: "60.09",
      population: "70,639",
    },
    {
      city: "Đông Hà",
      province: "Quảng Trị",
      area: "73.06",
      population: "93,756",
    },
    {
      city: "Đồng Hới",
      province: "Quảng Bình",
      area: "155.54",
      population: "160,325",
    },
    {
      city: "Hà Tĩnh",
      province: "Hà Tĩnh",
      area: "56.19",
      population: "117,546",
    },
    {
      city: "Hạ Long",
      province: "Quảng Ninh",
      area: "208.7",
      population: "203,731",
    },
    {
      city: "Hải Dương",
      province: "Hải Dương",
      area: "71.39",
      population: "187,405",
    },
    {
      city: "Hòa Bình",
      province: "Hòa Bình",
      area: "148.2",
      population: "93,409",
    },
    {
      city: "Hội An",
      province: "Quảng Nam",
      area: "61.47",
      population: "121,716",
    },
    {
      city: "Huế",
      province: "Thừa Thiên–Huế",
      area: "83.3",
      population: "333,715",
    },
    {
      city: "Hưng Yên",
      province: "Hưng Yên",
      area: "46.8",
      population: "121,486",
    },
    {
      city: "Kon Tum",
      province: "Kon Tum",
      area: "432.98",
      population: "137,662",
    },
    {
      city: "Lạng Sơn",
      province: "Lạng Sơn",
      area: "79.0",
      population: "148,000",
    },
    {
      city: "Lào Cai",
      province: "Lào Cai",
      area: "221.5",
      population: "94,192",
    },
    {
      city: "Long Xuyên",
      province: "An Giang",
      area: "106.87",
      population: "280,300",
    },
    {
      city: "Móng Cái",
      province: "Quảng Ninh",
      area: "518.28",
      population: "108,016",
    },
    {
      city: "Mỹ Tho",
      province: "Tiền Giang",
      area: "79.8",
      population: "215,000",
    },
    {
      city: "Nam Định",
      province: "Nam Định",
      area: "46.4",
      population: "191,900",
    },
    {
      city: "Ninh Bình",
      province: "Ninh Bình",
      area: "48.3",
      population: "130,517",
    },
    {
      city: "Nha Trang",
      province: "Khánh Hòa",
      area: "251.0",
      population: "392,279",
    },
    {
      city: "Cam Ranh",
      province: "Khánh Hòa",
      area: "325.0",
      population: "128,358",
    },
    {
      city: "Phan Rang–Tháp Chàm",
      province: "Ninh Thuận",
      area: "79.37",
      population: "102,941",
    },
    {
      city: "Phan Thiết",
      province: "Bình Thuận",
      area: "206.0",
      population: "255,000",
    },
    {
      city: "Phủ Lý",
      province: "Hà Nam",
      area: "34.27",
      population: "121,350",
    },
    {
      city: "Pleiku",
      province: "Gia Lai",
      area: "260.61",
      population: "186,763",
    },
    {
      city: "Quảng Ngãi",
      province: "Quảng Ngãi",
      area: "37.12",
      population: "134,400",
    },
    {
      city: "Quy Nhơn",
      province: "Bình Định",
      area: "284.28",
      population: "311,000",
    },
    {
      city: "Rạch Giá",
      province: "Kiên Giang",
      area: "97.75",
      population: "228,360",
    },
    {
      city: "Sa Đéc",
      province: "Đồng Tháp",
      area: "59.81",
      population: "152,237",
    },
    {
      city: "Sóc Trăng",
      province: "Sóc Trăng",
      area: "76.15",
      population: "173,922",
    },
    {
      city: "Sơn La",
      province: "Sơn La",
      area: "324.93",
      population: "107,282",
    },
    {
      city: "Tam Kỳ",
      province: "Quảng Nam",
      area: "92.63",
      population: "120,256",
    },
    {
      city: "Tân An",
      province: "Long An",
      area: "81.79",
      population: "166,419",
    },
    {
      city: "Thái Bình",
      province: "Thái Bình",
      area: "67.7",
      population: "270,000",
    },
    {
      city: "Thái Nguyên",
      province: "Thái Nguyên",
      area: "189.70",
      population: "330,000",
    },
    {
      city: "Thanh Hóa",
      province: "Thanh Hóa",
      area: "57.8",
      population: "197,551",
    },
    {
      city: "Trà Vinh",
      province: "Trà Vinh",
      area: "68.03",
      population: "131,360",
    },
    {
      city: "Tuy Hòa",
      province: "Phú Yên",
      area: "212.62",
      population: "167,174",
    },
    {
      city: "Tuyên Quang",
      province: "Tuyên Quang",
      area: "119.17",
      population: "110,119",
    },
    {
      city: "Uông Bí",
      province: "Quảng Ninh",
      area: "256.3",
      population: "170,000",
    },
    {
      city: "Việt Trì",
      province: "Phú Thọ",
      area: "110.99",
      population: "277,539",
    },
    {
      city: "Vinh",
      province: "Nghệ An",
      area: "104.98",
      population: "282,981",
    },
    {
      city: "Vĩnh Yên",
      province: "Vĩnh Phúc",
      area: "50.80",
      population: "122,568",
    },
    {
      city: "Vĩnh Long",
      province: "Vĩnh Long",
      area: "48.01",
      population: "147,039",
    },
    {
      city: "Vũng Tàu",
      province: "Bà Rịa–Vũng Tàu",
      area: "141.1",
      population: "327,000",
    },
    {
      city: "Yên Bái",
      province: "Yên Bái",
      area: "108.155",
      population: "95,892",
    },
    {
      city: "Cao Bằng",
      province: "Cao Bằng",
      area: "107.6",
      population: "84,421",
    },
  ]);
  const [myCity, setMyCity] = useState(user.city ? user.city : "");
  const [name, setName] = useState(user.name ? user.name : "");
  const [sex, setSex] = useState(user.sex ? user.sex : "");
  const [findSex, setFindSex] = useState(user.findSex ? user.findSex : "");
  let nameRef = useRef(null);
  const theme = useTheme();

  const ButtonOptionWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.buttonOption,
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.background.buttonOptionHover,
      opacity: 0.8,
    },
    "&.active": {
      border: "2px solid",
    },
  }));
  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: "#fd6b2229",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "#fd6b2229",
      opacity: 0.8,
    },
  }));
  const ButtonWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
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
    } else if (nameRef.current.childNodes[0].childNodes[0].value.length < 2) {
      toast.error("Vui lòng nhập tên hợp lệ");
    } else if (!checkSex(sex) || !checkSex(findSex)) {
      toast.error("Vui lòng nhập giới tính hợp lệ");
    } else {
      try {
        const checkUserInRoom = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/check-in-room`,
          {
            account: user.account,
          }
        );
        const updateUser = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/update`,
          {
            name: nameRef.current.childNodes[0].childNodes[0].value,
            sex: sex,
            findSex: findSex,
            city: myCity,
          }
        );
        toggle();
        dispatch(getUser(user.account));
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
    }
  };
  return (
    <>
      <DialogContentText>Họ tên</DialogContentText>
      <TextField size="small" fullWidth defaultValue={name} ref={nameRef} />
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
            <ItemSex
              isSelected={sex == item.key}
              key={i}
              item={item}
              onClick={() => handleChangeSex(item.key)}
            />
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

      <DialogContentText>Đang sống ở</DialogContentText>

      <Select
        fullWidth
        value={myCity}
        onChange={(e) => setMyCity(e.target.value)}
      >
        {city &&
          city.length > 0 &&
          city.map((item, i) => (
            <MenuItem value={item.province} key={i}>
              {item.province}
            </MenuItem>
          ))}
      </Select>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <ButtonWrapper
          as={motion.div}
          whileHover={{ scale: 1.02 }}
          type="submit"
          onClick={() => handleClickSubmit()}
        >
          Save
        </ButtonWrapper>
      </Box>
    </>
  );
};
export default InfoModalEdit;
