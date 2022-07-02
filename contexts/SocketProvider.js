import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import SocketContext from "./socket";
const SocketProvider = (props) => {
  // const dispatch = useDispatch();
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
    const socket = io(process.env.ENDPOINT_SERVER, {
      auth: {
        token: `Bearer ${session.user.access_token}`,
      },
    });

    socket.on("connect_error", (err) => {
      console.log("error", err);
      toast.error(err.message);
      // signOut();
    });

    setValue(socket);
  };
  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
