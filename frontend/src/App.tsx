import './App.css';
import Header from './components/Layout/Header/Header';
import AppRouter from './Routes/AppRouter';
import {Provider} from "react-redux";
import store from './store/store';
function App() {
  return (
    <Provider store={store}>
    <div className="App">   
      <Header/>
      <AppRouter/>
    </div>
    </Provider>
  );
}

export default App;


      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}