

let key = 'f58d04f934fb8f4b95bc3ae7bb3fac8f';
let container = document.getElementById("container");

let iframe = document.getElementById("gmap_canvas");
let iframe1 = document.querySelector(".mapouter");

async function getWeather(){

    try{

        let city = document.getElementById("city").value;

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&time=UTC`)
        // console.log('res:', res);

        let data = await res.json();
        // console.log('data:', data);
        appendData(data)

    } catch (err) {
        console.log('err:', err);
    }

}


let lon;
let lat;

async function appendData(data){

    container.innerHTML="";

    // console.log('data:', data);

    let name = document.createElement("p");
    name.textContent = `City: ${data.name}`;

    let temp = document.createElement("p");
    temp.innerText = `Temp: ${data.main.temp} °C`;

    let min_temp = document.createElement("p");
    min_temp.textContent = `Min Temp: ${data.main.temp_min} °C`

    let max_temp = document.createElement("p");
    max_temp.textContent = `Max Temp: ${data.main.temp_max} °C`

    let wind_speed = document.createElement("p");
    wind_speed.textContent = `Wind Speed: ${data.wind.speed} m/s`

    let wind_degree = document.createElement("p");
    wind_degree.textContent = `Wind Degree: ${data.wind.deg} °`

    let clouds = document.createElement("p");
    clouds.textContent = `Clouds: ${data.clouds.all}`

    let sunrise = document.createElement("p");
    sunrise.textContent = `🌅 Sunrise: ${data.sys.sunrise}`

    let sunset = document.createElement("p");
    sunset.textContent = ` 🌇 Sunset: ${data.sys.sunset}`

    lon = data.coord.lon;
    lat = data.coord.lat;
    getforcastWeather()

    iframe.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    iframe1.style.boxShadow= "white 0px 2px 4px, white 0px 7px 13px -3px, white 0px -3px 0px, white 0px 7px 13px -3px inset";
 
    container.append(name, temp, min_temp, max_temp, wind_speed, wind_degree, clouds, sunrise, sunset);
    container.style.boxShadow= "white 0px 2px 4px, white 0px 7px 13px -3px, white 0px -3px 0px, white 0px 7px 13px -3px inset";
    // container.style.boxShadow= "white 0px 22px 70px 4px;";
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

}

async function getforcastWeather(){

    try{

        let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&appid=${key}&units=metric`)
        console.log('res1:', res);

        let forcastData = await res.json();
        console.log('forecastData:', forcastData);
        appendForecastData(forcastData)

    } catch (err) {
        console.log('err:', err);
    }

}

let ForcastDiv = document.getElementById("forcast");
async function appendForecastData(forcastData) {
    ForcastDiv.innerHTML="";

    forcastData.daily.forEach(function(el,i) {
        
        let div =document.createElement("div");

        let day = document.createElement("p");
        day.textContent=`Day ${i+1}`;

        let img = document.createElement("img");
        if(el.weather[0].description==='clear sky'){
            img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2iU2EBhgoYCDkR7rWgtx86JhiYMJ2nqA-3g&usqp=CAU";
        }
        else if(el.weather[0].description==='overcast clouds'){
            img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuNw8qy-7alqHIEwTipSzATgar2k65EepEQ&usqp=CAU";
        }
        else if(el.weather[0].description==='few clouds'){
            img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7yACYjfpT2iRBm5OWe3XYgZl_S3vjXbrfpw&usqp=CAU";
        }
        else if(el.weather[0].description==='light rain'){
            img.src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6PExICQ2caFQrc57FZWeRzCwYXq_ajGof6g&usqp=CAU";
        }
        else{
            img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYJsrFNfOCLlUQSYW0wq1jR888iO0hIkIqA&usqp=CAU ";
        }

        let max_temp = document.createElement("h2");
        max_temp.textContent=`${el.temp.max} °C`;

        let min_temp = document.createElement("p");
        min_temp.textContent=`${el.temp.min}°C`;

        div.append(day,img,max_temp,min_temp)
        ForcastDiv.append(div);
        ForcastDiv.style.boxShadow= "white 0px 2px 4px, white 0px 7px 13px -3px, white 0px -3px 0px, white 0px 7px 13px -3px inset";

    })
    
}




