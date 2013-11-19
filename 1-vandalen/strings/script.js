"use strict";

/*global window, document, console*/

window.onload = function () {

	var convertString = function (str) {
        
        var strLength = str.length,
            j,
            strArray = [];

        if (str === "") { // kastar undantag om text-fältet är tomt
            throw new Error("Du måste skriva in text i fältet!");
        }
        
        for (j = 0; j < strLength; j += 1) {
            
            strArray[j] = str[j]; // sätter in text-strängen i en array
            
            if (strArray[j] === "a" || strArray[j] === "A") { // omvandlar a och A till #
                
                strArray[j] = "#";
                
            } else if (strArray[j] === strArray[j].toUpperCase()) { // omvandlar UpperCase-bokstäver till LowerCase

                strArray[j] = strArray[j].toLowerCase();

            } else if (strArray[j] === strArray[j].toLowerCase()) { // omvandlar LowerCase-bokstäver till UpperCase
                
                strArray[j] = strArray[j].toUpperCase();
            }
        }
        return strArray.join(""); // returnerar en sträng utav arrayen
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"), // Referens till DOM-noden med id="#value"
	    input = document.querySelector("#string"),
	    submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function (e) {
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove("error");

		try {
			var answer = convertString(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error) {
			p.classList.add("error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};