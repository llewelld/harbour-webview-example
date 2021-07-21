import QtQuick 2.0
import Sailfish.Silica 1.0
import Sailfish.WebView 1.0
import Sailfish.WebEngine 1.0

WebViewPage {
    id: page

    // The effective value will be restricted by ApplicationWindow.allowedOrientations
    allowedOrientations: Orientation.All

    WebView {
        anchors.fill: parent
        active: true
        url: "https://browser.sailfishos.org/tests/testpage.html"

        onLinkClicked: {
            console.log("Link clicked")
            WebEngine.notifyObservers("exampleTopic", url)
        }

        Component.onCompleted: {
            WebEngine.addComponentManifest("/usr/share/harbour-webview/components/components.manifest")
            console.log("Component added")
        }
    }
}
