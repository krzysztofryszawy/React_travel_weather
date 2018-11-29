import React from 'react'
import styles from './HeaderInfo.module.css'


const headerInfo = (props) => {

    
    return (
    
    <div className={styles['HeaderInfo']}>
       <div style={{fontSize: '1.3em'}}> ⛅ TRAVEL WEATHER <span style={{fontSize: '.3em'}}>alpha ☕</span> </div>
       <div style={{fontSize: '.5em'}}> 
        Don't Let the Weather Take You by Surprise! 💼 
       </div>
    </div>
    
    
    )
    
    
    
    
}


export default headerInfo