/**
 * Created by Ksayrs17 on 7/7/2016.
 * 
 * GateTrap, Trap, Hide, Convince, Meeting, Arthur, Reunion, GandL, Parting
 * 
 */

/* *************************** GateTrap ******************************** */

Crafty.defineScene("GateTrap", function() {
    saveScene = "GateTrap";
    Crafty.audio.stop();
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("black");
    
    menuButton.trigger("SH", false);

    var entermsg = ["Peu après la fin de la tempête, le chevalier qui garde la fontaine  est arrivé. " +
    "Chacun avec une lance rigide, ils ont échangé de si grands coups qu'ils ont percé l'un et l'autre les armures. " +
    "À la fin, Yvain fit éclater le heaume du chevalier. Jamais il n'avait reçu coup si terrible - Il se mit à fuir."];

    var msg = Crafty.e("MSG")
        .changeText(entermsg);

    // buttons //
    var chasser = Crafty.e("PlainButton")
        .setPosition("two");

    var text2 = Crafty.e("ButtonText")
        .text("Pourchasser!")
        .associate(chasser)
        .place()
        .one("Click", function() {
            msg.changeText("Vous chassez le chevalier jusqu'au château inconnu. Mais devant la deuxième porte...");
            this.text("Continuer");
            this.bind("Click", function(){
                Crafty.audio.play("trap");
                Crafty.audio.play("horse");
                Crafty.enterScene("Trap");
            });
        });
});

/* ****************************** Trap *********************************** */

Crafty.defineScene("Trap", function() {
    saveScene = "Trap";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url("+path+"tempcastle.png) no-repeat top");

    menuButton.trigger("SH", false);
    var sf = Crafty.frame();
    Crafty.log("frame: " + sf);

    var msg = Crafty.e("MSG")
        .changeText("Qu'est-ce que c'est?");

    var wall = Crafty.e("2D, Canvas, Color")
        .attr({w:800, h:800, z:-1})
        .color("black")
        .bind("EnterFrame", function(){
            if(Crafty.frame() - sf > 50){
                Crafty.audio.play("gate");
                next();
            }
        });

    // the rest of the scene
    var next = function () {
        wall.unbind("EnterFrame");
        msg.changeText("Non!");

        sf = Crafty.frame();
        Crafty.log("frame: " + sf);
        var c = 0.95;

        wall.bind("EnterFrame", function () {
            if(!Crafty.audio.isPlaying("gate")){
                if(c <=0.0) {
                    rest();
                }
                else if(Crafty.frame()-sf > 50){
                    wall.color("black", c);
                    c -= 0.05;
                }
            }
            if(Crafty.frame()-sf>60){
                Crafty.audio.pause("horse");
            }
        });
    };

    var rest = function () {
        wall.destroy();
        var traptext = ["Ces deux portes... c'est un piège.",
            "Mon pauvre cheval... La porte du château est tombée sur lui. Je ne peux pas échapper. Je serai prisonnier."];
        var luntext = [dem+"Ah… c’est vous!",
            dem+"Vous avez de la malchance, messire Yvain - si on vous trouve vivant, on vous " +
            'coupera en morceaux, puisque c’est vous qui avez blessé le seigneur mortellement. Le peuple est furieux et' +
            ' ma dame est plongée dans un chagrin terrible. Mais…',
            dem+"Un jour où j’étais à la cour du roi Arthur, vous aviez été le seul à daigner me parler. " +
            "En récompense de l’honneur que vous m’avez autrefois prodigué, je veux vous aider maintenant.",
            dem+"Attention--tous les gens du château vous cherchent, afin de venger la mort de leur seigneur. " +
            "Tenez...voici un anneau d'invisibilité. Il vous permettra d'échapper sans être vu.",
            dem+"Suivez-moi maintenant, pour quitter ce lieu."];
        msg.textBlock(traptext);
        msg.iterateText();

        // next
        var next = Crafty.e("PlainButton")
            .setPosition("two");

        var text1 = Crafty.e("ButtonText")
            .text("Continuer")
            .associate(next)
            .place()
            .bind("Click", function(){
                // added for demo //
                if(msg._i == msg._textarray.length && msg._textarray == luntext) Crafty.enterScene("Hide");
                else if(msg._i == msg._textarray.length){
                    msg.textBlock(luntext);
                    var lune = Crafty.e("2D, Canvas, lunette")
                        .attr({x:350, y:50, z:-1});
                }
                // end addition //
                msg.iterateText();
            });
    }
});

/* ******************************* Hide ****************************************
*
* POI: Coup de foudre
*
* */

var goth = false; // this has to stay out of scene
var picked1 = false;

Crafty.defineScene("Hide", function() {
    saveScene = "Hide";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url("+path+"tempwindow.png) no-repeat top");
    Crafty.trigger("SH", true); // bring back the menu button
    var msg = Crafty.e("MSG");
    var t = "Quand Yvain voit Laudine de loin, c'est le coup de foudre. " +
        "Amour s'installe chez lui et sa douce ennemie possède son cœur. Hélas, il est tombé amoureux de celle qui le déteste le plus.";

    var lune = Crafty.e("2D, Canvas, lunette")
        .attr({x:350, y:50, z:-1});

    msg.changeText(t);

    if(!collected.hasOwnProperty("Coup de foudre")) {
        var st = Crafty.e("POI")
            .attr({x:400, y:400})
            .bind("EnterFrame", function(){
                if(msg._text!=t){
                    this.destroy();
                }
            })
            .addPS("Coup de foudre", {
                name: "Coup de foudre",
                description: "Chrétien de Troyes répète après Ovide et les clercs du Moyen  ge que c’est de la vue de la" +
                " beauté que naît l’amour : les yeux sont les messagers du cœur et le coup de foudre est immédiat.",
                stats: "+1 courtoisie"
            }, "Courtoisie", 1)
    }
    
    var scenebut2 = Crafty.e("PlainButton")
        .setPosition("two");
    var text3 = Crafty.e("ButtonText")
        .text("Continuer")
        .associate(scenebut2)
        .place()
        .bind("Click", function(){
            msg.changeText(dem+"Je dois partir bientôt. Avez-vous des questions?");
            scenebut2.destroy();
            choices();
            text3.destroy();
        });

    // swip swap
    var choices = function(){

        var start = [dem+"Je dois partir bientôt. Avez-vous des questions?"];

        var c1 = [dem+"Maintenant, pas grand-chose. Mais ce soir, je vous cacherai et je vous aiderai à échapper.",
        y+"Moi, si je dois partir, je ne le ferai pas comme un voleur dans la nuit.",
        dem+"Je comprends. C’est noble, ça. (+1 honneur)"];

        var c2 = [dem+"Lunette."];

        var c3 = [dem+"Ça va, sire?",
            y+"Je vais très bien. Sensass, en fait.",
            dem+"C’est surprenant, étant donné que toute la cour vous cherche pour vous tuer… Pourquoi vous allez bien?",
            y+"J’ai vu quelque chose de merveilleux et beau. J’ai perdu alors toute la peur, au moins de ceux qui me cherchent.",
            dem+"Je comprends ce sentiment - vous aimez ma dame.",
            dem+"Mais ce soir, je vais vous cacher et vous aider à échapper.",
            y+"Moi, si je dois partir, je ne le ferai pas comme un voleur dans la nuit. Je veux rester, malgré le danger.",
            dem+"Je comprends. C’est noble, ça. +1 honor",
            dem+"Bon. Vous n’allez pas partir, donc je vais vous aider, puisque vous êtes si noble. " +
            "Je crois que vous seriez bien pour ma dame et son domaine. Mais ce ne sera pas facile. " +
            "Je me demande ce que je peux dire pour la convaincre…"];

        var c4 = [dem+"Ça va, sire?",
            y+"Je vais très bien. Sensass, en fait.",
            dem+"C’est surprenant, étant donné que toute la cour vous cherche pour vous tuer… Pourquoi vous allez bien?",
            y+"J’ai vu quelque chose de merveilleux et beau. J’ai perdu alors toute la peur, au moins de ceux qui me cherchent.",
            dem+"Je comprends ce sentiment - vous aimez ma dame.",
            dem+"Bon. Vous n’allez pas partir, donc je vais vous aider, puisque vous êtes si noble. " +
            "Je crois que vous seriez bien pour ma dame et son domaine. Mais ce ne sera pas facile. " +
            "Je me demande ce que je peux dire pour la convaincre…"];

        // first choice
        var one = Crafty.e("PlainButton")
            .setPosition("one");
        // so, what now?
        var text1 = Crafty.e("ButtonText")
            .text("Et puis, que se passe-t-il?")
            .associate(one)
            .place()
            .bind("Click", function(){
                // hide buttons as we iterate through text
                text1.SHbutton(false);
                text2.SHbutton(false);
                text3.SHbutton(false);
                msg.textBlock(c1);
                //msg._i=0;
                msg.iterateText();
                // show next button
                var next = Crafty.e("PlainButton")
                    .setPosition("two");
                var nt = Crafty.e("ButtonText")
                    .text("Continuer")
                    .associate(next)
                    .place()
                    .bind("Click", function(){
                        if(msg._i+1 == msg._textarray.length){
                            if(goth === false){
                                statlist["Honneur"] += 1;
                                goth = true;
                                picked1 = true;
                            }
                        }
                        if(msg._i == msg._textarray.length) {
                            msg.changeText(start[0]);
                            text1.SHbutton(true); // bring back previous choice buttons
                            text2.SHbutton(true);
                            text3.SHbutton(true);
                            next.destroy(); // destroy next button
                            nt.destroy();
                        }
                        else msg.iterateText();
                    });
            });

        // second choice - give her her name
        var two = Crafty.e("PlainButton")
            .setPosition("two");
        var text2 = Crafty.e("ButtonText")
            .text("Euh... Comment vous appelez-vous?")
            .associate(two)
            .place()
            .bind("Click", function(){
                text1.SHbutton(false);
                text2.SHbutton(false);
                text3.SHbutton(false);
                msg.changeText(c2[0]);
                // replace the text now that we know her name
                text2.trigger("fr", start);
                text2.trigger("fr", c1);
                text2.trigger("fr", c2);
                text2.trigger("fr", c3);
                text2.trigger("fr", c4);
                // next button
                var next = Crafty.e("PlainButton")
                    .setPosition("two");
                var nt = Crafty.e("ButtonText")
                    .text("Oh")
                    .associate(next)
                    .place()
                    .bind("Click", function() {
                        msg.changeText(start[0]);
                        text1.SHbutton(true);
                        text2.SHbutton(true);
                        text3.SHbutton(true);
                        next.destroy();
                        nt.destroy();
                    });
            })
            .bind("fr", function(obj){
                for(var i=0;i<obj.length;i++){
                    var find = obj[i].search(dem);
                    if(find !=-1){
                        obj[i] = obj[i].replace(dem, lun);
                    }
                }
            });

        // third choice
        var three = Crafty.e("PlainButton")
            .setPosition("three");

        var text3 = Crafty.e("ButtonText")
            .text("Parler")
            .associate(three)
            .place()
            .bind("Click", function(){
                text3.trigger("check"); // find which textblock we're using
                // hide buttons as we iterate through text
                text1.SHbutton(false);
                text2.SHbutton(false);
                text3.SHbutton(false);
               // msg._i=0;
                msg.iterateText();
                // show next button
                var next = Crafty.e("PlainButton")
                    .setPosition("two");
                var nt = Crafty.e("ButtonText")
                    .text("Continuer")
                    .associate(next)
                    .place()
                    .bind("Click", function() {
                        if (msg._i+1 == msg._textarray.length) {
                            msg.iterateText();
                            nt.SHbutton(false);
                            var count = false;
                            var n = Crafty.e("PlainButton")
                                .setPosition("two");
                            var n2 = Crafty.e("ButtonText")
                                .text("Elle doit protéger sa fontaine, n'est-ce pas?")
                                .associate(n)
                                .place()
                                .bind("Click", function() {
                                    if(count === true){
                                        Crafty.enterScene("Convince");
                                    }
                                    msg.changeText("Oui, c’est ce que j’ai pensé. Attendez ici.");
                                    count = true;
                                    n2.text("Continuer");
                                });
                            var lune = Crafty.e("2D, Canvas, lunetteh")
                                .attr({x:350, y:50, z:-1});
                        } //if
                        else msg.iterateText();
                    }); //click
            }) //click
            .bind("check", function(){
                if(!picked1) {
                    msg.textBlock(c3);
                    statlist["Honneur"]++;
                    goth = true;
                }
                else msg.textBlock(c4);
            });
    }
});

/* ******************************* Convince **************************************** 
* Laudine, Lunette
* */

Crafty.defineScene("Convince", function() {
    saveScene = "Convince";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url("+path+"lauinterior.png) no-repeat top");

    var trans = Crafty.e("2D, Canvas, Color")
        .attr({w:800, h:800, z:-3})
        .color("black", 0.2);

    var laudine = Crafty.e("2D, Canvas, laudines")
        .attr({x: 0, y:50, z:-1});

    var lunette = Crafty.e("2D, Canvas, lunettea")
        .attr({x:450, y:55, z:-1});

    var dialogue1 = [
        lun + "Dame, votre comportement déraisonnable m'étonne! Votre époux est mort. Votre chagrin ne sert à rien.",
        lau + "Je meurs de douleur. Je préfère la mort à la vie.",
        lun + "Pourquoi?",
        lau + "Pour le rejoindre.",
        lun + "Le rejoindre? Ne parlez pas de malheur! Il vaut mieux que vous trouviez un nouvel époux. Il y a des " +
        "chevaliers qui sont aussi bien que votre mari décédé.",
        lau + "Quelle sottise! Tais-toi. Il n'y a aucun chevalier à la hauteur d'être mon mari.",
        lun + "Il y a un chevalier qui est meilleur qu'Esclados le Roux, je le prouverai.",
        lau + "Impossible! Tais-toi. Jamais je n’en trouverai de pareil.",
        lun + "Si, dame, à condition que vous le vouliez bien. Mais dites-moi, sans vous fâcher, qui défendra votre terre " +
        "quand le roi Arthur y viendra? Car il doit venir la semaine prochaine au perron et à la fontaine.",
        lun + "Vous devriez chercher le moyen de défendre votre fontaine. Pourtant, vous ne cessez de pleurer! Vous " +
        "n’avez pas de temps à perdre, s’il vous plaît, chère dame : tous les chevaliers de notre région ne valent pas, " +
        "vous le savez bien, une chambrière.",
        lau + "Va-t-en! N’en parle plus! Laisse-moi tranquille, tes discours me gênent.",
        lun + "À la bonne heure, dame. Je vous donne de bons conseils.",
        lau + "...", // 12
        lau + "... Peut-être...",
        lun + "Ha! Dame, pardonnez-moi, mais votre chagrin n'est pas raisonnable. Un deuil trop long ne convient pas" + //15
        " à votre rang noble. Au nom de Dieu, calmez-vous et réfléchissez bien. Pensez à votre terre. Il y a d'autres " +
        "chevaliers qui sont aussi preux et vaillants que votre défunt mari.",
        lau + "Mensonges! Nomme m'en un seul qui soit aussi courageux que mon seigneur.",
        lun + "Si je vous le nomme, est-ce que vous vous mettrez en colère? Est-ce que vous me menacerez?",
        lau + "Non, je t'assure.",
        lun + "Soit. Vous me trouverez bien audacieuse, mais je vous le dis pour assurer votre bonheur à venir.",
        lun + "Dans un combat entre deux chevaliers qui s'affrontent en duel, quel chevalier vaut mieux que l'autre? " +
        "Celui qui gagne ou celui qui perd? Quant à moi, c'est le vainqueur qui est supérieur. Qu'en pensez-vous?",
        lau + "J’ai l’impression que tu cherches à me prendre au mot.",
        lun + "Allons, vous savez bien que j’ai raison: je vous le prouve de façon irréfutable que le vainquer de votre " +
        "mari vaut mieux que lui. Ce chevalier vaillant a battu et pourchassé votre mari. Il l'a coincé dans son propre château!",
        lau + "Voilà bien des propos insensés et choquants. Va-t’en, tu es vraiment casse-pied! Ne parais plus désormais " +
        "devant moi si c’est pour me parler de lui!",
        lun + "Je le savais bien, dame, que mes propos ne vous feraient pas plaisir. Mais vous m’aviez donné l’assurance " +
        "que vous ne vous mettriez en colère, et que vous ne m’en voudriez pas. Quel mensonge. Quant à moi, j’aurais dû me taire.",
        lau + "...", //24
        lau + "Je dois protéger ma fontaine…",
        lau + "...",
        lau + "Pauvre Lunette… elle et fidèle. Et lui, le chevalier… Il n’a pas tué mon seigneur pour me faire du mal. " +
        "Si mon seigneur avait pu, il l’aurait tué.",
        lau + "Bon. Je demanderai le nom et le lignage du chevalier."
    ];

    var dialogue2 = [
        lau + "Je vous demande pardon pour les paroles offensantes et dures que je vous ai dites ; je suivrai désormais vos conseils.",
        lau + "Mais parlez-moi du chevalier dont vous m’avez plaidé la cause si longuement : quel homme est-il, et de quelle famille?",
        lau + "S’il est de mon rang, je le ferai seigneur de ma terre. Mais il faudra agir de telle sorte qu’on ne puisse " +
        "dire: « C’est celle qui a épousé le meurtrier de son mari. »",
        lun + "Par Dieu, dame, il en sera fait ainsi. Vous aurez l’époux le plus noble et le plus beau du monde.",
        lau + "Comment s’appelle-t-il?",
        lun + "Messire Yvain.",
        lau + "Ma foi, ce n’est pas le premier venu; c’est un homme bien né, je le connais bien: c’est le fils du roi Urien.",
        lun + "C'est vrai.",
        lau + "Et quand pourrons-nous le voir?",
        lun + "Dans cinq jours.", //9
        lau + "Hm. Le délai est trop long. Qu’il vienne cette nuit, ou demain, au plus tard.",
        lun + "Dame, je ne crois pas qu’un oiseau puisse tant parcourir en un jour. Mais j’y enverrai un de mes serviteurs," +
        " un courrier rapide qui sera demain soir à la cour du roi Arthur.",
        lau + "Ce délai est trop long; les jours sont longs. Dites-lui qu’il soit revenu demain soir. Cette nuit, la lune" +
        " sera pleine: il voyage pendant la nuit et le jour.",
        lun + "Je m’en occupe: vous aurez le chevalier chez vous dans trois jours tout au plus. Demain, vous ferez venir " +
        "vos gens et vous prendrez conseil au sujet du roi, qui doit venir.",
        lun + "Pour défendre votre fontaine, selon la tradition, il vous faut leur demander leur avis. Un chevalier de " +
        "grand renom demande votre main, mais vous n’osez accepter sans leur approbation et leur accord.",
        lau + "Par ma foi, tel est mon désir, et j’accepte ce plan: je l’avais imaginé tel que vous l’avez exposé; ainsi ferons-nous.",
        lau + "Mais pourquoi tardez-vous? Allez! Ne perdez plus de temps! Amener-le, et je convoquerai mes gens."
    ];

    var msg = Crafty.e("MSG")
        .textBlock(dialogue1)
        .iterateText();

    var next = Crafty.e("PlainButton")
        .setPosition("two");

    var text1 = Crafty.e("ButtonText")
        .text("Continuer")
        .associate(next)
        .place()
        .bind("Click", function(){ // yeah redo this
            if(msg._i==12 && msg._textarray == dialogue1){
                lunette.attr({visible:false});
                laudine.removeComponent("laudines").addComponent("laudine");
            }
            if(msg._i==14 && msg._textarray == dialogue1){
                lunette.attr({visible:true});
                laudine.removeComponent("laudine").addComponent("laudinea");
            }
            if(msg._i==24 && msg._textarray == dialogue1){
                lunette.attr({visible:false});
                laudine.removeComponent("laudinea").addComponent("laudine");
            }
            if(msg._i==3 && msg._textarray == dialogue2){
                lunette.removeComponent("lunette").addComponent("lunetteh");
            }
            if(msg._i==11 && msg._textarray == dialogue2){
                lunette.removeComponent("lunetteh").addComponent("lunette");
            }
            if(msg._i == msg._textarray.length) {
                if (msg._textarray == dialogue2) { // if we're done talking, move to next scene
                    msg.attr({visible: false});
                    fadeblack(false, function () {
                        Crafty.enterScene("Meeting");
                    });
                }
                else {
                    msg.attr({visible: false});
                   // msg._i = 0;
                    msg.textBlock(dialogue2);
                    fadeblack(true, function(){
                        lunette.removeComponent("lunetta").addComponent("lunette");
                        lunette.attr({visible:true});
                        msg.attr({visible: true});
                    });
                }
            }
            msg.iterateText();
        });
});

/* ********************************** Meeting *************************************** 
* Laudine, Lunette, Yvain
 */

Crafty.defineScene("Meeting", function() {
    saveScene = "Meeting";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url(" + path + "lauinterior.png) no-repeat top");
    var b = Crafty.e("2D, Canvas, Color")
        .attr({w: 800, h: 800, z:-2})
        .color("black");
    fadeout(b);

    var trans = Crafty.e("2D, Canvas, Color")
        .attr({w:800, h:800, z:-3})
        .color("black", 0.2);

    var laudine = Crafty.e("2D, Canvas, laudine")
        .attr({x: 0, y:50, z:-1});

    var lunette = Crafty.e("2D, Canvas, lunettea")
        .attr({x:450, y:55, z:-1, visible: false});

    var yvain = Crafty.e("2D, Canvas, yvain")
        .attr({x:600, y:55, z:-1});

    var dialogue = [
        y + "...",
        lau + "...",
        y + "...", //2
        lun + "Qu’attendez-vous? Maudite soit celle qui mène dans la chambre d’une belle dame un chevalier qui n’ose" +
        " approcher, et qui n’a ni langue, ni bouche ni esprit pour se présenter!",
        lun + "Chevalier, venez ici, n’ayez pas peur que ma dame ne vous morde! Demandez-lui paix. " +
        "On lui convaincra tous les deux de vous pardonner la mort d’Esclados le Roux, son défunt mari.",
        y + "Dame, je me soumets volontiers à tout ce qu'il vous plaira.", //5
        lau + "Tout, sire? Et si je vous faisais tuer?",
        y + "Dame, comme vous voudrez: je maintiendrai ce que j’ai dit.",
        lau + "Voilà qui est singulier! Vous vous abandonnez entièrement et de bon gré à mon pouvoir, sans que je vous y contraigne!",
        y + "Dame, l’Amour m’oblige à me soumettre entièrement à votre volonté. Face à l’Amour, on n’y peut rien. " +
        "Je ne savais pas que ce meurtre vous blesserait.",
        lau + "Comment, “je ne savais pas”? Dites-moi donc: quand vous avez tué on seigneur, n’était-ce pas vous rendre coupable envers moi?",
        y + "Dame, pardon. Votre seigneur m'a attaqué. J'ai dû me défendre. Je n'avais pas de choix. " +
        "C'est blâmable, à votre avis? Dites-le moi.",
        lau + "Pas du tout. Selon la coutume, on a le droit de se défendre. Alors, je vous pardonne ce meurtre. " +
        "Mais pourquoi soumettez-vous à moi, sans aucune défense? Pourquoi tremblez-vous? Pourquoi ces soupirs? " +
        "Qu'est-ce que vous avez?",
        y + "Dame, cette force vient de mon coeur, qui est à vous. C’est mon coeur qui m’a mis dans cette disposition.",
        lau + "Et votre coeur, qui l’y a incité, beau doux ami?",
        y + "Mes yeux, dame.",
        lau + "Et vos yeux, qui?",
        y + "La grande beaute que je vis en vous.",
        lau + "Et cette beauté, qu’a-t-elle fait?",
        y + "Elle a tant fait que je dois aimer.",
        lau + "Aimer, et qui donc?",
        y + 'Vous, dame chère.',
        lau + "Moi?",
        y + "Oui.",
        lau + "Et de quelle manière?",
        y + "De telle manière qu’il ne peut y avoir de plus grand amour, que mon coeur ne peut se séparer de vous, " +
        "qu’il ne peut vous quitter, que vous êtes le seul objet de mes pensées, que je suis tout à vous, que je vous " +
        "aime plus que moi0même, que je consens, selon ce que vous voudrez, à mourir ou à vivre pour vous.",
        lau + "Et oseriez-vous entreprendre de défendre ma fontaine pour l’amour de moi?",
        y + "Oui, dame, contre n’importe qui.",
        lau + "Sachez donc que la paix est faite entre nous.",
        lau + "Allons dans la salle où il y a ceux qui m’ont conseillée et qui ont approuvé mon projet; " +
        "Ils acceptent que je me marie pour la nécessité qu’ils y voient.",
        lau + "Ici même, je vous accorde ma main, et je ne chercherai pas d’autre prétendant: je ne dois pas refuser " +
        "pour époux un bon chevalier, un fils de roi." ];

    var dialogue2 = ["C’est ainsi que, le jour même, sans plus attendre, il l’épousa, et que les noces eurent lieu. " +
    "Il y eut une foue de gens de haute noblesse, et l’allégresse et la joie y furent grandes. Voilà messire Yvain " +
    "seigneur de la terre, et Esclados le Roux est bien oublié. Les gens aiment et estiment plus le nouvel époux qui le défunt.",
    "Puis, le roi et sa compagnie est arrivé à la fontaine."];

    var msg = Crafty.e("MSG")
        .attr({visible: true})
        .textBlock(dialogue)
        .iterateText();

    var next = Crafty.e("PlainButton")
        .setPosition("two");

    var text1 = Crafty.e("ButtonText")
        .text("Continuer")
        .associate(next)
        .place()
        .bind("Click", function(){
            if(msg._i==3 && msg._textarray == dialogue){
                yvain.attr({visible:false});
                lunette.attr({visible:true});
                lunette.removeComponent("lunette").addComponent("lunetta");
            }
            if(msg._i==5 && msg._textarray == dialogue){
                yvain.attr({visible:true});
                lunette.attr({visible:false});
                yvain.attr({x:400, y:55, z:-1});
            }
            if(msg._i == msg._textarray.length) {
                Crafty.log("Reached end");
                if (msg._textarray == dialogue2) { // if we're done talking
                    Crafty.log("Done");
                    Crafty.enterScene("Arthur");
                }
                else {
                    msg.attr({visible: false});
                    //msg._i = 0;
                    msg.textBlock(dialogue2);
                    var x = fadeblack(false, function(){
                        x.unbind("EnterFrame");
                        msg.attr({visible: true});
                    });
                }
            }
            msg.iterateText();
        });
});

/* ********************************** Arthur ***************************************
* Arthur, Keu, Gauvain
* */

Crafty.defineScene("Arthur", function() {
    saveScene = "Arthur";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url("+path+"brocloarge2.png) no-repeat top");

    var dialogue = [
        k+"Et Yvain, où est-il? Le roi n’a pas lassé personne à Carduel, mais je ne vois pas l’homme qui a déclaré qu’il " +
        "vengerait son cousin. Il a fugué sans doute. Il ne reviendra pas, le lâche.",
        g+"Messire Keu, ça suffit, il mérite tout votre respect! En son absence, il faut tenir votre langue. Soyez plus courtois.",
        a+"Je veux voir la tempête."
    ];

    var msg = Crafty.e("MSG")
        .textBlock(dialogue)
        .iterateText();

    var next = Crafty.e("PlainButton")
        .setPosition("two");

    var text1 = Crafty.e("ButtonText")
        .text("Continuer")
        .associate(next)
        .place()
        .bind("Click", function(){
            if(msg._i == msg._textarray.length) {
                    msg.attr({visible: false});
                    text1.SHbutton(false);
                    fadeblack(false, function(){  //fadeblack
                        Crafty.enterScene("Reunion")
                    });
            }
            msg.iterateText();
        });
});

/* ********************************** Reunion ***************************************
*
* Keeping the menu hidden for this scene is a temporary solution
*
* Arthur, Keu
*
*  */

Crafty.defineScene("Reunion", function() {
    saveScene = "Reunion";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url(" + path + "brocloarge2.png) no-repeat top");

    Crafty.audio.play("storm");  // make storm

    Crafty.trigger("SH", false); // hide things

    var dialogue = [a+"Quelle tempête!",
        k+"Regardez! Roi Arthur, je vous demander le droit d’être le premier de combattre ce chevalier.", // replace later
        a+"Bien."]; // replace later

    var msg = Crafty.e("MSG")
        .attr({visible: false}) // hide for now
        .textBlock(dialogue)
        .iterateText();

    var val = 1.0;
    var x = Crafty.e("2D, Canvas, Color")
        .attr({w: 800, h:800, z:-1})
        .color("black")
        .bind("EnterFrame", function(){
            if(Crafty.audio.isPlaying("storm")){
                if(Crafty.frame() % 10 == 0) {
                    if (val >= 0.0) {
                        fade("storm", val);
                        val -= 0.05;
                    }
                    else {
                        Crafty.audio.stop();
                        x.trigger('finish');
                    }
                }
            }
        })
        .one("finish", function(){
            x.unbind("EnterFrame");
            fadeout(x, function () {
                msg.attr({visible: true});   // show again
                rest();
            });
        });

    var rest = function() {
        var next = Crafty.e("PlainButton")
            .setPosition("two");

        var text1 = Crafty.e("ButtonText")
            .text("Continuer")
            .associate(next)
            .place()
            .bind("Click", function () {
                if (msg._i == msg._textarray.length) {
                    create();
                }
                else msg.iterateText();
            });

        var create = function () {
            next.destroy();
            text1.destroy();
            msg.changeText("Battre Keu?");

            var oui = Crafty.e("PlainButton")
                .setPosition("one");
            var o = Crafty.e("ButtonText")
                .text("Oui")
                .associate(oui)
                .place()
                .bind("Click", function () {
                    o.SHbutton(false);
                    b.SHbutton(false);
                    a.SHbutton(false);
                    following();
                });

            var bien = Crafty.e("PlainButton")
                .setPosition("two");
            var b = Crafty.e("ButtonText")
                .text("Bien sûr")
                .associate(bien)
                .place()
                .bind("Click", function () {
                    o.SHbutton(false);
                    b.SHbutton(false);
                    a.SHbutton(false);
                    following();
                });

            var abs = Crafty.e("PlainButton")
                .setPosition("three");
            var a = Crafty.e("ButtonText")
                .text("Absolument")
                .associate(abs)
                .place()
                .bind("Click", function () {
                    o.SHbutton(false);
                    b.SHbutton(false);
                    a.SHbutton(false);
                    following();
                });
        };

        var following = function(){
            statlist["Prouesse"] += 1;
            msg.attr({visible: false});
            var p = fadeblack(false, function(){
                p.unbind("EnterFrame");
                msg.attr({visible:true});
                msg.text("Yvain l’abat sans peine, afin de lui donner une bonne leçon. Il se fait ensuite reconnaître, " +
                    "et raconte à tous les chevaliers son aventure. Il les invite au château et leur présente sa " +
                    "nouvelle épouse, Laudine. Il y a alors une fête magnifique organisée en l’honneur du roi.");

                Crafty.log("followign");

                var scenebut2 = Crafty.e("SceneChange")
                    .setNewScene("GandL")
                    .setPosition("two");
                var text2 = Crafty.e("ButtonText")
                    .text("Continuer")
                    .associate(scenebut2)
                    .place();
            })

        }
    }
});

/* ********************************* GandL ****************************************
* Gauvain and Lunette
* */

Crafty.defineScene("GandL", function() {
    saveScene = "GandL";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url(" + path + "lauinterior.png) no-repeat top");
    var b = Crafty.e("2D, Canvas, Color")
        .attr({w: 800, h: 800, z: -1})
        .color("black");

    var dialogue = [g+"Bonjour, belle demoiselle.",
        lun+"Ah, bonjour. Vous êtes messire Gauvain, non? J'" +'ai entendu dire que vous étiez "le soleil des chevaliers".',
        g+"C'est exact. Enchanté, Demoiselle. Vous êtes Lunette, n'est-ce pas? “La lune des demoiselles”?",
        lun+"Oui. Enchantée."];

    var msg = Crafty.e("MSG")
        .attr({visible: false}) // hide for now
        .textBlock(dialogue)
        .iterateText();

    var lunette = Crafty.e("2D, Canvas, lunetteh")
        .attr({x:450, y:55, z:-1});

    var gauvain = Crafty.e("2D, Canvas, Image")
        .attr({w:276, h:780, x:50, y:50, z:-1})
        .image(path+"gauvain.png");

    fadeout(b, function(){
        msg.attr({visible:true});
    });

    var next = Crafty.e("PlainButton")
        .setPosition("two");
    var text1 = Crafty.e("ButtonText")
        .text("Continuer")
        .associate(next)
        .place()
        .bind("Click", function () {
            if (msg._i == msg._textarray.length) {
                fadeblack(false, function(){
                    Crafty.enterScene("Parting");
                })
            }
            else msg.iterateText();
        });
}); //end GandL

/* ************************ Parting *************************
* Gauvain, Yvain, laudine
* */

Crafty.defineScene("Parting", function() {
    saveScene = "Parting";
    Crafty.log("Savescene: " + saveScene);
    Crafty.background("url(" + path + "lauinterior.png) no-repeat top");
    var b = Crafty.e("2D, Canvas, Color")
        .attr({w: 800, h: 800, z: -1})
        .color("black");

    var gauvain = Crafty.e("2D, Canvas, Image")
        .attr({w:276, h:780, x:50, y:50, z:-1})
        .image(path+"gauvain.png");

    var dialogue = [
        g + "Nous partons demain. Yvain, vous ne venez pas avec nous?",
        y + "Je dois rester ici avec ma dame.", //1
        g + "Quoi, vous seriez du genre à devenir paresseux après le mariage? Pour votre dame, vous devez garder votre " +
        "réputation et gloire.",
        g+ "Je le sais! Venez aux tournois avec moi! Vous deviendrez plus glorieux encore!",
        y + "Je dois demander à Laudine."];

    var dialogue2 = [
        lau+"J’accepte de vous laisser partir,  mais à condition que vous ne retourniez dans un an. Si vous ne retournez " +
        "pas, je ne vous aimerai plus.",
        lau+"Voici. Pour vous protéger, je vous donne cet anneau magique qui protège les amants fidèles." +
        " Tant que vous me garderez à l’ésprit et dans votre cœur, rien ne peut vous blesser." ];

    var sorrow = ["Yvain a quitté sa dame en tristesse et a participé à de nombreux tournois avec " +
    "Gauvain. Il a fait tant de prouesses qu’il a complètement oublié sa promesse. " +
    "Après un an, il s’en a rendu  compte de son erreur quand une demoiselle envoyée par " +
    "Laudine est arrivée pour reprendre l’anneau. Elle lui a déclaré que Laudine ne l’aimait " +
    "plus à cause de sa trahison.",
        "Honteux et humilié, il a quitté sa compagnie et a erré dans la forêt pendant longtemps."];

    var msg = Crafty.e("MSG")
        .attr({visible: false}) // hide for now
        .textBlock(dialogue)
        .iterateText();

    fadeout(b, function () {
        msg.attr({visible: true});
    });

    // next button
    var next = Crafty.e("PlainButton")
        .setPosition("two");
    var text1 = Crafty.e("ButtonText")
        .text("Je ne devrais pas...")
        .associate(next)
        .place()
        .bind("Click", function () { // completely redo
            if(msg._i == 3  && msg._textarray == dialogue){
                text1.text("Peut-être...");
                msg.iterateText();
            }
            else if (msg._i == msg._textarray.length && msg._textarray == dialogue) {
                text1.text("Continuer");
                msg.attr({visible:false});
                gauvain.destroy();
                fadeblack(true, function () {
                    msg.attr({visible:true});
                    msg.textBlock(dialogue2);
                    msg.iterateText();
                })
            }
            else if (msg._i == msg._textarray.length && msg._textarray == dialogue2){
                msg.attr({visible:false});
                var x = fadeblack(false, function(){
                    Crafty.trigger("SH", false); // this should go away eventually
                    x.unbind("EnterFrame");
                    text1.text("Continuer");
                    msg.textBlock(sorrow);
                    msg.iterateText();
                    msg.attr({visible:true});
                })
            }
            else if (msg._i == msg._textarray.length && msg._textarray == sorrow){
                Crafty.log("done....");
                Crafty.enterScene("Lion")
            }
            else {
                msg.iterateText();
                text1.text("Continuer")
            }
        });
}); //end Parting
