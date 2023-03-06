import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Route from "./Route";

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  return (
    <BrowserRouter>
      <Route/>
    </BrowserRouter>
  );
}

export default App;
