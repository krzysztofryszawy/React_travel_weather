import React from 'react'
import styles from './Spinner.module.css'

const spinner = () => (
        <div>
           <h2> BE PATIENT </h2>
           <h1> ⛅ ☂ 🌞 </h1>
           <h2>LOADING...</h2>
            <div className={styles['Loader']}></div>
        </div>
)

export default spinner;