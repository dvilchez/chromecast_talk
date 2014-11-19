/** @jsx React.DOM */

'use strict';
var React = require('react');

var Video = React.createClass({
    getInitialState: function(){
        return {
            session: undefined,
            current_media: undefined
        };
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
    

    cast: function(){
        var video = this.refs.video.getDOMNode();
        
        chrome.cast.requestSession(function(e){
            this.setState({session: e});
            $.ajax({
                type: "HEAD",
                url: video.src,
                context:this,
                success: function(message,text,response){
                    var mediaInfo = new chrome.cast.media.MediaInfo(video.src, response.getResponseHeader('Content-Type'));
                    var request = new chrome.cast.media.LoadRequest(mediaInfo);

                    this.state.session.loadMedia(request, function(how, media){
                        this.setState({current_media: media});
                    }.bind(this, 'loadMedia'), this.logError);
                }
            }); 
        }.bind(this), this.logError);
    },

    logError: function(error){
        console.log(error);
    },

    render: function(){
        return(
            /*jshint ignore:start */
            <div>
                <video ref='video' src="https://e4e541a9ce7a5c91babd53801e992ad75aac9c21.googledrive.com/host/0B2j1eTLysQsUY2FWYm16Y1BNb0U/colores_es.mp4">
                </video>
                <div>
                    <button ref='play' type="button" onClick={this.play}>Play</button>
                    <input ref='seekBar' type="range" min='0' max='100'/>
                    <button ref='mute' type="button" onClick={this.mute}>Mute</button>
                    <input ref='volumeBar' type="range" min="0" max="1" step="0.1"/>
                    <button onClick={this.cast}>Cast</button>
                  </div>
            </div>
            /*jshint ignore:end */
            );
    }
});

module.exports = Video;
