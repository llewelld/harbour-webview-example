import QtQuick 2.0
import Sailfish.Silica 1.0
import Sailfish.WebView 1.0
import Sailfish.WebEngine 1.0
import Sailfish.WebView.Popups 1.0

Page {
    id: page
    allowedOrientations: Orientation.All

    WebView {
        anchors.fill: parent
        url: "http://www.sailfishos.org"
        privateMode: true
        httpUserAgent: "Mozilla/5.0 (Mobile; rv:78.0) Gecko/78.0 Firefox/78.0"

        popupProvider: PopupProvider {
             // Disable the Save Password dialog
             passwordManagerPopup: null
        }
    }
}
