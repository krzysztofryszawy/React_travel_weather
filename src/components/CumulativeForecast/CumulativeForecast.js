import React, { Component } from 'react';
import styles from './CumulativeForecast.module.css';
import SingleCityForecast from './SingleCityForecast/SingleCityForecast'
import Spinner from '../UI/Spinner/Spinner'
import Backdrop from '../UI/Backdrop/Backdrop'

import axios from 'axios'


class cumulativeForecast extends Component {
    
    componentDidMount() {
        this.getSingleCityDatabase(this.state.cityName)
            .then(() => this.setState({loading:false}))
    }
    


    
    state = {
        loading:true,
        backdrop: false,
        cityName: 'krakow',
        listOfDatabaseNames: [],
        indexCities: 0,
    }



    
//loads one single city passed by param
    getSingleCityDatabase(cityName_param) {
        this.setState({loading: true})
        let weatherURL = `local_database_${cityName_param}.json`

        //setting unique name for each city
        cityName_param = `${cityName_param}${this.state.indexCities}`
        return new Promise((resolve, reject) => {
            axios.get(weatherURL)
                .then(response => {
                
        //creating list of choosen cities - saving database name for them, pushing to database one by one
                    let cityToAdd  = {
                        databaseName: cityName_param+'Database',
                        startDate: this.state.clickedCityData, 
                        endDate: 1920000000}                    
                    if (cityToAdd.startDate == undefined) {cityToAdd.startDate= Date.now()/1000}
                

                
                

                this.state.listOfDatabaseNames.push(cityToAdd)
                

        //setting end date for clicked city, maping through database setted above 
let test = this.state.listOfDatabaseNames.map(element => {
        if (element.databaseName == this.state.clickedDatabaseName) {
                element.endDate = this.state.clickedCityData
            }
            return element
})

                
                    this.setState({[cityName_param+'Database']: response.data, indexCities: this.state.indexCities + 1}, () => resolve())
                })
                .catch(error => {
                    reject(error)
                 })
        })
    }

//gets date of clicked element (key unikalny identyfikator)
    getActualClickedDataHandler = (clickedData, singleCityName, clickedDatabaseName) => {
        this.setState({clickedCityData: clickedData, clickedCityName: singleCityName.toLowerCase(), clickedDatabaseName: clickedDatabaseName})
        

//experimental - removing cities, which starts later then clicked startDate
const test2 = this.state.listOfDatabaseNames.filter((el) => {
        if (el.startDate < clickedData)
                        return el.startDate < clickedData
                    })
this.setState({listOfDatabaseNames: test2})



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
                              .then(() => this.setState({loading:false})))       
    }

    
    
    
        
        render () {
            
            let inputContent = <div>
                                    <label>PODAJ MIASTO</label>
                                    <input name="cityNameInput" type="text" onChange={this.changeInputState}/>
                                    <button onClick={this.acceptInputState}>ZATWIERDŹ</button>
                                </div>

            if (this.state.loading) return <Spinner/>

//proceed if there is initial database loaded NEED TO ADD DYNAMIC SETTED DEFAULT CITY NAME!!!!!!!!!
            if (!this.state[`krakow0Database`]) return <Spinner/>
    
            let commonDatabase = this.state.listOfDatabaseNames.map(singleCityElement => {
                    let singleCityDatabase = (this.state[singleCityElement.databaseName])
//below filtered by starting & ending date defined before
                    const singleCityDatabaseFiltered = singleCityDatabase.list.filter((el) => {
                        return el.dt >= singleCityElement.startDate && el.dt < singleCityElement.endDate;
                    });                
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

export default cumulativeForecast;
