import React, { Component } from 'react';
import styles from './CumulativeForecast.module.css';
import SingleCityForecast from './SingleCityForecast/SingleCityForecast'
import Spinner from '../UI/Spinner/Spinner'
import Backdrop from '../UI/Backdrop/Backdrop'

import axios from 'axios'


class cumulativeForecast extends Component {
    
    componentDidMount() {
        this.getDefaultCityDatabase('krakow')
    }
    
    state = {
        loading:true,
        backdrop: false,
        cityName: 'krakow'
    }


//loads default city
    getDefaultCityDatabase(cityName_param) {
        this.setState({loading: true})
        //		let weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName_param}&units=metric&APPID=c13044a1ca13fe20adb4a879f7eeed40`
		let weatherURL = `local_database.json`
		axios.get(weatherURL)
			.then(response => {
                this.setState({defaultCityDatabase: response.data}, () => this.setState({loading: false}))
//                console.log(this.state.defaultCityDatabase)
            })
		  	.catch(error => {
		    	console.log(error)
			 })
    }

    
//loads one single city passed by param
    getSingleCityDatabase(cityName_param) {
        this.setState({cityName: 'gdansk'})
        return new Promise((resolve, reject) => {
//		let weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName_param}&units=metric&APPID=c13044a1ca13fe20adb4a879f7eeed40`
		let weatherURL = `local_database_gdansk.json`
		axios.get(weatherURL)
			.then(response => {
                this.setState({[cityName_param+'Database']: response.data}, () => resolve())                               
            })
		  	.catch(error => {
		    	reject(error)
			 })
        })
    }

//gets date of clicked element
    getActualClickedData = (clickedData) => {
        console.log(clickedData)
        this.showBackdrop()
    }

    hideBackdrop = () => {
        this.setState({backdrop: false})
    }
    
    showBackdrop = () => {
        this.setState({backdrop: true})
    }
    
    changeInputState = (e) => {
            const key = e.target.name
            this.setState({[key]: e.target.value})
        }

    

//    prepareDatabaseToDisplay = (clickedData) => {
//        let currentDt = clickedData
//        let modifiedDatabase = this.state.defaultCityDatabase.list.filter((element) => {
//            return element.dt < currentDt;
//        });
////newCityName provided by input
//        this.getSingleCityDatabase(this.state.cityName)
//            .then(() => {
//                let singleCityDatabaseName = (this.state.cityName+'Database')
//                
//                console.log(this.state[singleCityDatabaseName])
////                console.log(modifiedDatabase)
//            
//            
//                let finalDatabase = this.state[singleCityDatabaseName].list
//
//
//                this.setState({newCityDatabase: finalDatabase})
//                }
//            )
//    }

    
    
    
        
        render () {
            
            let inputContent = <div>
                                    <label>PODAJ MIASTO</label>
                                    <input name="cityNameInput" type="text" onChange={this.changeInputState}/>
                                    <button>ZATWIERDŹ</button>
                                </div>

            if (this.state.loading) return <Spinner/>
            
            
            
            
            
//default loading           
            let databaseToDisplay = this.state.defaultCityDatabase.list
////if there is adidional data, loading new data            
//            if (this.state.newCityDatabase) {
//                databaseToDisplay = this.state.newCityDatabase
//            } 
            

            
            return (
                 <div className={styles['CumulativeForecast']}>
                    <Backdrop 
                        show={this.state.backdrop}
                        click={this.hideBackdrop}
                        changeInputState={this.changeInputState}>
                        {inputContent}
                    </Backdrop>
                    {databaseToDisplay.map(singleObject => {
                        
                        return (
                            <SingleCityForecast
                                  key={singleObject.dt}
                                  dt={singleObject.dt}
                                  dt_txt={singleObject.dt_txt}
                                  temperature={singleObject.main.temp}
                                  temperature_max={singleObject.main.temp_max}
                                  temperature_min={singleObject.main.temp_min}
                                  conditionID={singleObject.weather[0].id}
                                  singleCityName={this.state.cityName}
                                  singleCityCountry={this.state.defaultCityDatabase.city.country}
                                  getActualClickedData={this.getActualClickedData}
                                  >
                            </SingleCityForecast>
                        )
                    })}            
                </div>    
            )
        }

    }

export default cumulativeForecast;
