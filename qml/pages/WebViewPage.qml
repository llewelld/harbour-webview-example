import QtQuick 2.0
import Sailfish.Silica 1.0
import QtWebKit 3.0
import QtWebKit.experimental 1.0

Page {
    id: page
    allowedOrientations: Orientation.All

    SilicaWebView {
        anchors.fill: parent
        url: "http://www.sailfishos.org"

        experimental.temporaryCookies: true
        experimental.userAgent: "Mozilla/5.0 (Mobile Linux; U; like Android 4.4.3;"
            + " Sailfish OS/2.0) AppleWebkit/535.19 (KHTML, like Gecko)"
            + " Version/4.0 Mobile Safari/535.19"
        experimental.autoCorrect: false
        experimental.deviceWidth: parent.width
        experimental.deviceHeight: parent.height
    }
}
