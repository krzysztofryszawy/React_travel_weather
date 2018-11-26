import React from 'react'
import styles from './HeaderInfo.module.css'


const headerInfo = (props) => {
    
    
    const resetLocalstorage = () => {
        localStorage.clear('StateInsideStorage')
        props.refresh()
    }
    
    return (
    
    <div className={styles['HeaderInfo']}>
       <div style={{fontSize: '1.3em'}}> ⛅ TRAVEL WEATHER </div>
       <div style={{fontSize: '.7em'}}> 
           <button onClick={resetLocalstorage}>CLEAR LOCALSTORAGE</button> 
           <button onClick={''}>OPTIMISTIC</button> 
           <button onClick={''}>NORMAL</button> 
           <button onClick={''}>PESSIMISTIC</button> 
       </div>
    </div>
    
    
    )
    
    
    
    
}


export default headerInfo