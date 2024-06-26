import failAlert from "~/components/alert/FailAlert";
import axios from 'axios';
const getHistory = async () => {
  const url = `http://localhost:8686/api/history`;
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data.body;
  } catch (error) {
    console.error(error);
    failAlert("Loading...");
    throw error;
  }
};

export default getHistory;
