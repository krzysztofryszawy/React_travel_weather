import React from 'react'
import styles from './Tutorial.module.css'



const tutorial_1 = require('../../assets/images/tutorial_1.png')
const tutorial_2 = require('../../assets/images/tutorial_2.png')


const tutorial = (props) => {
    
    return(
        <div onClick={() => props.closeTutorial()} className={styles['container']}>
            <h2>PLEASE READ THIS SHORT TUTORIAL 👇</h2>
            <h4>When preparing to trip <span>✈</span>, find on main list desirable date and time when you will arrive to destination city. Then click ✔ on it, and TravelWeatherApp will ask you for the City name.</h4>
            <p>Dialog box as below ⬇ will apear.</p>
            <div className={styles['step1']}>
    
            </div>
            <h4>This date will be stored as date of your arrival to choosen city, and until then you will see forecast ⛅ ☂ ☃ 🌞 🌪 for this choosen city. </h4>
            <p>You can easy see it on list ⬇ below.</p>
            <div className={styles['step2']}>
            
            </div>
            <h4>Now is the time 🎈 , when you can set the next destinations 🏰🗼🗽 of your trip!. It is just easy as before: choose date and time, click to set arrival time and voilla!</h4>
            <h2>👇 MOST IMPORTANT 👇</h2>
            <h3>Now TravelWeatherApp will remember, when you want arrive to all your trip destinations 🥂. When you will open App again, TravelWeatherApp will show you newest forecast 🌡 for those destinations. Always accurate, always current. 🌞</h3>
            <h3>Enjoy you trip! 🤞 Don't Let the Weather Take You by Surprise!</h3>
            <p>(click to close ❌)</p>
        </div>
    
    
    )
    
    
}

export default tutorial