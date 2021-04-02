////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

/*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload() {
    toggleLoader(true);

    checkMobileEvent();

    $(window).resize(function() {
        resizeGameFunc();
    });
    resizeGameFunc();

    loader = new createjs.LoadQueue(false);
    manifest = [{
            src: 'assets/background.png',
            id: 'background'
        },
        {
            src: 'assets/logo.png',
            id: 'logo'
        },
        {
            src: 'assets/button_start.png',
            id: 'buttonStart'
        },
        {
            src: 'assets/globe.png',
            id: 'globe'
        },
        {
            src: 'assets/hub_select.png',
            id: 'hubselect'
        },
        {
            src: 'assets/hub_timer.png',
            id: 'hubTimer'
        },
        {
            src: 'assets/hub_timer_bar.png',
            id: 'hubTimerBar'
        },
        {
            src: 'assets/hub_supply_unlock.png',
            id: 'hubUnlock'
        },
        {
            src: 'assets/insturction_move.png',
            id: 'instructionMove'
        },
        {
            src: 'assets/button_twitter.png',
            id: 'buttonTwitter'
        },
        {
            src: 'assets/button_google.png',
            id: 'buttonGoogle'
        },
        {
            src: 'assets/button_facebook.png',
            id: 'buttonFacebook'
        },
        {
            src: 'assets/button_fullscreen.png',
            id: 'buttonFullscreen'
        },
        {
            src: 'assets/button_sound_on.png',
            id: 'buttonSoundOff'
        },
        {
            src: 'assets/button_sound_off.png',
            id: 'buttonSoundOn'
        },
        {
            src: 'assets/y8logo.png',
            id: 'y8logo'
        },
        {
            src: 'assets/leaderBoar_Med.png',
            id: 'leaderBoar_Med'
        },
        {
            src: 'assets/but_Submit_Score.png',
            id: 'but_Submit_Score'
        },
        {
            src: 'assets/adv_message.png',
            id: 'adv_message'
        }
    ];

    for (n = 0; n < hublock_arr.length; n++) {
        manifest.push({
            src: hublock_arr[n].image,
            id: 'hublock_' + n
        });
        manifest.push({
            src: hublock_arr[n].power,
            id: 'hublock_power_' + n
        });
        manifest.push({
            src: hublock_arr[n].indicator,
            id: 'hublock_indicator_' + n
        });
        manifest.push({
            src: hublock_arr[n].indicatorPower,
            id: 'hublock_indicator_power_' + n
        });
    }

    for (n = 0; n < hub_arr.length; n++) {
        manifest.push({
            src: hub_arr[n].image,
            id: 'hub_' + hub_arr[n].type
        });
        manifest.push({
            src: hub_arr[n].power,
            id: 'hub_power_' + hub_arr[n].type
        });
    }

    soundOn = true;
    if ($.browser.mobile || isTablet) {
        if (!enableMobileSound) {
            soundOn = false;
        }
    }

    if (soundOn) {
        manifest.push({
            src: 'assets/sounds/music.ogg',
            id: 'music'
        });
        manifest.push({
            src: 'assets/sounds/generator.ogg',
            id: 'soundGenerator'
        });
        manifest.push({
            src: 'assets/sounds/powerup.ogg',
            id: 'soundPowerup'
        });
        manifest.push({
            src: 'assets/sounds/switch.ogg',
            id: 'soundSwitch'
        });
        manifest.push({
            src: 'assets/sounds/timer.ogg',
            id: 'soundTimer'
        });
        manifest.push({
            src: 'assets/sounds/denied.ogg',
            id: 'soundDenied'
        });
        manifest.push({
            src: 'assets/sounds/unlock.ogg',
            id: 'soundUnlock'
        });

        createjs.Sound.alternateExtensions = ["mp3"];
        loader.installPlugin(createjs.Sound);
    }

    loader.addEventListener("complete", handleComplete);
    loader.addEventListener("fileload", fileComplete);
    loader.addEventListener("error", handleFileError);
    loader.on("progress", handleProgress, this);
    loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
    var item = evt.item;
    //console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
    console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
    $('#mainLoader span').html(Math.round(loader.progress / 1 * 100) + '%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
    toggleLoader(false);
    initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con) {
    if (con) {
        $('#mainLoader').show();
    } else {
        $('#mainLoader').hide();
    }
}