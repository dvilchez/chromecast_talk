/** @jsx React.DOM */

'use strict';
var React = require('react');
var Video = require('./video.js');
var VideoList = require('./video-list.js');

var Shell = React.createClass({
    render: function() {
        return (
        	/*jshint ignore:start */
            <div className='row'>
                <div className='col-md-8 main' >
                    <Video/>
                </div>
                <div className='col-md-4 sidebar'>
                    <VideoList />
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = Shell;
