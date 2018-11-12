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
        cityName: 'krakow'
    }



    
//loads one single city passed by param
    getSingleCityDatabase(cityName_param) {
        this.setState({loading: true})
        let weatherURL = `local_database_${cityName_param}.json`
        return new Promise((resolve, reject) => {
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
            this.setState({tempCityName: e.target.value})
        }
    
    acceptInputState = () => {
                this.setState({cityName: this.state.tempCityName, backdrop: false}, () => this.getSingleCityDatabase(this.state.cityName).then(() => this.setState({loading:false})))
    }



    
    
    
        
        render () {
            
            let inputContent = <div>
                                    <label>PODAJ MIASTO</label>
                                    <input name="cityNameInput" type="text" onChange={this.changeInputState}/>
                                    <button onClick={this.acceptInputState}>ZATWIERDŹ</button>
                                </div>

            if (this.state.loading) return <Spinner/>
            
            
            
            
        
            let databaseToDisplay = this.state[this.state.cityName+'Database'].list
//            let databaseToDisplay = this.state[this.state.cityName+'Database'].list
//            console.log(databaseToDisplay)    
            

            
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
