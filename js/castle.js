/**
 * Created by KSayrs17 on 6/3/2016.
 */

    /*
    * This first scene is gonna have all the persistent items that will stay on for the remainder of the game.
    * This is where the tutorial will take place.
    *
    * Currently being modified for the demo.
    *
    * */

var tutorial = ["Bienvenue!", "Dans ce jeu, vous jouez le rôle d’Yvain, un chevalier du roi Arthur.",
    "Vos choix déterminent ce qui ce passe. Pour la plupart, vous prenez vos décisions avec les boutons sous ce message.",
    "Comme tous les chevaliers, Yvain a des traits courtois. Mais, il n’est pas parfait. " +
    "Il lui manque quelques traits de caractère importants. Quelquefois, ça pose des problèmes.",
    "Dans ce jeu vous pouvez trouver aussi des points d’intérêt, signifiés par un scintillement à l’ecran. " +
    "Les points d’intérêt seront sur des images; donc, faites attention!",
    "La démo pour ce jeu commence dans une forêt en Brocéliande, après le recit de Calogrenant. " +
    "Yvain a trouvé le lieu où il va venger son cousin."];

var ccy = 0;
var messagez = 0;
var tbz = 0;
var tby = 0;

var clicked = false;
var menuhold = [];

var menuButton;
// var statehold = [];

/* ************************************ CASTLE SCENE ******************************************* */
Crafty.defineScene("Castle", function() {
    Crafty.background("url("+path+"brocloarge2.png) no-repeat top"); // will be a castle scene in the final version
    saveScene = "Castle";
    Crafty.log("saveScene: " + saveScene);

    //statehold.push(choiceContainer, textbox, menuButton);

    // ////////////////////// MENU //////////////////////////////////////////
    menuButton = Crafty.e("DOM, Hover, Persist")
        .attr({w:142, h:40, x:10, y:10, z:messagez})
        .image(path+"menubut1.png")
        .setHover(path+"menubut2.png")
        .bind("SH", function(bool){
            this.attr({visible: bool});
            menutext.attr({visible:bool})
        })
        .bind("Click", function(){
            if(clicked == true){

                // destroy the menu
                for (var i = 0; i < menuhold.length; i++) {
                    menuhold[i].destroy();
                }
                clicked = false; // update
                Crafty.log(clicked)
            }
            else {
                menuhold = [
                    // transparent black
                    Crafty.e("2D, DOM, Color")
                        .attr({w: Crafty.viewport.width, h: Crafty.viewport.height, x: 0, y: 0, z:messagez+2})
                        .color('black', 0.6),

                    // menu background
                    Crafty.e("2D, Image, DOM, Mouse")
                        .attr({x: 0, y: 0, z: 98})
                        .image(path+"menu3.png"),

                    // POI button
                    Crafty.e("2D, Hover")
                        .attr({z: 99})
                        .image(path+"pointds2.png")
                        .setHover(path+"pointdl2.png")
                        .place(220, 250)
                        .bind("Click", function(){
                            Crafty.enterScene("CollectedPOI");
                        }),

                    // Traits Button
                    Crafty.e("Hover")
                        .attr({z: 99})
                        .image(path+"traitss.png")
                        .setHover(path+"traitsl.png")
                        .place(330, 320)
                        .bind("Click", function(){
                            Crafty.enterScene("Traits");
                        }),

                    // close button
                    Crafty.e("2D, Hover")
                        .attr({z: 99})
                        .image(path+"retours.png")
                        .setHover(path+"retourl.png")
                        .place(300, 600)
                        .bind("Click", function () {
                            clicked = false; // update
                            for (var i = 0; i < menuhold.length; i++) {
                                menuhold[i].destroy(); // destroy the menu
                            }
                        })
                ]; //menuhold
                clicked = true; // update
                Crafty.log(clicked)
            } //else
        }); // Click bind

    var menutext = Crafty.e("ButtonText, Persist")
        .text("Menu")
        .associate(menuButton)
        .attr({w:140, h:40, x:12, y:12});

    ///////////////////////////////////////////// OTHER //////////////////////////////////////////////////

    // box for choices
    var choiceContainer = Crafty.e("2D, Canvas, Image, Persist, Mouse")
        .attr({w:800, h:250, y:550})
        .image(path+"testbgbox4.png")
        .bind("showHide", function(bool){
            this.attr({visible: bool});
            textbox.attr({visible: bool});
            menutext.attr({visible: bool});
            menuButton.attr({visible: bool});
        })
        .bind("destroyState", function(){
            menuButton.destroy();
            textbox.destroy();
            menutext.destroy();
            this.destroy();
        });

    ccy = choiceContainer._y;

    // give it a choice!! =D

    // THIS IS THE FUTURE
    /* Crafty.e("Next").onClick(function(){
        msg.iterateText();
    }); */

    // THIS IS THE PAST/CURRENTLY WORKING ONE
    var next = Crafty.e("PlainButton")
        .setPosition("two"); // will be one not in demo

    var text1 = Crafty.e("ButtonText")
        .text("Continuer")
        .associate(next)
        .place()
        .bind("Click", function(){
            // added for demo //
            if(msg._i+1 == msg._textarray.length){
                text1.text("Commencer");
            }
            if(msg._i == msg._textarray.length){
                Crafty.enterScene("Fontaine");
            }
            // end addition //
            msg.iterateText();
        });

    // textbox
    var textbox = Crafty.e("2D, Canvas, Color, Persist")
        .attr({w:800, h:150, y:800-choiceContainer.h-150})
        .color('black', 0.7);
    tbz = textbox._z;
    tby = textbox._y;

    //text on screen
    var msg = Crafty.e("MSG")
        .textBlock(tutorial);

    msg.iterateText();
    messagez = msg._z;

}); // "Castle"
