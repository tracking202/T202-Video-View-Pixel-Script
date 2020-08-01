function t202PixelVideoViews(domObjectId, fbEventProperties = {}) {
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  t202PercentWatched = new Set();
  t202DomObjectId = domObjectId;
  t202FBep = fbEventProperties;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player(t202DomObjectId, {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  t202LogEvent(event.data);
}

function t202LogEvent(playerStatus) {
  if (playerStatus == 2) {
    clearInterval(t202VideoPing);
  } else if (playerStatus == 0) {
    t202LogPercentage(100);
    clearInterval(t202VideoPing);
  } else if (playerStatus == 1) {
    var t202VideoPing = setInterval(() => {
      let pw = Math.floor(
        (player.getCurrentTime() / player.getDuration()) * 100
      );

      if (pw > 10 && !t202PercentWatched.has(10)) t202LogPercentage(10);
      if (pw > 20 && !t202PercentWatched.has(20)) t202LogPercentage(20);
      if (pw > 30 && !t202PercentWatched.has(30)) t202LogPercentage(30);
      if (pw > 40 && !t202PercentWatched.has(40)) t202LogPercentage(40);
      if (pw > 50 && !t202PercentWatched.has(50)) t202LogPercentage(50);
      if (pw > 60 && !t202PercentWatched.has(60)) t202LogPercentage(60);
      if (pw > 70 && !t202PercentWatched.has(70)) t202LogPercentage(70);
      if (pw > 80 && !t202PercentWatched.has(80)) t202LogPercentage(80);
      if (pw > 90 && !t202PercentWatched.has(90)) t202LogPercentage(90);
      if (t202PercentWatched.has(100)) clearInterval(t202VideoPing);
    }, 5000);
  }
}

function t202LogPercentage(percentWatched) {
  t202PercentWatched.add(percentWatched);
  let fbEventProperties = {
    video_percent_watched: percentWatched,
    video_title: player.playerInfo.videoData.title,
    author: player.playerInfo.videoData.author,
    video_id: player.playerInfo.videoData.video_id,
  };

  fbEventProperties = { ...fbEventProperties, ...t202FBep };
  if (typeof fbq === 'function') {
    fbq('trackCustom', 't202PixelUtils Video View', fbEventProperties);
  }
}
