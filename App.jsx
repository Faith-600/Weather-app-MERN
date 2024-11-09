import { useEffect, useState,useRef } from "react"

function App() {
  const inputRef = useRef()
  const [weatherData,setWeatherData] = useState(false)
 
 const search = async (city)=>{
  if(!city){
   alert("Enter City Name")
   return 
  }
  try{
    const API_KEY = import.meta.env.VITE_API_KEY;
    console.log("API Key:", API_KEY)
 const url= `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&units=metric&appid=${API_KEY}`
const response =await fetch(url)
const data =await response.json()
if(!response.ok){
alert(data.message)
return
}
console.log(data) 
setWeatherData({
  humidity:data.main.humidity,
  windspeed:data.main.speed,
  temperature: Math.floor(data.main.temp),
  location:data.name,
  country:data.country,

  

}) 
}
  catch(error){
    setWeatherData(false)
    console.error("Error in fetching weather data")
}
 }


  return (
    <>
    <h1 className="weather">Weather App</h1>
       <div className="mainbtn">
        <input type='text' ref={inputRef} placeholder="Enter city Name" />
     <button onClick={()=>search(inputRef.current.value)}>submit</button>
 </div>
 {weatherData?<>
    <p>{weatherData.humidity}</p>
     <p>{weatherData.temperature}<span>{`\u00B0`}C</span> 
     </p>
     <p>{weatherData.location}</p>
     <p>{weatherData.country}</p>
     
  
    </>: <></>}
    </>
  )
}

export default App
