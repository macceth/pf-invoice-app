import { Switch, Route, Redirect } from "react-router-dom";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";

function App() {
  return (
    <div className="bg-green-50">
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
  );
}

export default App;
