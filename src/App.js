import "./App.css";
import HomePage from "./page/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorPage from "./page/ErrorPage";
import EstateMainPage from "./page/EstateMainPage";
import StockMainPage from "./page/StockMainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/estate" component={EstateMainPage} />
          <Route exact path="/stock" component={StockMainPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
