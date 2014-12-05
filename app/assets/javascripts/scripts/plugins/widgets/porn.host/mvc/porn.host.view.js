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
    'plugins/widgets/porn.host/element/porn.host.element',
    'plugins/widgets/porn.host/element/porn.host.preferences.element',
    'plugins/widgets/porn.host/element/porn.host.rules.element'
], function definePornHostView(BaseView, Header, Footer, PornHostElement, PornHostPreferencesElement, PornHostRulesElement) {

    /**
     * Define view
     * @class PornHostView
     * @extends BaseView
     * @constructor
     */
    var PornHostView = function PornHostView() {
    };

    return PornHostView.extend('PornHostView', {

        /**
         * Render pornhost element
         * @member PornHostView
         */
        renderPornHost: function renderPornHost() {

            this.header(Header, this.elements.$container);

            /**
             * Define $pornhost
             * @type {PornHostElement}
             */
            this.elements.$pornhost = new PornHostElement(this, {
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
         * @member PornHostView
         * @returns {PornHostPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PornHost Preferences Element
             * @type {PornHostPreferencesElement}
             */
            this.elements.$preferences = new PornHostPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PornHostView
         * @param widgetRules
         * @param contentRules
         * @returns {PornHostRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define PornHost Rules Element
             * @type {PornHostRulesElement}
             */
            this.elements.$rules = new PornHostRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render pornhost
         * @member PornHostView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPornHost.bind(this)
            );
        }

    }, BaseView.prototype)

});
