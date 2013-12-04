var MemoryApp = {
    init: function () {
        "use strict";
        var mem1 = new Memory(3, 4, "game1");
        //var mem2 = new Memory();
        //mem1.start();
        //mem2.start();
    }
};

window.onload = MemoryApp.init;
