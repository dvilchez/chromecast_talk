/** @jsx React.DOM */

'use strict';
var React = require('react');
var Video = require('./video.js');
var VideoList = require('./video-list.js');

var Shell = React.createClass({
    getInitialState: function(){
        return {
            session: undefined,
            currentMedia: undefined
        };
    },

    componentDidMount: function(){
        window.__onGCastApiAvailable = function(loaded, errorInfo){
            if(loaded){
                var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
                var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
                    this.sessionListener,
                    this.receiverListener);
                chrome.cast.initialize(apiConfig, function(){ console.log('init success'); }, function(){ console.log('init error'); }) ;
            }else{
                console.log(errorInfo);
            }
        }.bind(this);
    },

    sessionListener: function (e){
        this.setState({session: e});
        if(e.media.length!=0)
           this.setState({currentMedia: e.media[0]});
    },

    receiverListener: function (e){
        if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    
        }
    },

    render: function() {
        return (
        	/*jshint ignore:start */
            <div className='row'>
                <div >
                    <Video session={this.state.session} currentMedia={this.state.currentMedia}/>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = Shell;
