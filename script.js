let snow=new Audio('snow.mp3');
let rain=new Audio('rain.mp3');
let clear=new Audio('clear.mp3');
let mistWind=new Audio('mistAud.mp3');
var bgvid=document.getElementById('bgvid');

var yourCity;
async function checkWeather(){
    var img=document.getElementById('image');
    var cont=document.getElementById('cont-con');
    console.log('weather');
    
    var city=document.getElementById('search-text').value;
    console.log(city);
    if(city===""){
        console.log("empty");
        console.log(yourCity);
        city=yourCity;
        document.getElementById('search-text').value=yourCity;
    }
    api_key="6b7721153d83fadb9e32b31cddefd570";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data= await fetch(`${url}`).then(response=>response.json());
    console.log(weather_data);
    
    if(weather_data.cod===`404`){
        console.log("error");
        alert("Soory, Location not found!!!");
        return
    }
    cont.style.display="block";
    document.getElementById('img-deg').innerHTML=`${Math.round(weather_data.main.temp - 273.15)}`;
    document.getElementById('img-det-txt').innerHTML=`${weather_data.weather[0].description}`
    document.getElementById('wind-speed').innerHTML=`${weather_data.wind.speed}`;
    document.getElementById('humid').innerHTML=`${weather_data.main.humidity}`;
    console.log('here');
    console.log(weather_data.weather[0].main);
    switch(weather_data.weather[0].main){
        case 'Mist':
            console.log("Inf");
            img.src="mist2.png" 
            console.log(img); 
            snow.pause();
            rain.pause();
            clear.pause();
            mistWind.play();
            mistWind.play();
            bgvid.src="mist4.mp4";
            //varanasi
            break;
        case 'Clear':
            img.src="clear.png"
            mistWind.pause();
            snow.pause();
            rain.pause();
            bgvid.src="birdBackgroundFinal.mp4";
            clear.play();
            //USA argentina
            break;
        case 'Clouds':
            img.src="cloud.png"
            // bgvid.src="rainBackground.mp4";
            bgvid.src="birdBackgroundFinal.mp4";
            mistWind.pause();
            snow.pause();
            rain.pause();
            clear.play();
            //china
            break;
        case 'Haze':
            img.src="rain.png"
            snow.pause();
            clear.pause();
            mistWind.pause();
            rain.play();
            bgvid.src="rainBackground.mp4";
            break;
            //mumbai and powai
        case 'Snow':
            img.src="snow.png"
            clear.pause();
            mistWind.pause();
            rain.pause();
            snow.play();
            bgvid.src="snowBackground.mp4";
            break;

    }
}

async function myfunction(){
    var city=document.getElementById('search-text').value;
    api_key="6b7721153d83fadb9e32b31cddefd570";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data= await fetch(`${url}`).then(response=>response.json());
    console.log('hello');
    var sel=document.getElementById('select').value;
    console.log(sel);
    if(sel==='select'){
        console.log("in if");
        document.getElementById('sel-txt').innerHTML="";
    }else{
        if(sel==='pressure'){
            document.getElementById('sel-txt').innerHTML=`${weather_data.main.pressure} P`
        }
        if(sel==='visibility'){
            document.getElementById('sel-txt').innerHTML=`${weather_data.visibility} visibility`;
        }
        
    }
}
function getDetails(){
    checkWeather();
}










function findMyCoordinates() {
    console.log("IN findMyCord");
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude)
      },
      (err) => { 
        alert(err.message)
      })
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }
  function getWeather(lat, lon){
    console.log('getWeather');
    console.log(lat);
    console.log(lon);
    // const endpoint1=`https://api-bdc.net/data/reverse-geocode-client?latitude=-34.${lat}&longitude=${lon}`
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=16a2314e91b166c8c3c5b3c33539f22b`;
    // getApi(endpoint1);
    fetch(endpoint)
  
    .then(response => {
      if (response.status !== 200) throw Error(response.statusText);
      return response.json();
    })
    .then(data => {
    console.log("success");
      console.log(data);
      console.log(data.name);
      yourCity=data.name;
    })
    .catch(error => console.log(error));
  }
  window.onload = function(){
    findMyCoordinates()
  }  
  
  var c=1;
  function openBgOpt(){
    var ele=document.getElementById('opt');
    if(c==1){
      ele.style.display="block";
      c=0;
    }else{
      ele.style.display="none";
      c=1;
    }
    
  }

  function chngBgImg(c){
    console.log(c);
    console.log(bgvid);
    if(c===1){
      bgvid.poster="bg1.png";
    }else if(c===2){
      console.log("in of 2");
      bgvid.poster="bg2.png";
    }else if(c===3){
      bgvid.poster="bg3.png";
    }else if(c===4){
      bgvid.poster="bg4.png";
    }else if(c===21){
      bgvid.src="mist4.mp4";
    }else if(c===22){
      console.log('22');
      bgvid.src="birdBackgroundFinal.mp4";
    }else if(c===23){
      bgvid.src="rainBackground.mp4";
    }else if(c===24){
      bgvid.src="snowBackground.mp4";
    }else{
      bgvid.poster="none.png";
      bgvid.src="none.mp4"; 
    }
    document.getElementById('opt').style.display="none";
  }

  