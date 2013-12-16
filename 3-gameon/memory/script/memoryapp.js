var MemoryApp = {
    init: function () {
        "use strict";
        var mem1 = new Memory(3, 4, "game1");
        var mem2 = new Memory(2, 5, "game2");
        var mem2 = new Memory(4, 2, "game3");
        var mem2 = new Memory(5, 2, "game4");
        var mem2 = new Memory(2, 3, "game5");
    }
};

window.onload = MemoryApp.init;
