import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const InfoDetail = ({ setStep, setInfo, info }) => {
  const [city, setCity] = useState([]);
  const [mySex, setMySex] = useState(info.mySex ? info.mySex : "");
  const [findSex, setFindSex] = useState(info.findSex ? info.findSex : "");
  const [cityLive, setCityLive] = useState(info.cityLive ? info.cityLive : "");
  const [error, setError] = useState({
    mySex: false,
    findSex: false,
    cityLive: false,
  });
  const getCities = async () => {
    try {
      const data = await axios.get("/api/city");
      setCity(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCities();
  }, []);
  const onSubmit = () => {
    if (mySex && findSex && cityLive) {
      setInfo((prev) => ({
        ...prev,
        mySex: mySex,
        findSex: findSex,
        cityLive: cityLive,
      }));
      setStep(6);
    } else {
      setError((prev) => ({
        ...prev,
        mySex: mySex == false,
        findSex: findSex == false,
        cityLive: cityLive == false,
      }));
    }
  };

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
  const ButtonOptionWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: "#fd6b2229",
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#fd6b2229",
      opacity: 0.8,
    },
    "&.active": {
      border: "2px solid",
    },
  }));
  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });
  const ErrorContent = styled(Typography)({
    fontWeight: "400",
    fontSize: "0.75rem",
    lineHeight: 1.66,
    textAlign: "left",
    margin: "4px 14px 0 14px",
    color: "#f44336",
  });

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "15px",
        }}
        onSubmit={onSubmit}
      >
        <FormControl
          variant="standard"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LabelInput>Giới tính của bạn</LabelInput>
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
                <ButtonOptionWrapper
                  as={motion.div}
                  whileHover={{ scale: 1.02 }}
                  className={mySex == item.key ? "active" : null}
                  onClick={() => setMySex(item.key)}
                  key={i}
                >
                  <Image
                    src={item.img}
                    alt="Picture of the author"
                    width={40}
                    height={40}
                  />
                </ButtonOptionWrapper>
              ))}
          </Box>
          {error.mySex && (
            <ErrorContent>Vui lòng chọn giới tính của bạn</ErrorContent>
          )}
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LabelInput>Bạn muốn tìm ai</LabelInput>
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
                <ButtonOptionWrapper
                  as={motion.div}
                  whileHover={{ scale: 1.02 }}
                  className={findSex == item.key ? "active" : null}
                  onClick={() => setFindSex(item.key)}
                  key={i}
                >
                  <Image
                    src={item.img}
                    alt="Picture of the author"
                    width={40}
                    height={40}
                  />
                </ButtonOptionWrapper>
              ))}
          </Box>
          {error.findSex && (
            <ErrorContent>Vui lòng chọn giới tính muôn tâm sự</ErrorContent>
          )}
        </FormControl>

        <FormControl
          variant="standard"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LabelInput>Thành phố bạn đang sống</LabelInput>
          <Select
            value={cityLive}
            onChange={(e) => setCityLive(e.target.value)}
          >
            {city &&
              city.length > 0 &&
              city.map((item, i) => (
                <MenuItem value={item.city} key={i}>
                  {item.city}
                </MenuItem>
              ))}
          </Select>
          {error.cityLive && (
            <ErrorContent>Vui lòng chọn thành phố của bạn</ErrorContent>
          )}
        </FormControl>
        <Box
          as={motion.div}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
          }}
          whileHover={{ scale: 1.02 }}
        >
          <Button type="submit" onClick={onSubmit}>
            Next
          </Button>
        </Box>
      </form>
    </>
  );
};
export default InfoDetail;
