import axios from "axios";
const saveChoice = (input, output, type) => {
  try {
    console.log({ input: input, output: output, type: type });
    const response = axios.post(
      "http://localhost:8686/api/assistant/save",
      { input: input, output: output, type: type },
      {
        method: "POST",
        withCredentials: true,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.data.response);
  }
};

export default saveChoice;
