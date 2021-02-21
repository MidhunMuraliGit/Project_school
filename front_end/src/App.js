import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentList from "./components/student-list.component";
class App extends Component {
  
  render() { 
    return ( 
      <div className="maincomponent">
      
          <Switch>
           <Route exact path={["/", "/students"]} component={StudentList} />
          
          </Switch>
        </div>
     );
  }
}
 
export default App;