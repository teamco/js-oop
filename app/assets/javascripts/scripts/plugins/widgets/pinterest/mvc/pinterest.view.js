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
    'plugins/widgets/pinterest/element/pinterest.element',
    'plugins/widgets/pinterest/element/pinterest.preferences.element',
    'plugins/widgets/pinterest/element/pinterest.rules.element'
], function definePinterestView(BaseView, Header, Footer, PinterestElement, PinterestPreferencesElement, PinterestRulesElement) {

    /**
     * Define view
     * @class PinterestView
     * @extends BaseView
     * @constructor
     */
    var PinterestView = function PinterestView() {
    };

    return PinterestView.extend('PinterestView', {

        /**
         * Render Pinterest element
         * @member PinterestView
         */
        renderPinterest: function renderPinterest() {

            this.header(Header, this.elements.$container);

            /**
             * Define $pinterest
             * @type {PinterestElement}
             */
            this.elements.$pinterest = new PinterestElement(this, {
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
         * @member PinterestView
         * @returns {PinterestPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Pinterest Preferences Element
             * @type {PinterestPreferencesElement}
             */
            this.elements.$preferences = new PinterestPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PinterestView
         * @param widgetRules
         * @param contentRules
         * @returns {PinterestRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Pinterest Rules Element
             * @type {PinterestRulesElement}
             */
            this.elements.$rules = new PinterestRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render Pinterest
         * @member PinterestView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPinterest.bind(this)
            );
        }

    }, BaseView.prototype)

});