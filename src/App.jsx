import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Navbar, Footer } from "./components";
import {
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  Home,
  News,
} from "./pages";

const App = () => {
  return (
    <div className="app h-screen flex flex-col lg:flex-row">
      <div className="navbar relative ">
        <Navbar />
      </div>
      <div className="main">
        <div className="pages p-6 ">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cryptocurrencies" component={Cryptocurrencies} />
            <Route path="/crypto/:id" component={CryptoDetails} />
            <Route path="/exchanges" component={Exchanges} />
            <Route path="/news" component={News} />
          </Switch>
        </div>
        <div className="Footer bg-black text-white">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
