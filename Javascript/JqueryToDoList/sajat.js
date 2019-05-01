$(document).ready(function() {


    var ClientList = [];
    
    $("#formButton1").on("click", function(){
            $(".SubcontractForm").toggle();
        });
        $("#formButton2").on("click", function(){
            $(".SubcontractForm").toggle();
        });
        $("#formButton3").on("click", function(){
            $(".SubcontractForm").toggle();
        });
    
            
      
             var baseUrl = "https://internal.ey.net/sites/SPF/_api/web";
             
              XHRrequest(baseUrl + "/getuserbyid(" + _spPageContextInfo.userId + ")", function(success) {
              console.log(success);
              //var WindowsCode = success.d.LoginName.split('\\')[1];
              //console.log("HELLLO: " + _WindowsCode);
              id = success.d.Id;
              console.log(success);
            
                 XHRrequest(baseUrl + "/lists/getbytitle('Clients')/items?$top=5000", function(success) {
                 
                 console.log(success);
                     
                       $.each(success.d.results, function(index, item) {
                      /*console.log("NEVEK: " + item.Title);*/
                      ClientList.push(item.Title);
                                                           
                    });
                    /*console.log(ClientList);*/
    
                    
                                                    
                });
    });

    myFunction();
    
    
    function myFunction() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("PotentialSubName");
        filter = input.value.toUpperCase();
        /*ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");*/
        for (i = 0; i < ClientList.length; i++) {
            console.log("hello");
            console.log(i);
           /* a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }*/
        }
    }
    
    
    
    });
    