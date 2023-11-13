
import axios from "axios";

const url = "http://192.168.1.75:8000";

export const getSuggestions = async (movieName) => {
    try {
      const response = await axios.post(`${url}/suggestion/`, {
        name: movieName,
      });
  
      
      const suggestions = response.data.suggestions;
      return suggestions;
    } catch (error) {
      
      console.error("Erro ao pegar as sugestoes de filme", error);
      throw error;
    }
  };
  
  
  
  
  
  