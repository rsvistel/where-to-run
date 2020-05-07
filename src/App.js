import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Welcome from '../src/components/Welcome/Welcome';
import Auth from '../src/components/Auth/Auth';
import Logout from '../src/components/Auth/Logout/Logout';
import Cities from '../src/components/Cities/Cities';
import City from '../src/components/Cities/City/City';
import Event from '../src/components/Event/Event';
import CreateEvent from '../src/components/Event/CreateEvent/СreateEvent';
import Location from '../src/components/Cities/City/Location/Location';
import CreateLocation from '../src/components/Cities/City/Location/CreateLocation/CreateLocation';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/cities" exact component={Cities} />
        <Route path="/cities/:name/event/:eventId" exact render={props => <Event {...props}/>} />
        <Route path="/cities/:name/location/:name" exact render={props => <Location {...props}/>} />
        <Route path="/cities/:name/create-event" exact render={props => <CreateEvent {...props}/>} />
        <Route path="/cities/:name/edit-event" exact render={props => <CreateEvent {...props}/>} />
        <Route path="/cities/:name/create-location" exact render={props => <CreateLocation {...props}/>} />
        <Route path="/cities/:name/" render={props => <City {...props}/>} />
        <Route path="/auth" render={props => <Auth {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Welcome} />
      </Switch>
    </div>
  );
}

export default App;
