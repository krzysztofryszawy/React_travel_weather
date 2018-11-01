import React, { Component } from 'react';
import styles from './CumulativeForecast.module.css';
import SingleCityForecast from './SingleCityForecast/SingleCityForecast'

import axios from 'axios'


    class cumulativeForecast extends Component {
    
        state = {
            singleCityDatabase: {
                name: 'Krakow',
                temp: 22
            },
        }
        




//              <div className={styles['CumulativeForecast']}>
//                     <h1>CumulativeForecast</h1>
//                     
//                          
//                    {this.state.singleCityDatabase.map(city => {                               
//                            return(
//                            <SingleCityForecast >
//                                city
//                            </SingleCityForecast>
//                            )
//                        }
//                    )}
//              </div>


        
        render () {

            return (
                 <div className={styles['CumulativeForecast']}>
                    <h1>CumulativeForecast</h1>
                    <SingleCityForecast/>
                </div>    
            )
        }

    }

export default cumulativeForecast;
