import { DialogContentText } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const TimeCountRequestInfo = ({ toggle, socket }) => {
  const timeCancelRequest = useRef(null);
  const [timeRemain, setTimeRemain] = useState(10);

  useEffect(() => {
    timeCancelRequest.current = setInterval(() => {
      if (timeRemain < 1) {
        if (socket) {
          socket.emit("notify-request-info-partner", {
            status: "fail",
            message:
              "Đối phương đã từ chối cho info, cố gắng xin lại nha bạnnn!!",
          });
        }

        clearInterval(timeCancelRequest.current);
        toggle();
      } else {
        setTimeRemain((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timeCancelRequest.current);
  }, [timeRemain]);

  return (
    <DialogContentText
      sx={{
        textAlign: "center",
      }}
    >
      Tự động từ chối sau {timeRemain} giây nữa
    </DialogContentText>
  );
};
export default TimeCountRequestInfo;
