function focusContent(tag) {
  // this function focuses on the tag element, used with skipContent buttons
  // console.log(document.activeElement);

  var tagToFocus = document.querySelector(tag);
  if ((document.activeElement || document.activeElement === null) && (typeof tagToFocus.setActive === "function")) {
    tagToFocus.setActive();
    tagToFocus.focus();
    console.log(tagToFocus);
    // console.log("^Currently Selected: ");
    console.log(document.activeElement);
  }
}

function playPause(videoTagID, playBtnId) {
  // this function allows the video to play or pause
  
  var myVideo = document.getElementById(videoTagID);
  var btn = document.getElementById(playBtnId);
  var audio = document.getElementById("AD-source1");
  var headerPause = document.getElementById("headerPause");
  
  if (myVideo.paused) {
    myVideo.play();
    btn.value = 'pause'; // will just add a hidden value
    btn.innerHTML = 'Pause';
	if (headerPause !== null) { headerPause.innerHTML = "<button tabindex=\"2\" onclick=\"playPause('video1','vidplay')\">Pause Autoplay &raquo;</button>"; }
  } else if (!myVideo.paused) {
    myVideo.pause();
    btn.value = 'play'; // will just add a hidden value
    btn.innerHTML = 'Play';
	if (headerPause !== null) { headerPause.innerHTML = "<br>"; }
  }

}

function createVideoEndListener(videoTagID, playBtnId) {
  var myVideo = document.getElementById(videoTagID);
  var btn = document.getElementById(playBtnId);
  myVideo.addEventListener("ended", function () {
    myVideo.pause();
    btn.value = 'play'; // will just add a hidden value
    btn.innerHTML = 'Play';
  })
}

function rewind(videoTagID) {
  var myVideo = document.getElementById(videoTagID);
  var audio = document.getElementById("AD-source1");
  // Remove comment out below if you want the movie to pause after you rewind. -vek
  //myVideo.pause(); 
  // Rewinding the movie at 1 second intervals. -vek
  myVideo.currentTime -= 1;
  // pauses and sets the audio to the beginning
  // audio.pause();
  // audio.currentTime = 0;
}

function forward(videoTagID) {
  var myVideo = document.getElementById(videoTagID);
  var audio = document.getElementById("AD-source1");
  // The if statement checks to see if it's at the movie end, so you can do something if you wish. -vek
  if (myVideo.currentTime == 29.64) {
    //alert("End of movie.");
  } else {
    // Fowarding the movie at 1 second intervals. -vek
    myVideo.currentTime += 1;
    // audio.pause();
    // audio.currentTime = 0;
  }
}

function hideTracks() {
  // this sets the closed captioning for videos from disabled to hidden
  var vid = document.getElementById("video1");
  var vid2 = document.getElementById("video2");
  if (vid) {
    var track = vid.textTracks[0];
    console.log(track);
    track.mode = "hidden";
  } else if (vid2) {
    var track = vid2.textTracks[0];
    console.log(track);
    track.mode = "hidden";
  }
}

function handleCC() {
  // this function handles the functionality for the closed captioning. 
  var vid1 = document.getElementById("video1");
  var vid2 = document.getElementById("video2");
  
  if (vid1 || vid2) {

    var ccBtn = document.getElementById("CCBtn");
    if (vid1) { var textTrack = vid1.textTracks[0]; }
    if (vid2) { var textTrack = vid2.textTracks[0]; }

    ccBtn.addEventListener("click", function () {
      ccBtn.classList.toggle("add-underline");

      if (ccBtn.classList.contains("add-underline")) {
		ccBtn.innerHTML = "Closed Captions: On";
		ccBtn.setAttribute('aria-label', 'Closed Captions: On');
        textTrack.mode = "showing";
      } else {
		ccBtn.innerHTML = "Closed Captions: Off";
		ccBtn.setAttribute('aria-label', 'Closed Captions: Off');
        textTrack.mode = "hidden";
        hideTracks();
      }
    });

  } else {
    console.log("no video");
  }
}

function handleAD() {
  var adBtn = document.getElementById("ADBtn");
  var vid1 = document.getElementById("video1");;

  if (vid1) {

    //console.log(adBtn);
    adBtn.addEventListener("click", function () {
      adBtn.classList.toggle("add-underline");

      if (adBtn.classList.contains("add-underline")) {
		adBtn.innerHTML = "Audio Description: On";
		adBtn.setAttribute('aria-label', 'Audio Description: On');
        console.log("ad is active")
      } else {
		adBtn.innerHTML = "Audio Description: Off";
		adBtn.setAttribute('aria-label', 'Audio Description: Off');
        console.log("AD is not active")
      }
    });
  }
}

function handlePage2Audio(showMute) {
  var muteText = "Mute";
  var unmuteText = "Unmute";
  if (!showMute) { 
	  muteText = "";
	  unmuteText = "";
  }
  
  var audio = document.getElementById("audio_bgm");
  if (audio) {

    audio.volume = 1;
    var buttonPlay = document.getElementById("togglePlay");
    var buttonMute = document.getElementById("toggleMute");
    var playIcon = document.getElementById("playIcon");
    var isPlaying = false;
    var isMuted = false;

    buttonPlay.addEventListener("click", function () {
      playIcon.classList.toggle("glyphicon-pause");
      playIcon.classList.toggle("glyphicon-play");

      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        audio.play();
        isPlaying = true;
        audio.muted = false;
        buttonMute.innerHTML = muteText+" <span id='muteIcon' class='glyphicon glyphicon-volume-up' tabindex='-1' role='presentation'</span>";
        isMuted = false;
      }

      if (playIcon.classList.contains("glyphicon-pause")) {
        buttonPlay.innerHTML = "Pause <span id='playIcon' class='glyphicon glyphicon-pause' tabindex='-1' role='presentation'></span>";
        console.log(buttonPlay);
      } else if (playIcon.classList.contains("glyphicon-play")) {
        buttonPlay.innerHTML = "Play <span id='playIcon' class='glyphicon glyphicon-play' tabindex='-1' role='presentation'></span>";
      }

    });

    buttonMute.addEventListener("click", function () {
      if (isPlaying && !isMuted) {
        audio.muted = !audio.muted;
        isMuted = true;
        buttonMute.innerHTML = unmuteText+" <span id='muteIcon' class='glyphicon glyphicon-volume-up' tabindex='-1' role='presentation'></span>";
		buttonMute.title = "Unmute";
        // console.log("The audio should be muted now");

      } else if (isPlaying && isMuted) {
        audio.muted = !audio.muted;
        isMuted = false;
        buttonMute.innerHTML = muteText+" <span id='muteIcon' class='glyphicon glyphicon-volume-up' tabindex='-1' role='presentation'></span>";
		buttonMute.title = "Mute";
        // console.log("The audio should be [playing] now"); 
      }
    });

  }
}

function openWebPage(pageName) {
  // opens any webpage
  // pageName must have .html  and will open in new tab
  window.open(pageName, "_blank");
}

function openHidden(whichDiv) {
  // unhides an element
  document.getElementById(whichDiv).style.display = "block";
}

function toggleHidden(whichDiv, focusTop) {
  // hides or displays an element - called by page 3
  if (document.getElementById(whichDiv).style.display == "block") {
	  document.getElementById(whichDiv).style.display = "none";
  }
  else {
	  document.getElementById(whichDiv).style.display = "block";
  }
  if (focusTop) {
	  document.getElementById("skipContent").focus();
  }
}

function disableEnter (event) {
  // this if called will disable the enter button on whatever it is called on. 
  var form = document.getElementById("form-register");
  console.log(event.path[0].type);
  if(event.path[0].type === "text" || event.path[0].type === "radio" || event.path[0].type === "checkbox" || event.path[0].type === "email"){

    form.addEventListener("keypress", function(e) {
      if(e.keyCode === 13) {
        console.log("disabled");
        return e.preventDefault();
      }
    })
  };
}


