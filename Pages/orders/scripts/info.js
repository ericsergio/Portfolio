//Function to select or deselect lis
function selectItemInfo() {
    $(function () {
        //doubleclick will remove LI from clickedItemInfo Class
        $(".itemList li").on("dblclick", function () {
            $(this).removeClass("clickedItemInfo");
        });
        //click will add LI to clickedItemInfo class (highlights the li Blue)
        $(".itemList li").on("click", function () {
            $(this).addClass("clickedItemInfo"); // LINE MODIFIED
        });
    });
}
function doItemInfoStats() {
    //hide the original .itemList li's
    $(".itemList").hide();
    if ($("#resultTable").length) {
        $("#resultTable").remove();
    }

    //I have the values pushed into itemNames
    const purpose = 7;
    let data = $(this).serializeArray();
    let itemNames = [];
    //Grab clicked LI's
    $(".clickedItemInfo").each(function () {
        itemNames.push($(this).text());
    });
    //Loop through all values in throwaway array + push new array into data var to prepare for AJAX call;
    for (i = 0; i < itemNames.length; i++) {
        data.push({
            //One Dimension Array trick https://stackoverflow.com/questions/9001526/send-array-with-ajax-to-php-script
            //faking a key value pair so it doesn't throw an exception when it lands on fn.php... see above SO post.
            name: "itemNames[]", // These blank empty brackets are imp!
            value: itemNames[i],
        });
    }
    //ajax call to post to fn.php which calls purpose 7 -> see do_item_info_stats
    $.post("fn.php", {
        url: jQuery(this).attr("action"),
        dataType: "json",
        purpose: purpose,
        data: data,
    }).done(function (data) {
        $(".resultWrapper").append(data);
        console.log("ajax response : " + data);
    });
}
$(document).ready(function() {
    showInfoCases = [
        "#showInfoLiquorInfo",
        "#showInfoWineInfo",
        "#showInfoBottleInfo",
        "#showInfoKegInfo",
        "#showInfoNAInfo",
        '#showInfoSubmitBtnInfo'
    ];
    infoCases = [
        "#liquorInfo",
        "#wineInfo",
        "#bottleInfo",
        "#kegInfo",
        "#NAInfo",
        '#submitBtnInfo'
    ];
    $('.infoTypeInfoList').append(`
        <div id = 'liquorInfo'><li>
            Liquor info
        </li></div>
        <div id = 'wineInfo'><li>
            Wine info
        </li></div>
        <div id = 'bottleInfo'><li>
            Bottle info
        </li></div>
        <div id = 'kegInfo'><li>
            Keg Info
        </li></div>
        <div id = 'NAInfo'><li>
            NA info
        </li></div>
        <div id = 'submitBtnInfo'><li>
            Submit button info
        </li></div>
    `);
    
    
    var infoLeftVals = [];
    
    $('.typeList li').each(function(){
        infoLeftVals.push($(this).offset().left);                                        
    });
    for(let i = 0;i < infoCases.length;i++) {
        $(infoCases[i]).css('left', `${infoLeftVals[i]}px`);
    }


    for (let i = 0; i < showInfoCases.length; i++) {
        $(showInfoCases[i]).parent().on("mouseover", function () {
            //if ((ToggleHelp.init.evenOdd % 2) < 1) {
                //$('#toggleInfo').text("TURN HELP OFF");
                $(infoCases[i]).show();
            //}
            //else {
            //    $('#toggleInfo').text("TURN HELP ON");
            //}
        });

    $(showInfoCases[i]).parent().on("mouseout", function () {
    $(infoCases[i]).hide();
});
}
})


