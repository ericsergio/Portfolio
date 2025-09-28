class Item_Row {
  constructor(
    i_name,
    i_dist,
    i_type,
    i_par,
    d_order_type,
    d_order_quantity,
    default_order,
    on_hand
  ) {
    this.i_name = i_name;
    this.i_dist = i_dist;
    this.i_type = i_type;
    this.i_par = i_par;
    this.d_order_type = d_order_type;
    this.d_order_quantity = d_order_quantity;
    this.default_order = default_order;
    this.on_hand = on_hand;
  }
}

/* NOTE: I'm pretty sure StoreType was only for having the correct filters in managedb.html after clicking
new tables in typeWrapper without reloading the page. I had some issues getting it to work and scratched it 
until later or trying a different solution all togethor. I can't remember though if it was for anything else
so if some other problem comes up check this because I commented out the StoreType instantiation line
in the doType function*/

class StoreType {
  constructor(lastTypeClicked) {
    this.lastTypeClicked = lastTypeClicked;
  }
}

class ToggleMenu {
  constructor(evenOdd) {
    this.evenOdd = evenOdd;
  }
}

class ToggleHelp {
  constructor(evenOdd) {
    this.evenOdd;
  }
}

ToggleMenu.init = new ToggleMenu(0);

ToggleHelp.init = new ToggleHelp(0);
ToggleHelp.init.evenOdd = 0;

/* Something is up with selected class */

//When checkDisplay() is 1 then the display is in portrait mode.
//When checkDisplay is 0, this means the display is in landscape mode.
function checkDisplay() {
  /*
  ^^^2025^^^
  in mobile.css the color of displayIndicator gets set to rgb(1,0,0) and in main.css the color 
  is set to rgb(0,0,0) so the difference of the 4th character is what I used to toggle between 1 and 
  0 depending on if the display is landscape or portrait. In index.html the displayIndicator element 
  is created and set with the display:none css prop so the element is merely a fixed method of toggling
  sort of like creating an object with some logic that goes back and forth based on whatever you are 
  differenciating. If i remember correctly i was going to use the other values for other toggling 
  but right now im not sure if i did or not back then. I'll update this later after I trace my past 
  thinking since i wasn't so great at writing comments back then.*/
  var chkDisplay = Number($("#displayIndicator").css("color").charAt(4));
  var i = $(".selected").index();
  //console.log(`chkDisplay : ${chkDisplay}`);
  //doFooter();
  if (chkDisplay === 1) {
    $($(".typeList").children()[i]).addClass("selected");
    $(".typeList").children().not(".selected").css("display", "none");
    $(".navWrapper .navList").after(
      '<div id = "mobileMenuBtn" onclick = "mobileDisplayDists()"><img src = "images/menu.png" ></div>'
    );
    $("#hoverExplanation")
      .text("")
      .append(
        "Click the arrows to switch product types and click the product type to display the count sheet. Clicking the hamburger icon in the top right corner will display the distributors, click on these to produce that distributor's order sheet based on the input counts. 'Check Order' button is not functional as it is for api request from a proof of concept api that acts as if it is the distributor's api and checks whether or not the order is in stock. Uses an Azure cloud database that I had access to while I was a student."
      );
  }
  return chkDisplay;
}

window.onload = checkDisplay();
function ProcessItems(name, count) {
  this.name = name;
  this.count = count || 0;  
}

function doItems() {
  $(".itemList")
    .children("li")
    .each(function () {
      $(this).addClass("liResult");
    });
}

//Gives input to the 1st input on the count page after a type is clicked.
function doFocus() {
  $(".itemList").children("input:first").focus();
}

$(document).ready(function () {
  $(".countFilters")
    .children()
    .on("click", function () {
      var idx = $(this).index();
      var distID = idx + 1;
      var o = $(".itemList li");
      o.each(function () {
        if (Number($(this).attr("dVal")) !== Number(distID)) {
          var liItem = $(this);
          var inpItem = document.getElementById($(this).text());
          liItem.hide();
          $(inpItem).hide();
        }
      });
    });
});

//doType(typeName)
//This is for both the count page and manageDB page. Reacts to one of the items on the top of the page being clicked.
//doTable(tblRowID)
//keyValList
$(document).ready(function () {
  $(".type").each(function () {
    $(this)[0].addEventListener("click", function doType(typeName) {
      $(".resultWrapper").children().remove();
      var typeName = $(this).text();
      //StoreType.mostRecent = new StoreType(typeName);
      var idx = $(this).index() + 1;
      var currPage = window.location.href.substr(
        window.location.href.lastIndexOf("/") + 1
      );
      // purpose 1: is for count page and correlates to the do_booz_by_type php function
      // purpose 4: is for managedb page and will correlate to a php function not yet created
      //console.log(currPage);
      var purposeTypes = [1, 4, 6];
      var purposePages = ["index.html", "managedb.html", "info.html"];
      //I did it this way so I could add more pages that could have page specific php functions from the same php class depending on which html page the below ajax request is run from.
      for (p in purposePages) {
        if (currPage === purposePages[p]) {
          var purposeIdx = purposePages.indexOf(currPage);
          var purpose = purposeTypes[purposeIdx];
          console.log(purpose);
          if (purposeIdx === 0) {
            var postPath = "pages/fn.php";
          } else {
            var postPath = "fn.php";
          }
        }
      }
      $.post(postPath, { idx: idx, purpose: purpose }).done(function (data) {
        $(".resultWrapper").append(data);
        switch (purpose) {
          case 1:
            doFocus();
            break;
          case 4:
            var valArr = [];
            $(".itemRow").each(function () {
              $(this)[0].addEventListener("click", function doTable(tblRowID) {
                $("#filterList").hide();
                if (checkDisplay() === 1) {
                  $(".selected").hide();
                  $(".typeLeftRight li img").hide();
                }
                tblRowID = $(this).attr("id");
                $(this)
                  .children()
                  .each(function () {
                    valArr.push($(this).text());
                  });
                if ($("div.updateWrapper ul.keyValList")) {
                  $("div.updateWrapper ul.keyValList").remove();
                  $("div.updateWrapper").prepend(
                    "<ul class = 'keyValList'></ul>"
                  );
                }
                $(".resultWrapper").hide();
                Item_Row.selectedItem = new Item_Row(
                  valArr[0],
                  valArr[1],
                  valArr[2],
                  valArr[3],
                  valArr[4],
                  valArr[5],
                  valArr[6],
                  valArr[7]
                );
                var iRow = Item_Row.selectedItem;
                Item_Row.itemCopy = new Item_Row(
                  iRow.i_name,
                  iRow.i_dist,
                  iRow.i_type,
                  iRow.i_par,
                  iRow.d_order_type,
                  iRow.d_order_quantity,
                  iRow.default_order,
                  iRow.on_hand
                );
                for (p in Item_Row.selectedItem) {
                  $("ul.keyValList").append(
                    `<li>${p}</li><li id = ${p} onclick = "updateVal($(this))">${Item_Row.selectedItem[p]}</li>`
                  );
                }
                $("div.updateWrapper").css({
                  visibility: "visible",
                });
                valArr = [];
              });
            });
            break;
        }
      });
      if (postPath === "fn.php" && purpose === 4) {
        doFilters(typeName);
        if (typeName !== "Items") {
          $("#filterList li:gt(0)").remove();
        }
      }
    });
  });
});

function updatePageDiv(orig, field, changed) {
  switch (field) {
    case 1:
      if (changed.length <= 0) {
        changed = Item_Row.selectedItem.i_name;
      }
      orig.replaceWith(changed);
      Item_Row.selectedItem.i_name = changed;
      break;
    case 2:
      $("#i_dist").text(changed);
      Item_Row.selectedItem.i_dist = changed.substr(-1, 1);
      break;
    case 3:
      $("#i_type").text(changed);
      Item_Row.selectedItem.i_type = changed.substr(-1, 1);
      break;
    case 4:
      if (changed.length < 1) {
        changed = Item_Row.selectedItem.i_par;
      }
      orig.replaceWith(changed);
      Item_Row.selectedItem.i_par = Number(changed);
      break;
    case 5:
      $("#d_order_type").text(changed);
      Item_Row.selectedItem.d_order_type = changed.substr(-1, 1);
      break;
    case 6:
      $("#d_order_quantity").text(changed);
      Item_Row.selectedItem.d_order_quantity = changed.substr(-1, 1);
      break;
    case 7:
      if (changed.length < 1) {
        changed = Item_Row.selectedItem.default_order;
      }
      orig.replaceWith(changed);
      Item_Row.selectedItem.default_order = Number(changed);
      break;
    case 8:
      if (changed.length < 1) {
        changed = Item_Row.selectedItem.on_hand;
      }
      orig.replaceWith(changed);
      Item_Row.selectedItem.on_hand = Number(changed);
      break;
  }
}

/*
to do: later - the updates only work for the items table right now. So if an incorrect item is entered in the ordered
table, you need to update the incorrect field in MySQL++++++come back to this+++++++ It will require you to add new 
constructors for the objects representing the row to be updated. For the table that is working (the items table), refer
to the class Item_Row that is currently at the very top of the page (app.js). Then, you will need to add the new object
instantiations in the doTable(tblRowID) function followed by creating another object copy so that the original values
are stored along with the new values because the original values are being referenced in the SQL update function. In the
switch below, the cases are specific to the column names in the Items table so do something clever to differenciate
when working with a different table with different column names.
*/

function updateVal(val) {
  if ($("select")) {
    $(".updateField").remove();
  }
  switch (val.attr("id")) {
    /*each case has the same event handler, first param "this" corresponds to "orig" in updatePageDiv(). orig is 
		for the text inputs so that after the event handler is called it can change the element back from inputs to list 
		items with the new value. 
		The second param passes the case index because this function (updateVal) and the event handler (updatePageDiv), 
		both have switch statements containing corresponding case indexes. 
		The third param corresponds to "changed" in "updatePageDiv()" this is what the value is being changed to.
		*/
    case "i_name":
      //console.log('i_name');
      val.replaceWith(` \
			<input id = ${val.attr("id")} type = "text" placeholder = ${val.text()} \
			onfocusout = "updatePageDiv(this, 1, $(this).val())"></input>`);
      break;
    case "i_dist":
      //var distOffsetTop = $('#i_dist').offset().top;
      $(".keyValList").before(` \
			<div class = "updateField"> \
				<label for="field_distributers">Select Distributer:</label> \
				<select id="field_distributers" onchange = "updatePageDiv(this, 2, $(this).val())"> \
				  <option value="Southern1">Southern</option> \
				  <option value="Columbia2">Columbia</option> \
				  <option value="Crown3">Crown</option> \
				  <option value="Youngs4">Youngs</option> \
				</select> \
			</div> \
			`);
      var distOffsetTop = $("#i_dist").offset().top;
      var distOffsetLeft = $("#i_dist").offset().left;
      var distHeight = Number($("#i_dist").css("height").replace("px", ""));
      var selectWidth = Number($("select").css("width").replace("px", ""));
      $("#field_distributers").css({
        top: distOffsetTop,
        left: distOffsetLeft - selectWidth,
        height: distHeight,
      });
      break;
    case "i_type":
      $(".keyValList").before(` \
			<div class = "updateField"> \
				<label for="field_types">Select Type:</label> \
				<select id="field_types" onchange = "updatePageDiv(this, 3, $(this).val())"> \
				  <option value="Liquor1">Liquor</option> \
				  <option value="Wine2">Wine</option> \
				  <option value="Bottle_Beer3">Bottle Beer</option> \
				  <option value="Keg_Beer4">Keg Beer</option> \
				  <option value="NA5">Non-Alcoholic</option> \
				</select> \
			</div> \
			`);
      var typeOffsetTop = $("#i_type").offset().top;
      var typeOffsetLeft = $("#i_type").offset().left;
      var typeHeight = Number($("#i_type").css("height").replace("px", ""));
      var selectWidth = Number($("select").css("width").replace("px", ""));
      $("#field_types").css({
        top: typeOffsetTop,
        left: typeOffsetLeft - selectWidth,
        height: typeHeight,
      });
      break;
    case "i_par":
      val.replaceWith(` \
			<input id = ${val.attr("id")} type = "text" placeholder = ${val.text()} \
			onfocusout = "updatePageDiv(this, 4, $(this).val())"></input>`);
      break;
    case "d_order_type":
      $(".keyValList").before(` \
			<div class = "updateField"> \
				<label for="field_d_types">Select Default Type:</label> \
				<select id="field_d_types" onchange = "updatePageDiv(this, 5, $(this).val())"> \
				  <option value="Bottle1">Bottle</option> \
				  <option value="Case2">Case</option> \
				  <option value="Keg3">Keg</option> \
				</select> \
			</div> \
			`);
      var dOrderTypeOffsetTop = $("#d_order_type").offset().top;
      var dOrderTypeOffsetLeft = $("#d_order_type").offset().left;
      var dOrderTypeHeight = Number(
        $("#d_order_type").css("height").replace("px", "")
      );
      var selectWidth = Number($("select").css("width").replace("px", ""));
      $("#field_d_types").css({
        top: dOrderTypeOffsetTop,
        left: dOrderTypeOffsetLeft - selectWidth,
        height: dOrderTypeHeight,
      });
      break;
    case "d_order_quantity":
      $(".keyValList").before(` \
			<div class = "updateField"> \
				<label for="field_q_types">Select Default Type:</label> \
				<select id="field_q_types" onchange = "updatePageDiv(this, 6, $(this).val())"> \
				  <option value="187_ml1">187 ml</option> \
				  <option value="750_ml2">750 ml</option> \
				  <option value="1_Liter3">1 Liter</option> \
				  <option value="1.75_Liter_4">1.75 Liter</option> \
				  <option value="Bottle5">Bottle</option> \
				  <option value="Keg6">Keg</option> \
				  <option value="Can7">Can</option> \
				</select> \
			</div> \
			`);
      var dOrderQuantityOffsetTop = $("#d_order_quantity").offset().top;
      var dOrderQuantityOffsetLeft = $("#d_order_quantity").offset().left;
      var dOrderQuantityHeight = Number(
        $("#d_order_quantity").css("height").replace("px", "")
      );
      var selectWidth = Number($("select").css("width").replace("px", ""));
      $("#field_q_types").css({
        top: dOrderQuantityOffsetTop,
        left: dOrderQuantityOffsetLeft - selectWidth,
        height: dOrderQuantityHeight,
      });
      break;
    case "default_order":
      val.replaceWith(` \
			<input id = ${val.attr("id")} type = "text" placeholder = ${val.text()} \
			onfocusout = "updatePageDiv(this, 7, $(this).val())"></input>`);
      break;
    case "on_hand":
      val.replaceWith(` \
			<input id = ${val.attr("id")} type = "text" placeholder = ${val.text()} \
			onfocusout = "updatePageDiv(this, 8, $(this).val())"></input>`);
      break;
    default:
      console.log(val.attr("id"));
      console.log("default");
      break;
  }
}

//Purpose : 5
/*
posted params: 
1)	idx : corresponds to the selected table being updated
		currently only the items table works
2)	purpose : 5
3)	origName : item's name
				item name - since the item name is the primary key in the database this is used to select the correct item in the 
				update query The param's name is originalname because the name could potentially be one of the fields being updated.
4)	changes : an array of strings with each string in the form: field:fieldNewValue. The strings get parsed in fn.php.
*/
function confirmChange() {
  var changes = [];
  for (p in Item_Row.itemCopy) {
    if (Item_Row.itemCopy[p] !== Item_Row.selectedItem[p]) {
      changes.push(`${p} : ${Item_Row.selectedItem[p]}`);
    }
  }
  var origName = Item_Row.itemCopy.i_name;
  var idx = $(".selected").index() + 1;
  var purpose = 5;
  console.log(`fieldChangeToFromValue : ${changes[0]}`);
  $.post("fn.php", {
    idx: idx,
    purpose: purpose,
    originalname: origName,
    changeArr: changes,
  }).done(function (data) {
    //Need to display error here if one occurs via alert or something
    console.log("ajax response : " + data);
  });
  $("div.updateWrapper").css("visibility", "hidden");
  $(".resultWrapper").show();
  $("#filterList").show();
  $(".selected").show();
  $(".typeLeftRight li img").show();
}

/*
Applies to Exit button on manageDB page. Should probably move this function to manageDb.js.
Just hides and shows appropriate elements when exiting dialog
*/
function cancelChange() {
  $("ul.keyValList").remove();
  $("div.updateWrapper").css("visibility", "hidden");
  $(".resultWrapper").show();
  $("#filterList").show();
  $(".selected").show();
  $(".typeLeftRight li img").show();
}

/*
This needs work
*/
/*
function doFooter() {
    if (window.scrollY === 0) {
        $("footer").css({
            position: "fixed",
            top: "60px",
        });
    } else {
        $("footer").css({
            position: "fixed",
            top: "31px",
        });
    }
}
*/
//Purpose #3
/*
posted params:
	idx : The index of the clicked distributer list item in --> div.distWrapper ul.distList li.dist
	purpose : 3
*/
$(document).ready(function () {
  var screenHeight = window.screen.availHeight;
  var screenWidth = window.screen.availWidth;
  if (screenHeight > screenWidth) {
    $(".typeLeftRight").css("visibility", "visible");
    window.addEventListener("scroll", function (e) {
      //            doFooter();
    });
  } else {
    //in landscape view
    //doFooter();
  }
  $(".dist").each(function () {
    $(this)[0].addEventListener("click", function doDist(distName) {
      $(".resultWrapper").children().remove();
      var distName = $(this).text();
      var idx = $(this).index() + 1;
      var purpose = 3;
      $.post("pages/fn.php", { idx: idx, purpose: purpose }).done(function (
        data
      ) {
        //console.log("ajax response : " + data);
        $(".resultWrapper").append(data);
        $(".resultWrapper").show();
        /*
        ^^^2025^^^
        ToggleMenu is a class with a single prop of evenOdd that increments each time the hamburger
        button is clicked. The hamburger button is only displayed when in portrait mode. Since this 
        is an anonymous doc ready function each time you click it, it just keeps incrementing 
        so obviously without resetting it this will not be functional for anyone changing their display
        without refreshing the page which is meh but until or if i decide to rewrite the app this isn't
        a super high priority. 
        
        k, you need to change this such that you add classes to the elements rather than actually altering
        the css in the js function and move the styling to css. I now see that i did it this way bc
        I use the ToggleMenu.init.evenOdd mod 2 to determine if the distributer list is displayed.

        just as a disclaimer, I initially wrote this app as the requirement for completing my associates
        degree and before I began my bachelor's degree. There are obviously some quirky solutions because
        I was learning how to do a lot of this stuff when I first wrote this.

        
        */
        if (ToggleMenu.init.evenOdd > 0) {
          mobileDisplayDists();
          $("tr").each(function () {
            $(this).children(":last").hide();
          });
        }
      });
    });
  });
});

//Purpose #2
/*
posted params:
	name_count_str: a single string that gets parsed in process_count() in fn.php and extracts the count values with the item names
			***** This could be done more efficiently I think.
	purpose: 2
*/
function processCount() {
  var purpose = 2;
  $(".itemList")
    .children("input")
    .each(function () {
      var count = $(this).val();
      if (count != "") {
        var iName = $(this).attr("id");
        ProcessItems[[iName]] = new ProcessItems(iName, count);
      }
    });
  var props = [];
  for (p in ProcessItems) {
    props.push(ProcessItems[p]);
  }
  var name_count = [];
  for (p in props) {
    name_count.push(props[p].name + "--" + props[p].count);
  }
  var name_count_str = name_count.join();
  //console.log(`name_count_str: ${name_count_str}\n ${typeof name_count_str}`);
  $.post("pages/fn.php", {
    namecount: name_count_str,
    purpose: purpose,
  }).done(function (data) {
    console.log("ajax response : " + data);
  });
}

/*
This is for mobile layouts.
When display is in portrait mode, only one of the types/tables (depending on which page you are on) is shown with 2 arrows
to move through the options available
*/
function incrementIdx() {
  $(".resultWrapper").children().remove();
  var n = $(".selected").index();
  n = n + 1;
  var prevN = n - 1;
  if (prevN < 0) {
    prevN = $(".typeList").children(":last").index();
  }
  $($(".selected")[0]).removeClass("selected");
  $($(".typeList").children()[prevN]).hide();
  $($(".typeList").children()[n]).addClass("selected");
  $(".selected").css({
    margin: "25% 0% 0% 30%",
    color: "#000",
    display: "grid",
    "grid-template-columns": "20%",
  });
}

/*
This is for mobile layouts.
When display is in portrait mode, only one of the types/tables (depending on which page you are on) is shown with 2 arrows
to move through the options available
*/
function decrementIdx() {
  $(".resultWrapper").children().remove();
  var n = $(".selected").index();
  n = n - 1;
  var prevN = n + 1;
  var maxNum = $(".typeList").children().length;
  if (prevN > maxNum) {
    prevN = $(".typeList").children(":first").index();
  }
  $($(".selected")[0]).removeClass("selected");
  $($(".typeList").children()[prevN]).hide();
  $($(".typeList").children()[n]).addClass("selected");
  $(".selected").css({
    margin: "25% 0% 0% 30%",
    color: "#000",
    display: "grid",
    "grid-template-columns": "20%",
  });
}

/*
This needs to get fixed.
Works well unless display switches from landscape to portrail or vice versa without page being reloaded but 
otherwise gets all fuckered up.
*/
function mobileDisplayDists() {
  ToggleMenu.init.evenOdd += 1;
  console.log(ToggleMenu.init.evenOdd);
  if (ToggleMenu.init.evenOdd % 2 === 1) {
    $(".distWrapper").css({
      visibility: "visible",
      backgroundColor: "#fff",
      display: "block",
      left: "10%",
      top: "20%",
      height: "25%",
      width: "80%",
      "z-index": "3",
    });
    $(".distList").css({
      display: "grid",
      "grid-template-columns": "50% 50%",
      "grid-column-gap": "10%",
      "font-size": "1em",
      color: "#000",
      margin: "5% 15% 15% 0%",
    });
    $(".dist").css({
      padding: "2% 5% 2% 5%",
      color: "#000",
    });
    $(".resultWrapper").hide();
    $(".typeLeftRight").hide();
    $(".selected").hide();
    $('.results').after(`<div id = 'thatDiv'></div>`);
  } else {
    $(".distWrapper").fadeOut(1000);
    $(".distWrapper").css("visibility", "hidden");
    $(".resultWrapper").show();
    $(".selected").show();
    $(".typeLeftRight").show();
    $('.results').after(`<div id = 'thatDiv'></div>`);
  }
}

/*
This needs to get fixed.
Works well unless display switches from landscape to portrail or vice versa without page being reloaded but 
otherwise gets all fuckered up.
*/
function mobileDisplayDists() {
  ToggleMenu.init.evenOdd += 1;  
  if (ToggleMenu.init.evenOdd % 2 === 1) {
    $(".distWrapper").css({
      visibility: "visible",
      backgroundColor: "#fff",
      display: "block",
      left: "10%",
      top: "20%",
      height: "25%",
      width: "80%",
      "z-index": "3",
    });
    $(".distList").css({
      display: "grid",
      "grid-template-columns": "50% 50%",
      "grid-column-gap": "10%",
      "font-size": "1em",
      color: "#000",
      margin: "5% 15% 15% 0%",
    });
    $(".dist").css({
      padding: "2% 5% 2% 5%",
      color: "#000",
    });
    $(".resultWrapper").hide();
    $(".typeLeftRight").hide();
    $(".selected").hide();
  } else {
    $(".distWrapper").fadeOut(1000);
    $(".distWrapper").css("visibility", "hidden");
    $(".resultWrapper").show();
    $(".selected").show();
    $(".typeLeftRight").show();
  }
}

//
//
//
//
//
//
// For main page (index.html)
// Info boxes (how to) feature

const toggleHelp = () => {
  ToggleHelp.init.evenOdd += 1;
};

$(document).ready(function () {
  /*$('#hoverExplanation').append(`
        <button id = 'helpInfoOff'>TURN HELP OFF</button>
        `)*/

  //$('#toggleInfo').on('click', function() {
  //ToggleHelp.init.helpEvenOdd = 1;
  //});
  showInfoCases = [
    "#showLiquorInfo",
    "#showWineInfo",
    "#showBottlesInfo",
    "#showKegsInfo",
    "#showNAInfo",
    "#showSoInfo",
    "#showCoInfo",
    "#showCrInfo",
    "#showYoInfo",
    "#showSoCountFilterInfo",
    "#showCoCountFilterInfo",
    "#showCrCountFilterInfo",
    "#showYoCountFilterInfo",
    "#showSubmitInfo",
  ];
  infoCases = [
    "#liquorInfo",
    "#wineInfo",
    "#bottlesInfo",
    "#kegsInfo",
    "#NAInfo",
    "#filterSoInfo",
    "#filterCoInfo",
    "#filterCrInfo",
    "#filterYoInfo",
    "#filterSoCountInfo",
    "#filterCoCountInfo",
    "#filterCrCountInfo",
    "#filterYoCountInfo",
    "#submitCountBtnInfo",
  ];
  $(".typeInfoList").append(`
        <div id = 'liquorInfo'><li>Displays the liquor count list</li></div>
        <div id = 'wineInfo'><li>Displays the wine count list</li></div>
        <div id = 'bottlesInfo'><li>Displays the bottles count list</li></div>
        <div id = 'kegsInfo'><li>Displays the liquor kegs list</li></div>
        <div id = 'NAInfo'><li>Displays the liquor non-alcoholic list</li></div>
    `);
  $(".resultFilterInfoList").append(`
        <div id = 'filterSoInfo'><li> Output Southern's order</li></div>
        <div id = 'filterCoInfo'><li> Output Columbia's order</li></div>
        <div id = 'filterCrInfo'><li> Output Crown's order</li></div>
        <div id = 'filterYoInfo'><li> Output RNDC's(Youngs) order</li></div>`);
  $(".distFilterInfoList").append(`
        <div id = 'filterSoCountInfo'><li>
            Display Southern items for chosent type. After displaying the count sheet for a product type above, 
            you can use this to only display those product types distributed by Southern.
        </li></div>
        <div id = 'filterCoCountInfo'><li>
            Display Columbia items for chosent type. After displaying the count sheet for a product type above, 
            you can use this to only display those product types distributed by Columbia.
        </li></div>
        <div id = 'filterCrCountInfo'><li>
            Display Crown items for chosent type. After displaying the count sheet for a product type above, 
            you can use this to only display those product types distributed by Crown. 
        </li></div>
        <div id = 'filterYoCountInfo'><li>
            Display RNDC (Youngs) items for chosent type. After displaying the count sheet for a product type above, 
            you can use this to only display those product types distributed by RNDC (Youngs).
        </li></div>
        <div id = 'submitCountBtnInfo'><li>
            Submit new on-hand levels for displayed count sheet. Clicking this button will submit whatever count sheet
            that is currently displayed with any values entered. Leaving a field blank will not modify that item's current
            on-hand level.
        </li></div>
        `);

  for (let i = 0; i < showInfoCases.length; i++) {
    $(showInfoCases[i])
      .parent()
      .on("mouseover", function () {
        if (ToggleHelp.init.evenOdd % 2 < 1) {
          $("#toggleInfo").text("TURN HELP OFF");
          $(infoCases[i]).show();
        } else {
          $("#toggleInfo").text("TURN HELP ON");
        }
      });

    $(showInfoCases[i])
      .parent()
      .on("mouseout", function () {
        $(infoCases[i]).hide();
      });
  }

  $("#closeExplanation").on("click", function () {
    $("#hoverExplanation").hide();
  });
  $("html").on("click", function () {
    $("#hoverExplanation").hide();
  });
});
