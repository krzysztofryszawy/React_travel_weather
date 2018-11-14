import React from 'react';
import styles from './SingleCityForecast.module.css';




 const singleCityForecast = (props) => {

     
//condition passed by API => translation on PL
    let translatedConditionID=null
    if (props.conditionID <= 500) translatedConditionID = '☀ SŁONECZNIE'
    if (props.conditionID > 500) translatedConditionID = '🌧 DESZCZOWO'

     
    return (
      <div className={styles['SingleCityForecast']} 
            style = { props.color ? {backgroundColor:'#F5F5F5'} : {backgroundColor:'none'}}
            onClick={() => props.getActualClickedDataHandler(props.dt, props.singleCityName, props.databaseName)}>
          <div className={styles['singleCityCountry']}>{props.singleCityCountry}: {props.singleCityName}</div>
          <div className={styles['singleDate']}>📆 {props.dt_txt.substr(0, 16)}</div>
          <div className={styles['singleTemperature']}>🌡temp {Math.ceil(props.temperature)}°C</div>
          <div className={styles['singleConditionID']}>{translatedConditionID}</div>
      </div>
    );
  }


export default singleCityForecast;



