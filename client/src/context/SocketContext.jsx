import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext); // Fix: use the correct context name (SocketContext)
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null); // Initialize with null
  const { userInfo} =
    useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleRecieveMessage = (message) => {
        try {
          const {selectedChatType, selectedChatData, addMessage } = useAppStore.getState();

          if (
            (selectedChatType !== undefined &&
              selectedChatData._id === message.sender._id) ||
            selectedChatData._id === message.recipient._id
          ) {
            console.log("message recieved", message);
            addMessage(message);
          }
        } catch (erro) {
          console.log(erro);
        }
      };

      socket.current.on("receiveMessage", handleRecieveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
