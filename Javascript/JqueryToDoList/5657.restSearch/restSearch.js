// Parse an item and create an title/value hash table with all the properties available
function getFields(results) {
	r = {};
	for(var i = 0; i<results.length; i++) {
		if(results[i] != undefined && results[i].Key != undefined) {
			r[results[i].Key] = results[i].Value;
		}
	}
	return r;
}

$(document).ready(function() {
    
    var autocomplete = $( "#restSearch" ).autocomplete({
		minLength: 3,
		source: function( request, response ) {
			$.ajax({
			    beforeSend: function (request)
				{
					request.setRequestHeader("Accept", "application/json;odata=verbose;charset=utf-8");
				},
				url: "/_api/search/query?querytext='" + request.term + "*'",
				dataType: "json",
				success: function( data ) {
					response( $.map( data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results, function( item ) {
						return {
							fields: getFields(item.Cells.results)
						}
					}));
				},
				error: function( data ) {
					alert('search error');
				}
			});
		},
		// Run this when the item is in focused (not selected)
		focus: function( event, ui ) {
			//$( "#restSearch" ).val(ui.item.value );
			return false;
		},
		// Run this when the item is selected
		select: function( event, ui ) {
			location.href = ui.item.fields.Path;
		},
		appendTo: $('#menu-container')
	}).data( "uiAutocomplete" )._renderItem = function( ul, item ) {
		// format the documents using the OOTB SharePoint icons
		img = "ic" + item.fields.FileType + ".png";
		if(item.fields.FileType == "html") {
			img = "html16.png";
		}
		return $("<li>").append('<a><img style="margin-right:3px;top:3px;" src="/_layouts/15/images/'+ img +'">' + item.fields.Title + '</a>' )
			.appendTo( ul );
    };
});

