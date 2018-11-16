import React, { Component } from 'react'
import styles from './CumulativeForecast.module.css'
import SingleCityForecast from './SingleCityForecast/SingleCityForecast'
import Spinner from '../UI/Spinner/Spinner'
import Backdrop from '../UI/Backdrop/Backdrop'

import axios from 'axios'


class cumulativeForecast extends Component {
    
    componentDidMount() {
// conditional check if there are previous data or should start with new database
        if (localStorage.getItem('StateInsideStorage')) {
            this.loadStateFromLocalstorage()
            console.log('są dane w LocalStorage!')} 
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
    }


//saving data to localstorage
    saveStateToLocalstorage = () => {
        const stateToLocalstorage = {listOfDatabaseNames: this.state.listOfDatabaseNames, indexCities: this.state.indexCities}
        localStorage.setItem('StateInsideStorage', JSON.stringify(stateToLocalstorage));
    }

//loading state from localstorage
    loadStateFromLocalstorage = () => {
        const retrievedObject1 = localStorage.getItem('StateInsideStorage');
        let result1 = (JSON.parse(retrievedObject1)); 
        this.setState({listOfDatabaseNames: result1.listOfDatabaseNames},() => this.setStateFromLocalstorage())        
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
        let weatherURL = `local_database_${cityName_param}.json`
//let weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName_param}&units=metric&APPID=c13044a1ca13fe20adb4a879f7eeed40`
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
                        endDate: 1920000000}                    
                    if (cityToAdd.startDate == undefined) {cityToAdd.startDate= Date.now()/1000}
                    this.state.listOfDatabaseNames.push(cityToAdd)
                

        //setting end date for clicked city, maping through database setted above 
                    this.state.listOfDatabaseNames.map(element => {
                    if (element.databaseName == this.state.clickedDatabaseName) {
                            element.endDate = this.state.clickedCityData
                        }
                        return element
                    })

                
                    this.setState({[uniqueCityName_param+'Database']: response.data, indexCities: this.state.indexCities + 1}, () => resolve())
                })
                .catch(error => {
                    reject(error)
                 })
        })
    }










    getInitialCityDatabase(cityName_param, databaseNameFromDatabase) {
        this.setState({loading: true})
        let weatherURL = `local_database_${cityName_param}.json`
//let weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName_param}&units=metric&APPID=c13044a1ca13fe20adb4a879f7eeed40`
        //setting unique name for each city
        return new Promise((resolve, reject) => {
            axios.get(weatherURL)
                .then(response => {
                    this.setState({[databaseNameFromDatabase]: response.data, indexCities: this.state.indexCities + 1}, () => resolve())
                })
                .catch(error => {
                    reject(error)
                 })
        })
    }


















//gets date of clicked element (key unikalny identyfikator)
    getActualClickedDataHandler = (clickedData, singleCityName, clickedDatabaseName) => {
        this.setState({clickedCityData: clickedData, clickedCityName: singleCityName.toLowerCase(), clickedDatabaseName: clickedDatabaseName})
        
//!!!!!!! removing cities, which starts later then clicked startDate --> add removing data from state!!!!!!!!!!!!!
        const clearedDatabaseNames = this.state.listOfDatabaseNames.filter((el) => {
                if (el.startDate < clickedData)
                    return el.startDate < clickedData
        })
        this.setState({listOfDatabaseNames: clearedDatabaseNames})
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
                this.setState({cityName: this.state.tempCityName, backdrop: false}, () => this.getSingleCityDatabase(this.state.cityName)
                              .then(() => {
                                    this.saveStateToLocalstorage()
                                    this.setState({loading:false})}))
                                
    }

    
    
    
        
        render () {
            
            let inputContent = <div>
                                    <label>PODAJ MIASTO</label>
                                    <input name="cityNameInput" type="text" onChange={this.changeInputState}/>
                                    <button onClick={this.acceptInputState}>ZATWIERDŹ</button>
                                </div>

            if (this.state.loading) return <Spinner/>

            
            
            
//proceed if there is initial database loaded             
// experimental            

let tempDB = this.state.listOfDatabaseNames.map(el =>     
    {return el.databaseName}
)
console.log(tempDB)
            
let tempDB2 = tempDB.map(el => 
            {return(this.state[el])}
)
console.log(tempDB2)
            
let tempDB3 = tempDB2.every(el => 
            {return el}
)   
console.log(tempDB3)
            
if (!tempDB3) return <Spinner/>

            

    
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
                                                      temperature={singleObject.main.temp}
                                                      temperature_max={singleObject.main.temp_max}
                                                      temperature_min={singleObject.main.temp_min}
                                                      conditionID={singleObject.weather[0].id}
                                                      singleCityName={singleCityDatabase.city.name}
                                                      singleCityCountry={singleCityDatabase.city.country}
                                                      getActualClickedDataHandler={this.getActualClickedDataHandler}
                                                      color={mapIndex % 2 == 0 ? true : false}
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
                    {commonDatabase}          
                </div>    
            )
        }
    }

export default cumulativeForecast