function Memory(rows, cols, gameId) {
    "use strict";
    
    var cssPosition = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
    
    // skapa en div tag med gameId för spelbrädan
    var div = document.createElement("div");
    div.id = gameId;
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    
    // fixar en slumpad array som bestämmer var bilderna ska sitta
    var rndArray = RandomGenerator.getPictureArray(rows, cols);
    
    // skapa en tabell
    var table = document.createElement("table");
    div.appendChild(table);
    
    function createTable(element, index, array) {
        
        // vänder den bild som användaren tryckt på
        function turnPic() {
            this.className = cssPosition[element];
            return false;
        }
        
        //då index + 1 % 3 == 0 skapas en ny tr som läggs till i table
        if (index % 3 == 0) {
            console.log(index);
            table.appendChild(document.createElement("tr"));
        }
        
        // sedan skapas en ny td för varje element och läggs till i tr
        // tdn skall innehålla en a tag som har en css klass för nedvänd bild
        // a taggen skall även ha en onklick som anropar turnPic
        var td = document.createElement("td");
        var a = document.createElement("a");
        a.className = "zero";
        a.href = "#";
        a.onclick = turnPic;
        td.appendChild(a);
        table.lastChild.appendChild(td);
        
        
    }
    rndArray.forEach(createTable);
    

}
