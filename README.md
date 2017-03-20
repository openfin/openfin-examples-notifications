# OpenFin examples: Notifications

OpenFin allows native desktop notifications, the system-level windows which briefly appear as alerts at the bottom right of the screen, to be created and interacted with. 

To run this example, clone the repository, run:

```javascript
$ npm install
```
There is a simple Node/Express server which will need to run. Navigate to the root directory of the project and run:

```javascript
$ node server
```
then launch from the command line with the [openfin-cli](https://www.npmjs.com/package/openfin-cli)

```javascript
$ openfin --launch --url http://localhost:5050
```
or click the link below to download the installer:

[Installer](https://dl.openfin.co/services/download?fileName=notificationOpenfin&config=http://localhost:5050/app.json)
## Create a new notification
A new Notification may be created as shown below:

```javascript
var notification = new fin.desktop.Notification({
	//The HTML page containing the content of the Notification/
	url: "exampleNotification.html",
	//'message' is where you may pass initial parameters
	message: {data: "hello world!"},
	onClick: function () {
		console.log("clicked");
	},
	onClose: function () {
	// Invoked when the 'close()' method is called.
		console.log("closed");
	},
	onDismiss: function () {
	//This is invoked when the notification is swiped right to dismiss. 
	//It is esentially the same as clove via a different method.
		console.log("dismissed");
	},
	onError: function (reason) {
		console.log("error: " + reason);
	},
	onMessage: function (message) {
	//Invoked when the 
		console.log("message: ", message);
	},
	onShow: function () {
		console.log("shown");
	}
});
```
## Setting initial state
Initial properties may be passed to the Notification window. They are sent via the 'message' property of the Object passed as an argument to the 'fin.desktop.Notification({})' constructor (see above). 

To access the properties within the Notification itself a global JavaScript function named 'onNotificationMessage' must be available. It will receive the Object, as an argument, and from there you may set the state of the Notification, for example:

Passing the argument to the constructor like this...

```javascript
var _obj = {
	message:"link copy",
	link: "http://www.somelinkaddress.com"
};

fin.desktop.Notification(_obj);
```
and adding the following javaScript code to the HTML of the Notification...

```javascript
function onNotificationMessage(obj){
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

```

will add a hyperlink to the Notification.

## Communication between app and notification
#### App to Notification
To send a message to the Notification from within the Application use:

```javascript
notificationInstance.sendMessage({value: "some value"});
```
 Inside the Notification a global 'onNotificationMessage' function is required (as per 'Setting initial state'). 

#### Notification to App
From within the Notification use:

```javascript
var notification = fin.desktop.Notification.getCurrent();
notification.sendMessageToApplication(passedMessageObject);
```
In the Object passed as an argument to the 'new fin.desktop.Notification' constructor function, pass the function to be invoked as the 'onMessage' property, like so...

```javascript
var notification = new fin.desktop.Notification({
	onMessage: function (message) {
		console.log("message = ", message);
		// do stuff with the 'message' object
	},
});
```
