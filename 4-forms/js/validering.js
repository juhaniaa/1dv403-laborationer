"use strict";
var Validator = {
    init: function () {
    
        var form = document.getElementById("payform");
        
        var firstName = form.elements.fornamn;
        firstName.onfocus = function () {
            this.select();
        };
        firstName.onchange = function () {
            var fnPattern = /^[a-zA-Z]+$/;
            if (!firstName.value.match(fnPattern)) {
                alert("får ej vara tom!!!");
                var p = document.createElement("p");
                p.innerHTML = "Detta fält får inte vara tomt!";
                return false;
            } else {
                console.log("ändra tillbaka till skicka");
            }
        };
        
        var lastName = form.elements.efternamn;
        firstName.onblur = function () {};
        
        var postNr = form.elements.postnr;
        postNr.onblur = function () {};
        
        var email = form.elements.epost;
        email.onblur = function () {};
    }
};

window.onload = Validator.init;

// onsubmit = function(e) {
// gör validering av datat
// if (!ok){return false;}
//}