/*global window, console, document*/
"use strict";
var MessageBoard = {
    messages: [],
    init: function () {
        
        var send = document.getElementById("send");
        send.onclick = MessageBoard.writeMessage;
    },
    
    writeMessage: function () {

        // om fältet är tomt ska meddelanden inte "skickas"
        if (document.getElementById("textfield").getElementsByTagName("textarea")[0].value == 0) {
            return false;
        }

        var message = document.getElementById("textfield").getElementsByTagName("textarea")[0].value;

        // skapar ett nytt message object med texten och tiden och
        // lägger till den i arrayen för meddelanden
        MessageBoard.messages.push(new Message(message, new Date()));
        document.getElementById("textfield").getElementsByTagName("textarea")[0].value = "";

        // anropar renderMessages för att skriva ut alla meddelanden
        MessageBoard.renderMessages();

        return false;
    },
    
    renderMessage: function (theMessage, messageID) {
        var text = document.createElement("p"),
            div = document.getElementById("messageArea");
        text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
        div.appendChild(text);
        
        // skapa span tag fyll den med meddelandets skapelse tid och lägg till i slutet av meddelandet
        var messageTime = document.createElement("span");
        messageTime.innerHTML = MessageBoard.messages[messageID].getDateText();
        text.appendChild(messageTime);
    
    },
    
    renderMessages: function () {
        // radera all meddelanden
        document.getElementById("messageArea").innerHTML = "";
        
        // anropa renderMessage för varje meddelande i messages arrayen
        MessageBoard.messages.forEach(MessageBoard.renderMessage);
    }
};


window.onload = MessageBoard.init;