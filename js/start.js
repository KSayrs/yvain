/**
 * Created by KSayrs17 on 6/2/2016.
 */

var saveScene = "";
var path = "img/";
// var path = "../src/img/";

Crafty.defineScene("StartMenu", function() {
    Crafty.background("url(" + path + "wall2.png) no-repeat top");
    saveScene = "StartMenu";
    Crafty.log("saveScene: " + saveScene);
    // YVAIN
    Crafty.e("2D, Canvas, Image")
        .attr({x:0, y:200, w:Crafty.viewportWidth, h:Crafty.viewportHeight})
        .image(path + "YVAIN2.png");

    var enter = Crafty.e("SceneChange")
        .attr({w:Crafty.viewportWidth, h: Crafty.viewportHeight, x:(800-400)/2, y:500})
        .image(path + "startbut1.png")
        .setHover(path + "startbut1down.png")
        .setNewScene("Castle");

    Crafty.e("ButtonText")
        .text("Démarrage")
        .textFont({size: "30px"})
        .textColor("#a6a6a6")
        .associate(enter, "sceneChange")
        .place()
        .css({"text-shadow": "1px 1px 4px #262626"})
        .attr({y:502});
});
