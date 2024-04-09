import { userStore } from "~/store/userStore";

export const submitUser = async () => {
    try {
      const userInfo = userStore();
      const user = userInfo.userInfo;
  
      const response = await fetch("http://localhost:3306/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          user,
        }),
      });
  
      if (response.ok) {
        $router.push('/');
      } else {
        console.log("Error occurred:", response.statusText);
      }
  
      return { data: await response.json() }; 
    } catch (error) {
      console.error("Error in submitUser:", error);
      throw error; 
    }
  };