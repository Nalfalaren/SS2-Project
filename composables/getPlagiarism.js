import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
import axios from "axios";

const getPlagiarismCheck = (params) => {
    console.log(params);
    console.log({text : params});
    const url = `http://localhost:8686/api/assistant/plagiarism-checker`;
    
    return axios.post(
        url,
        {"text" : params}, 
        {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
    )
    .then(response => {
        console.log(response.data.body);
        return response.data.body;
    })
    .catch(error => {
        console.error(error);
        failAlert("Please wait for a minute before trying again!");
        throw error;
    });
};

export default getPlagiarismCheck;

