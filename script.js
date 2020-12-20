const APIKEY ="3906c75cece2114ae96cd39e5fc1d386";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


const url =(city)=> 
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`

async function getWeatherByLocation(city){
    const resp =await fetch(url(city),{origin:"cors"});
    const respData = await resp.json();

    console.log(respData);

    addWeathertoPage(respData);
}
function addWeathertoPage(data){
    const temp = KtoC(data.main.temp);
    const humid = data.main.humidity;

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML=`
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    <small>${data.weather[0].main}</small>
    `;

// cleanup
main.innerHTML = "";

main.appendChild(weather);
}
function KtoC(k){
    return Math.floor(k-273.15);
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const city =search.value;

    if(city){
        getWeatherByLocation(city);
    }
});