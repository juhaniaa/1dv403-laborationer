"use strict";

/*global window, console, document*/

window.onload = function () {

	var birthday = function (date) {
        
        var nowDate = new Date(), // dagens datum
            userDate = new Date(date), // användarens datum
            timeLeft, // tid kvar
            daysLeft, // dagar kvar
            userYear;
        
        if (isNaN(userDate.getTime())) { // om getTime() inte är ett nummer så har användaren matat in ett felaktigt datum
            return -1;
        }
        
        // för att funktionen skall returnera samma antal dagar oavsett tidpunkt så görs datum objekten om exklusive tid
        var nowNoTimeDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()), // Dagens datum utan tid
            userThisYearDate = new Date(nowDate.getFullYear(), userDate.getMonth(), userDate.getDate()), // Användarens födelsedag detta år        
            dateDifference = userThisYearDate.getTime() - nowNoTimeDate.getTime(); // skilladen i tid dagens datum och användarens födelsedag;        
        
        var nextLeapYearFunction = function (fromDate) { // kontrollerar om fromDate är skottår och returnerar då vilkoret är uppfyllt
            
            while (fromDate % 4 !== 0 && (fromDate % 100 !== 0 || fromDate % 400 === 0)) { // skottår är delbart med 4 samtidigt som det är antingen delbart med 400 men inte 100
                fromDate += 1;
            }
            var nextLeapYear = fromDate;
            return nextLeapYear;
        };
        
        if (dateDifference < 0) { // om skilladen är negativ så har användaren redan fyllt år 
            userYear = nowDate.getFullYear() + 1; // så vi räknar ut dagar till nästa års födelsedag
        
        } else {
            userYear = nowDate.getFullYear(); // användarens födelsedag räknas i år om användaren inte redan har fyllt år                
        }
        
        if (userDate.getDate() === 29 && userDate.getMonth() === 1) { // om användaren fyller år 29 februari anropas nextLeapYearFunction för att ta reda på när nästa skottår är
            userYear = nextLeapYearFunction(userYear);
        }
        
        userDate = new Date(userYear, userDate.getMonth(), userDate.getDate()); // användarens nästa födelsedag
        
        timeLeft = userDate.getTime() - nowNoTimeDate.getTime(); // millisekunder kvar till födelsedagen
        daysLeft = Math.round(timeLeft / (1000 * 60 * 60 * 24)); // dagar kvar till födelsedagen     
        return daysLeft; // returnera antalet dagar kvar tills användaren fyller år!
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
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"

			var message;
			switch (answer) {
            case -1: // birthday returnerar -1 då användarens date objekt.getTime() inte är ett nummer dvs användaren har matat in felaktigt format på datuemt
                throw new Error("Fel format på datumet!");
            case 0:
                message = "Grattis på födelsedagen!";
                break;
            case 1:
                message = "Du fyller år imorgon!";
                break;
            default:
                message = "Du fyller år om " + answer + " dagar";
                break;
			}

			p.innerHTML = message;
		} catch (error) {
			p.classList.add("error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};