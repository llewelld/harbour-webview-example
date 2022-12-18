#include <QtQuick>

#include <sailfishapp.h>

#include "webenginesettings.h"

static void showHelp()
{
    qDebug() << "Usage: cmd --help | [URL]...";
}

int main(int argc, char *argv[])
{
    bool execute = true;
    int result = 0;
    QString startUrl;

    qDebug() << "WebView Example";

    if ((argc > 2) || ((argc == 2) && (strcmp("--help", argv[1]) == 0))) {
        showHelp();
        execute = false;
    }

    if (execute) {
        if (argc == 2) {
            startUrl = QString(argv[1]);
            qDebug() << "Start URL set to: " << startUrl;
        }
        else {
            startUrl = QStringLiteral("https://www.flypig.co.uk/search/");
            qDebug() << "Using default start URL: " << startUrl;
        }

        qDebug() << "Opening webview";

        QGuiApplication *app = SailfishApp::application(argc, argv);

        QQuickView *view = SailfishApp::createView();
        // The engine takes ownership of the ImageProvider
        view->setSource(SailfishApp::pathTo("qml/harbour-webview.qml"));

        QQmlContext *ctxt = view->rootContext();
        ctxt->setContextProperty("startUrl", startUrl);
        view->show();

        SailfishOS::WebEngineSettings *webEngineSettings = SailfishOS::WebEngineSettings::instance();

        result = app->exec();
    }

    return result;
}
