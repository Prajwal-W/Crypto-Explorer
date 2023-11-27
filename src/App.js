import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh'
  }
}))

function App() {
  const style = useStyles();

  return (
    <div className={style.App}>
    <BrowserRouter>
      
        <Header/>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/coins/:id' Component={CoinPage} />
        </Routes>

        
    </BrowserRouter>
    </div>

  );
}

export default App;
