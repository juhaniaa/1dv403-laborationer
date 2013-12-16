"use strict";
var Validator = {
    init: function () {
    
        var form = document.getElementById("payform");
        
        var firstName = form.elements.fornamn;
        firstName.onfocus = function () {
            this.select();
        };
        
        firstName.onchange = function () {
            var fnPattern = /^.+$/;
            if (!firstName.value.match(fnPattern)) {
                this.previousElementSibling.textContent = "Förnamn: Får inte vara tomt!";
                this.previousElementSibling.className = "notCorrect";
                this.className = "notCorrect";
                return false;
            } else {
                this.previousElementSibling.textContent = "Förnamn:";
                this.previousElementSibling.className = "normal";
                this.className = "normal";
            }
        };
        
        var lastName = form.elements.efternamn;
        lastName.onfocus = function () {
            this.select();
        };
        
        lastName.onchange = function () {
            var lnPattern = /^.+$/;
            if (!lastName.value.match(lnPattern)) {
                this.previousElementSibling.textContent = "Efternamn: Får inte vara tomt!";
                this.previousElementSibling.className = "notCorrect";
                this.className = "notCorrect";
                return false;
            } else {
                this.previousElementSibling.textContent = "Efternamn:";
                this.previousElementSibling.className = "normal";
                this.className = "normal";
            }
        };
        
        var postNr = form.elements.postnr;
        postNr.onfocus = function () {
            this.select();
        };
        postNr.onchange = function () {
            var postPattern = /^(SE)?\s?\d{3}(\s|-)?\d{2}$/;
            if (!postNr.value.match(postPattern)) {
                this.previousElementSibling.textContent = "Postnummer: Bör vara i 'XXXXX' format!";
                this.previousElementSibling.className = "notCorrect";
                this.className = "notCorrect";
                return false;
            } else {
                this.value = this.value.replace(/(SE)?-?\s?/g, "");
                this.previousElementSibling.textContent = "Postnummer:";
                this.previousElementSibling.className = "normal";
                this.className = "normal";
            }
        
        };
        
        var email = form.elements.epost;
        email.onfocus = function () {
            this.select();
        };
        email.onchange = function () {
            var emailPattern = /^(?!\.)(\w|-|\.){1,64}(?!\.)@(?!\.)[-.a-zåäö0-9]{4,253}$/;
            if(!email.value.match(emailPattern)){
                this.previousElementSibling.textContent = "E-post adress: Bör vara i korrekt format!";
                this.previousElementSibling.className = "notCorrect";
                this.className = "notCorrect";
                return false;
            } else {
                this.previousElementSibling.textContent = "E-post adress:";
                this.previousElementSibling.className = "normal";
                this.className = "normal";
            }
        };
    }
};

window.onload = Validator.init;

// onsubmit = function(e) {
// gör validering av datat
// if (!ok){return false;}
//}