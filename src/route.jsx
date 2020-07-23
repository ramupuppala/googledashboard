//imports node modules 
import React, { Component }                             from 'react';
// Component to be rendered when trying to acces an valid URL
import { BrowserRouter, Route, Switch }                 from 'react-router-dom';
//Navigation Component
import Header                                           from './components/common/header';
//This component used for display google map
import GoogleMap                                     from './components/dashboard/GoogleMap';
//This component used for display home page
import Table                                         from './components/table/table';
/**
 * This function used for routing making single page application or without refresh web page.
 */
const Routes = () => (
	<BrowserRouter>		
        <Header/>           
        <Route path="/" exact component={GoogleMap} exact/>
        <Route path="/table" exact component={Table} exact/>
	</BrowserRouter>
);
export default Routes;