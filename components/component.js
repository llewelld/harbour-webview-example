const Ci = Components.interfaces;

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");

XPCOMUtils.defineLazyServiceGetter(Services, "embedlite",
                                    "@mozilla.org/embedlite-app-service;1",
                                    "nsIEmbedAppService");


Services.scriptloader.loadSubScript("chrome://embedlite/content/Logger.js");

function ExampleComponent() {
  Logger.debug("JSComp: ExampleComponent.js loaded");
}

ExampleComponent.prototype = {
  classID: Components.ID("{20227a22-1722-4753-b8f7-c842b401b4c3}"),

  QueryInterface: XPCOMUtils.generateQI([Ci.nsIObserver]),

  __promptService : null, // Prompt service for user interaction
  get _promptService() {
    if (!this.__promptService)
      this.__promptService =
          Cc["@mozilla.org/embedcomp/prompt-service;1"].
          getService(Ci.nsIPromptService);
    return this.__promptService;
  },

  observe: function(aSubject, aTopic, aData) {
    switch (aTopic) {
    case "app-startup":
      Services.obs.addObserver(this, "exampleTopic", false);
      break;
    case "exampleTopic":
      Logger.debug("ExampleComponent: exampleTopic data: " + aData);

      // Change the prompt here to test different types
      // This file will be installed to /usr/share/harbour-webview/components/component.js
      // and can be edited directly

      this.triggerConfirm();
      //this.triggerAlert();
      //this.triggerPrompt();
      //this.triggerPromptUsernameAndPassword();
      //this.triggerPromptPassword();
      //this.triggerSelect();
      break;
    }
  },

  // Developer prompt generation
  // For all available prompt types and parameters see:
  // gecko-dev/toolkit/components/windowwatcher/nsIPromptService.idl

  triggerConfirm: function() {
    Logger.debug("JSComp: ExampleComponent.js confirm");
    var check = { "value": false };
    let buttonFlags = Ci.nsIPromptService.BUTTON_TITLE_REVERT + (Ci.nsIPromptService.BUTTON_TITLE_SAVE << 8);
    let result = this._promptService.confirmEx(Services.ww.activeWindow, "Title", "text", buttonFlags, null, null, null, "Check", check);
    Logger.debug("JSComp: ExampleComponent.js confirm result: " + result);
    Logger.debug("JSComp: ExampleComponent.js check: " + check.value);
  },

  triggerAlert: function() {
    Logger.debug("JSComp: ExampleComponent.js alert");
    this._promptService.alert(Services.ww.activeWindow, "Title", "text");
    Logger.debug("JSComp: ExampleComponent.js alert has no result");
  },

  triggerPrompt: function() {
    Logger.debug("JSComp: ExampleComponent.js prompt");
    var check = { "value": false };
    var value = { "value": "value" }
    let result = this._promptService.prompt(Services.ww.activeWindow, "Title", "text", value, "Value string", check);
    Logger.debug("JSComp: ExampleComponent.js prompt result: " + result);
    Logger.debug("JSComp: ExampleComponent.js value: " + JSON.stringify(value));
    Logger.debug("JSComp: ExampleComponent.js check: " + check.value);
  },

  triggerPromptUsernameAndPassword: function() {
    Logger.debug("JSComp: ExampleComponent.js promptUsernameAndPassword");
    var check = { "value": false };
    var username = { "value": "Username"};
    var password = { "value": "Password"};
    let result = this._promptService.promptUsernameAndPassword(Services.ww.activeWindow, "Title", "text", username, password, "Check message", check);
    Logger.debug("JSComp: ExampleComponent.js promptUsernameAndPassword result: " + result);
    Logger.debug("JSComp: ExampleComponent.js username: " + JSON.stringify(username));
    Logger.debug("JSComp: ExampleComponent.js password: " + JSON.stringify(password));
    Logger.debug("JSComp: ExampleComponent.js check: " + check.value);
  },

  triggerPromptPassword: function() {
    Logger.debug("JSComp: ExampleComponent.js promptPassword");
    var check = { "value": false };
    var password = { "value": "Password"};
    let result = this._promptService.promptPassword(Services.ww.activeWindow, "Title", "text", password, "Check message", check);
    Logger.debug("JSComp: ExampleComponent.js promptPassword result: " + result);
    Logger.debug("JSComp: ExampleComponent.js password: " + JSON.stringify(password));
    Logger.debug("JSComp: ExampleComponent.js check: " + check.value);
  },

  triggerSelect: function() {
    Logger.debug("JSComp: ExampleComponent.js select");
    var items = ["First", "Second", "Third"];
    var selection = { "value": 0 };
    let result = this._promptService.select(Services.ww.activeWindow, "Title", "text", items.length, items, selection);
    Logger.debug("JSComp: ExampleComponent.js select result: " + result);
    Logger.debug("JSComp: ExampleComponent.js selection: " + JSON.stringify(selection));
  },
};

this.NSGetFactory = XPCOMUtils.generateNSGetFactory([ExampleComponent]);
