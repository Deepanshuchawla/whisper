export const createAuthSlice = (set) => ({
    userInfo: undefined, // Initial state

    // Method to update userInfo in the state
    setUserInfo: (userInfo) => set({ userInfo }),
});
