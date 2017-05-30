/**
 * Created by Katyana on 6/15/2016.
 *
 * Fontaine, FontaineClose, fade()
 *
 */

/* ****************** Fontaine ************************ */

Crafty.defineScene("Fontaine", function() {
    saveScene = "Fontaine";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url("+path+"brocloarge2.png) no-repeat top");

    Crafty.audio.play("birds",-1, 1.0);
    Crafty.audio.play("stream",-1, 1.0);

    var entermsg = [
        y+ "J’ai suivi le chemin dont Calogrenant nous a parlé… Oui, cela ne fait aucun doute. C’est la fontaine.",
        y+"Il a dit que le chevalier était arrivé quand il avait versé l’eau de la fontaine sur l’émeraude."];

    var msg = Crafty.e("MSG")
        .textBlock(entermsg);
    msg.iterateText();

    // buttons //
    var next = Crafty.e("PlainButton")
        .setPosition("one");

    var text1 = Crafty.e("ButtonText")
        .text("Continuer")
        .associate(next)
        .place()
        .bind("Click", function(){
            msg.iterateText();
        });

    var closer = Crafty.e("SceneChange")
        .setNewScene("FontaineClose")
        .setPosition("two");

    var text2 = Crafty.e("ButtonText")
        .text("Examiner la fontaine")
        .associate(closer)
        .place();

    var back = Crafty.e("PlainButton")
        .setPosition("three");

    var text3 = Crafty.e("ButtonText")
        .text("Examiner la chapelle")
        .associate(back)
        .place()
        .bind("Click", function(){
            msg.changeText("Une petite belle chapelle. Elle est fermée.");
        });

    // how to set a POI
    if(!collected.hasOwnProperty("L'Émeraude")) {
        var st = Crafty.e("POI")
            .attr({x:480, y:250})
            .addPS("L'Émeraude", {
                name: "L'Émeraude",
                description: "Selon les croyances anciennes l’émeraude préserverait l’amour et serait " +
                "aussi le symbole de l’espoir et du renouveau. Certaines croyances racontent que les émeraudes sont sensibles à " +
                "l’énergie sexuelle. L’émeraude est une pierre dite « féminine » de nature assez mystérieuse associée à la " +
                "fécondité et au cycle lunaire.",
                stats: "+1 sagesse"
            }, "Sagesse", 1);
    }
});


/* *************************** FontaineClose **************************** */
Crafty.defineScene("FontaineClose", function() {
    saveScene = "FontaineClose";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url("+path+ "broclose.png) no-repeat top");

    var entermsg = ["Il avait raison - la fontaine bouillonne, comme si l'eau bouillait. " +
    "l y a un bassin d’or pendu au beau pin. Et, voilà - l’émeraude avec les quatre rubis est devant elle."];

    var msg = Crafty.e("MSG")
        .textBlock(entermsg);
    msg.iterateText();

    // buttons //
    var touch = Crafty.e("PlainButton")
        .setPosition("one");

    var text1 = Crafty.e("ButtonText")
        .text("Toucher l'eau")
        .associate(touch)
        .place()
        .bind("Click", function(){
            msg.changeText("Faisant confiance à votre cousin, vous plongez la main dans l’eau qui bout. Elle est agréablement fraîche.")
        });

    var arroser = Crafty.e("PlainButton")
        .setPosition("two");

    var canFade = false;

    var text2 = Crafty.e("ButtonText")
        .text("Arroser l'émeraude")
        .associate(arroser)
        .place()
        .bind("Click", function(){
            Crafty.audio.stop();
            Crafty.audio.play("storm");
            var cframe = Crafty.frame();
            var val = 1.0;
            var cval = 0.6;
            var blue = Crafty.e("2D, Canvas, Color")
                .attr({w:800,h:800,z:-2})
                .color("#262626", 0.6);
            var square = Crafty.e("2D, Canvas, Color")
                .color("white")
                .attr({w:800, h:800, z:-1})
                .bind("EnterFrame", function(){
                    // Crafty.log(Crafty.frame());
                    if(Crafty.frame() % 7 == 0){
                        this.attr({visible: false})
                    }
                    if(Crafty.frame() % 23 == 0){
                        this.attr({visible: true})
                    }
                    if(Crafty.frame() - cframe > 200){
                        canFade = true;
                        this.attr({visible:false});
                    }
                    if(canFade){
                        if(val > 0.0) {
                            fade("storm", val);
                            blue.color("#262626", cval);
                            if (Crafty.frame() % 20 == 0) {
                                val -= 0.1;
                                cval -= 0.05; }
                        }
                        else {
                            this.destroy();
                            blue.destroy();
                            Crafty.audio.stop();
                            Crafty.audio.play("birds", 0.6);
                            Crafty.enterScene("GateTrap")
                        }
                    }
                });
            msg.attr({visible: false});
            //msg.changeText("-orage-"); // placeholder, this will trigger a new scene - the thunderstrom-to-combat scene
        });

    var retour = Crafty.e("SceneChange")
        .setPosition("three")
        .setNewScene('Fontaine');

    var text3 = Crafty.e("ButtonText")
        .text("Retourner")
        .associate(retour)
        .place();
});

/* Gradually fade out audio/reduce volume
*
* This will be moved
* */

var fade = function(id, val){
    if(!(0<=val<=1.0)){
        Crafty.log("wrong value");
        return;
    }
    for (var i in Crafty.audio.channels) {
        if (Crafty.audio.channels[i]._is(id)){
            Crafty.audio.channels[i].obj.volume = val;
        }
    }
};
