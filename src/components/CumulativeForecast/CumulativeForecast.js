import React, { Component } from 'react';
import styles from './CumulativeForecast.module.css';
import SingleCityForecast from './SingleCityForecast/SingleCityForecast'
import Spinner from '../UI/Spinner/Spinner'

import axios from 'axios'


class cumulativeForecast extends Component {
    
    componentDidMount() {
        this.getDefaultCityDatabase()
    }
    
    state = {
        loading:true
    }



    getDefaultCityDatabase() {
        this.setState({loading: true})
        let id=3094802
//		let weatherURL = `http://api.openweathermap.org/data/2.5/forecast?id=3094802&units=metric&APPID=c13044a1ca13fe20adb4a879f7eeed40`
		let weatherURL = `local_database.json`
		axios.get(weatherURL)
			.then(response => {
//            console.log(response)
                this.setState({defaultCityDatabase: response.data, loading: false})
                console.log(this.state.defaultCityDatabase)
            })
		  	.catch(error => {
		    	console.log(error)
			 })
    }




        
        render () {

            if (this.state.loading) return <Spinner/>

            
            
            
            
            
            let databaseToDisplay = this.state.defaultCityDatabase.list
            

            
            
            
            
            
            return (
                 <div className={styles['CumulativeForecast']}>
                        
                    {databaseToDisplay.map(singleObject => {
                        return (
                            <SingleCityForecast
                                  key={singleObject.dt}
                                  date={singleObject.dt_txt}
                                  temperature={singleObject.main.temp}
                                  temperature_max={singleObject.main.temp_max}
                                  temperature_min={singleObject.main.temp_min}
                                  conditionID={singleObject.weather[0].id}
                                  singleCityName={this.state.defaultCityDatabase.city.name}
                                  singleCityCountry={this.state.defaultCityDatabase.city.country}
                                  >
                            </SingleCityForecast>
                        )
                    })}            
                </div>    
            )
        }

    }

export default cumulativeForecast;
