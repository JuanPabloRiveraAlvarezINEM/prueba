import './App.css';
import Login from './components/login'
import Holamundo from './components/holamundo'
import Insertar from './components/insertar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"> 
          <Login/>
        </Route>
        <Route path="/tareas"> 
          <Holamundo/>
        </Route>
        <Route path="/insertar"> 
          <Insertar/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
