/**
 * Created by KSayrs17 on 7/21/2016.
 */

/* Extra things are here.
 * > Dialogue tags, global variables
 *
 * All custom components (except for buttons) used in the game are here.
 * > MSG, POI
 *
 * Other JS functions are also here.
 * > fadeblack, fadeout
 *
 */

// Dialogue tag beginners
var lun = "<b>Lunette: </b>";
var lau = "<b>Laudine: </b>";
var y = "<b>Yvain: </b>";
var g = "<b>Gauvain: </b>";
var k = "<b>Keu: </b>";
var a = "<b>Arthur: </b>";
var dem = "<b>Demoiselle: </b>";
var who = "<b>???: </b>";
var ladies = "<b>Dames: </b>";
var sen = "<b>Sénéchal: </b>";


/* Global Variables */
var haslion = false; // move elsewhere


/* Fade a scene to black
 *
 * if bool is true, it will fade out of black again after a delay of 60 frames.
 * if bool is false or null, it will just fade to black.
 * This function does not destroy the object unless bool is true.
 * EnterFrame must NOT be bound to the object before calling this function.
 * This does not unbind EnterFrame if the bool is false.
 *
 */
var fadeblack = function(bool, _callback){
    Crafty.trigger("SH", false);
    var val = 0.0;
    var b = Crafty.e("2D, Canvas, Color")
        .attr({w: 800, h: 800, z:-1})
        .color("black", val)
        .bind("EnterFrame", function(){
            //Crafty.log(b._alpha);
            if(val < 1.0) {
                val += 0.02;
                b.color("black", val);
            }
            else if(bool) {
                if(Crafty.frame() % 90 == 0) {
                    b.unbind("EnterFrame");
                    fadeout(b, _callback);
                }
            }
            else {
                // Make sure the callback is a function​ to avoid runtime error
                if (typeof _callback === "function" && !bool) {
                    Crafty.trigger("SH", true);
                    // Call it, since we have confirmed it is callable​
                    _callback();
                }
            }
        });
    return b; // may not need this
};

/* Fade an object out and destroy it
 *
 * Currently only works with pure walls of color. EnterFrame must NOT be bound to the object
 * before calling this function.
 *
 * */

var fadeout = function(obj, _callback, val){
    if(val==null) val = 1.0;
    obj.bind("EnterFrame", function(){
        if(val > 0.0) {
            // if (Crafty.frame() % 2 == 0) {
            val -= 0.02;
            obj.color("black", val);
            //}
        }
        else {
            obj.destroy();
            // Make sure the callback is a function​ to avoid runtime error
            if (typeof _callback === "function") {
                // Call it, since we have confirmed it is callable​
                _callback();
            }
        }
    });
};

/* ************************** MSG ***************************
 *
 * This will be redone later with the typing animation - see codepen:
 * https://codepen.io/KSayrs/pen/akYKgg
 *
 * changeText
 * iterateText
 * textBlock
 *
 * */

Crafty.c("MSG", {
    _textarray: [],
    _i: 0,

    init: function(){
        this.addComponent("2D, DOM, Text")
            .attr({w: 750, h:200, z: tbz+1, x:20, y:tby+10})
            .unselectable()
            //.textColor('#ccffcc')
            .textColor('#f4fff4')
            .textFont({family: 'Verdana', size: '16px', lineHeight: '180%'});
    },

    // change the display text to a single message
    changeText: function(msg){
        this.text(msg);
        return this;
    },

    // iterate through the text one step at a time
    iterateText: function(){
        if(this._i == this._textarray.length){  // this might be temporary
            this._i = 0;
        }
        this.text(this._textarray[this._i])
            .unselectable();
        this._i++;
        return this;
    },

    // give it an array of messages to iterate through and reset i
    textBlock: function(textarray){
        this._i = 0;
        this._textarray = textarray;
        return this;
    }
});

/* ************************* POI component **********************************
 *
 * addPS(poiname, obj, stat, val)
 *
 * Example of a POI:
 *  if(!collected.hasOwnProperty("Test")) {      // this,
 *      var st = Crafty.e("POI")
 *          .attr({x:480, y:250})
 *          .addPS("Test", {                     // this,
 *              name: "Test",                    // and this must all be identical
 *              description: "Place your description for the POI here.",
 *              stats: "+1 stat"
 *          }, "Stat", 1);
 *  }
 *
 * */

Crafty.c("POI", {

    _poiname: "",
    _obj: {},
    _stat: "",
    _val: 0,

    init: function () {
        this.addComponent("2D, Canvas, Mouse, star_start, SpriteAnimation")
            .attr({x: 250, y: 100})
            .reel("spinning", 1000, [
                [0,0],[1,0],[2,0],[3,0],[4,0]
            ])
            .animate("spinning", -1)
            .bind("Click", function(){
                collected[this._poiname] = this._obj;
                Crafty.log("Collected");
                statlist[this._stat] += this._val;

                var popup = Crafty.e("2D, Canvas, Image, Mouse")
                    .attr({w: 500, h: 300, x:(800-500)/2, y:100})
                    .image(path+"poipop.png")
                    .bind("Click", function(){
                        popup.destroy();
                        pbox.destroy();
                    });

                var pbox = Crafty.e("HTML")
                    .attr({w: 400, h: 205, x:(800-500)/2+50, y: 135, z:40})// the z value is bad and made up, sorry
                    .replace("<div class = " + "'pscroll'" + "id=" + "'poiscroll'" + ">" + "<div class = " + "'poi'" + "id=" + "'pois'" + ">" +
                        "Vous avez trouvé un Point d'Intérêt!<br" + "><br" + "><u" + ">Nom:" + "</u" + ">" +" " + this._poiname + "<br" + ">" +
                        "<u" +">Description:</u" + ">" +" "+  this._obj.description + "<br" + "><u" + ">Stats:</u" + ">"
                        +" "+ this._stat + " +" + this._val + "<br" + "><br" + ">Cliquer pour fermer" + "</div" + ">");

                pbox.bind("MouseWheelScroll", function(evt) {
                    var p = document.getElementById("pois");
                    var ptop = p.offsetTop;
                    var parenth = pbox._h;
                    var pbot = p.offsetHeight;
                    var dynamic = parenth - pbot;

                    // scroll down
                    if(evt.direction == -1) {
                        if(ptop <= dynamic) {  } // do nothing
                        else p.style.top = (ptop + 20*evt.direction) + "px";
                    }
                    // scroll up
                    else {
                        if(ptop == 0){ } // do nothing
                        else p.style.top = (ptop + 20*evt.direction) + "px";
                    }
                });
                this.destroy();
            })
    },

    addPS: function(poiname, obj, stat, val){
        this._stat = stat;
        this._val = val;
        this._poiname = poiname;
        this._obj = obj;
    }
});
