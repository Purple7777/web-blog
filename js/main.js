////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////
var stageW = 1280;
var stageH = 768;
var contentW = 1024;
var contentH = 576;

//y8Api variables
var s_isLogin = false;
var s_userName = 'guest';
var s_URLlocation;
var s_gameName = "hacker_challenge"
var s_isBlacklisted = false
var s_sponsor = false;
var s_iScore;
var isFirstAdPlayed = false;
var isAdShowing = false;
var isAdBlock = false;

/*!
 * 
 * START BUILD GAME - This is the function that runs build game
 * 
 */
function initMain() {
    if (!$.browser.mobile || !isTablet) {
        $('#canvasHolder').show();
    }

    initGameCanvas(stageW, stageH);
    buildGameCanvas();
    buildGameButton();

    if (!$.editor.enable) {
        goPage('main');
    } else {
        goPage('game');
        loadEditPage();
    }
    resizeCanvas();
    s_URLlocation = self.location.hostname
    console.log("s_URLlocation " + s_URLlocation)
}

/*************************Idnet *************************/
window.idAsyncInit = function() {
    // use an id.net event to wait until after init
    ID.Event.subscribe('id.init', function() {
        // use jquery to call methods on clicks
        console.log('from')
        ID.getLoginStatus(idCallback)
        ID.Protection.isBlacklisted(function(blacklisted) {
            //blacklisted = true
            s_isBlacklisted = blacklisted;
            console.log('[BLACKLIST] : ' + blacklisted);
            if (s_isBlacklisted === true) {
                gotoBlacklist()
            }

        });
        ID.Protection.isSponsor(function(sponsor) {
            //sponsor = true
            s_sponsor = sponsor;
            console.log('[SPONSOR] : ' + sponsor);
            y8LogoSponsorCheck()
        });

        //oMain.LoadData()
    });
    // using an optional callback to capture data on the client
    var userName;
    var idCallback = function(response) {
        if (response) { // That means that the server processed the response
            console.log(response);
            console.log(response.status);
            console.log('Working');
            if (response.status === 'ok') {
                userName = response.authResponse.details.nickname;
                s_userName = userName;
                if (curPage === "main") {
                    welcomeText.text = "Welcome " + s_userName;
                    s_isLogin = true;
                }
            } else if (response.status === 'not_linked') {
                ID.login(idCallback);
            }
        }
    }
    // init the JS interface
    ID.init({
        appId: '5c7fbe4bd55930a27d8b64f1'
    });
};

/**************************************************************/

var windowW = windowH = 0;
var scalePercent = 0;
var offset = {
    x: 0,
    y: 0,
    left: 0,
    top: 0
};

/*!
 * 
 * GAME RESIZE - This is the function that runs to resize and centralize the game
 * 
 */
function resizeGameFunc() {
    setTimeout(function() {
        $('.mobileRotate').css('left', checkContentWidth($('.mobileRotate')));
        $('.mobileRotate').css('top', checkContentHeight($('.mobileRotate')));

        windowW = window.innerWidth;
        windowH = window.innerHeight;

        scalePercent = windowW / contentW;
        if ((contentH * scalePercent) > windowH) {
            scalePercent = windowH / contentH;
        }

        scalePercent = scalePercent > 1 ? 1 : scalePercent;

        if (windowW > stageW && windowH > stageH) {
            if (windowW > stageW) {
                scalePercent = windowW / stageW;
                if ((stageH * scalePercent) > windowH) {
                    scalePercent = windowH / stageH;
                }
            }
        }

        var newCanvasW = ((stageW) * scalePercent);
        var newCanvasH = ((stageH) * scalePercent);

        offset.left = 0;
        offset.top = 0;

        if (newCanvasW > windowW) {
            offset.left = -((newCanvasW) - windowW);
        } else {
            offset.left = windowW - (newCanvasW);
        }

        if (newCanvasH > windowH) {
            offset.top = -((newCanvasH) - windowH);
        } else {
            offset.top = windowH - (newCanvasH);
        }

        offset.x = 0;
        offset.y = 0;

        if (offset.left < 0) {
            offset.x = Math.abs((offset.left / scalePercent) / 2);
        }
        if (offset.top < 0) {
            offset.y = Math.abs((offset.top / scalePercent) / 2);
        }

        $('canvas').css('width', newCanvasW);
        $('canvas').css('height', newCanvasH);

        $('canvas').css('left', (offset.left / 2));
        $('canvas').css('top', (offset.top / 2));

        $(window).scrollTop(0);

        resizeCanvas();
    }, 100);
}