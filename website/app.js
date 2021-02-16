/* Global Variables */
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?zip=";

const API_KEY = "&units=imperial&appid=c28ff9ea1c7404061e2d5beb52e773cb";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", onClick);

/* Function called by event listener */
function onClick(event) {
    const zipcodeElement = document.getElementById("zip");
    const zipcode = zipcodeElement.value;

    if (zipcodeElement!== null && zipcode === "") {
        zipcodeElement.classList.toggle("empty");
        console.log("toggle on");
    } else {
        zipcodeElement.classList.toggle("empty");
        
        getWeather(BASE_URL, zipcode, API_KEY)
            .then(function (data) {
                console.log("Inside .then()");
                console.log(data);

                const newEntry = {
                    temp: data.main.temp.toFixed(0),
                    date: newDate,
                    content: document.getElementById("feelings").value
                };

                postWeather("/addData", newEntry);
            })
            .then(updateUI);
    }
}

/* Function to GET Web API Data*/
const getWeather = async (url, zip, key) => {
    const res = await fetch(url + zip + key);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


/* Function to GET Project Data to update UI */
const updateUI = async () => {
    const req = await fetch("/getData");

    try {
        const projData = await req.json();
        document.getElementById("date").innerHTML = projData.date;
        document.getElementById("temp").innerHTML = projData.temp + "&deg;F";
        document.getElementById("content").innerHTML = projData.content;
    } catch (error) {
        console.log("error", error);
    }
}
