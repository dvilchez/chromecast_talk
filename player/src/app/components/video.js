/** @jsx React.DOM */

'use strict';
var React = require('react');

var Video = React.createClass({
    play: function(){
        var video = this.refs.video.getDOMNode();
        var play = this.refs.play.getDOMNode();

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

    render: function(){
        return(
            /*jshint ignore:start */
            <div>
                <video ref='video' src="http://download.ted.com/talks/AlGore_2006-950k.mp4?apikey=659af6215c9ed500371b8bb3681db69d1d5a88fc" onLoadedData={this.init}></video>
                <div>
                    <button ref='play' type="button" onClick={this.play}>Play</button>
                    <input ref='seekBar' type="range" min='0' max='100'/>
                    <button ref='mute' type="button" onClick={this.mute}>Mute</button>
                    <input ref='volumeBar' type="range" min="0" max="1" step="0.1" onClick={this.volumeUp}/>
                  </div>
            </div>
            /*jshint ignore:end */
            );
    }
});

module.exports = Video;
