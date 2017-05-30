/**
 * Created by KSayrs17 on 6/3/2016.
 *
 * Preload all assets at the beginning of the game.
 *
 * Character art by Aeratril: https://www.facebook.com/Aeratrilllustrations/
 *
 */

// specify paths for items
Crafty.paths({images: "img/"});
Crafty.paths({audio: "sounds/"});
// Crafty.paths({images: "../src/img/"});
// Crafty.paths({audio: "../src/sounds/"});

// items to load
var assetsObj = {
    "audio": {
        "storm": "violent-storm2.wav",
        "birds": "birds.wav",
        "stream": "stream-water-c.wav",
        "gate": "gatefall.wav",
        "trap": "trap.wav",
        "horse": "h.wav",
        "lion": "lion-lament.wav"},
    "images": ["clearing.png", "gauvain.png", "lion1.png", "tempwindow.png", "dragontemp.png", "Laudines.png", "lauinterior.png",
        "tempcastle.png", "pointdl2.png", "pointds2.png", "menu3.png", "startbut1.png", "startbut1down.png", "wall2.png",
        "poipop.png",
        "YVAIN2.png", "Close.png", "closesmall2.png", "retours.png", "retourl.png", "brocloarge2.png", "broclose.png",
        "choicebutup2.png", "choicebutdown2.png", "traitss.png", "traitsl.png", "testbgbox4.png", "menubut1.png",
        "menubut2.png"],
    "sprites": {
        "luns.png": {
            tile: 385,
            tileh:800,
            map: {
                lunette: [0,0],
                lunetteh: [1,0],
                lunettea: [2,0]
            }
        },
        "laus.png": {
            tile: 434,
            tileh:800,
            map: {
                laudine: [0,0],
                laudinea: [1,0],
                laudines: [2,0]
            }
        },
        "ys.png":{
            tile: 280,
            tileh:800,
            map: {
                yvain: [0,0],
                yvainl: [1,0]
            }
        },
        "starsheet.png": {
            // width of each img
            tile: 50,
            // height of each image
            tileh: 50,
            // map - for stills ,may not need?
            map: {
                star_start: [0,0]
            }
        }
    }
};

// init crafty canvas
Crafty.init(800, 800, document.getElementById('game'));

// load
Crafty.load(assetsObj, // preload assets
    function() {       //when loaded
        Crafty.log("loaded.");
        document.getElementById("game").innerHTML = "";
        Crafty.scene("StartMenu"); //go to start scene
    },

    function(e) { // while loading
        document.getElementById("game").innerHTML = "<div id='" + "loading'" + ">Chargement<" + "/div>";
    },

    function(e) { // uh oh, error loading
        document.getElementById("game").innerHTML = "<div id='" + "loading'" + ">Une erreur d'est produite pendant le chargement des assets.<" + "/div>";
        Crafty.log("There was an error in loading presets")
    }
);
