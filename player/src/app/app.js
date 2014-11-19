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
window.__onGCastApiAvailable = function(loaded, errorInfo){
    if(loaded){
        var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
        var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
            sessionListener,
            receiverListener);
        chrome.cast.initialize(apiConfig, function(){ console.log('init success'); }, function(){ console.log('init error'); }) ;
    }else{
        console.log(errorInfo);
    }
};

function sessionListener(e){

};

function receiverListener(e){
    if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    
    }
};
