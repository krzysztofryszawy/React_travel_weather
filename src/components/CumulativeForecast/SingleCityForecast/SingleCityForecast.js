import React from 'react';
import styles from './SingleCityForecast.module.css';




 const singleCityForecast = (props) => {

     
//condition passed by API => translation on PL
    let translatedConditionID=null
    if (props.conditionID <= 500) translatedConditionID = '☀ SŁONECZNIE'
    if (props.conditionID > 500) translatedConditionID = '🌧 DESZCZOWO'

     
     
    return (
      <div className={styles['SingleCityForecast']}>
         
          <div className={styles['singleCityCountry']}>{props.singleCityCountry}: {props.singleCityName}</div>
          <div className={styles['singleDate']}>date: {props.date}</div>
          <div className={styles['singleTemperature']}>temp {props.temperature} Celsius</div>
          <div className={styles['singleConditionID']}>{translatedConditionID}</div>
      </div>
    );
  }


export default singleCityForecast;



