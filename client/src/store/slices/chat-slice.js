export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],
  
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  
  closeChat: () => set({
    selectedChatData: undefined,
    selectedChatType: undefined,
    selectedChatMessage: [],
  }),
  
  setSelectedChatMessages: (selectedChatMessage) => set({ selectedChatMessage }),
  
  addMessage: (message) => {
    const selectedChatMessage = get().selectedChatMessage;
    const selectedChatType = get().selectedChatType;  // Corrected this line

    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,  // Assuming recipient is an object with an _id field
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,  // Assuming sender is an object with an _id field
        },
      ],
    });
  },
});
