import React, { Component } from 'react';
import styles from './App.module.css';
import MainContainer from './containers/MainContainer/MainContainer'
import HeaderInfo from './components/HeaderInfo/HeaderInfo'

class App extends Component {

    
    state = {        
    }

    
    render(props) {
        return (
          <div className={styles['App']}>
            <HeaderInfo/>
            <MainContainer/>
          </div>
        );
    }
}

export default App;
