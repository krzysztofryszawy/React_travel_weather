import React from 'react';
import styles from './SingleCityForecast.module.css';




 const singleCityForecast = (props) => {

     
//condition passed by API => translation on PL
    let translatedConditionID=null
    if (props.conditionID >= 200) translatedConditionID = '🌩 ⛈ Thunderstorm'
    if (props.conditionID >= 300) translatedConditionID = '🌦 Drizzle'
    if (props.conditionID >= 500) translatedConditionID = '🌧 Rain'
    if (props.conditionID >= 600) translatedConditionID = '🌨 Snow'
    if (props.conditionID >= 700) translatedConditionID = '🌫 Atmosphere'
    if (props.conditionID == 800) translatedConditionID = '☀ Clear'
    if (props.conditionID > 800) translatedConditionID = '☁ Clouds'
     
    return (
      <div className={props.color
                ? styles['SingleCityForecast'] 
                : [styles['SingleCityForecast'], styles['colored']].join(' ')}
            onClick={() => props.getActualClickedDataHandler(props.dt, props.singleCityName, props.databaseName)}>
          <div className={styles['singleCityCountry']}>{props.singleCityCountry}: {props.singleCityName}</div>
          <div className={styles['singleDate']}>📆{props.dayOfWeek} 🕙{props.dt_txt.substr(5, 11)}</div>
          <div className={styles['singleTemperature']}>🌡temp {Math.ceil(props.temperature)}°C</div>
          <div className={styles['singleConditionID']}>{translatedConditionID}</div>
      </div>
    );
  }


export default singleCityForecast;



