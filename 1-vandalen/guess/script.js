"use strict";
/*global window, console, document*/

window.onload = function () {

    var min = 1, // minsta värde
        max = 100, // högsta värde
        secret = Math.floor(Math.random() * (max - min) + 1) + min, // slumpar ett tal mellan min och max
        guesses = 0, // lagrar antalet gissningar
	
	    guess = function (number) {
		    console.log("Det hemliga talet: " + secret); // Du når den yttre variabeln secret innifrån funktionen.
		    console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.
		
		    if (min <= number && number <= max) { // Om gissningen ligger inom intervallet

		        guesses = guesses += 1; // öka antalet gissningar användaren har gjort

		        if (secret < number) {  // Om gissningen är högre än det hemliga talet
		            return [false, "Det hemliga talet är lägre!"];
		        } else if (secret > number) { // Om gissningen är lägre än det hemliga talet
                    return [false, "Det hemliga talet är högre!"];
		        } else {
		            return [true, "Du gissade rätt! Det hemlige talet var " + secret + " och du behövde " + guesses + " gissningar för att hitta det"]; // Om användaren gissade rätt
		        }
		    } else { // Om gissningen inte är korrekt format eller inte ligger i intervallet
		        return [false, "Du måste skriva in ett tal i intervallet 1-100!"];
		    }
	    };
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"), // Referens till DOM-noden med id="#value"
        input = document.querySelector("#number"),
	    submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function (e) {
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value); // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if (answer[0] === true) {				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};