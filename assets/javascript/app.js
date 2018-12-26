// loaders: [ 'babel?presets[]=react,presets[]=es2015' ]
function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }
var currentQuote = '', currentAuthor = '';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(r) {
      if (typeof r === 'string') {
       r = JSON.parse(r); 
      }
      if (Array.isArray(r)) {
       r = r[0];
      }
      currentQuote = r.quote;
      currentAuthor = r.author;
      if(inIframe())
      {
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
      }
      $(".quote-text").animate({
          opacity: 1
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#text').text(r.quote);
        });

      $(".quote-author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html(r.author);
        });
    }
  });
}
$(document).ready(function() {
  getQuote();
  $('#new-quote').on('click', getQuote);
  $('#tweet-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" -' + currentAuthor));
    }
  });
  $('#tumblr-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    }
  });
});