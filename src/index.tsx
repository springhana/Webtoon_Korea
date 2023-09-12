import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import App from "./routers/App";
import "./style/index.css";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Detail_SearchStore from "./store/Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={Detail_SearchStore}>
    <Router>
      <App />
    </Router>
  </Provider>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
