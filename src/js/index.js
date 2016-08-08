document.addEventListener('DOMContentLoaded', function(){


    try{
        fin.desktop.main(function(){
          fin.desktop.System.getVersion(function(v){
                console.log("version == ", v );
                document.querySelector("#version").innerHTML = "Runtime version: "+String(v);
            },function(){
                console.log("Failed to get the version...");
            });


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

            document.querySelector('#custom-note').addEventListener('click', function(e){
                e.preventDefault();
                showCustomNotification({message: "OpenFin" , link: "https://openfin.co"});
            });

            document.querySelector('#custom-note-2').addEventListener('click', function(e){
                e.preventDefault();
                showCustomNotification({message: "Thomson Reuters" , link: "http://thomsonreuters.com/en.html"});
            });

            document.querySelector('#multi-note').addEventListener('click', function(e){
                e.preventDefault();
                mutiNotes();
            });




        })
    }catch(err){
        alert("NO OPENFIN ");
    }
});


function showNotification(message){
    var _message = message || "no message passed";
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
        },
        onShow: function () {
            console.log("notification shown :", notification);
            notification.sendMessage("I will send the message '"+message+"'");
        }
    });
}


function showCustomNotification(obj){
    var _obj = obj || {message:"some initial message", link: "http://www.bbc.co.uk"};
    var customNotification = new fin.desktop.Notification({
        url: "custom_notification.html",
        message: _obj,
        customMessage:{msg:"hello I am the msg", other: "other stuff"},
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
            console.log("onMessage "+message)
        },
        onShow: function () {
            console.log("notification shown :", customNotification);
            // notification.sendMessage("I will send the message '"+message+"'");
        }
    });
}


function logOut(message){
    console.log("THIS IS THE MESSAGE == ", message)
    document.querySelector('#log').innerHTML = '<p>'+message+'</p>'
}

function mutiNotes(){

    var _start = 60;

    var _int = setInterval(function(){
        if(_start > 0){
            showCustomNotification({message: _start+" message " , link: "http://thomsonreuters.com/en.html"});
        }else{
           console.log("Finished");
            clearInterval(_int);
        }
        _start--;

    }, 500);




}









