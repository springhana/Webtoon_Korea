import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "./style/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import webtoonStore from "./store/webtoonStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={webtoonStore}>
    <Router>
      <App />
    </Router>
  </Provider>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
