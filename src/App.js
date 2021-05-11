// url="https://disease.sh/v3/covid-19/countries"
import React, { useEffect, useState } from "react"
import './App.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from "./Table"
import "leaflet/dist/leaflet.css"


function App() {

  const [countries,setCountries]=useState(["India","usa","uk"])
  const [country,setCountry]=useState("worldwide")
  const [countryInfo,setCountryInfo]=useState({})
  const [tableData,setTableData]=useState([])
  const [mapCenter,setMapCenter]=useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom,setMapZoom]=useState(3)
  const [mapCountry,setMapCountry]=useState([])

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data)
    })
  },[])

  useEffect(()=>{
    const countriesData=async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=>{
        const countries=data.map((country)=>({
          name:country.country,
          value:country.countryInfo.iso2
        }))
      setTableData(data)
      setMapCountry(data)
      setCountries(countries)
      })
    }
    countriesData()
  },[countries])

  const countryChange=async (e)=>{
    const countryCode=e.target.value

    const url=
    countryCode==="worldwide"
    ?"https://disease.sh/v3/covid-19/all"
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      setCountry(countryCode)
      setCountryInfo(data)
      setMapCenter([data.countryInfo.lat,data.countryInfo.long])
      setMapZoom(7)
    }) 
  }
  return (
    <>
    
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>Covid tracker app</h1>
            <FormControl class="app__dropdown">
              <Select varient="outlined"  value={country} onChange={countryChange}>

                <MenuItem value="worldwide">worldwide</MenuItem>
                  {countries.map((country)=>(
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                
                
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            <InfoBox title="coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
            <InfoBox title="recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
            <InfoBox title="deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          </div>
          <Map countries={mapCountry} center={mapCenter} zoom={mapZoom} />
        </div>
        <Card className="app__right">
          <CardContent>
            <h2>live cases by country</h2>
            <Table countries={tableData}/>
          </CardContent>
          {/* <Graph>
          <Table> */}
        </Card>
      </div>
      
    </>
  )
}

export default App;
