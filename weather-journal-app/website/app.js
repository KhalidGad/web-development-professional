/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=8443ef44b9212199318e4b9182b6f917&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', (e) => {

    // Get zip code from user
    const zipCode = document.getElementById('zip').value;

    // Get user's feelings
    const feeling = document.getElementById('feelings').value;

    // Debug user inputs
    console.log(`zip : ${zipCode}`);
    console.log("feeling : ", feeling);

    // Call GET request to get data from API
    getWeatherData(baseURL, zipCode, apiKey).then(
        (data) => {
            const dataNeeded = {
                temp: data.main.temp,
                date: newDate,
                content: feeling
            };
            // Call post function to save data
            postData('/add-data', dataNeeded);

            // Update UI to present the last data that user entered
            updateUI(dataNeeded);
        }
    )
});

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

/* Function to GET Project Data */
const updateUI = async (data) => {
    // const request = await fetch('/all');
    try {
        // const allData = await request.json();
        // const last = allData.slice(-1)[0];
        document.getElementById('date').innerText = `Date: ${data.date}`;
        document.getElementById('temp').innerText = `temperature: ${data.temp}`;
        document.getElementById('content').innerText = `Today's feeling: ${data.content}`;
    }
    catch (error) {
        console.log("error: ", error);
    }
}