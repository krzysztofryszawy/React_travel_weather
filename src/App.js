import React, { Component } from 'react';
import styles from './App.module.css';
import MainContainer from './containers/MainContainer/MainContainer'
import HeaderInfo from './components/HeaderInfo/HeaderInfo'

class App extends Component {

    
    state = {
        
    }
    
    optimist = () => {
        
    }
    
    
    refresh = () => {
        this.forceUpdate()
    }
    
    render(props) {
        return (
          <div className={styles['App']}>
            <HeaderInfo
                refresh={this.refresh}
                optimist={this.optimist}/>
            <MainContainer/>
          </div>
        );
    }
}

export default App;
