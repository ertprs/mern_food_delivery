import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { PrivateRoute, RouterLink } from "./PrivateRouter";
import Restaurant from "./Pages/Restaurant/Restaurant";
import Map from "./Component/Address/Map/Map";
import Testmap from "./Component/Address/Testmap";
import Cart from "./Pages/Cart/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <RouterLink exact path="/register" component={Register} />
          <RouterLink exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/restaurant/:id" component={Restaurant} />
          <Route exact path="/testmap" component={Testmap} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
