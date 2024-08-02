// App.js
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AddFood from "./pages/AddFood";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add-food" component={AddFood} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/notifications" component={Notifications} />
      </Switch>
    </Router>
  );
}

export default App;
