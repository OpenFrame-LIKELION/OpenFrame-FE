import api from "../utils/customAxios";

export const getChats = async (keyword) => {
    try {
        const response = await api.get("/chat", {
            params: { keyword },
        });
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getChatMemos = async (chatId) => {
    try {
        const response = await api.get(`/chat/${chatId}/memo`);
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createChatMemo = async (chatId, memoData) => {
    try {
        const response = await api.post(`/chat/${chatId}/memo`, memoData);
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateChatMemo = async (chatId, memoId, memoData) => {
    try {
        const response = await api.put(
            `/chat/${chatId}/memo/${memoId}`,
            memoData
        );
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteChatMemo = async (chatId, memoId) => {
    try {
        const response = await api.delete(`/chat/${chatId}/memo/${memoId}`);
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getChatIndexes = async (chatId) => {
    try {
        const response = await api.get(`/chat/${chatId}/index`);
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createChatIndex = async (chatId, indexData) => {
    try {
        const response = await api.post(`/chat/${chatId}/index`, indexData);
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateChatIndex = async (chatId, indexId, indexData) => {
    try {
        const response = await api.put(
            `/chat/${chatId}/index/${indexId}`,
            indexData
        );
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteChatIndex = async (chatId, indexId) => {
    try {
        const response = await api.delete(`/chat/${chatId}/index/${indexId}`);
        return response.data.payload;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
