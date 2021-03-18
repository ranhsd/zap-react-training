import logo from "./logo.svg";
import "./App.css";
import { useRoutes } from "raviger";

import Home from "pages/Home";
import Home2 from "pages/Home2";

const routes = {
  "/": () => <Home />,
  "/home2": () => <Home2 />
};

function App() {
  const router = useRoutes(routes);

  return (
    <div className="App">
      {router}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
