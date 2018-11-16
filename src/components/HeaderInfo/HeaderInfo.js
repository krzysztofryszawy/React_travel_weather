import React from 'react'
import styles from './HeaderInfo.module.css'


const headerInfo = () => {
    
    
    const resetLocalstorage = () => {
        localStorage.clear('StateInsideStorage')
    }
    
    return (
    
    <div className={styles['HeaderInfo']}>
       <div style={{fontSize: '1.3em'}}> ⛅ TRAVEL WEATHER </div>
       <div style={{fontSize: '.7em'}}> 
           <button onClick={resetLocalstorage}>CLEAR</button> 
       </div>
    </div>
    
    
    )
    
    
    
    
}


export default headerInfo