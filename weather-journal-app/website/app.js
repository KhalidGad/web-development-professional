/* Global Variables */
// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
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
    getWeatherData(baseURL, zipCode, apiKey).then(
        (data) => {
            // Call post function to save data
            console.log(data);
            console.log("......................");
            postData('/add-data', { temp: data.main.temp, date: newDate, content: feeling })
        }
    )
})

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, apiKey) => {
    const result = await fetch(baseURL + zipCode + apiKey);
    try {
        const data = await result.json();
        return data;
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
}