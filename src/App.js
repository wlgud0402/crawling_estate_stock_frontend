import "./App.css";
import HomePage from "./page/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorPage from "./page/ErrorPage";
import EstateMainPage from "./page/EstateMainPage";
import StockMainPage from "./page/StockMainPage";

import axios from "axios";
import StockDetailPage from "./page/StockDetailPage";
import BoardPage from "./page/BoardPage";
import MyInfo from "./page/MyInfo";
import BoardDetailPage from "./page/BoardDetailPage";
import BoardEditPage from "./page/BoardEditPage";
import CommentEditPage from "./page/CommentEditPage";
import BoardWritePage from "./page/BoardWritePage";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/estate" component={EstateMainPage} />
          <Route exact path="/stock" component={StockMainPage} />
          <Route exact path="/stock/detail" component={StockDetailPage} />
          <Route exact path="/myInfo" component={MyInfo} />
          <Route path="/comment/edit/:id" component={CommentEditPage} />
          <Route path="/board/write" component={BoardWritePage} />
          <Route path="/board/edit/:id" component={BoardEditPage} />
          <Route path="/board/:id" component={BoardDetailPage} />
          <Route path="/board?page" component={BoardPage} />
          <Route path="/board" component={BoardPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
// /:testvalue" component
export default App;
