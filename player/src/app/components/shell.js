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
                <div >
                    <Video/>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = Shell;
