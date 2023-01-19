
import AppHeader from './AppHeader';
import PageContent from './PageContent';
import AppFooter from './AppFooter';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
