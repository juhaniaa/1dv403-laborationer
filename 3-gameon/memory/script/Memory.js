function Memory(rows, cols, gameId) {
    "use strict";
    
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
        //då index + 1 % 3 == 0 skapas en ny tr som läggs till i table
        if (index % 3 == 0) {
            console.log(index);
            table.appendChild(document.createElement("tr"));
        }
        
        // sedan skapas en ny td för varje element och läggs till i tr
        // tdn skall innehålla en a tag som har en css klass innehållandes arrayens värde
        // utifrån css bestäms vilken bild som hamnar i de olika a taggarna
        var td = document.createElement("td");
        var a = document.createElement("a");
        a.className = element;
        a.href = "#";
        td.appendChild(a);
        a.innerHTML = '<img src="pics/0.png" >';
        table.lastChild.appendChild(td);
    }
    rndArray.forEach(createTable);
}
