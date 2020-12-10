import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CountrySelect from "./components/CountrySelect";
import Country from "./components/Country";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={CountrySelect} />
        <Route path='/:country' component={Country} />
      </Switch>
    </Router>
  );
}

export default App;
