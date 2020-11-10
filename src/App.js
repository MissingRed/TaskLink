import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import PrivateRoute from "../src/Components/PrivateRoute";
import { AuthProvider } from "../src/Database/Auth";
import Register from "./Pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Register" exact component={Register} />
          <PrivateRoute exact path="/Home" component={Home} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
