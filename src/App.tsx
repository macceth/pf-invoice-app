import { Switch, Route, Redirect } from "react-router-dom";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import SideBar from "./components/SideBar";
import { useState } from "react";

function App() {
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light");
  }
  const localTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(localTheme);

  const toggleDarkModeHandler = () => {
    setTheme((current_theme: string | null) => {
      let next_theme = "light";
      if (current_theme === "light") next_theme = "dark";
      localStorage.setItem("theme", next_theme);
      return next_theme;
    });
  };

  const darkClass = theme === "dark" ? " dark" : "";

  return (
    <div className={"containter " + darkClass}>
      <div className="bg-app-light dark:bg-app-dark-1 transition-all duration-300">
        <SideBar toggleDarkModeHandler={toggleDarkModeHandler} />
        <div className="flex transition-all duration-300 w-auto h-screen">
          <div className="sm:ml-20"></div>
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
    </div>
  );
}

export default App;
