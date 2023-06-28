/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import {
  sampleRUM,
  buildBlock,
  loadBlock,
} from './lib-franklin.js';

function loadScript(url, attrs, body) {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  if (url) script.src = url;
  if (attrs) {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const attr in attrs) {
      script.setAttribute(attr, attrs[attr]);
    }
  }
  if (body) {
    script.type = 'text/javascript';
    script.text = body;
  }

  head.append(script);
  return script;
}

// add more delayed functionality here
function buildTopAd(main) {
  const topAdHTML = `
  <div class="top-ad">
    <span class="ad-title">Advertisement</span> <br />
    <!-- /21804213519/CRN/Ros_Top_Leader-->
    <div id="unit-1659129517463" class="tmsads"></div>
  </div>
  `;
  const range = document.createRange();
  const topAdEl = range.createContextualFragment(topAdHTML);
  const contentContainer = main.querySelector('.content-container');
  if (contentContainer) {
    contentContainer.parentNode.insertBefore(topAdEl, contentContainer);
  }
}

function buildAsideBlock(main) {
  const block = buildBlock('aside', [[]]);
  block.classList.add('block');
  block.setAttribute('data-block-name', 'aside');
  // append the aside block to either newslist-container or first non hero-header-container section
  const container = main.querySelector('.newslist-container') || main.querySelector('.hero-header-container+div.section');
  if (container) {
    container.append(block);
  }
  loadBlock(block);
}

function addMartechStack() {
  // Add Global Ads
  loadScript('https://lib.tashop.co/crn/adengine.js', {
    async: '',
    'data-tmsclient': 'CRN',
    'data-layout': 'ros',
    'data-debug': 'false',
  });
  const globalAdScript = 'window.TAS = window.TAS || { cmd: [] }';
  loadScript('', {}, globalAdScript);
  loadScript('https://securepubads.g.doubleclick.net/tag/js/gpt.js', { async: '' });

  // Add Adobe Analytics
  loadScript('https://assets.adobedtm.com/9cfdfb0dd4d0/37e7a63c5b44/launch-54eb03504761.min.js');

  // Add Google Tag Manager
  const gtmIframe = document.createElement('iframe');
  gtmIframe.classList.add('gtm-iframe');
  gtmIframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-NZJV95M';
  const gtmEl = document.createElement('noscript');
  gtmEl.append(gtmIframe);
  document.body.prepend(gtmEl);

  const gtmCode = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NZJV95M');`;

  loadScript('', {}, gtmCode);

  // Add Sourcepoint tags
  // const spTag1 = `
  //   function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(){for(var t,e,o=[],n=window,r=n;r;){try{if(r.frames.__tcfapiLocator){t=r;break}}catch(t){}if(r===n.top)break;r=n.parent}t||(function t(){var e=n.document,o=!!n.frames.__tcfapiLocator;if(!o)if(e.body){var r=e.createElement("iframe");r.style.cssText="display:none",r.name="__tcfapiLocator",e.body.appendChild(r)}else setTimeout(t,5);return!o}(),n.__tcfapi=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(!n.length)return o;"setGdprApplies"===n[0]?n.length>3&&2===parseInt(n[1],10)&&"boolean"==typeof n[3]&&(e=n[3],"function"==typeof n[2]&&n[2]("set",!0)):"ping"===n[0]?"function"==typeof n[2]&&n[2]({gdprApplies:e,cmpLoaded:!1,cmpStatus:"stub"}):o.push(n)},n.addEventListener("message",(function(t){var e="string"==typeof t.data,o={};if(e)try{o=JSON.parse(t.data)}catch(t){}else o=t.data;var n="object"===_typeof(o)?o.__tcfapiCall:null;n&&window.__tcfapi(n.command,n.version,(function(o,r){var a={__tcfapiReturn:{returnValue:o,success:r,callId:n.callId}};t&&t.source&&t.source.postMessage&&t.source.postMessage(e?JSON.stringify(a):a,"*")}),n.parameter)}),!1))}();
  // `;
  // loadScript('', {}, spTag1);
  // const spTag2 = `
  //   (function () { var e = false; var c = window; var t = document; function r() { if (!c.frames["__uspapiLocator"]) { if (t.body) { var a = t.body; var e = t.createElement("iframe"); e.style.cssText = "display:none"; e.name = "__uspapiLocator"; a.appendChild(e) } else { setTimeout(r, 5) } } } r(); function p() { var a = arguments; __uspapi.a = __uspapi.a || []; if (!a.length) { return __uspapi.a } else if (a[0] === "ping") { a[2]({ gdprAppliesGlobally: e, cmpLoaded: false }, true) } else { __uspapi.a.push([].slice.apply(a)) } } function l(t) { var r = typeof t.data === "string"; try { var a = r ? JSON.parse(t.data) : t.data; if (a.__cmpCall) { var n = a.__cmpCall; c.__uspapi(n.command, n.parameter, function (a, e) { var c = { __cmpReturn: { returnValue: a, success: e, callId: n.callId } }; t.source.postMessage(r ? JSON.stringify(c) : c, "*") }) } } catch (a) { } } if (typeof __uspapi !== "function") { c.__uspapi = p; __uspapi.msgHandler = l; c.addEventListener("message", l, false) } })();
  // `;
  // loadScript('', {}, spTag2);
  // const spTag3 = `
  //   window._sp_queue = [];
  //   window._sp_ = {
  //       config: {
  //           accountId: 1852,
  //           baseEndpoint: 'https://cdn.privacy-mgmt.com',
  //           ccpa: { },
  //           gdpr: { },
  //           events: {
  //               onMessageChoiceSelect: function() {
  //                   console.log('[event] onMessageChoiceSelect', arguments);
  //               },
  //               onMessageReady: function() {
  //                   console.log('[event] onMessageReady', arguments);
  //               },
  //               onMessageChoiceError: function() {
  //                   console.log('[event] onMessageChoiceError', arguments);
  //               },
  //               onPrivacyManagerAction: function() {
  //                   console.log('[event] onPrivacyManagerAction', arguments);
  //               },
  //               onPMCancel: function() {
  //                   console.log('[event] onPMCancel', arguments);
  //               },
  //               onMessageReceiveData: function() {
  //                   console.log('[event] onMessageReceiveData', arguments);
  //               },
  //               onSPPMObjectReady: function() {
  //                   console.log('[event] onSPPMObjectReady', arguments);
  //               },
  //               onConsentReady: function (consentUUID, euconsent) {
  //                   console.log('[event] onConsentReady', arguments);
  //               },
  //               onError: function() {
  //                   console.log('[event] onError', arguments);
  //               },
  //           }
  //       }
  //   }
  // `;
  // loadScript('', {}, spTag3);
  // loadScript('https://cdn.privacy-mgmt.com/unified/wrapperMessagingWithoutDetection.js', { async: '' });

  // Add FunnelFuel Tag
  // const funnelFuel = `
  //   var _paq = window._paq = window._paq || [];
  //   /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  //   _paq.push(['trackPageView']);
  //   _paq.push(['enableLinkTracking']);
  //   (function() {
  //     var u="//analytics.funnelfuel.io/";
  //     _paq.push(['setTrackerUrl', u+'js/tracker.php']);
  //     _paq.push(['setSiteId', '7']);
  //     var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  //     g.async=true; g.src=u+'js/tracker.php'; s.parentNode.insertBefore(g,s);
  //   })();
  // `;
  // loadScript('', {}, funnelFuel);
}

/**
 * Build delayed auto blocks in a container element.
 * @param {Element} main The container element
 */
function buildDelayedAutoBlocks(main) {
  try {
    buildAsideBlock(main);
    buildTopAd(main);
    addMartechStack();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Delayed Auto Blocking failed', error);
  }
}

buildDelayedAutoBlocks(document.querySelector('main'));

// Core Web Vitals RUM collection
sampleRUM('cwv');
