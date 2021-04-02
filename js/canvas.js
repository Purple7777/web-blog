////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW = 0;
var canvasH = 0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w, h) {
    var gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.width = w;
    gameCanvas.height = h;

    canvasW = w;
    canvasH = h;
    stage = new createjs.Stage("gameCanvas");

    createjs.Touch.enable(stage);
    stage.enableMouseOver(20);
    stage.mouseMoveOutside = true;

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, stageContainer, stageAnnounceContainer, hubContainer, lineContainer, resultContainer;
var guideline, background, logo, buttonStart, resultTitleTxt, resultStageTxt, resultShareTxt, buttonFacebook, buttonTwitter, buttonGoogle, buttonReplay, buttonFullscreen, buttonSoundOn, buttonSoundOff;
var globe, stageDisplayTxt, stageShape, hubselect, hubTimer, hubTimerBar, hubUnlock, instructionMove;

var y8logoGameOver, y8logo, welcomeText, LeaderboardBtn, LeaderboardBtn1, scoreText, TotalScoreText, scoreGame, totalScoreGame;

$hub = {};
$hubType = {};
$line = {};
$point = {};
$lineContainer = {};
$pointContainer = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    hubContainer = new createjs.Container();
    lineContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    stageContainer = new createjs.Container();
    stageAnnounceContainer = new createjs.Container();
    resultContainer = new createjs.Container();

    background = new createjs.Bitmap(loader.getResult('background'));

    logo = new createjs.Bitmap(loader.getResult('logo'));
    buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
    centerReg(buttonStart);
    createHitarea(buttonStart);
    buttonStart.x = canvasW / 2;
    buttonStart.y = canvasH / 100 * 60;

    globe = new createjs.Bitmap(loader.getResult('globe'));
    stageDisplayTxt = new createjs.Text();
    stageDisplayTxt.font = "50px source_code_proregular";
    stageDisplayTxt.color = "#fff";
    stageDisplayTxt.text = resultText;
    stageDisplayTxt.textAlign = "center";
    stageDisplayTxt.textBaseline = 'alphabetic';
    stageDisplayTxt.x = canvasW / 2;
    stageDisplayTxt.y = canvasH / 100 * 50;
    stageAnnounceContainer.visible = false;

    instructionMove = new createjs.Bitmap(loader.getResult('instructionMove'));

    stageShape = new createjs.Shape();

    hubselect = new createjs.Bitmap(loader.getResult('hubselect'));
    centerReg(hubselect);
    createHitarea(hubselect);
    hubselect.x = -200;

    hubTimer = new createjs.Bitmap(loader.getResult('hubTimer'));
    centerReg(hubTimer);
    createHitarea(hubTimer);
    hubTimer.x = -200;

    hubTimerBar = new createjs.Bitmap(loader.getResult('hubTimerBar'));
    centerReg(hubTimerBar);
    createHitarea(hubTimerBar);
    hubTimerBar.x = -200;

    hubUnlock = new createjs.Bitmap(loader.getResult('hubUnlock'));
    centerReg(hubUnlock);
    hubUnlock.x = -200;

    for (n = 0; n < hublock_arr.length; n++) {
        $hubType['hublock_' + n] = new createjs.Bitmap(loader.getResult('hublock_' + n));
        centerReg($hubType['hublock_' + n]);
        createHitarea($hubType['hublock_' + n]);

        $hubType['hublock_power_' + n] = new createjs.Bitmap(loader.getResult('hublock_power_' + n));
        centerReg($hubType['hublock_power_' + n]);
        createHitarea($hubType['hublock_power_' + n]);

        $hubType['hublock_indicator_' + n] = new createjs.Bitmap(loader.getResult('hublock_indicator_' + n));
        centerReg($hubType['hublock_indicator_' + n]);
        createHitarea($hubType['hublock_indicator_' + n]);

        $hubType['hublock_indicator_power_' + n] = new createjs.Bitmap(loader.getResult('hublock_indicator_power_' + n));
        centerReg($hubType['hublock_indicator_power_' + n]);
        createHitarea($hubType['hublock_indicator_power_' + n]);

        $hubType['hublock_' + n].x = -200;
        $hubType['hublock_power_' + n].x = -200;
        $hubType['hublock_indicator_' + n].x = -200;
        $hubType['hublock_indicator_power_' + n].x = -200;

        gameContainer.addChild($hubType['hublock_' + n], $hubType['hublock_power_' + n], $hubType['hublock_indicator_' + n], $hubType['hublock_indicator_power_' + n]);
    }

    for (n = 0; n < hub_arr.length; n++) {
        $hubType[n] = new createjs.Bitmap(loader.getResult('hub_' + hub_arr[n].type));
        centerReg($hubType[n]);
        createHitarea($hubType[n]);

        $hubType['power' + n] = new createjs.Bitmap(loader.getResult('hub_power_' + hub_arr[n].type));
        centerReg($hubType['power' + n]);
        createHitarea($hubType['power' + n]);

        $hubType[n].x = -200;
        $hubType['power' + n].x = -200;

        gameContainer.addChild($hubType[n], $hubType['power' + n]);
    }

    resultTitleTxt = new createjs.Text();
    resultTitleTxt.font = "50px source_code_proregular";
    resultTitleTxt.color = "#ccc";
    resultTitleTxt.text = resultText;
    resultTitleTxt.textAlign = "center";
    resultTitleTxt.textBaseline = 'alphabetic';
    resultTitleTxt.x = canvasW / 2;
    resultTitleTxt.y = canvasH / 100 * 30;

    resultStageTxt = new createjs.Text();
    resultStageTxt.font = "100px source_code_proregular";
    resultStageTxt.color = "#ffffff";
    resultStageTxt.text = resultStageText;
    resultStageTxt.textAlign = "center";
    resultStageTxt.textBaseline = 'alphabetic';
    resultStageTxt.x = canvasW / 2;
    resultStageTxt.y = canvasH / 100 * 43;

    buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
    buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
    buttonGoogle = new createjs.Bitmap(loader.getResult('buttonGoogle'));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonGoogle);
    createHitarea(buttonGoogle);
    buttonFacebook.x = canvasW / 100 * 42;
    buttonTwitter.x = canvasW / 2;
    buttonGoogle.x = canvasW / 100 * 58;
    buttonFacebook.y = buttonTwitter.y = buttonGoogle.y = canvasH / 100 * 63;

    resultShareTxt = new createjs.Text();
    resultShareTxt.font = "30px source_code_proregular";
    resultShareTxt.color = "#ffffff";
    resultShareTxt.text = shareText;
    resultShareTxt.textAlign = "center";
    resultShareTxt.textBaseline = 'alphabetic';
    resultShareTxt.x = canvasW / 2;
    resultShareTxt.y = canvasH / 100 * 55;

    buttonReplay = new createjs.Bitmap(loader.getResult('buttonStart'));
    centerReg(buttonReplay);
    createHitarea(buttonReplay);
    buttonReplay.x = canvasW / 2;
    buttonReplay.y = canvasH / 100 * 78;

    buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
    centerReg(buttonSoundOff);
    buttonSoundOn.visible = false;

    mainContainer.addChild(logo, buttonStart);
    stageAnnounceContainer.addChild(globe, stageDisplayTxt);
    stageContainer.addChild(lineContainer, hubContainer);
    gameContainer.addChild(hubselect, hubTimer, hubTimerBar, hubUnlock, stageShape, stageContainer, instructionMove, stageAnnounceContainer);
    resultContainer.addChild(resultTitleTxt, resultStageTxt, buttonReplay);
    if (shareEnable) {
        //resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonGoogle);	
    }

    if (guide) {
        guideline = new createjs.Shape();
        guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH);
    }
    canvasContainer.addChild(background, mainContainer, gameContainer, resultContainer, buttonFullscreen, buttonSoundOn, buttonSoundOff, guideline);
    stage.addChild(canvasContainer);

    y8logo = new createjs.Bitmap(loader.getResult("y8logo"));
    centerReg(y8logo);
    y8logo.x = canvasW / 100 * 10;
    y8logo.y = canvasH / 100 * 95;
    welcomeText = new createjs.Text();
    welcomeText.font = "30px source_code_proregular";
    welcomeText.color = "#ffffff";
    welcomeText.text = "Welcome " + s_userName;
    welcomeText.textAlign = "center";
    welcomeText.x = canvasW / 2;
    welcomeText.y = canvasH / 100 * 30;
    mainContainer.addChild(welcomeText, y8logo);
    y8logoGameOver = new createjs.Bitmap(loader.getResult("y8logo"));
    centerReg(y8logoGameOver);
    y8logoGameOver.x = canvasW / 100 * 10;
    y8logoGameOver.y = canvasH / 100 * 95;

    LeaderboardBtn = new createjs.Bitmap(loader.getResult("leaderBoar_Med"));
    centerReg(LeaderboardBtn);
    createHitarea(LeaderboardBtn);
    LeaderboardBtn.x = canvasW / 2
    LeaderboardBtn.y = canvasH / 100 * 63;

    LeaderboardBtn1 = new createjs.Bitmap(loader.getResult("but_Submit_Score"));
    centerReg(LeaderboardBtn1);
    createHitarea(LeaderboardBtn1);
    LeaderboardBtn1.x = canvasW / 2
    LeaderboardBtn1.y = canvasH / 100 * 63;
    resultContainer.addChild(y8logoGameOver, LeaderboardBtn, LeaderboardBtn1);

    scoreGame = 0;
    totalScoreGame = 0;
    scoreText = new createjs.Text();
    scoreText.font = "30px source_code_proregular";
    scoreText.color = "#ffffff";
    scoreText.text = "Score " + scoreGame;
    scoreText.textAlign = "left";
    scoreText.x = canvasW / 100 * 5;
    scoreText.y = canvasH / 100 * 95;

    TotalScoreText = new createjs.Text();
    TotalScoreText.font = "30px source_code_proregular";
    TotalScoreText.color = "#ffffff";
    TotalScoreText.text = "Total Score " + totalScoreGame;
    TotalScoreText.textAlign = "right";
    TotalScoreText.x = canvasW / 100 * 95;
    TotalScoreText.y = canvasH / 100 * 95;
    gameContainer.addChild(scoreText, TotalScoreText);

    TotalScoreResultText = new createjs.Text();
    TotalScoreResultText.font = "30px source_code_proregular";
    TotalScoreResultText.color = "#ffffff";
    TotalScoreResultText.text = "Total Score " + totalScoreGame;
    TotalScoreResultText.textAlign = "center";
    TotalScoreResultText.x = canvasW / 2;
    TotalScoreResultText.y = canvasH / 100 * 47;
    resultContainer.addChild(TotalScoreResultText);

    resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */

function gotoBlacklist() {
    console.log("gotoBlacklist")
    stopGame()
    gameContainer.visible = false;
    mainContainer.visible = false;
    var graphics = new createjs.Graphics().beginFill("#FFFFFF").drawRect(0, 0, canvasW, canvasH / 4 + 50);
    var shape = new createjs.Shape(graphics)
    var tempText1 = new createjs.Text("This website is blacklisted, please go to ", "bold 30px Arial", "#000")
    var tempText2 = new createjs.Text("to play this game. If you are a website owner,\n please unblock games link and request y8.com\n to remove your website from blacklisted list", "bold 30px Arial", "#000")
    //var tempText3 = new createjs.Text("", "bold 22px "+FONT2, "#000")
    var _blackListText = new createjs.Text("", "bold 30px Arial", "#990000");
    tempText1.textAlign = 'center';
    tempText2.textAlign = 'center';
    tempText2.textAlign = 'center';
    _blackListText.textAlign = 'center';
    shape.x = 0;
    shape.y = canvasH - 170;
    shape.alpha = .5
    tempText1.x = canvasW / 2;
    tempText1.y = canvasH - 160;
    _blackListText.x = canvasW / 2;
    _blackListText.y = tempText1.y + 30
    tempText2.x = canvasW / 2;
    tempText2.y = tempText1.y + 60
    var y8logoBlacklist = new createjs.Bitmap(loader.getResult("y8logo"));

    stage.addChild(shape)
    stage.addChild(tempText1);
    stage.addChild(tempText2);
    stage.addChild(_blackListText);
    stage.addChild(y8logoBlacklist)
    centerReg(y8logoBlacklist);
    y8logoBlacklist.x = canvasW / 2;
    y8logoBlacklist.y = canvasH / 2 + 170;

    stage.addEventListener("click", _blackListClick)
}

function _blackListClick() {

}

function showMessage() {
    console.log('showMessage')
    isAdBlock = false;
    // var messBox = new createjs.Bitmap(loader.getResult("adv_message"));
    // centerReg(messBox);
    // createHitarea(messBox);
    // messBox.x = canvasW / 2;;
    // messBox.y = canvasH / 2;
    // messBox.visible = true;
    // stage.addChild(messBox)
    // messBox.addEventListener("click", function() {
    //     console.log('messBox click')
    //     stage.removeChild(messBox)
    //     messBox = null;
    //     oSprite = null;
    // })
}

function resizeCanvas() {
    if (canvasContainer != undefined) {
        buttonSoundOn.x = buttonSoundOff.x = canvasW - offset.x;
        buttonSoundOn.y = buttonSoundOff.y = offset.y;
        buttonSoundOn.x = buttonSoundOff.x -= 40;
        buttonSoundOn.y = buttonSoundOff.y += 40;

        buttonFullscreen.x = buttonSoundOn.x + 6500;
        buttonFullscreen.y = buttonSoundOn.y;
    }
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
function removeGameCanvas() {
    stage.autoClear = true;
    stage.removeAllChildren();
    stage.update();
    createjs.Ticker.removeEventListener("tick", tick);
    createjs.Ticker.removeEventListener("tick", stage);
}

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */
function tick(event) {
    updateGame();
    stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj) {
    obj.regX = obj.image.naturalWidth / 2;
    obj.regY = obj.image.naturalHeight / 2;
}

function createHitarea(obj) {
    obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}