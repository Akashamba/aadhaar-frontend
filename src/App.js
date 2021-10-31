import React from 'react';
import Container from '@mui/material/Container';
import { Switch, Route,  } from 'react-router-dom';
import CaptchaPage from './pages/vid-captcha-page/vid-captcha-page.component';
import './App.css';

function App() {
  return (
    <div className="App">
    <Container maxWidth="sm" className="container">
    <h1>Resident Application</h1>
      <Switch>
        <Route exact path='/vid' component={CaptchaPage} />
        {/*<Route exact path="" component={Homepage} />*/}
      </Switch>
    </Container>
      
    </div>
  );
}

export default App;
