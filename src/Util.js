import React from "react"
// import numeral from "numeral"
import {Circle,Popup} from "react-leaflet"

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 1000,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 2200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 3000,
    },
  };



//draw circle on the map
export const showDataOnMap=(data,caseType="cases")=>(
    data.map((country)=>(
        <Circle
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[caseType].hex}
        fillColor={casesTypeColors[caseType].hex}
        radius={
            Math.sqrt(country[caseType]*casesTypeColors[caseType].multiplier)
        }
        >
        <Popup>
            <div className="info-container">
                <div
                    className="info-flag"
                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                ></div>
                <div className="info-name">{country.country}</div>
                <div className="info-confirmed">
                    Cases: {country.cases}
                </div>
                <div className="info-recovered">
                    Recovered: {country.recovered}
                </div>
                <div className="info-deaths">
                    Deaths: {country.deaths}
                </div>
            </div>
        </Popup>

        </Circle>
    ))
)