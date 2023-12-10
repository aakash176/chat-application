import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from "./component/Homepage";
import Chats from "./component/Chats";
function App() {
  localStorage.removeItem('userInfo')
  return <div className="App">
   
    <Routes>
      <Route path="/" Component={Homepage} exact/>
      <Route path="/chats" Component={Chats}/>

    </Routes>
  </div>;
}

export default App;
