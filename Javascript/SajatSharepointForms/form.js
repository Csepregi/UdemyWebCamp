function CreateNewRapso () {

	
    var listName = "RapsoList";

    CreateListItemWithDetails(listName, "https://sites.ey.com/sites/cpihungary/RapsoAndSubContactorForms", function() {
        
        alert("Request submitted");
       

    }, function(data) {
        alert(data);
        alert("Ooops, an error occured. Please try again.");
    });

    
}


function CreateListItemWithDetails(listName, webUrl, success, failure) {


    var itemType = GetItemTypeForListName(listName);
    var item = {
        __metadata: {
            "type": itemType
        },
        Title: "hello",
        OpurtinityName: "hello",

    };

    $.ajax({
        url: "https://share.ey.net/sites/EYINSIDER" + "/_api/web/lists/getbytitle('" + listName + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function(data) {
            success(data);
        },
        error: function(data) {
            console.log(data);

        }
        
    });

    
}



function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";

}
