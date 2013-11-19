"use strict";

/*global window, console, document*/

window.onload = function () {

	
	var birthday = function (date) {
        
        var nowDate = new Date(), // dagens datum
            userDate = new Date(date), // användarens datum
            timeLeft, // tid kvar
            daysLeft; // dagar kvar
        
        var nowNoTimeDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()), // Dagens datum utan tid
            userThisYearDate = new Date(nowDate.getFullYear(), userDate.getMonth(), userDate.getDate()), // Användarens födelsedag i år        
            dateDifference = userThisYearDate.getTime() - nowNoTimeDate.getTime(), // skilladen i tid dagens datum och användarens födelsedag        
            userYear = nowDate.getFullYear(); // användarens födelsedag räknas i år om användaren inte redan har fyllt år
        if (dateDifference < 0) { // om skilladen är negativ så har användaren redan fyllt år 
            userYear += 1; // så vi räknar ut dagar till nästa års födelsedag
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
            if (isNaN(answer)) { // om det returnerade värdet i daysLeft är isNaN så har användaren skrivit in fel format på datumet
                throw new Error("Fel format på datumet!");
            }
			var message;
			switch (answer) {
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