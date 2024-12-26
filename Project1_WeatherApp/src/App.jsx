import { useEffect, useState } from "react"
import "./App.css"

const App = () => {
  const [city, setCity] = useState({});
  const [cityName, setCityName] = useState()
  const [error, setError] = useState("")
  const apiKey = "0b079d98c0202a1b3c067b88f4ac4fbf"
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric`
  const [images, setImages] = useState("./clouds.png")

  useEffect(()=>{
    weatherApi()
  },[])
  

  const weatherApi = async()=>{

    if(!cityName){
      setError("City name is required.")
      return;
    }

    setError(null)

    try{
      let data = await fetch(apiUrl + `&q=${cityName}`);
      let json = await data.json()

      if(json.cod == "404"){
        setError("City not found.")
      }
      else{
        setCity(json)
        setCityName(json.name)
      }
      if(json?.weather[0]?.main=="Mist"){
        setImages("./mist.png")
     }
     else if(json?.weather[0]?.main=="Clouds"){
      setImages("./clouds.png")
   }
   else if(json?.weather[0]?.main=="Clear"){
    setImages("./clear.png")
 }
 else if(json?.weather[0]?.main=="Haze"){
  setImages("./drizzle.png")
}
else if(json?.weather[0]?.main=="Snow"){
  setImages("./snow.png")
}
else if(json?.weather[0]?.main=="Rain"){
  setImages("./rain.png")
}
    }
    catch(err){
      setError("An error occurred while fetching data.")
    }
  }

  const HandleInputChange = (e) =>{
    setCityName(e.target.value)
  }

  const HandleClick = () =>{
    weatherApi()
  }

  

  return(
  <div className="weather-app w-full h-screen bg-gray-700 flex items-center justify-center">
    <div className="app-container w-[400px] h-[550px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-between flex-col py-10">
      <div className="search flex justify-center items-center gap-3">
        <input type="text" className="rounded-3xl px-4 py-2 w-[300px] outline-none" value={cityName} onChange={HandleInputChange}  placeholder="enter city name"/>
        <div className="search-img  bg-white p-3 rounded-full cursor-pointer" onClick={HandleClick}>
          <img src="./search.png" alt="Search" className="w-4 "/>
        </div>
      </div>
      <div className="weather-img">
        <img src={images} alt="weather" className="w-40" />
      </div>
      {error && <p className="text-white">{error}</p>}
      <div className="temperature flex flex-col gap-4 items-center">
        <h1 className="text-white font-bold text-6xl">{Math.round(city?.main?.temp)}°C</h1>
        <h1 className="city text-white font-bold text-4xl">{city.name}</h1>
      </div>
      <div className="more-details flex items-center justify-between gap-20">
        <div className="left flex gap-2 items-center">
          <img src="./humidity.png" alt="Humidity" className="w-9"/>
          <div className="data">
            <h1 className="text-white text-sm">{city?.main?.humidity}%</h1>
            <h1 className="text-white text-sm">Humidity</h1>
          </div>
        </div>
        <div className="right flex gap-2 items-center">
        <img src="./wind.png" alt="Wind speed" className="w-9"/>
          <div className="data">
            <h1 className="text-white text-sm">{city?.wind?.speed}Km/h</h1>
            <h1 className="text-white text-sm">Wind Speed</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default App;