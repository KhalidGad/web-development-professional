/* Global Variables */
// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=';
let apiKey = '&appid=8443ef44b9212199318e4b9182b6f917';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', (e) => {

    // Get zip code from user
    const zipCode = document.getElementById('zip').value;

    // Get user's feelings
    const feeling = document.getElementById('feelings').value;

    console.log(`zip : ${zipCode}`);
    console.log("feeling : ", feeling);

    // Call our GET request to get data from API
    getWeatherData(baseURL, zipCode, apiKey);
})

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, apiKey) => {
    const result = await fetch(baseURL + zipCode + apiKey);
    try {
        const data = await result.json();
        console.log(data);
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
}
