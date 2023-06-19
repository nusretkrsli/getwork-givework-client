import { api } from "./httpService";


const createMessage = async (newMessage, userId) => {

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

export default createMessage;