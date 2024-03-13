import { api } from "./httpService";


export const createMessage = async (newMessage, userId) => {
  try {
    const postData = {
      ...newMessage,
      userId,
    };
    const response = await api.post("/contact", postData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMessages = async () => {
  try {
    const response = await api.get(`/contact`)
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

 
  
  


