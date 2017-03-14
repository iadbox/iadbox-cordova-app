var Iadbox = {

    AFFILIATE_ID: 'iadbox',
    SENDER_ID: '763715496070',
    BADGE_UPDATE_INTERVAL: 60000,
    iadboxPlugin: null,
    pushNotificationPlugin: null,
    pushId: "CannotObtainToken",
    topBarColor: "#1B5586",
    title: "",

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onPause.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);
    },
    
    onDeviceReady: function() {
        this.iadboxPlugin = window.plugins.iadbox;
        this.iadboxPlugin.customize(this.topBarColor, this.title);
        this.iadboxPlugin.disableTopBarBackButton();
        this.iadboxPlugin.enableExitAppOnBack();
        this.checkConnectionOrExit();
        this.askForPushId();
    },

    onPause: function() {
        this.checkConnectionOrExit();
        this.updateMessageCountBadge();
    },

    onResume: function() {
        this.checkConnectionOrExit();
    },

    askForPushId: function() {
        this.pushNotificationPlugin = PushNotification.init({
            android: {
                senderID: this.SENDER_ID
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            }
        });
        this.pushNotificationPlugin.on('error', function(e) {
            console.error(e.message);
            this.authenticateUser();
        }.bind(this));
        this.pushNotificationPlugin.on('registration', function(data) {
            this.pushId = data.registrationId;
            this.authenticateUser();
        }.bind(this));
    },

    showInbox: function() {
        this.iadboxPlugin.openInbox(this.hideSplash, this.logError);
    },

    hideSplash: function() {
        navigator.splashscreen.hide();
    },

    updateMessageCountBadge: function() {
        this.iadboxPlugin.getBadge(function(count) {
            console.debug("setting notification badge set: " + count);
            if (count > 0){
                cordova.plugins.notification.badge.set(count, function(arg1, arg2){
                    console.debug("callback from notification badge set: " + arg1 + " - " + arg2);
                });
            } else{
                cordova.plugins.notification.badge.clear();
            }
        }, this.logError);
        setTimeout(this.updateMessageCountBadge.bind(this), this.BADGE_UPDATE_INTERVAL);
    },

    authenticateUser: function() {
        this.iadboxPlugin.authenticateUser(this.AFFILIATE_ID, "", this.pushId, this.showInbox.bind(this), this.logError);
    },

    logError: function(message) {
        console.error("An unexpected error ocurred: " + message);
        alert("An unexpected error ocurred: " + message);
        navigator.app.exitApp();
    },

    checkConnectionOrExit: function() {
        networkState = navigator.connection.type;
        if(networkState === Connection.NONE) {
            alert("Sorry, there is no Internet Connection, Iadbox will now exit.");
            navigator.app.exitApp();
        }
    }
};

Iadbox.initialize();

