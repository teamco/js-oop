define(function loadConfig() {

    requirejs.config({

        baseUrl: '../../scripts/core',

        paths: {
            // Define public application path
            'public': '../../public',

            config: 'config',

            api: 'api',

            controller: 'controller',
            model: 'model',
            view: 'view',

            event: 'event',
            permission: 'permission',

            'extends': 'lib/extends',
            modules: 'lib/modules',

            test: 'test',

            jquery: 'lib/jquery/jquery-2.0.3.min',
            'jquery.ui': 'lib/jquery/jquery-ui-1.10.3.custom.min'
        },

        shim: {
            'jquery.ui': {deps: ['jquery']},
            'extends/function': {deps: ['jquery']},
            'extends/string': {deps: ['jquery']},
            'extends/array': {deps: ['jquery']}
        }

    });

    return require([
        'jquery',
        'jquery.ui',
        'extends/function',
        'extends/json',
        'extends/event',
        'extends/string',
        'extends/array'
    ], function loadMandatoryConfig() {

        return require([
            'modules/base'
        ], function initBase(Base) {

            /**
             * Define global application instance
             * @type {{}}
             */
            window.anthill = {};

            /**
             * Define global base
             * @type {Base}
             * @private
             */
            window.anthill._base = new Base();

            return require([
                'config/listeners',
                'config/permission'
            ]);
        });
    });
});