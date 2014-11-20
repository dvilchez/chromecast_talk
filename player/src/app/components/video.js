/** @jsx React.DOM */

'use strict';
var React = require('react');

var Video = React.createClass({
    getInitialState: function(){
        return {
            videoSrc: "https://dauulq.dm2302.livefilestore.com/y2mI46_Y4aklhX8UtS3Xq6KojLZyEYq2Zt7aPzUf5VXRLk3T4nSktRIP0aa0hLZjM1GZqKaDTB_J3--WHfUyzZfAGtFUlr1UMnjB_ED2uJ97Tg/colores_es.mp4",
            session: undefined,
            currentMedia: undefined
        };
    },
    
    componentWillReceiveProps: function(nextProps){
        if(nextProps.session)
            this.setState({session: nextProps.session});
        if(nextProps.currentMedia)
            this.setState({currentMedia: nextProps.currentMedia});
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
        var play = this.refs.play.getDOMNode();

        if(this.isPaused()){
            this.playVideo();
            play.innerText = 'Pause';
        }else{
            this.pauseVideo();
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

    isPaused: function(){
        if(this.state.session && this.state.session.status === 'connected' && this.state.currentMedia)
            return this.state.currentMedia.playerState !== 'PLAYING';
        
        return this.refs.video.getDOMNode().paused;
    },
    
    playVideo: function(){
        if(this.state.session && this.state.session.status === 'connected'){
            if(this.state.currentMedia){
                this.state.currentMedia.play(null,null,this.logError);
            }else{
                this.loadMedia();
            }
        }else{
            this.refs.video.getDOMNode().play();
        }
    },

    pauseVideo: function(){
        if(this.state.session && this.state.session.status === 'connected'){
            if(this.state.currentMedia ){
                this.state.currentMedia.pause(null,null,this.logError);
            }else{
                this.loadMedia();
            }
        }else{
            this.refs.video.getDOMNode().pause();
        }
    },

    cast: function(){
        if(!this.state.session){
            chrome.cast.requestSession(function(e){
                this.setState({session: e});
            }.bind(this), this.logError);
        }
    },
    
    loadMedia: function(){
        var video = this.refs.video.getDOMNode();
        var mediaInfo = new chrome.cast.media.MediaInfo(this.state.videoSrc, 'mp4');
        var request = new chrome.cast.media.LoadRequest(mediaInfo);

        this.state.session.loadMedia(request, function(how, media){
            media.addUpdateListener(this.onMediaStatusUpdate);
            this.setState({currentMedia: media});
            video.pause();
            video.currentTime = 0;
            this.refs.play.getDOMNode().innerText = 'Pause';
        }.bind(this, 'loadMedia'), this.logError);
    },

    onMediaStatusUpdate: function(isAlive){
        if(!isAlive){
             this.setState({currentMedia: undefined});
             this.refs.play.getDOMNode().innerText = 'Play';
        }
    },

    logError: function(error){
        console.log(error);
    },

    render: function(){
        return(
            /*jshint ignore:start */
            <div>
                <video ref='video' width='640px' src={this.state.videoSrc}>
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
