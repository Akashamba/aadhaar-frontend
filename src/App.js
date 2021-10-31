import React from 'react';
import { Switch, Route,  } from 'react-router-dom';
import VidCaptcha from './components/vid-captcha/vid-captcha.component';
import VidOTP from './components/vid-otp/vid-otp.component';
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path='/vid/captcha' component={VidCaptcha} />
      <Route exact path='/vid/otp' component={VidOTP} />
      {/*<Route exact path="" component={Homepage} />*/}
    </Switch>
      
    </div>
  );
}

export default App;
