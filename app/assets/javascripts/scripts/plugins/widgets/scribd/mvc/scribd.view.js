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
    'plugins/widgets/scribd/element/scribd.element',
    'plugins/widgets/scribd/element/scribd.preferences.element',
    'plugins/widgets/scribd/element/scribd.rules.element'
], function defineScribdView(BaseView, Header, Footer, ScribdElement, ScribdPreferencesElement, ScribdRulesElement) {

    /**
     * Define view
     * @class ScribdView
     * @extends BaseView
     * @constructor
     */
    var ScribdView = function ScribdView() {
    };

    return ScribdView.extend('ScribdView', {

        /**
         * Render scribd element
         * @member ScribdView
         */
        renderScribd: function renderScribd() {

            this.header(Header, this.elements.$container);

            /**
             * Define $scribd
             * @type {ScribdElement}
             */
            this.elements.$scribd = new ScribdElement(this, {
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
         * @member ScribdView
         * @returns {ScribdPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Scribd Preferences Element
             * @type {ScribdPreferencesElement}
             */
            this.elements.$preferences = new ScribdPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member ScribdView
         * @param widgetRules
         * @param contentRules
         * @returns {ScribdRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Scribd Rules Element
             * @type {ScribdRulesElement}
             */
            this.elements.$rules = new ScribdRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render scribd
         * @member ScribdView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderScribd.bind(this)
            );
        }

    }, BaseView.prototype)

});