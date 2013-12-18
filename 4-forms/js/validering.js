/*global console, window, document, confirm */
"use strict";
var Validator = {
    init: function () {
        
        var fnOk = 0,
            lnOk = 0,
            pnOk = 0,
            emOk = 0;
    
        var form = document.getElementById("payform");
        form.reset();
        
        // funktion som testar reg-uttryck och skickar tillbaka true eller false beroende på resultatet samt
        // ändrar class och label text på den givna inputen
        var testPattern = function (pattern, that, correctText, falseText) {
            
            if (!that.value.match(pattern)) {
                that.previousElementSibling.textContent = falseText;
                that.previousElementSibling.className = "notCorrect";
                that.className = "notCorrect";
                return false;
            } else {
                that.previousElementSibling.textContent = correctText;
                that.previousElementSibling.className = "normal";
                that.className = "normal";
                return true;
            }
        };
        
        // Förnamn
        var firstName = form.elements.fornamn;
        firstName.onfocus = function () {
            this.select();
        };
        
        firstName.onchange = function () {
            var fnPattern = /^.+$/;
            if (testPattern(fnPattern, this, "Förnamn:", "Förnamn: får inte vara tomt!")) {
                fnOk = 1;
            } else { fnOk = 0; }
        };
        
        // Efternamn
        var lastName = form.elements.efternamn;
        lastName.onfocus = function () {
            this.select();
        };
        
        lastName.onchange = function () {
            var lnPattern = /^.+$/;
            if (testPattern(lnPattern, this, "Efternamn:", "Efternamn: får inte vara tomt!")) {
                lnOk = 1;
            } else { lnOk = 0; }
        };
        
        // Postnummer
        var postNr = form.elements.postnr;
        postNr.onfocus = function () {
            this.select();
        };
        postNr.onchange = function () {
            var postPattern = /^(SE)?\s?\d{3}(\s|-)?\d{2}$/;
            if (testPattern(postPattern, this, "Postnummer:", "Postnummer: bör vara i XXXXX format, tex 12345")) {
                this.value = this.value.replace(/(SE)?-?\s?/g, "");
                pnOk = 1;
            } else { pnOk = 0; }
        };
        
        // E-post adress
        var email = form.elements.epost;
        email.onfocus = function () {
            this.select();
        };
        email.onchange = function () {
            var emailPattern = /^(?!\.)(\w|-|\.){1,64}(?!\.)@(?!\.)[\-.a-zåäö0-9]{4,253}$/;
            if (testPattern(emailPattern, this, "E-post adress:", "E-post adress: måste vara i korrekt format")) {
                emOk = 1;
            } else { emOk = 0; }
        };
        
        // Skicka knappen
        form.onsubmit = function () {
            if (fnOk * lnOk * pnOk * emOk) {
                
                var confirmText = "Vänligen bekräfta ditt köp\n\n" + firstName.previousElementSibling.innerHTML + " " + firstName.value + "\n" + lastName.previousElementSibling.innerHTML + " " + lastName.value + "\n" + postNr.previousElementSibling.innerHTML + " " + postNr.value + "\n" + email.previousElementSibling.innerHTML + " " + email.value;
                
                if (!confirm(confirmText)) {
                    return false;
                }
            } else { return false; }
        };
    }
};

window.onload = Validator.init;