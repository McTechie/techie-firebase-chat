import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chats from "./components/Chats";
import Login from "./components/Login";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
