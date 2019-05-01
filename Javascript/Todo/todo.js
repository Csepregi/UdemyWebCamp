
var Li = document.querySelectorAll("li");

for (var i = 0; i < Li.length; i++) {
    Li[i].addEventListener("mouseover", function() {
        
        this.classList.toggle("selected");
    })
    
    Li[i].addEventListener("click", function() {
        
        this.classList.toggle("done");
    })
}

