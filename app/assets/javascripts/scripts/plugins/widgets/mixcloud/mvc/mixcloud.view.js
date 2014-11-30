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
    'plugins/widgets/mixcloud/element/mixcloud.element',
    'plugins/widgets/mixcloud/element/mixcloud.preferences.element',
    'plugins/widgets/mixcloud/element/mixcloud.rules.element'
], function defineMixcloudView(BaseView, Header, Footer, MixcloudElement, MixcloudPreferencesElement, MixcloudRulesElement) {

    /**
     * Define view
     * @class MixcloudView
     * @extends BaseView
     * @constructor
     */
    var MixcloudView = function MixcloudView() {
    };

    return MixcloudView.extend('MixcloudView', {

        /**
         * Render mixcloud element
         * @member MixcloudView
         */
        renderMixcloud: function renderMixcloud() {

            this.header(Header, this.elements.$container);

            /**
             * Define $mixcloud
             * @type {MixcloudElement}
             */
            this.elements.$mixcloud = new MixcloudElement(this, {
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
         * @member MixcloudView
         * @returns {MixcloudPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Mixcloud Preferences Element
             * @type {MixcloudPreferencesElement}
             */
            this.elements.$preferences = new MixcloudPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member MixcloudView
         * @param widgetRules
         * @param contentRules
         * @returns {MixcloudRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Mixcloud Rules Element
             * @type {MixcloudRulesElement}
             */
            this.elements.$rules = new MixcloudRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render mixcloud
         * @member MixcloudView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMixcloud.bind(this)
            );
        }

    }, BaseView.prototype)

});