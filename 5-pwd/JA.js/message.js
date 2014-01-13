"use strict";
function Message(message, date) {
    
    this.getText = function () {
        return message;
    };
    
    this.setText = function (_text) {
        message = _text;
    };
    
    this.getDate = function () {
        return date;
    };
    
    this.setDate = function (_date) {
        date = _date;
    };

}

Message.prototype.toString = function () {
    return this.getText() + " (" + this.getDate() + ")";
};

// returnerar meddelandets innehåll i html format med <br/>
Message.prototype.getHTMLText = function () {
    return (this.getText().replace(/\n/g, "<br/>"));
};

Message.prototype.getDateText = function () {
    var time = this.getDate();
    return (time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
};

// returnerar datumet för ett message objekt i formatet "30 mars 2012"
Message.prototype.getAlertText = function () {
    var month = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "Spetember", "Oktober", "November", "December"],
        alertDate = this.getDate();
    return alertDate.getDate() + " " + month[+alertDate.getMonth()] + " " + alertDate.getFullYear();
};
