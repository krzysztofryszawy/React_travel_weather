import React from 'react';
import styles from './MainContainer.module.css';
import CumulativeForecast from '../../components/CumulativeForecast/CumulativeForecast'



 const mainContainer = () => {
    
    
    return (
      <div className={styles['MainContainer']}>
          <CumulativeForecast/>
      </div>
    );
  }


export default mainContainer;
