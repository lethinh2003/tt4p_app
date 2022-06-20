import React, { useState, useEffect } from "react";
import SocketContext from "./socket";
import socketIOClient from "socket.io-client";
import { useSession } from "next-auth/react";

const SocketProvider = (props) => {
  const { data: session, status } = useSession();
  const [value, setValue] = useState();
  useEffect(() => {
    if (status === "authenticated") {
      socketInitializer();
      console.log("conect nek");
    }

    return () => {
      if (value) {
        console.log("huy conect nek");
        value.disconnect();
      }
    };
  }, [status]);
  const socketInitializer = () => {
    const socket = socketIOClient.connect(process.env.ENDPOINT_SERVER);
    console.log("conect nek");
    setValue(socket);
  };
  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
