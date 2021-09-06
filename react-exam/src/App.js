import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom'
import Home from './components/Home/home'
import Login from './components/Login/login'
import Select from './components/Select/select'
import Class from './components/Class/class'
import Student from './components/Students/student'
import AddClass from './components/Class/addclass'
import Term from './components/Term/term';
import './App.less';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/term/:name/:title" component={Term} />
        <Route path="/addclass" component={AddClass}/>
        <Route path="/student" component={Student}/>
        <Route path="/class" component={Class}/>
        <Route path="/select" component={Select}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Home}/>
        <Route path="/home" component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
