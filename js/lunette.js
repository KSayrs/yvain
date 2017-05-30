/**
 * Created by KSayrs17 on 7/19/2016.
 */

/*
*  Lion, Despair, Lunette, SaveLunette
* */

/* ****************************** Lion **************************** */

Crafty.defineScene("Lion", function() {
    saveScene = "Lion";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url(" + path + "clearing.png) no-repeat top");
    var b = Crafty.e("2D, Canvas, Color")
        .attr({w: 800, h: 800, z: -1})
        .color("black");

    var msg = Crafty.e("MSG")
        .attr({visible: false}); // hide for now

    fadeout(b, function () {
        msg.attr({visible: true});
        msg.changeText("Qu'est-ce que c'est?");
        Crafty.audio.play("lion");
    });

    // next button
    var next = Crafty.e("PlainButton")
        .setPosition("two");
    var text1 = Crafty.e("ButtonText")
        .text("???")
        .associate(next)
        .place()
        .bind("Click", function () {
            Crafty.audio.stop();
            Crafty.background("url(" + path + "dragontemp.png) no-repeat top");
            msg.changeText("Je dois agir!");
            next.destroy();
            text1.destroy();
            t1.SHbutton(true);
            t2.SHbutton(true);
            t3.SHbutton(true);
        });

    // do something
    var one = Crafty.e("PlainButton")
        .setPosition("one");
    var t1 = Crafty.e("ButtonText")
        .text("Aider le dragon")
        .associate(one)
        .place()
        .one("Click", function () {
            Crafty.background("black");
            t2.SHbutton(false);
            t3.SHbutton(false);
            msg.changeText("Le dragon vous mange. GAME OVER");
            t1.text("Réessayer");
            t1.bind("Click", function(){  // DEATH
                Crafty.enterScene("Lion"); // restart the scene
            })
        });
    var two = Crafty.e("PlainButton")
        .setPosition("two");
    var t2 = Crafty.e("ButtonText")
        .text("Aider le Lion")
        .associate(two)
        .place()
        .one("Click", function () {
            Crafty.background("black");
            t1.SHbutton(false);
            t3.SHbutton(false);
            msg.changeText("Le lion va vous suivre désormais, en reconnaissance de votre aide. (+1 pitié, +1 prouesse)");
            haslion = true;
            t2.text("Continuer à errer");
            t2.bind("Click", function(){
                Crafty.enterScene("Despair"); // move on
            })
        });
    var three = Crafty.e("PlainButton")
        .setPosition("three");
    var t3 = Crafty.e("ButtonText")
        .text("Fuir")
        .associate(three)
        .place()
        .one("Click", function () {
            t1.SHbutton(false);
            t2.SHbutton(false);
            three.setPosition("two");
            t3.text("Continuer...");
            statlist["Prouesse"]--;
            statlist["Pitié"]--;
            Crafty.background("black");
            t3.bind("Click", function(){
                Crafty.enterScene("Despair")
            });
            msg.changeText("Après avoir choisi de ne pas participer, vous avez pris la fuite à la hâte.  À présent, " +
                "vous vous trouvez devant la fontaine. (-1 prouesse, -1 pitié)");
        });

    // invisible at first
    t1.SHbutton(false);
    t2.SHbutton(false);
    t3.SHbutton(false);

}); //end Lion

/* ****************************** Despair **************************** */

Crafty.defineScene("Despair", function() {
    menuButton.trigger("SH", false); // change how this works
    saveScene = "Despair";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url("+path+"brocloarge2.png) no-repeat top");
    var b = Crafty.e("2D, Canvas, Color")
        .attr({w: 800, h: 800, z: -1})
        .color("black");

    var msg = Crafty.e("MSG")
        .attr({visible: false}); // hide for now

    fadeout(b, function () {
        menuButton.trigger("SH", false);
        Crafty.audio.play("Lion");
        msg.attr({visible: true});
        msg.changeText("La fontaine... Laudine...");
        var f = Crafty.frame();
        var z = Crafty.e("2D, Canvas, Color")
            .attr({w:800,h:800, visible:false, z:-1})
            .color("red", 0.6)
            .bind("EnterFrame", function(){
                if(Crafty.frame()-f >50){
                    this.attr({visible:true});
                    msg.changeText("Ah!");
                }
                if(Crafty.frame()-f>100){
                    msg.attr({visible:false});
                    this.unbind("EnterFrame");
                    fadeblack(false, function() {
                        menuButton.trigger("SH", false);
                        z.destroy();
                        Crafty.audio.stop();

                        Crafty.enterScene("Lunette");
                    })
                }
            });
    });

}); //end Despair

/* ****************************** Lunette ****************************
* Yvain, maybe
* */

Crafty.defineScene("Lunette", function() {
    saveScene = "Lunette";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url(" + path + "brocloarge2.png) no-repeat top");

    var b = Crafty.e("2D, Canvas, Color")
        .attr({w: 800, h: 800, z: -1})
        .color("black");

    var dialogue = [
        y+ "Qu’est-ce que j’attends? Je mérite la mort. J'ai trahi celle qui a fait mon bonheur et c'est" +
        " à cause de moi que mon lion fidèle souffre autant. Je suis la source de mon propre désespoir. Je suis indigne de la joie.",
        who+"Dieu, que vois-je là? Qui donc se lamente ainsi?",
        y+"(la chapelle?) Et vous, qui êtes-vous?",
        who+"Je suis une captive, la créature la plus misérable qui soit.",
        y+"Silence, ingrate! On ne peut pas comparer votre douleur à la mienne.",
        who+"Pardieu, je sais bien que vous souffrez, mais moi, je suis prisonnière. Vous, par contre, vous êtes libre. " +
        "Et voici le sort qui m’attend: demain, on viendra me chercher ici et on me tuera sur un bûcher.",
        y+"Ah, Dieu, quel est votre crime?",
        who+"Sire chevalier, je suis prisonnière parce qu’on m’accuse de trahison, et je ne trouve personne pour me sauver. Je suis innocente!",
        y+" À mon avis, ma douleur et mon affliction sont plus grandes que votre chagrin, car le premier venu pourrait " +
        "vous sauver, et vous ne seriez pas tuée.",
        who+"Certes, mais je ne sais encore qui le fera: il n’y a jusqu’ici que deux hommes qui osent se battre contre trois combattants.",
        y+"Quoi? Par Dieu, ils sont trois?",
        who+"Oui, sire, trois m’accusent de trahison.",
        y+"Et qui sont ceux que vous avez mentionnés?",
        who+"Messire Gauvain, et messire Yvain, à cause de qui je suis dans ce piège mortel.",
        y+"Ah bon?? Eh bien, alors, vous ne mourrez pas sans lui. Je suis Yvain, à cause de qui vous êtes là, et " +
        "vous êtes Lunette, je crois, celle qui m’a caché - vous m’avez sauvé la vie! Mais dites-moi, douce amie, qui " +
        "sont ceux qui vous accusent de trahison et vous tiennent prisonnière dans ce cachot?",
        lun+"C'est à cause de vous, Messire Yvain.",
        lun+"Quand vous avez dépassé le délai fixé pour votre retour auprès de ma dame, elle m'a blamée. Le sénéchal, " +
        "un félon, a profité de l'occasion pour m'accuser d'avoir trahi Laudine par amour de vous, Messire.",
        lun+"Pour me défendre, j'ai déclaré, sans réfléchir, que je me ferais défendre par un chevalier opposé à trois " +
        "adversaires. On m'a accordé cette épreuve. Alors, j'attends mon champion. Je dois en trouver un dans un délai d'un mois.",
        y+"Et messire Gauvain, le franc, le doux, où est-il donc? Il est toujours prêt à servir les demoiselles en danger.",
        lun+"Gauvain m'aurait aidé s'il n'était pas déjà occupé. Le roi Arthur l'a envoyé à la recherche de la reine, " +
        "Guenièvre, qui vient d’être enlevée. C'est une rude aventure pour lui.",
        lun+"Hélas, demain, je mourrai, faute de trouver un champion.",
        y+"Vous ne mourrez pas, ce n’est pas juste! Demain, je risquerai ma vie pour vous délivrer: " +
        "c’est pour moi un devoir. Mais ne révélez pas qui je suis!",
        lun+"Dieu merci! Aucun tourment ne me ferait révéler votre nom. Mais…",
        lun+"à bien y réfléchir…c’est une mauvaise idée.",
        lun+"C’est trop dangereux pour vous;  le combat serait trop terrible, contre trois. Je vous supplie de ne pas revenir pour moi.",
        y+"Belle amie, vous avez tant fait pour moi que je ne dois pas, cependant, vous abandonner lorsque vous êtes en " +
        "difficulté. Je sais bien que ce combat vous épouvante, mais j’ai toute confiance, ils seront tous trois vaincus.",
        y+"Assez parlé, je dois trouver quelque part pour passer la nuit.",
        lun+"Sire, Dieu vous accorde bon gîte et bonne nuit, et vous garde de tout ce qui pourrait vous importuner."
    ];

    fadeout(b, function(){
        // show everything
        msg.attr({visible:true});
        text1.attr({visible:true});
        next.attr({visible:true});
    });

    var msg = Crafty.e("MSG")
        .attr({visible:false})
        .textBlock(dialogue)
        .iterateText();

    // next button
    var next = Crafty.e("PlainButton")
        .setPosition("two")
        .attr({visible:false});
    var text1 = Crafty.e("ButtonText")
        .text("Continuer")
        .attr({visible:false})
        .associate(next)
        .place()
        .bind("Click", function () {
            if(msg._i == msg._textarray.length) {
                // bring back the buttons
                t1.SHbutton(true);
                t2.SHbutton(true);
                //destroy these
                next.destroy();
                text1.destroy();
                // play sound
                Crafty.audio.play("birds",-1, 1.0);
                Crafty.audio.play("stream",-1, 1.0);
            }
            else msg.iterateText();
        });

    // do something
    var one = Crafty.e("SceneChange")
        .setPosition("one");
        //.setNewScene("Harpin"); // to Harpin
    var t1 = Crafty.e("ButtonText")
        .text("Poursuivre la route pour chercher")
        .associate(one)
        .place();
    var two = Crafty.e("PlainButton")
        .setPosition("two");
    var t2 = Crafty.e("ButtonText")
        .text("Camper quelque part dans la forêt")
        .associate(two)
        .place()
        .one("Click", function () {
            Crafty.audio.stop();
            Crafty.background("black");
            t1.SHbutton(false);
            msg.changeText("Vous avez resté dans la forêt, mais pas bien. C'est presque midi - il faut partir. (-1 prouesse, -1 sagesse)");
            t2.text("Retourner à Lunette");
            t2.bind("Click", function(){
                Crafty.enterScene("SaveLunette"); // Skip Harpin and just save Lunette
            })
        });

    // invisible at first
    t1.SHbutton(false);
    t2.SHbutton(false);
}); // end Lunette

/* ****************************** SaveLunette ****************************
 * Yvain, Lunette(shift), Ladies, Dudes, Senechal
 * */

Crafty.defineScene("SaveLunette", function() {
    saveScene = "SaveLunette";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url(" + path + "brocloarge2.png) no-repeat top");

    var dialogue = [y+"Laissez, laissez donc cette demoiselle, scélérats! Il n’est pas juste qu’elle soit mise au bûcher, " +
    "jetée dans la fournaise: elle est innocente!",
    ladies+"Hélas! Dieu, comme tu nous as oubliées! Nous perdons une si bonne amie,notre meilleur soutien à la cour!" +
    " C’est grâce à elle que notre dame, Laudine, nous traitait toujours avec tendresse et affection, mais maintenant" +
    " il n’y a plus personne pour plaider notre cause.",
    y+"Demoiselle, où sont ceux qui vous blâment et vous accusent? Je leur livrerai bataille sur-le-champ, s’ils l’acceptent.",
    lun+"Sire, au nom de Dieu, secourez-moi: je suis en grand péril. Les faux témoins qui m’accusent ont préparé mon " +
    "supplice. Je ne suis pas coupable du crime dont on m’accuse.",
    sen+"Ha! Il faut qu'il est bête s'il croit qu'il peut nous convaincre! Nous sommes trois!",
    y+"Alors, vous avez peur ou quoi? Un combat sans blessure me ferait honte. J'aurais plus peur d'en sortir " +
    "indemne que d'être blessé.",
    sen+"Si vous voulez vous battre, approchez." //6
    ];

    if(haslion){
        dialogue[6] = "Si vous voulez vous battre, approchez....mais sans votre lion.";
        dialogue.splice(7, 0, "D’acc. Mais je ne peux pas garantir qu’il reste là. Lion fidèle, reste là et ne te bats pas dans ce combat.");
        dialogue.join();
    }

    var msg = Crafty.e("MSG")
        .textBlock(dialogue)
        .iterateText();

    // next button
    var next = Crafty.e("PlainButton")
        .setPosition("two");
    var text1 = Crafty.e("ButtonText")
        .text("Continuer")
        .associate(next)
        .place()
        .bind("Click", function () {
            if(msg._i == msg._textarray.length) {
                if(haslion){
                    msg.changeText("Il semblait qu'Yvain était défaite, mais le lion lui a aider, et ils ont sauvé Lunette ensemble.<br><br>Victoire!");
                }
                else{
                    msg.changeText("Malheureusement, trois combattants était trop pour Yvain. C'est la fin pour lui.<br><br>GAME OVER");
                }
                text1.text("Recommencer");
                text1.unbind("Click");
                text1.bind("Click", function(){
                    Crafty.enterScene("Castle")
                })
            }
            else msg.iterateText();
        });
});