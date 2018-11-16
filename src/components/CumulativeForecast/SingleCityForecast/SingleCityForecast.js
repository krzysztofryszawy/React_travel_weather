import React from 'react';
import styles from './SingleCityForecast.module.css';




 const singleCityForecast = (props) => {

     
//condition passed by API => translation on PL
    let translatedConditionID=null
    if (props.conditionID <= 500) translatedConditionID = '☀ SŁONECZNIE'
    if (props.conditionID > 500) translatedConditionID = '🌧 DESZCZOWO'

     
    return (
      <div className={props.color
                ? styles['SingleCityForecast'] 
                : [styles['SingleCityForecast'], styles['colored']].join(' ')}
            onClick={() => props.getActualClickedDataHandler(props.dt, props.singleCityName, props.databaseName)}>
          <div style = { props.singleCityName ? {color: '#b89a6a'} : {color: 'red'}} className={styles['singleCityCountry']}>{props.singleCityCountry}: {props.singleCityName}</div>
          <div className={styles['singleDate']}>📆 {props.dt_txt.substr(0, 16)}</div>
          <div className={styles['singleTemperature']}>🌡temp {Math.ceil(props.temperature)}°C</div>
          <div className={styles['singleConditionID']}>{translatedConditionID}</div>
      </div>
    );
  }


export default singleCityForecast;



