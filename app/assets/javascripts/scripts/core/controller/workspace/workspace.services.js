define(function defineWorkspaceSEO() {

    /**
     * Define WorkspaceServices
     * @class WorkspaceServices
     * @extends BaseController
     * @constructor
     */
    var WorkspaceServices = function WorkspaceServices() {
    };

    return WorkspaceServices.extend(
        'WorkspaceServices', {

            /**
             * Check if service should be loaded
             * @memberOf WorkspaceController
             */
            isServiceActivated: function isServiceActivated(code, activate) {

                if (!(typeof code === 'string' && code.length)) {
                    this.scope.logger.debug('Unable to fetch Code', code);
                    return false;
                }

                if (!activate) {
                    this.scope.logger.debug('Code does not activated', code);
                    return false;
                }

                return true;
            },

            /**
             * Load Bigmir.net code
             * @memberOf WorkspaceController
             */
            loadActivateBigMirNet: function loadActivateBigMirNet() {

                this.logger.debug('Load Bigmir.net code', arguments);

                /**
                 * Get prefs
                 * @type {{bigmirNetEmbedCode, activateBigmirNet}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Get Inject Script Code
                 * @type {string}
                 */
                var bigmirNetEmbedCode = preferences.bigmirNetEmbedCode,
                    activate = preferences.activateBigmirNet;

                var id = 'bigmir-net';

                // Remove code
                $('#' + id).remove();

                if (!this.controller.isServiceActivated(bigmirNetEmbedCode, activate)) {
                    this.logger.debug('Remove bigmirNetEmbedCode', bigmirNetEmbedCode);
                    return false;
                }

                var $content = $('<div id="' + id + '"><div id="' + id + '-inner"></div></div>');

                $content.append(
                    bigmirNetEmbedCode.replace(
                        /bmD\.write/,
                        'document.getElementById("' + id + '-inner").innerHTML='
                    )
                );

                $('body').append($content[0]);
            },

            /**
             * Load inject script code
             * @memberOf WorkspaceController
             */
            loadActivateInjectScript: function loadActivateInjectScript() {

                this.logger.debug('Load inject script code', arguments);

                /**
                 * Get prefs
                 * @type {{injectScriptEmbedCode, activateInjectScript}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Get Inject Script Code
                 * @type {string}
                 */
                var injectScriptCode = preferences.injectScriptEmbedCode,
                    activate = preferences.activateInjectScript;

                if (!this.controller.isServiceActivated(injectScriptCode, activate)) {
                    return false;
                }

                try {

                    /**
                     * Define function
                     * @type {Function}
                     */
                    var mainScript = new window.Function(injectScriptCode);

                    // Run script
                    mainScript();

                } catch (e) {

                    this.logger.warn('Unable to execute script', injectScriptCode, e);
                }
            },

            /**
             * Load SnapEngage Code
             * @memberOf WorkspaceController
             */
            loadActivateSnapEngage: function loadActivateSnapEngage() {

                this.logger.debug('Load SnapEngage Code', arguments);

                /**
                 * Get prefs
                 * @type {{snapEngageCode, activateSnapEngage}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Get SnapEngage Code
                 * @type {string}
                 */
                var snapEngageCode = preferences.snapEngageCode,
                    activate = preferences.activateSnapEngage;

                if (!this.controller.isServiceActivated(snapEngageCode, activate)) {

                    this.logger.debug('Remove SnapEngage', snapEngageCode);
                    $('[id^=SnapABug]').remove();
                    return false;
                }

                // Get uuid key
                var code = snapEngageCode.match(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

                if (!code) {
                    this.logger.debug('Unable to fetch SnapEngage Code UUID', snapEngageCode);
                    return false;
                }

                (function () {
                    var se = document.createElement('script');
                    se.type = 'text/javascript';
                    se.async = true;
                    se.src = '//storage.googleapis.com/code.snapengage.com/js/' + code[0] + '.js';
                    var done = false;
                    se.onload = se.onreadystatechange = function () {
                        if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                            done = true;
                            /* Place your SnapEngage JS API code below */
                            /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
                        }
                    };
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(se, s);
                })();
            },

            /**
             * Load Google Analytics Tracking Id
             * @memberOf WorkspaceController
             */
            loadActivateGoogleAnalytics: function loadActivateGoogleAnalytics() {

                this.logger.debug('Load Google Analytics Tracking Id', arguments);

                /**
                 * Get prefs
                 * @type {{googleAnalyticsTrackingId}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Get tracking id
                 * @type {string}
                 */
                var trackingId = preferences.googleAnalyticsTrackingId,
                    activate = preferences.activateGoogleAnalytics;

                if (this.controller.isServiceActivated(trackingId, activate)) {

                    window._gaq = window._gaq || [];
                    window._gaq.push(['_setAccount', trackingId]);
                    window._gaq.push(['_trackPageview']);

                    (function () {
                        var ga = document.createElement('script');
                        ga.type = 'text/javascript';
                        ga.async = true;
                        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(ga, s);
                    })();
                }
            },

            /**
             * Load Raygun.IO Api Key
             * @memberOf WorkspaceController
             */
            loadActivateRaygunIO: function loadActivateRaygunIO() {

                this.logger.debug('Load Raygun.IO', arguments);

                /**
                 * Define CDN library path
                 * @type {string}
                 */
                var path = '//cdn.raygun.io/raygun4js/raygun.min.js';

                /**
                 * Get prefs
                 * @type {{raygunIOApiKey, activateRaygunIO}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Define API Key
                 * @type {string}
                 */
                var apiKey = preferences.raygunIOApiKey || '',
                    activate = preferences.activateRaygunIO;

                if (this.controller.isServiceActivated(apiKey, activate)) {

                    require([path], function _loadRaygun() {
                        Raygun.init(apiKey).attach();
                    });
                }
            },

            /**
             * Load Github Gist Embed code
             * @memberOf WorkspaceController
             */
            loadActivateGithubGist: function loadActivateGithubGist() {

                this.logger.debug('Load Gist Embed code', arguments);

                /**
                 * Get prefs
                 * @type {{githubGistEmbedCode, activateGithubGist}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Define embed code
                 * @type {string}
                 */
                var embedCode = preferences.githubGistEmbedCode || '',
                    activate = preferences.activateGithubGist;

                if (this.controller.isServiceActivated(embedCode, activate)) {
                    require([$(embedCode).attr('src')]);
                }
            }
        }
    );
});
