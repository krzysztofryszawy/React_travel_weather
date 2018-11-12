import React from 'react';
import styles from './SingleCityForecast.module.css';




 const singleCityForecast = (props) => {

     
//condition passed by API => translation on PL
    let translatedConditionID=null
    if (props.conditionID <= 500) translatedConditionID = '☀ SŁONECZNIE'
    if (props.conditionID > 500) translatedConditionID = '🌧 DESZCZOWO'

     
    return (
      <div className={styles['SingleCityForecast']}
         onClick={() => props.getActualClickedData(props.dt, props.singleCityName)}>
          <div className={styles['singleCityCountry']}>{props.singleCityCountry}: {props.singleCityName}</div>
          <div className={styles['singleDate']}>📆 {props.dt_txt.substr(0, 16)}</div>
          <div className={styles['singleTemperature']}>🌡temp {Math.ceil(props.temperature)}°C</div>
          <div className={styles['singleConditionID']}>{translatedConditionID}</div>
      </div>
    );
  }


export default singleCityForecast;



