 import { css, Global } from "@emotion/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Route from "./Route";

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  return (
    <>
      <Global styles={css`
        .memo-content img {
          max-width: 100%;
        }
      `}/>
        <BrowserRouter>
          <Route/>
        </BrowserRouter>
    </>
  );
}

export default App;
