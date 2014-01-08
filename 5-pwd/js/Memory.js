/*global document, RandomGenerator*/
function Memory(rows, cols, memoryContentDiv) {
    "use strict";
    
    var cssPosition = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
    var last = 0;
    var lastIndex = 0;
    var lastRef = 0;
    var ready = true;
    var count = 0;
    var tries = 0;

    
    // fixar en slumpad array som bestämmer var bilderna ska sitta
    var rndArray = RandomGenerator.getPictureArray(rows, cols);
    
    // skapa en tabell och lägg till i memoryContentDiv
    var table = document.createElement("table");
    memoryContentDiv.appendChild(table);
    
    function createTable(element, index, array) {
        // vänder den bild som användaren tryckt på
        function turnPic() {
            
            function increaseTries() {
                tries += 1;
            }
            // endast två bilder skall kunna vändas samtidigt och en timer skall vända tillbaka de bilder som är uppvända
            // om bilden inte redan är rättsvängd och sväng tillbaka-timern är klar
            if (this.mayTurn == true && ready == true) {
        
                // sväng på den klickade bilden
                this.className = cssPosition[element];
                this.mayTurn = false;

                // om bilden inte har samma värde som den förra bilden och det inte är den första bilden som vänds...
                if (element != last && last != 0) {
                    
                    //sväng tillbaka bilderna
                    ready = false;
                    var that = this;
                    setTimeout(function () {
                    
                        that.className = cssPosition[0];
                        lastRef.className = cssPosition[0];
                        that.mayTurn = true;
                        lastRef.mayTurn = true;
                        last = 0;
                        ready = true;
                        increaseTries();
                    }, 1000);
                    
                // Om det är ett par, räkna upp räknaren
                } else if (element == last) {
                    count += 1;
                    last = 0;
                    increaseTries();
                    
                // annars är det den första bilden som vänds, spara värdet på den svängda bilden
                } else {
                    last = element;
                    lastIndex = index;
                    lastRef = this;
                    increaseTries();
                }
            }
            if ((count * 2) >= array.length) {
                // gör om meddelandet för när spelet är vunnet!!!!!!!!!!!!!!!!!!!
                var p = document.createElement("p");
                p.innerHTML = "Du vann på " + tries/2 + " försök!";
                memoryContentDiv.appendChild(p);
                
                
            }
            return false;
        }
        
        //då index % cols == 0 skapas en ny tr som läggs till i table
        if (index % cols == 0) {
            table.appendChild(document.createElement("tr"));
        }
        
        // sedan skapas en ny td för varje element och läggs till i tr
        // tdn skall innehålla en a tag som har en css klass för nedvänd bild
        // a taggen skall även ha en onklick som anropar turnPic
        var td = document.createElement("td");
        var a = document.createElement("a");
        a.className = "zero";
        a.href = "#";
        a.mayTurn = true;
        a.onclick = turnPic;
        td.appendChild(a);
        table.lastChild.appendChild(td);
    }
    rndArray.forEach(createTable);
}

