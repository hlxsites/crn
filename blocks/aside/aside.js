export default function decorate(block) {
  // add info graphic
  const infoGraphicHTML = `
  <div class="aside-block-infographic">
    <div class="aside-block-infographic-video-container"><video-js
      data-account="1596741612"
      data-player="L9X28Zj7Z"
      data-embed="default"
      controls=""
      data-application-id=""
      data-playlist-id="1650672311752128719"
      class="vjs-fluid"></video-js>
    </div>
    <script
    src="//players.brightcove.net/1596741612/L9X28Zj7Z_default/index.min.js">
    </script>
    <div class="vjs-playlist"></div>
  </div>
  `;
  const range = document.createRange();
  const infoGraphicEl = range.createContextualFragment(infoGraphicHTML);
  block.append(infoGraphicEl);

  // add sidenav Ad
  const sidenavAdHTML = `
    <!-- AD IMU  STARTS  -->

    <div class="aside-ad">
      <span class="ad-title">Advertisement</span> <br />
      <!-- /21804213519/CRN/Ros_Right_Sidebar_2 imu 2-->
      <div id="unit-1659133096504" class="tmsads"></div>
    </div>

    <br clear="all">
  `;
  const sidenavAdEl = range.createContextualFragment(sidenavAdHTML);
  block.append(sidenavAdEl);

  // add podcast playlist
  const podCastPlaylistHTML = `
  <div class="aside-block-sponsor">
    <header class="aside-header">
      <h3 class="aside-title">Tune in to our Podcast</h3>
    </header>
    <div id="" class="aside-block">
      <iframe height="700px" width="350px" frameborder="no" scrolling="no" seamless src="https://player.simplecast.com/23077a53-b41d-4595-9e62-cba9188ac2a9?dark=false&show=true"></iframe>
    </div>
  </div>
  `;
  const podCastEl = range.createContextualFragment(podCastPlaylistHTML);
  block.append(podCastEl);

  // add twitter feed
  const isAllianceArrow = window.location.href.includes('/alliances/arrow');
  const twitterHandle = isAllianceArrow ? 'arw_services' : 'IoTSolutionPro';
  const twiterHTML = `
    <div class="aside-twitter">
      <a href="https://twitter.com/${twitterHandle}" target="_blank"><img src="/icons/icon-twitter.png" alt="">
      <h3>@${twitterHandle}</h3></a>
    </div>
    <a class="twitter-timeline" data-tweet-limit="3" data-width="300" data-height="310" data-theme="light" href="https://twitter.com/${twitterHandle}?ref_src=twsrc%5Etfw">
      Tweets by ${twitterHandle}
    </a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  `;
  const twitterEl = range.createContextualFragment(twiterHTML);
  block.append(twitterEl);
  if (isAllianceArrow) {
    const linkedInHTML = `
      <div class="aside-linkedin">
        <a href="https://www.linkedin.com/showcase/arrow-intelligent-solutions/posts/?feedView=all" target="_blank"><img src="/icons/icon-linkedin.png" width="33%"  alt=""><h3>Arrow Intelligent Solutions</h3></a>
      </div>
      <div class="aside-linkedin">
        <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6886773723899158530" height="430" width="300" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
      </div>
      <div class="aside-linkedin">
          <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6882353326327926784" height="430" width="300" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
      </div>
    `;
    const linkedInEl = range.createContextualFragment(linkedInHTML);
    block.append(linkedInEl);
  }
}
