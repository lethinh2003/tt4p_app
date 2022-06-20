import { DialogContentText, MenuItem, Select } from "@mui/material";
import { memo } from "react";
import useCity from "../../utils/useCity";

const InfoEditCity = ({ myCity, setMyCity }) => {
  const { city } = useCity();

  return (
    <>
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
    </>
  );
};
export default memo(InfoEditCity);
