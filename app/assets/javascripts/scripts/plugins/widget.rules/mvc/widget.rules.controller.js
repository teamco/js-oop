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
         * Store item
         * @member WidgetRulesController
         * @param item
         */
        storeItem: function storeItem(item) {
            this.logger.debug('Update storage', item);
            this.model.collectItems(item);
        },

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
         * Get rules html
         * @member WidgetRulesController
         * @param {string} uuid
         * @param {boolean} load
         * @returns {*}
         */
        getRulesHtml: function getRulesHtml(uuid, load) {

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.scope;

            // set active content
            scope.observer.publish(
                scope.eventmanager.eventList.setActiveContent,
                uuid
            );

            if (load) {

                /**
                 * Define widget
                 * @type {Widget}
                 */
                var widget = this.getPage().model.getItemByUUID(uuid);

                return this.scope.activeContent.view.renderRules(
                    widget.eventmanager.getEvents(),
                    widget.controller.getContent().eventmanager.getEvents()
                );

            }
        },

        /**
         * Set active content
         * @member WidgetRulesController
         * @param {WidgetContent} content
         */
        setActiveContent: function setActiveContent(uuid) {

            /**
             * Get current page
             * @type {Page}
             */
            var page = this.controller.getPage();

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = page.model.getItemByUUID(uuid);

            if (!widget) {
                this.logger.warn('Undefined widget', uuid, page);
            }

            /**
             * Set active content
             * @type {WidgetContent}
             */
            this.activeContent = widget.controller.getContent();

            /**
             * Define referrer
             * @type {WidgetRules}
             */
            this.activeContent.referrer = this;

            this.logger.debug('Active content', this.activeContent);
        },

        /**
         * Load rules
         * @member WidgetRulesController
         * @param config
         * @param load
         * @param [event]
         * @param {function} [callback]
         */
        loadRules: function loadRules(config, load, event, callback) {

            this.observer.publish(
                this.eventmanager.eventList.setActiveContent,
                config.uuid
            );

            this.view.showRules(config, load);

            /**
             * Define collected items
             * @type {*}
             */
            var items = this.model.getCollectedItems();

            for (var index in items) {

                if (items.hasOwnProperty(index)) {
                    this.controller.defineContentReferrer(items[index]);
                }
            }

            if (this.base.isFunction(callback)) {
                callback(event);
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
         * @param e
         */
        locateWidgetRules: function locateWidgetRules(e) {

            /**
             * Define $item
             * @type {WidgetElement}
             */
            var $item = this.scope.activeContent.containment.view.get$item();

            this.locateElement($item, e);
        },

        /**
         * Load page.data content
         * @member WidgetRulesController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        },

        /**
         * Open prefs from rules dialog
         * @member WidgetRulesController
         * @param {*} event
         */
        preferencesWidgetRules: function preferencesWidgetRules(event) {

            /**
             * Trigger click prefs
             * @private
             */
            function _triggerPrefs() {

                /**
                 * Define $item
                 * @type {PageDataContentElement}
                 */
                var $item = this.view.elements.items[widget.model.getUUID() + '-pagedata'];

                $item.$.trigger('click.prefs');
            }

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            /**
             * Define widget rules
             * @type {PageData}
             */
            var pageData = this.getPageData();

            /**
             * Define active content
             * @type {*}
             */
            var content = this.scope.activeContent;

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = content.controller.getContainment();

            panel.observer.publish(
                panel.eventmanager.eventList.openPanel,
                ['pagedata', event, _triggerPrefs.bind(pageData)]
            );

            this.scope.view.elements.$modal.selfDestroy();
        }

    }, AntHill.prototype, PluginBase.prototype);
});