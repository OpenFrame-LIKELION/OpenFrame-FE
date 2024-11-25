import api from "../utils/customAxios";

// Chat API 함수 정의
const chatApi = {
    // GET /v1/api/chat
    getChat: (keyword, type) => api.get("/chat", { params: { keyword, type } }),

    // POST /v1/api/chat
    createChat: (data) => api.post("/chat", data),

    // GET /v1/api/chat/{chatId}/memo
    getChatMemos: (chatId) => api.get(`/chat/${chatId}/memo`),

    // POST /v1/api/chat/{chatId}/memo
    createMemo: (chatId, data) => api.post(`/chat/${chatId}/memo`, data),

    // PUT /v1/api/chat/{chatId}/memo/{memoId}
    updateMemo: (chatId, memoId, data) =>
        api.put(`/chat/${chatId}/memo/${memoId}`, data),

    // DELETE /v1/api/chat/{chatId}/memo/{memoId}
    deleteMemo: (chatId, memoId) =>
        api.delete(`/chat/${chatId}/memo/${memoId}`),

    // GET /v1/api/chat/{chatId}/index
    getChatIndexes: (chatId) => api.get(`/chat/${chatId}/index`),

    // POST /v1/api/chat/{chatId}/index
    createIndex: (chatId, data) => api.post(`/chat/${chatId}/index`, data),

    // PUT /v1/api/chat/{chatId}/index/{indexId}
    updateIndex: (chatId, indexId, data) =>
        api.put(`/chat/${chatId}/index/${indexId}`, data),

    // DELETE /v1/api/chat/{chatId}/index/{indexId}
    deleteIndex: (chatId, indexId) =>
        api.delete(`/chat/${chatId}/index/${indexId}`),
};

export default chatApi;
