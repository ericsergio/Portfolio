/*class ToggleHelp {
    constructor(evenOdd) {
        this.evenOdd;
    }
}

ToggleHelp.init = new ToggleHelp(0);
ToggleHelp.init.evenOdd = 0;
*/

function doFilters(typeName) {
  if ($("#filterList").children().length > 0) {
    $("#filterList").remove();
  }
  $(".results").before(
    ' \
   <ul id = "filterList"> \
       <li id = "searchFilter"> \
           <input type = "text" id = "nameFilter_Input" placeholder = "SEARCH"> \
           </input> \
       </li> \
       <li id = "distFilter"> \
           <select id = "distFilter_Select"> \
               <option value = "empty"> \
                   Distributors \
               </option> \
               <option value = "Southern"> \
                   Southern \
               </option> \
               <option value = "Columbia"> \
                   Columbia \
               </option> \
               <option value = "Crown"> \
                   Crown \
               </option> \
               <option value = "Youngs"> \
                   Youngs \
               </option> \
           </select> \
       </li> \
       <li id = "typeFilter"> \
           <select id = "typeFilter_Select"> \
               <option value = "empty"> \
                   Types \
               </option> \
               <option value = "Liquor"> \
                   Liquor \
               </option> \
               <option value = "Wine"> \
                   Wine \
               </option> \
               <option value = "Bottle Beer"> \
                   Bottle Beer \
               </option> \
               <option value = "Keg Beer"> \
                   Keg Beer \
               </option> \
               <option value = "NA"> \
                   Non-Alcoholic \
               </option> \
           </select> \
       </li> \
       <li id = "orderTypeFilter"> \
           <select id = "orderTypeFilter_Select"> \
               <option value = "empty"> \
                   Order Unit \
               </option> \
               <option value = "Bottle"> \
                   Bottle \
               </option> \
               <option value = "Case"> \
                   Case \
               </option> \
               <option value = "Keg"> \
                   Keg \
               </option> \
           </select> \
       </li> \
   </ul>'
  );
  /////////
  //Type Filter
  /////////
  $("#typeFilter_Select").on("change", function () {
    var matchId = $(this).val();
    $("#resultTable tbody tr").each(function () {
      $(this).hide();
      if ($(this).children(":eq(2)").text() === matchId) {
        $(".tblHead").show();
        $(this).show();
      }
    });
  });
  ////////
  //Dist Filter
  ///////
  $("#distFilter_Select").on("change", function () {
    var matchId = $(this).val();
    $("#resultTable tbody tr").each(function () {
      $(this).hide();
      if ($(this).children(":eq(1)").text() === matchId) {
        $(".tblHead").show();
        $(this).show();
      }
    });
  });
  ////////
  //OrderType Filter
  ///////
  $("#orderTypeFilter_Select").on("change", function () {
    var matchId = $(this).val();
    //var orderTypeMatch = Number(matchId.substring(matchId.length - 1, matchId.length));
    $("#resultTable tbody tr").each(function () {
      $(this).hide();
      if ($(this).children(":eq(4)").text() === matchId) {
        $(".tblHead").show();
        $(this).show();
      }
    });
  });
  ////////
  //Search Filter
  ///////
  $("#nameFilter_Input").on("keyup", function () {
    var textVal = $(this).val();
    var head = $(".resultHead");
    $("#resultTable tr:gt(0)").filter(function () {
      $(".tableHead").toggle();
      $(this).toggle($(this).text().indexOf(textVal) > -1);
    });
  });
}

$(document).ready(function () {
  showInfoCases = [
    "#showDbItemsInfo",
    "#showDbDistsInfo",
    "#showDbUnitsInfo",
    "#showDbOrderedInfo",
    "#showDbQuantityInfo",
  ];
  infoCases = [
    "#itemsTblInfo",
    "#distsTblInfo",
    "#unitsTblInfo",
    "#orderedTblInfo",
    "#quantityTblInfo",
  ];
  $(".dbTypeInfoList").append(`
        <div id = 'itemsTblInfo'><li>
            This will display the items table. The items table is the main table in the database and contains the products for the orders. Opening this table will provide
            you with the ability to modify the database directly from this UI. Four filters will also be created that will allow you to filter the products by distributor,
            type of item (liquor, beer, wine, kegs, non-alcoholic), and the unit in which each item is set to be ordered by (bottle, case, keg). There is also a search 
            bar that will allow you to bring up any particular item you may need to modify.
        </li></div>
        <div id = 'distsTblInfo'><li>
            The distributor table can be viewed however cannot be edited yet
        </li></div>
        <div id = 'unitsTblInfo'><li>
            The units table can be viewed however cannot be edited yet
        </li></div>
        <div id = 'orderedTblInfo'><li>
            The ordered table can be viewed however cannot be edited yet
        </li></div>
        <div id = 'quantityTblInfo'><li>
            The quantity table can be viewed however cannot be edited yet
        </li></div>
    `);

  var infoLeftVals = [];

  $(".typeList li").each(function () {
    infoLeftVals.push($(this).offset().left);
  });
  for (let i = 0; i < infoCases.length; i++) {
    $(infoCases[i]).css("left", `${infoLeftVals[i]}px`);
  }

  for (let i = 0; i < showInfoCases.length; i++) {
    $(showInfoCases[i])
      .parent()
      .on("mouseover", function () {
        //if ((ToggleHelp.init.evenOdd % 2) < 1) {
        //$('#toggleInfo').text("TURN HELP OFF");
        $(infoCases[i]).show();
        //}
        //else {
        //    $('#toggleInfo').text("TURN HELP ON");
        //}
      });

    $(showInfoCases[i])
      .parent()
      .on("mouseout", function () {
        $(infoCases[i]).hide();
      });
  }
});
