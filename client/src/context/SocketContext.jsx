import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { userInfo, addContactsInDMContacts } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        try {
          const { selectedChatType, selectedChatData, addMessage } =
            useAppStore.getState();

          if (
            (selectedChatType !== undefined &&
              selectedChatData._id === message.sender._id) ||
            selectedChatData._id === message.recipient._id
          ) {
            addMessage(message);
          }
          addContactsInDMContacts(message);
        } catch (error) {
          console.error(error);
        }
      };

      const handleReceiveChannelMessage = (message) => {
        // console.log(message);
        try {
          const {
            selectedChatType,
            selectedChatData,
            addMessage,
            addChannelInChannelList,
          } = useAppStore.getState();
          if (
            selectedChatType !== undefined &&
            selectedChatData._id === message.channelId
          ) {
            addMessage(message);
          }
          addChannelInChannelList(message);
        } catch (error) {
          console.error(error);
        }
      };

      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);

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
