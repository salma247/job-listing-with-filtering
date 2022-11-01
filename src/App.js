import React, { Suspense } from 'react';
import './App.css';
import Layout from './layouts/Layout'
import Filter from './components/Filter'
import { HashRouter } from 'react-router-dom'


const List = React.lazy(() => import('./components/List'));

function App() {
  return (
    <HashRouter basename='/'>
      <Layout>
        <Filter />
        <Suspense fallback={<div className="lds-dual-ring"></div>}>
          <List />
        </Suspense>
      </Layout>
    </HashRouter>
  );
}

export default App;
