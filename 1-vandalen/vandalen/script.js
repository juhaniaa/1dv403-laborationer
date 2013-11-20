"use strict";

/*global console*/

var makePerson = function (persArr) {

    var result = {},
        namesArr = [], // sparar namnen
        ages = [], // sparar åldrar
        totalAge = 0,
        avarage,
        namesStr, // sträng innehållande samtliga personers namn separerade med ", " och sorterade
        min,
        max,
        createArrays;
    
    try { // persArr delas upp i två arrayer innehålladne namnen i ena och åldrarna i den andra
        createArrays = function (element, index, array) {
            if (typeof element.name === "string") {
                namesArr.push(element.name); // objectets namn läggs till i arrayen names
            } else {
                throw new Error("Namnet på plats " + index + " i objektet är fel format");
            }

            if (!isNaN(element.age) && element.age !== isNaN) { // om age inte är isNaN
                
                ages.push(element.age); // objectets ålder läggs till i arrayen ages    
                
            } else {
                console.log(element.age + " är inte en giltig ålder");
                //throw new Error("Ålder på plats " + index + " i objektet är fel format");
            }
            
            totalAge = totalAge + element.age; // den totala åldern räknas ut
        };
        
    } catch (error) {
        return error.message;
    }
    
    persArr.forEach(createArrays); // för varje object anropas createArrays
    
    namesArr.sort(function (a, b) { // sorterar namnen i bokstavsordning
        return a.localeCompare(b);
    });
    namesStr = namesArr.join(", ");
    min = Math.min.apply(Math, ages); // räknar ut lägsta åldern
    max = Math.max.apply(Math, ages); // räknar ut högsta åldern
    avarage = Math.round(totalAge / (ages.length)); // räknar ut medelåldern
        
    result = {minAge: min, maxAge: max, averageAge: avarage, names: namesStr};
    
    return result;
};
var data = [{name: "John Hägerudd", age: 56}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

makePerson(data);



