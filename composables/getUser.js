export const getUserInfo = async () => {
    try {
        const response = await fetch('http://localhost3306/userInfo');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
