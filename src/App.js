import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import {  UserContextProvider } from './contexts/UserContext';

function App() {
 
  return (
    <div className="App">
      <UserContextProvider>
        <NavigationBar />
        <Outlet />
        <Footer />
      </UserContextProvider>
    </div>
  );
}
export default App;
