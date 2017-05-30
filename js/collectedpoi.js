/**
 * Created by Katyana on 6/8/2016.
 *
 */

// storing all collected POIs
var collected = {
    SamplePOI: {
        name: "SamplePOI",
        description: "This is an example of a point of interest. Point of interest descriptions will go here. If the user " +
        "collects more POIs than can fit on the screen, it will scroll.",
        stats: "+1 sagesse"
    }
};

num_collected = collected.length;

var makeTable = function(){
    var gamediv = document.getElementById("game");

    // create outer div
    var outerdiv = document.createElement("div");
    outerdiv.setAttribute("id", "outerdiv");

    // create scroll div
    var sdiv = document.createElement("div");
    sdiv.setAttribute("class", "scroll");
    sdiv.setAttribute("id", "scrolld");
    outerdiv.appendChild(sdiv);

    // create the table
    var table = document.createElement("TABLE");
    table.setAttribute("id", "POITable"); // POITable
    sdiv.appendChild(table);

    //append the table
    gamediv.appendChild(outerdiv);

    // Add rows
    var row = document.createElement("TR");
    row.setAttribute("id", "Row0");       // Row0
    document.getElementById("POITable").appendChild(row); // add row to table

    // add cols
    var td = document.createElement("TH");
    var name = document.createTextNode("Nom"); // Name
    td.appendChild(name);

    var td2 = document.createElement("TH");
    var description = document.createTextNode("Description"); // Description
    td2.appendChild(description);

    var td3 = document.createElement("TH");
    var stats = document.createTextNode("Stats"); // Stats
    td3.appendChild(stats);

    // add
    document.getElementById("Row0").appendChild(td);  // Add Name
    document.getElementById("Row0").appendChild(td2); // Add Description
    document.getElementById("Row0").appendChild(td3); // Add Stat Changes
};

// ***************** CollectedPOI ******************** //
/* Things:
*  Save table event - don't destroy the table every time but save it elsewhere so that it's easy to bring back -
 *  less loading time that way */

Crafty.defineScene("CollectedPOI", function(){
//var CreatePOI = function(){

    Crafty.background("black");
    Crafty.trigger("showHide", false); // hide the main things

    clicked = false; // retrigger logic gate

    var table = makeTable();

    // ////////// REINVENT THE WHEEL - THE SCROLLING WHEEL ///////////// //
    var t =  document.getElementById("POITable");
    var parent = document.getElementById("scrolld");

    Crafty.bind("MouseWheelScroll", function(evt) {
        var ttop = t.offsetTop;
        var parenth = parent.offsetHeight;
        var tbot = t.offsetHeight;
        var dynamic = parenth - tbot;

        // scroll down
        if(evt.direction === -1) {
            if(ttop <= dynamic) {  } // do nothing
            else t.style.top = (ttop + 20*evt.direction) + "px";
        }

        // scroll up
        else {
            if(ttop === 0){ } // do nothing
            else t.style.top = (ttop + 20*evt.direction) + "px";
        }
    });

    // add the collected objects to the table
    for(var key in collected){

        if(!collected.hasOwnProperty(key)) continue;

        Crafty.log(key);
        var noot = collected[key];
        // add the new row
        var row = document.createElement("TR");

        for (var item in noot){
            if(noot.hasOwnProperty(item)) {
                // add the cols to the row
                var td = document.createElement("TD");
                var text = document.createTextNode(noot[item]); // new key
                td.appendChild(text);
                row.appendChild(td);
            }
        }
        document.getElementById("POITable").appendChild(row);
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
