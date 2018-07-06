import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Home from 'containers/Home';

render(
	<Router>
		<Switch>
		    <Route exact path='/' component={Home} />
	    </Switch>
	</Router>,
	document.getElementById('root')
);