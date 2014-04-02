/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'config/anthill',
    'plugins/plugin'
], function defineWidgetRulesController(AntHill, PluginBase) {

    /**
     * Define page.data controller
     * @class WidgetRulesController
     * @extends AntHill
     * @extends PluginController
     * @constructor
     */
    var WidgetRulesController = function WidgetRulesController() {
    };

    return WidgetRulesController.extend('WidgetRulesController', {

        /**
         * Get providers data
         * @member WidgetRulesController
         */
        getData: function getData() {
            return this.model.getWidgetRules(
                this.getPage()
            );
        },

        /**
         * Get rules
         * @member WidgetRulesController
         * @param {string} uuid
         * @returns {*}
         */
        getRules: function getRules(uuid) {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.getPage().model.getItemByUUID(uuid),
                scope = this.scope;

            /**
             * Define widget content
             * @type {WidgetContent}
             */
            scope.activeContent = widget.controller.getContent();

            /**
             * Define referrer
             * @type {WidgetRules}
             */
            scope.activeContent.referrer = scope;

            scope.logger.debug('Active component', scope.activeContent);

            return scope.activeContent.view.renderRules(
                widget.eventmanager.getEvents(),
                widget.controller.getContent().eventmanager.getEvents()
            );
        },

        /**
         * Load rules
         * @member WidgetRulesController
         * @param config
         * @param load
         * @param {function} [callback]
         */
        loadRules: function loadRules(config, load, callback) {

            this.view.showRules(config, load);

            if (this.base.isFunction(callback)) {
                callback(config);
            }
        },

        /**
         * Load stored rules
         * @member WidgetRulesController
         * @param {{publish, subscribe}} rules
         */
        loadStoredRules: function loadStoredRules(rules) {

            this.showPublishedRules(rules.publish);
        },

        /**
         * Show published rules
         * @member WidgetRulesController
         * @param publish
         */
        showPublishedRules: function showPublishedRules(publish) {

            /**
             * Define active content
             * @type {*}
             */
            var scope = this.scope.activeContent;

            for (var index in publish) {

                if (publish.hasOwnProperty(index)) {

                    /**
                     * Define rules
                     * @type {Array}
                     */
                    var rules = publish[index];

                    for (var i = 0, l = rules.length; i < l; i++) {

                        scope.observer.publish(
                            scope.eventmanager.eventList.publishRule,
                            [rules[i], index]
                        );
                    }
                }
            }
        },

        /**
         * Check if content was updated
         * @member WidgetRulesController
         * @param data
         * @param content
         * @returns {boolean}
         */
        isUpdate: function isUpdate(data, content) {

            /**
             * Define hash
             * @type {*}
             */
            var hash = this.base.lib.hash;

            return hash.hashLength(data || {}) !==
                hash.hashLength(content || {})
        },

        /**
         * Update rules
         * @member WidgetRulesController
         */
        approveUpdateRules: function approveUpdateRules() {

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.scope;

            scope.activeContent.controller.updateRules(
                scope.view.elements.$modal
            );
        },

        /**
         * Locate page data element
         * @member WidgetRulesController
         */
        locateWidgetRules: function locateWidgetRules() {

            /**
             * Define $item
             * @type {WidgetElement}
             */
            var $item = this.scope.activeContent.containment.view.get$item();

            this.locateElement($item);
        },

        /**
         * Load page.data content
         * @member WidgetRulesController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        }

    }, AntHill.prototype, PluginBase.prototype);
});