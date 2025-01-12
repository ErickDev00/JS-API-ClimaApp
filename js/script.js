// 2ac53a8da6cbe96a2d98b9ffa839431f


// Variaveis e seleção de Elementos 
const apiKey = "2ac53a8da6cbe96a2d98b9ffa839431f";
const apiCountryURL = "https://countryflagsapi.com/png/";

const apiUnsKey = "T-SYDy5yGsdZBvT48phcPDm8xHNOphaCKLMGPHeat5I";





const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#busca");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperatura span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMensage = document.getElementById("errorMensage");





// Funções

const getWeatherData = async(city) => {

  errorMensage.classList.add("hide")

  //exibindo spinner
  document.getElementById('spinner').style.display = 'block';


  try {
  

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);

    
    if (!res.ok){
      throw new Error('Não foi possível encontrar uma cidade com este nome!')
   }

    const data = await res.json();
    console.log(data);

    //esconde o spinner
    document.getElementById('spinner').style.display = 'none';

    return data;

  } catch (erro) {
      //errorMensage.classList.remove("hide"); 
      //errorMensage.textContent = "a";

      errorMensage.classList.remove("hide");
      //errorMensage.textContent = erro.message;

  }

  

}


const showWeatherData = async (city) => {
  
  //const apiUnsplash = `https://source.unsplash.com/1600x900/?${city}`;
  
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");


    //document.body.style.backgroundImage = `url("${apiUnsplash}")`;

    

}


async function backImage(){

  const cidade = document.getElementById("city-input".value)

  const url = `https://api.unsplash.com/photos/random?query=${cidade}&client_id=${apiUnsKey}`;

  try{

    const res = await fetch(url);
    const pictures = await res.json();
  


    if (pictures.length > 0){

      const fotoCity = pictures[0].urls.regular;



      document.body.style.backgroundImage = `url(${fotoCity})`;   
      console.log(fotoUrl);

    } else {
      console.log("nenhuma foto encontrada para a cidade.");
    }


  } catch (erro) {
    console.log("erro ao buscar a foto", erro);
}

};







// Eventos
searchBtn.addEventListener("click", (e) =>{
  e.preventDefault();

  const city = cityInput.value;


  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {

  if(e.code === "Enter"){
    const city = e.target.value;

    showWeatherData(city);
  }

})




