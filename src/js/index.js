document.addEventListener('DOMContentLoaded', function(){


    try{
fin.desktop.main(function(){


        document.querySelector('#b1').addEventListener('click', function(e){
            e.preventDefault();
            showNotification("Notification one message");
        });

        document.querySelector('#b2').addEventListener('click', function(e){
            e.preventDefault();
            showNotification("Notification two message");
        });

        document.querySelector('#b3').addEventListener('click', function(e){
            e.preventDefault();
            showNotification("Notification three message");
        });

})
}catch(err){
    alert("NO OPENFIN ");
}

});


function showNotification(message){
    var _message = message || "no message passed"
    var notification = new fin.desktop.Notification({
        url: "notification.html",
        message: "some initial message",
        onClick: function () {
            console.log("clicked");
        },
        onClose: function () {
            console.log("closed");
            logOut("closed");
        },
        onDismiss: function () {
            console.log("dismissed");
            logOut("dismissed");
        },
        onError: function (reason) {
            console.log("error: " + reason);
        },
        onMessage: function (message) {
            console.log("message: ", message);
            logOut(_message+ ": "+ message);
            notification.sendMessage("I sent the message '"+message+"'");
            //
            //setTimeout(function(){
            //    notification.sendMessage("A message from the parent app.");
            //}, 2000)
        },
        onShow: function () {
            console.log("notification shown :", notification);
            notification.sendMessage("I will send the message '"+message+"'");
        }
    });

}

function logOut(message){
    console.log("THIS IS THE MESSAGE == ", message)
    document.querySelector('#log').innerHTML = '<p>'+message+'</p>'
}









