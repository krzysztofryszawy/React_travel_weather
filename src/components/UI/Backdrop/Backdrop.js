import React from 'react'
import styles from './Backdrop.module.css'

const dialogBox = (props) => {
    
    return(
        <div className={styles['Backdrop']} style={{display: props.show ? 'inherit' : 'none'}} >
            <div  className={styles['background']} onClick={props.click}></div>
            <div className={styles['inputBox']}>
                {props.children}
            </div>
        </div>
    
    
    )
    
    
}

export default dialogBox 