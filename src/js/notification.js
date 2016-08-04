/**
 * Created by grahamclapham on 03/08/16.
 */


document.addEventListener('DOMContentLoaded', function(){
    init();
});

var _passedMessage = "no message set in the notification"


function onNotificationMessage(message){
    console.log("Received " + message);
    document.querySelector("#info").innerHTML = "<p>"+message+" </p>";
    _passedMessage = message;
}


var init = function(){
    fin.desktop.main(function(){

        document.querySelector("#closer").addEventListener('click', function(){
            // If inside of a notification:
            var notification = fin.desktop.Notification.getCurrent();
            notification.close();
        });

        document.querySelector("#message1").addEventListener('click', function(){
            // If inside of a notification:
            var notification = fin.desktop.Notification.getCurrent();
            notification.sendMessageToApplication(_passedMessage);
        });

        document.querySelector("#message2").addEventListener('click', function(){
            // If inside of a notification:
            var notification = fin.desktop.Notification.getCurrent();
            notification.sendMessageToApplication("Some other message");
        });



    })
};

