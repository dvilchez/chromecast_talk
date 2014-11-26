/** @jsx React.DOM */

'use strict';
var React = require('react');

var Video = React.createClass({
    getInitialState: function(){
        return {
            videoSrc: 'http://localhost/~dvilchez/game/colores_es.mp4',
        };
    },
    
    componentWillReceiveProps: function(nextProps){
    
    },

    componentDidMount: function(){
         var video = this.refs.video.getDOMNode();
         var seekBar = this.refs.seekBar.getDOMNode();
         var volumeBar = this.refs.volumeBar.getDOMNode();
         
         seekBar.value = 0;
         seekBar.addEventListener('change', function(){
            var time = video.duration * (seekBar.value/100);
            video.currentTime = time;
         });
         
         seekBar.addEventListener('mousedown', function() {
           video.pause();
         });

         seekBar.addEventListener('mouseup', function() {
           video.play();
         });

         volumeBar.value = 1;
         volumeBar.addEventListener('change', function() {
              video.volume = volumeBar.value;
         });
         
         video.addEventListener('timeupdate', function() {
          var value = (100 / video.duration) * video.currentTime;
          seekBar.value = value;
         });
    },

    switcPlayback: function(){
        var play = this.refs.play.getDOMNode();
        var video = this.refs.video.getDOMNode();

        if(video.paused){
            video.play();
            play.innerText = 'Pause';
        }else{
            video.pause();
            play.innerText = 'Play';
        }
    },
    
    mute: function(){
        var video = this.refs.video.getDOMNode();
        var muteButton = this.refs.mute.getDOMNode();
        
        if (video.muted === false) {
            video.muted = true;
            muteButton.innerHTML = 'Unmute';
        } else {
            video.muted = false;
            muteButton.innerHTML = 'Mute';
        }
    },

    render: function(){
        return(
            /*jshint ignore:start */
            <div className="player">
                <video ref='video' src={this.state.videoSrc}>
                </video>
                <div className="player-tools">
                    <div className="player-row">
                        <button ref='play' type="button" className="btn btn-default" onClick={this.switcPlayback}>Play</button>
                        <input ref='seekBar' type="range" min='0' max='100'/>
                    </div>
                    <div className="player-row">
                        <button ref='mute' type="button" className="btn btn-default" onClick={this.mute}>Mute</button>
                        <input ref='volumeBar' type="range" min="0" max="1" step="0.1"/>
                    </div>
                </div>
            </div>
            /*jshint ignore:end */
            );
    }
});

module.exports = Video;
