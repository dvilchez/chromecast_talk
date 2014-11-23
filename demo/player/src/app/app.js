/** @jsx React.DOM */

'use strict';

var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var Shell = require('./components/shell.js');


React.render(
    /*jshint ignore:start */
    <Routes location='history'>
        <Route path='/' handler={Shell}/>
    </Routes>,
    /*jshint ignore:end */
    document.getElementById('app')
);

window.React = React;
