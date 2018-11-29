import React, { Component } from 'react'
import styles from './CumulativeForecast.module.css'
import SingleCityForecast from './SingleCityForecast/SingleCityForecast'
import Tutorial from '../Tutorial/Tutorial'
import Spinner from '../UI/Spinner/Spinner'
import Backdrop from '../UI/Backdrop/Backdrop'

import axios from 'axios'


class cumulativeForecast extends Component {
    
    componentDidMount() {
// conditional check if there are previous data or should start with new database
        if (localStorage.getItem('StateInsideStorage')) {
            this.loadStateFromLocalstorage()
            console.log('available data in LocalStorage')} 
        else {
            this.getSingleCityDatabase(this.state.cityName)
                .then(() => this.setState({loading:false}))
            }
    }
    
    componentDidUpdate() {
    }

    state = {
        loading:true,
        backdrop: false,
        cityName: 'krakow',
        listOfDatabaseNames: [],
        indexCities: 0,
        colored: false,
        watchedTutorial: false,
    }


//saving data to localstorage
    saveStateToLocalstorage = () => {
        const stateToLocalstorage = {listOfDatabaseNames: this.state.listOfDatabaseNames, indexCities: this.state.indexCities, watchedTutorial: this.state.watchedTutorial}
        localStorage.setItem('StateInsideStorage', JSON.stringify(stateToLocalstorage));
    }

//loading state from localstorage
    loadStateFromLocalstorage = () => {
        const retrievedObject1 = localStorage.getItem('StateInsideStorage');
        let result1 = (JSON.parse(retrievedObject1)); 
        this.setState({listOfDatabaseNames: result1.listOfDatabaseNames, watchedTutorial: result1.watchedTutorial},() => this.setStateFromLocalstorage())        
    }
        
    setStateFromLocalstorage = () => {
            this.state.listOfDatabaseNames.map(singleElement => { 
                this.getInitialCityDatabase(singleElement.cityName, singleElement.databaseName).then(() => this.setState({loading:false}))
                
            }
        )
     
    }

        
    
//loads one single city passed by param
    getSingleCityDatabase(cityName_param) {
        this.setState({loading: true})
        // let weatherURL = `local_database_${cityName_param}.json`
let weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName_param}&units=metric&APPID=c13044a1ca13fe20adb4a879f7eeed40`
        //setting unique name for each city
        let uniqueCityName_param = `${cityName_param}${this.state.indexCities}`
        return new Promise((resolve, reject) => {
            axios.get(weatherURL)
                .then(response => {
                
        //creating list of choosen cities - saving database name for them, pushing to database one by one
                    let cityToAdd  = {
                        cityName: cityName_param,
                        databaseName: uniqueCityName_param+'Database',
                        startDate: this.state.clickedCityData, 
                        endDate: 1920000000,
                        colored: this.state.colored}
                    if (cityToAdd.startDate == undefined) {cityToAdd.startDate= Math.round(Date.now()/1000)}
                    this.state.listOfDatabaseNames.push(cityToAdd)
//// !!!!!! above needs to be rebilded to setState properly!!!!!!

        //setting end date for clicked city, maping through database setted above 
                    this.state.listOfDatabaseNames.map(element => {
                    if (element.databaseName == this.state.clickedDatabaseName) {
                            element.endDate = this.state.clickedCityData
                        }
                        return element
                    })

                
                    this.setState({[uniqueCityName_param+'Database']: response.data, indexCities: this.state.indexCities + 1, colored: !this.state.colored}, () => resolve())
                })
                .catch(error => {
                    reject(error)
                 })
        })
    }

//loads all cities passed by param, names state properly
    getInitialCityDatabase(cityName_param, databaseNameFromDatabase) {
        this.setState({loading: true})
        // let weatherURL = `local_database_${cityName_param}.json`
let weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName_param}&units=metric&APPID=c13044a1ca13fe20adb4a879f7eeed40`
        //setting unique name for each city
        return new Promise((resolve, reject) => {
            axios.get(weatherURL)
                .then(response => {
                    this.setState({[databaseNameFromDatabase]: response.data, indexCities: this.state.indexCities + 1, colored: !this.state.colored}, () => resolve())
                })
                .catch(error => {
                    reject(error)
                 })
        })
    }




    convertDataToDay = (timestamp) => {
        let a = new Date(timestamp*1000);
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        let dayOfWeek = days[a.getDay()]
        return dayOfWeek
    }


//gets data from clicked element
    getActualClickedDataHandler = (clickedData, singleCityName, clickedDatabaseName) => {
        this.setState({clickedCityData: clickedData, clickedCityName: singleCityName.toLowerCase(), clickedDatabaseName: clickedDatabaseName})
        

        this.showBackdrop()
    }

    hideBackdrop = () => {
        this.setState({backdrop: false})
    }
    
    showBackdrop = () => {
        this.setState({backdrop: true})
    }
    
    changeInputState = (e) => {
            this.setState({tempCityName: e.target.value})
        }
    
    acceptInputState = () => {
        //!!!!!!! removing cities, which starts later then clicked startDate --> add removing unnecessary databases from state!!!!!!!!!!!!!
        const clearedDatabaseNames = this.state.listOfDatabaseNames.filter((el) => {
                if (el.startDate < this.state.clickedCityData)
                    return el.startDate < this.state.clickedCityData
        })
        this.setState({listOfDatabaseNames: clearedDatabaseNames})
        
                this.setState({cityName: this.state.tempCityName, backdrop: false}, () => this.getSingleCityDatabase(this.state.cityName)
                              .then(() => {
                                    this.saveStateToLocalstorage()
                                    this.setState({loading:false})}))
                                
    }

    
    resetLocalstorage = () => {
        localStorage.clear('StateInsideStorage')
    }
    
    closeTutorialHandler = () => {
        this.setState({watchedTutorial: true})
    }
        
        render () {
            
            let inputContent = <div className={styles['inputContent']}>
                                    <label>CITY NAME: </label>
                                    <input name="cityNameInput" type="text" onChange={this.changeInputState}/>
                                    <button className={styles['confirmCityButton']} onClick={this.acceptInputState}>ADD CITY 🌍 </button>
                                </div>

            if (this.state.loading) return <Spinner/>

            
            
            
// experimental, scheduled for refactoring
//proceed futher if there all initial databases are loaded
            let tempDB = this.state.listOfDatabaseNames.map(el =>     
                {return el.databaseName})
            //console.log(tempDB)
            let tempDB2 = tempDB.map(el => 
                        {if (this.state[el]) return el})
            //console.log(tempDB2)
            let tempDB3 = tempDB2.every(el => 
                        {return el})   
            //console.log(tempDB3)
            if (!tempDB3) return <Spinner/>

            const tutorial = <Tutorial
                                closeTutorial={this.closeTutorialHandler}/>

    
            let commonDatabase = this.state.listOfDatabaseNames.map(singleCityElement => {
                    let singleCityDatabase = (this.state[singleCityElement.databaseName])
//below filtered by starting & ending date defined before
                    const singleCityDatabaseFiltered = singleCityDatabase.list.filter((el) => {
                        return el.dt >= singleCityElement.startDate && el.dt < singleCityElement.endDate
                    })                
                    return(
                        singleCityDatabaseFiltered.map((singleObject, mapIndex) => {
                                            return (
                                                <SingleCityForecast
                                                      key={singleObject.dt+singleCityDatabase.city.name}
                                                      databaseName={singleCityElement.databaseName}
                                                      dt={singleObject.dt}
                                                      dt_txt={singleObject.dt_txt}
                                                      dayOfWeek={this.convertDataToDay(singleObject.dt)}
                                                      temperature={singleObject.main.temp}
                                                      temperature_max={singleObject.main.temp_max}
                                                      temperature_min={singleObject.main.temp_min}
                                                      conditionID={singleObject.weather[0].id}
                                                      singleCityName={singleCityDatabase.city.name}
                                                      singleCityCountry={singleCityDatabase.city.country}
                                                      getActualClickedDataHandler={this.getActualClickedDataHandler}
                                                      color={!singleCityElement.colored}
                                                      >
                                                </SingleCityForecast>
                                            )
                                        })
                        )
                })

            
            
            return (
                 <div className={styles['CumulativeForecast']}>
                    <Backdrop 
                        show={this.state.backdrop}
                        click={this.hideBackdrop}
                        changeInputState={this.changeInputState}>
                        {inputContent}
                    </Backdrop>
                    {this.state.watchedTutorial
                        ? commonDatabase 
                        : tutorial}
                    {localStorage.getItem('StateInsideStorage')
                        ? <button className={styles['clearButton']} onClick={this.resetLocalstorage}> ⚠️ CLEAR LOCALSTORAGE</button>
                        : null}
                </div>    
            )
        }
    }

export default cumulativeForecast