export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],
  directMessagesContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,
  channels: [],
  setChannels: (channels) => set({ channels }),

  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress) =>
    set({ fileDownloadProgress }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),

  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessage: [],
    }),

  setSelectedChatMessages: (selectedChatMessage) =>
    set({ selectedChatMessage }),
  setDirectMessagesContacts: (directMessagesContacts) =>
    set({ directMessagesContacts }),

  addMessage: (message) => {
    const selectedChatMessage = get().selectedChatMessage;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id, // Assuming recipient is an object with _id
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id, // Assuming sender is an object with _id
        },
      ],
    });
  },

  addChannel: (channel) => {
    const channels = get().channels;
    set({ channels: [channel, ...channels] });
  },

  addChannelInChannelList: (message) => {
    const channels = get().channels; // Retrieve the current list of channels

    // Find the channel that matches the message's channelId
    const channelToMove = channels.find(
      (channel) => channel._id.toString() === message.channelId.toString()
    );

    if (channelToMove) {
      // Remove the channel from its current position
      const updatedChannels = channels.filter(
        (channel) => channel._id.toString() !== message.channelId.toString()
      );

      // Add the channel to the beginning of the list
      updatedChannels.unshift(channelToMove);

      // Update the channel list with the new order
      set({ channels: updatedChannels });
    }
  },
  addContactsInDMContacts: (message) => {
    const userId = get().userInfo.id;
    
    // Determine who the other participant in the DM is
    const fromId =
      message.sender._id.toString() === userId.toString()
        ? message.recipient._id.toString()
        : message.sender._id.toString();
    
    // Get the contact data of the participant in the DM
    const fromData =
      message.sender._id.toString() === userId.toString()
        ? message.recipient
        : message.sender;
    
    const dmContacts = get().directMessagesContacts;
    
    console.log('UserId:', userId);
    console.log('FromId:', fromId);
    console.log('FromData:', fromData);
    console.log('Current DM Contacts:', dmContacts);
    
    // Find the contact in the current DM contacts
    const existingContactIndex = dmContacts.findIndex((contact) => contact._id.toString() === fromId);
    
    console.log('Existing Contact Index:', existingContactIndex);
    
    if (existingContactIndex !== -1) {
      // If contact is already in the list, remove it
      const [contact] = dmContacts.splice(existingContactIndex, 1);
      // Add it to the beginning of the list
      dmContacts.unshift(contact);
    } else {
      // If contact is not in the list, add it to the beginning
      dmContacts.unshift(fromData);
    }
    
    console.log('Updated DM Contacts:', dmContacts);
    
    // Update the state with the new list of DM contacts
    set({ directMessagesContacts: dmContacts });
  },
  
});
