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
    }



    
//loads one single city passed by param
    getSingleCityDatabase(cityName_param) {
        this.setState({loading: true})
        let weatherURL = `local_database_${cityName_param}.json`
        return new Promise((resolve, reject) => {
            axios.get(weatherURL)
                .then(response => {
                    let cityToAdd  = {databaseName: cityName_param+'Database', startDate: this.state.clickedCityData}
                    if (cityToAdd.startDate == undefined) {cityToAdd.startDate= Date.now()/1000}
                    this.state.listOfDatabaseNames.push(cityToAdd)
//console.log(cityToAdd)
                    this.setState({[cityName_param+'Database']: response.data}, () => resolve())            
                })
                .catch(error => {
                    reject(error)
                 })
        })
    }

//gets date of clicked element
    getActualClickedData = (clickedData, singleCityName) => {
        this.setState({clickedCityData: clickedData})
//        console.log(clickedData, singleCityName)
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
                        
            if (!this.state[this.state.cityName+'Database']) return <Spinner/>
    
            let commonDatabase = this.state.listOfDatabaseNames.map(singleCityElement => {
                    let singleCityDatabase = (this.state[singleCityElement.databaseName])

//filtered by starting date
const singleCityDatabase2 = singleCityDatabase.list.filter((el) => {
    return el.dt >= singleCityElement.startDate;
});
//console.log(singleCityDatabase)
//console.log(singleCityDatabase2)
                
                    return(
                        singleCityDatabase2.map(singleObject => {
                                            return (
                                                <SingleCityForecast
                                                      key={singleObject.dt+singleCityDatabase.city.name}
                                                      dt={singleObject.dt}
                                                      dt_txt={singleObject.dt_txt}
                                                      temperature={singleObject.main.temp}
                                                      temperature_max={singleObject.main.temp_max}
                                                      temperature_min={singleObject.main.temp_min}
                                                      conditionID={singleObject.weather[0].id}
                                                      singleCityName={singleCityDatabase.city.name}
                                                      singleCityCountry={singleCityDatabase.city.country}
                                                      getActualClickedData={this.getActualClickedData}
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
