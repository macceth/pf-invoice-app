import { Switch, Route, Redirect } from "react-router-dom";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="container">
      <div className="flex h-screen w-screen bg-app-light">
        <SideBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/invoices" />
          </Route>
          <Route exact path="/invoices">
            <Invoices />
          </Route>
          <Route path="/invoices/:invoiceId">
            <InvoiceDetail />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
