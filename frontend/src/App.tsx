import './App.css'
import Header from './components/Layout/Header/Header'
import AppRouter from './Routes/AppRouter'
import { useAuthMeQuery } from './store/reducers/auth-reducer-api'


function App() {
  let skip= true
  const token = localStorage.getItem('accessToken')
  if(token){
    skip = false
  }
  useAuthMeQuery(null,{skip})
  return (
      <div className="App">
        <Header />
        <AppRouter />
      </div>
  );
}

export default App;

/* <header className="App-header">
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
      </header> */
