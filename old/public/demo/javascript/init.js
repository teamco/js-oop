require([

    '../../../scripts/core/config/main'

], function loadConfig() {

    require([
        'public/pets/javascript/listeners',
        'public/pets/javascript/permission'
    ], function loadCustomConfig() {

        require([
            'config/debugger'
        ], function initDebug() {

            require([
                'config/application'
            ], function initDemo(Application) {

                /**
                 * Define pets application
                 * @type {*}
                 */
                window.pets = new Application({
                    config: {
                        html: {
                            container: 'body'
                        },
                        appName: 'anthill',
                        mode: 'development'
                    }
                });

                window.demo.view.render();

                if (!window.demo.model.loadData()) {

                    var workspace1 = window.demo.api.createWorkspace([], true),
                        page1 = workspace1.api.createPage([], true);
                }
            });
        });
    });
});