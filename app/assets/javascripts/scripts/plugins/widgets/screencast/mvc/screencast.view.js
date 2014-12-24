/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/screencast/element/screencast.element',
    'plugins/widgets/screencast/element/screencast.preferences.element',
    'plugins/widgets/screencast/element/screencast.rules.element'
], function defineScreencastView(BaseView, Header, Footer, ScreencastElement, ScreencastPreferencesElement, ScreencastRulesElement) {

    /**
     * Define view
     * @class ScreencastView
     * @extends BaseView
     * @constructor
     */
    var ScreencastView = function ScreencastView() {
    };

    return ScreencastView.extend('ScreencastView', {

        /**
         * Render screencast element
         * @member ScreencastView
         */
        renderScreencast: function renderScreencast() {

            this.header(Header, this.elements.$container);

            /**
             * Define $screencast
             * @type {ScreencastElement}
             */
            this.elements.$screencast = new ScreencastElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member ScreencastView
         * @returns {ScreencastPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Screencast Preferences Element
             * @type {ScreencastPreferencesElement}
             */
            this.elements.$preferences = new ScreencastPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member ScreencastView
         * @param widgetRules
         * @param contentRules
         * @returns {ScreencastRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Screencast Rules Element
             * @type {ScreencastRulesElement}
             */
            this.elements.$rules = new ScreencastRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render screencast
         * @member ScreencastView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderScreencast.bind(this)
            );
        }

    }, BaseView.prototype)

});