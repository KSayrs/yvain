/**
 * Created by KSayrs17 on 6/22/2016.
 */

// Knightly Traits
var statlist = {
"Fidélité": 5,
"Honneur": 5,
"Pitié": 5,
"Courtoisie": 5,
"Prouesse": 5,
"Sagesse": 5
};

/*
 {name: "Fidélité", current: 0},
 {name: "Honor/Glory", current: 0},
 {name: "Pitié", current: 0},
 {name: "Courtoisie", current: 0},
 {name: "Prowess", current: 0},
 {name: "Sagesse", current: 0}
 */

// how to update
// statlist["Sagesse"] = 2;
statlist["Sagesse"] += 1;

var len = statlist.length;

var makettable = function(){
    var gamediv = document.getElementById("game");

    // create outer div
    var outerdiv = document.createElement("div");
    outerdiv.setAttribute("id", "outerdiv");

    // create the table
    var table = document.createElement("TABLE");
    table.setAttribute("id", "TraitTable"); // POITable
    table.setAttribute("class", "traits"); // POITable
    table.style.marginTop = 80 + "px";
    outerdiv.appendChild(table);

    //append the table
    gamediv.appendChild(outerdiv);

    // Add rows
    var row = document.createElement("TR");
    row.setAttribute("id", "Row0");       // Row0
    document.getElementById("TraitTable").appendChild(row); // add row to table

    // add cols
    var th = document.createElement("TH");
    var name = document.createTextNode("Nom"); // Name
    th.setAttribute("class", "traits");
    th.appendChild(name);

    var th2 = document.createElement("TH");
    var current = document.createTextNode("Stats"); // Description
    th2.setAttribute("class", "traits");
    th2.appendChild(current);

    // add
    document.getElementById("Row0").appendChild(th);  // Add Name
    document.getElementById("Row0").appendChild(th2); // Add Current Stats
};

// ***************** Traits ******************** //
/* Things:
 *  Save table event - don't destroy the table every time but save it elsewhere so that it's easy to bring back -
 *  less loading time that way */

Crafty.defineScene("Traits", function(){

    Crafty.background("black");

    Crafty.trigger("showHide", false); // hide the main things

    clicked = false; // retrigger logic gate

    var table = makettable();

    // add the collected object to the table
    for(var item in statlist){
        if (statlist.hasOwnProperty(item)) {
            // add the new row
            var row = document.createElement("TR");
            var td = document.createElement("TD");
            td.setAttribute("class", "traits");
            var text = document.createTextNode(item); // new key
            var td2 = document.createElement("TD");
            td2.setAttribute("class", "center");
            var text2 = document.createTextNode(statlist[item]); // new value
            td.appendChild(text);
            td2.appendChild(text2);
            row.appendChild(td);
            row.appendChild(td2);
            document.getElementById("TraitTable").appendChild(row);
        }
    }

    // return to scene
    var ret = Crafty.e("DOM, Hover")
        .attr({w:142, h:40, x:640, y:20, z:messagez})
        .image(path+"menubut1.png")
        .setHover(path+"menubut2.png")
        .bind("SceneDestroy", function(){
            // DESTROYYY
            var elem = document.getElementById('outerdiv');
            elem.parentNode.removeChild(elem);

            if(saveScene != "Castle") {
                Crafty.trigger("showHide", true)
            }
            else {
                Crafty.trigger("destroyState")
            }
        })
        .bind("Click", function(){
            Crafty.enterScene(saveScene)
        });

    var tt = Crafty.e("ButtonText")
        .text("Retour")
        .attr({w:142, h:40, x:640, y: 22, z:messagez+12})
        .associate(ret);
});

