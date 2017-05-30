/**
 * Created by KSayrs17 on 6/3/2016.
 *
 * Components related to buttons and button creation.
 * >> Hover, SceneChange, ButtonText, PlainButton
 *
 */

/* //////////////////////// Next Button /////////////////////////////////////
*
* This was not implemented int the demo, but was being worked on as a more
* efficient way of handling buttons
*
* btext
* onClick
* */

// next button
Crafty.c("Next", {
    _bt: "Continuer", // button text
    init: function() {},
    // onclick, button name, button text
    // default button text is Continuer
    btext: function(bt){
       // if(bt === null) this._bt = "Continuer";
        this._bt = bt;
    },
    onClick: function(f) {
        var n = Crafty.e("PlainButton").setPosition("two");
        var x = Crafty.e("ButtonText").text(this._bt).associate(n).place().bind("Click", function(){
            f();
        });
    }
});



/* ///////////////////////// Hoverable //////////////////////////////////////
// place
// setHover
// makeHover (NOT USED)
// endHover (NOT USED)
*/

Crafty.c("Hover", {
    _hoverimage: "",
    _baseimage: "",

    init: function(){
        this.addComponent("2D, DOM, Image, Mouse")
            .attr({w:Crafty.viewportWidth, h:Crafty.viewportHeight, z:messagez+2, x:0, y:0})
            .bind("MouseOver", function(){
                this._baseimage = Crafty.clone(this.__image);
                this.image(this._hoverimage);
            })
            .bind("MouseOut", function(){
                this.image(this._baseimage)
            })
    },

    // put the button
    place: function(x, y){
        this.x=x;
        this.y=y;
        return this;
    },

    // set the hover image
    setHover: function(imgurl){
        this._hoverimage = imgurl;
        return this;
    },

    // experimental function
    makeHover: function(){
        this._baseimage = Crafty.clone(this.__image);
        this.image(this._hoverimage);
        return this;
    },
    //partner to experiment above
    endHover: function(){
        this.image(this._baseimage);
        return this;
    }
});

/* ////////////////////// SceneChange Button /////////////////////////////////
* setNewScene
* setPosition
*
* Inefficiencies: two click binds, one for text and one for button image. Look for workaraound if time
* */

Crafty.c("SceneChange", {

    _newscene: "",
    _y: 550+20,

    init: function(){
        this.addComponent("Hover, Mouse")
            .attr({w:700, h:70, x:(800-700)/2, y: this._y, z:messagez})
            .image(path+"choicebutup2.png")
            .setHover(path+"choicebutdown2.png")
            .bind("Click", function(){
                if(this._newscene != "FontaineClose") {
                    Crafty.audio.stop();
                }
                if(this._newscene == "Castle"){
                    Crafty.trigger("destroyState");
                    Crafty.enterScene("Castle")
                }
                else { Crafty.enterScene(this._newscene) }
            })
    },

    // set the scene
    setNewScene: function(newscene){
        this._newscene = newscene;
        return this;
    },

    // set the position, default is one - change this to numbers one day
    setPosition: function(position){
        switch(position){
            case "one":
                this._y = 550+10;
                break;
                break;
            case "two":
                this._y = 550+90;
                break;
            case "three":
                this._y = 550+170;
                break;
            default:
                Crafty.log("Case statement was not one, two, or three.")
        }
        return this;
    }
});

/* ////////////////////// ButtonText //////////////////////////////////////
// Button text stuff
// associate
// place
// SHbutton
*/
Crafty.c("ButtonText", {

    _buttonName: "",
    _type: "",

    init: function () {
        this.addComponent("2D, DOM, Mouse, Text")
            .attr({w:700, h:50, x:(800-700)/2, y: 550+35, z:messagez+1})
            .unselectable()
            .bind("Click", function(){
                this._buttonName.trigger("Click");
            })
            .bind("MouseOver", function(){
                this._buttonName.trigger("MouseOver");
            })
            .bind("MouseOut", function(){
                this._buttonName.trigger("MouseOut");
            })
            .textColor('#000000')
            .textFont({family: "Mirza", style: "cursive", size: '24px', align: "center", weight: "600"})
            .css({"text-align": "center", "display": "inline-block"});
    },

    associate: function(e){
        this._buttonName = e;
        //this._type = type;
        return this;
    },

    place: function(){
        this._y = this._buttonName._y + 17;
        return this;
    },
    // hides both the text and its associated button
    SHbutton: function (bool) {
        this.attr({visible: bool});
        this._buttonName.attr({visible: bool});
        return this;
    }
});

/* //////////////////////// PlainButton ////////////////////////
* Buttons for the button box - this class made specifically for easy positioning
* setPosition
* */
Crafty.c("PlainButton", {

    _y: 550+20,

    init: function(){
        this.addComponent("Hover, Mouse")
            .attr({w:700, h:70, x:(800-700)/2, y: this._y, z:messagez})
            .image(path+"choicebutup2.png")
            .setHover(path+"choicebutdown2.png")
    },

    //set the position, default is one
    setPosition: function(position){
        switch(position){
            case "one":
                this._y = 550+10;
                break;
                break;
            case "two":
                this._y = 550+90;
                break;
            case "three":
                this._y = 550+170;
                break;
            default:
                Crafty.log("Your case statement was not one, two, ot three. Go fix it")
        }
        return this;
    }
});