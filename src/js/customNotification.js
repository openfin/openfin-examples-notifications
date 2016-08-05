/**
 * Created by grahamclapham on 03/08/16.
 */


document.addEventListener('DOMContentLoaded', function(){
    init();
});

var _data = null;

function onNotificationMessage(obj){
    var mss = JSON.stringify(obj);
    _data = obj;
    document.querySelector("#main").innerHTML = "<div id='link'>"+obj.message+" </div>";

    document.querySelector('#main').addEventListener('click', function(e){
        fin.desktop.System.openUrlWithBrowser(_data.link, function () {
            console.log("successful");
        },function (err) {
            console.log("failure: " + err);
        });
    })

}


var init = function(){
    fin.desktop.main(function(){
        document.querySelector("#closer").addEventListener('click', function(){
            // If inside of a notification:
            var notification = fin.desktop.Notification.getCurrent();
            notification.close();
        });
    });
    //






};

