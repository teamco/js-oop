/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'controller/behavior/behavior.crud',
    'controller/behavior/behavior.window.resize'
], function defineBaseController(AntHill, Crud, Resize) {

    /**
     * Define Base Controller
     * @class BaseController
     * @extends AntHill
     * @extends BaseCrud
     * @extends BaseResize
     * @constructor BaseController
     */
    var BaseController = function BaseController() {

    };

    return BaseController.extend('BaseController', {

        /**
         * Before init config
         * @member BaseController
         */
        beforeInitConfig: function beforeInitConfig() {
            this.logger.debug('Before init config', arguments);
        },

        /**
         * After init config
         * @member BaseController
         */
        afterInitConfig: function afterInitConfig() {
            this.logger.debug('After init config', arguments);
        },

        /**
         * Define routes setter
         * @member PluginController
         */
        setRoutes: function setRoutes() {

            var routes = this.model.getConfig('routes') || {},
                index;

            for (index in routes) {
                if (routes.hasOwnProperty(index)) {
                    this.controller.setRoute(index, routes[index]);
                }
            }
        },

        /**
         * Bind model observer
         * @member BaseController
         */
        bindModelObserver: function bindModelObserver() {
            this.logger.debug('Bind model observer', arguments);
            if (this.model) {
                this.model.bindModelObserver.apply(this, arguments);
            }
        },

        /**
         * After loading items
         * @member BaseController
         */
        afterLoadingItems: function afterLoadingItems() {
            this.logger.debug(
                'After loading items',
                this.model.getItems()
            );
            this.controller.setAsLoading(false);
            this.view.get$item().hideLoader();
        },

        /**
         * Set core loading attribute
         * @member BaseController
         * @param load
         */
        setAsLoading: function setAsLoading(load) {

            /**
             * Get root
             * @type {App}
             */
            var root = this.root();

            root.model.setConfig('loading', load);

            if (this.scope === root) {

                root.observer.publish(
                    root.eventmanager.eventList.setAsLoaded
                );
            }
        },

        /**
         * Set as loaded
         * @member BaseController
         */
        setAsLoaded: function setAsLoaded() {

            this.logger.debug('Application was loaded');

            /**
             * Get item constructor name
             * @type {string}
             */
            var namespace = this.model.getItemNameSpace();

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this[namespace];

            if (workspace.controller) {

                workspace.controller.switchPageOnHashChange.bind(workspace)();
            }
        },

        /**
         * Check if core already loaded
         * @member @BaseController
         * @returns {boolean}
         */
        isLoading: function isLoading() {
            return this.root().model.getConfig('loading');
        },

        /**
         * Get Application mode
         * @member BaseController
         * @returns {*|number}
         */
        getMode: function getMode() {
            return this.root().config.mode;
        },

        /**
         * Get parent node object
         * @member BaseController
         * @returns {*}
         */
        getContainment: function getContainment() {
            return this.scope.containment;
        },

        /**
         * Get Application Root
         * @member BaseController
         * @returns {*|string}
         */
        root: function root() {

            /**
             * Define root instance
             * @type {*}
             */
            var root = this.scope;
            while (root.hasOwnProperty('containment')) {
                root = root.containment;
            }

            return root;
        },

        /**
         * Get Workspace
         * @member BaseController
         * @param {string} [uuid]
         * @returns {Workspace}
         */
        getWorkspace: function getWorkspace(uuid) {

            /**
             * Get root
             * @type {App}
             */
            var root = this.root();

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.base.isDefined(uuid) ?
                root.model.getItemByUUID(uuid) :
                root.controller.getCurrentItem();

            return workspace;
        },

        /**
         * Get Page
         * @member BaseController
         * @param {string} [uuid]
         * @returns {Page}
         */
        getPage: function getPage(uuid) {

            /**
             * Define workspace
             * @type {Workspace}
             */
            var workspace = this.getWorkspace();

            /**
             * Define page
             * @type {Page}
             */
            var page = this.base.isDefined(uuid) ?
                workspace.model.getItemByUUID(uuid) :
                workspace.controller.getCurrentItem();

            return page;
        },

        /**
         * Get Widget
         * @member BaseController
         * @returns {*|Widget}
         */
        getWidget: function getWidget() {
            return this.getPage().controller.getCurrentItem();
        },

        /**
         * Get Config Logger
         * @member BaseController
         * @param {String} log
         * @param {Object} hash
         */
        getConfigLog: function getConfigLog(log, hash) {
            this.logger.debug(log, hash);
        },

        /**
         * Get scope view
         * @member BaseController
         * @returns {view}
         */
        getView: function getView() {
            return this.scope.view;
        },

        /**
         * Get scope model
         * @member BaseController
         * @returns {model}
         */
        getModel: function getModel() {
            return this.scope.model;
        },

        /**
         * Success Created
         * @member BaseController
         */
        successCreated: function successCreated() {
            this.logger.debug(
                this.constructor.prototype.name +
                ' was successfully created',
                this
            );
        },

        /**
         * Success Rendered
         * @member BaseController
         */
        successRendered: function successRendered() {
            this.logger.debug(
                this.i18n.t('success.rendered').replace(/\{0}/, this.constructor.prototype.name),
                this
            );
        },

        /**
         * Success Render Footer
         * @member BaseController
         * @param {HeaderElement} $header
         * @param {boolean} render
         */
        successRenderHeader: function successRenderHeader($header, render) {
            this.logger.debug('Success Render Header', render, $header);
        },

        /**
         * Success Render Footer
         * @member BaseController
         * @param {FooterElement} $footer
         * @param {boolean} render
         */
        successRenderFooter: function successRenderFooter($footer, render) {
            this.logger.debug('Success Render Footer', render, $footer);
        },

        /**
         * Get current items
         * @member BaseController
         * @returns {*}
         */
        getCurrentItem: function getCurrentItem() {

            var scope = this.scope,
                sname = scope.model.getItemNameSpace();

            if (sname === 'object') {
                scope.logger.error('Unable to locate current item');
            }

            return scope[sname];
        },

        /**
         * Set item as current in parent node
         * @member BaseController
         */
        setAsCurrent: function setAsCurrent() {
            this.getContainment().controller.setCurrentItem(
                this.scope
            );
        },

        /**
         * Set current item
         * @member BaseController
         * @param {{}} item
         * @returns {*}
         */
        setCurrentItem: function setCurrentItem(item) {
            var scope = this.scope;
            scope[scope.model.getItemNameSpace()] = item;
            return this.getCurrentItem();
        },

        /**
         * Check condition
         * @member BaseController
         * @param {{condition, msg, [type], [args]}} opts
         * @returns {boolean}
         */
        checkCondition: function checkCondition(opts) {
            if (opts.condition) {
                opts.args ?
                    this.scope.logger[opts.type || 'debug'](opts.msg, opts.args) :
                    this.scope.logger[opts.type || 'debug'](opts.msg);
                return true;
            }
            return false;
        },

        /**
         * Get Development Mode
         * @member BaseController
         * @returns {Boolean}
         */
        isDevelopmentMode: function isDevelopmentMode() {
            return this.getMode() === 'development';
        },

        /**
         * Get Authorize Mode
         * @member BaseController
         * @returns {Boolean}
         */
        isAuthorizeMode: function isAuthorizeMode() {
            return this.getMode() === 'authorize';
        },

        /**
         * Get Consumption Mode
         * @member BaseController
         * @returns {boolean}
         */
        isConsumptionMode: function isConsumptionMode() {
            return this.getMode() === 'consumption';
        },

        /**
         * Get Custom Mode
         * @member BaseController
         * @returns {boolean}
         */
        isCustomMode: function isCustomMode() {
            return this.getMode() === 'custom';
        },

        /**
         * After update preferences
         * @member BaseController
         */
        afterUpdatePreferences: function afterUpdatePreferences() {
            this.logger.debug('After update preferences', arguments);
        },

        /**
         * Transfer preferences to containment
         * @member BaseController
         * @param index
         * @param value
         */
        transferPreferences: function transferPreferences(index, value) {

            if (!this.controller.isWidgetContent()) {
                this.config.preferences[index] = value;
                return false;
            }
        },

        /**
         * Get preferences
         * @member BaseController
         * @returns {{}}
         */
        getPreferences: function getPreferences() {
            return this.model.preferences;
        },

        /**
         * Get rules
         * @member BaseController
         * @returns {{}}
         */
        getRules: function getRules() {
            return this.model.rules;
        },

        /**
         * Update site description
         * @member BaseController
         */
        updateSiteDescription: function updateSiteDescription() {

            /**
             * Get $item
             * @type {BaseElement}
             */
            var $item = this.controller.root().view.get$item();

            var siteDescription = this.model.getConfig('preferences')['siteDescription'] ||
                $item.getSiteDescription();

            $item.setSiteDescription(siteDescription);
        },

        /**
         * Update site keywords
         * @member BaseController
         */
        updateSiteKeywords: function updateSiteKeywords() {

            /**
             * Get $item
             * @type {BaseElement}
             */
            var $item = this.controller.root().view.get$item();

            var siteKeywords = this.model.getConfig('preferences')['siteKeywords'] ||
                $item.getSiteKeywords();

            $item.setSiteKeywords(siteKeywords);
        },

        /**
         * Extend Config
         * @member BaseController
         * @param {{config, [dom]}} opts
         * @returns {*}
         */
        extendConfig: function extendConfig(opts) {
            var base = this.base,
                scope = this.scope;

            opts.config = base.lib.hash.extendHash({
                html: {
                    container: [
                        '#', scope.model.getUUID(),
                        '-', scope.constructor.prototype.name.toLowerCase()
                    ].join('')
                },
                containment: scope
            }, opts.config);

            scope.logger.debug('Configuration', opts.config);

            return opts;
        },

        /**
         * Set Interaction
         * @member BaseController
         * @param {Resizable|Draggable|Function} Event
         * @returns {*}
         */
        setInteraction: function setInteraction(Event) {

            /**
             * Event name
             * @type {string}
             */
            var ename = Event.name.toLowerCase();

            /**
             * Register interactions
             * @type {Draggable|Resizable}
             */
            this.scope.interactions[ename] = new Event(this.scope);

            return this.getInteraction(ename);
        },

        /**
         * Get Interaction
         * @member BaseController
         * @param {String} event
         * @returns {*}
         */
        getInteraction: function getInteraction(event) {
            return this.scope.interactions[event];
        },

        /**
         * Check is root
         * @member BaseController
         * @param scope
         * @returns {boolean}
         */
        isRoot: function isRoot(scope) {
            return scope === this.root();
        },

        /**
         * Check is workspace
         * @member BaseController
         * @returns {boolean}
         */
        isWorkspace: function isWorkspace() {
            return this.scope.constructor.prototype.name === 'Workspace';
        },

        /**
         * Check is page
         * @member BaseController
         * @returns {boolean}
         */
        isPage: function isPage() {
            return this.scope.constructor.prototype.name === 'Page';
        },

        /**
         * Check is widget
         * @member BaseController
         * @returns {boolean}
         */
        isWidget: function isWidget() {
            return this.scope.constructor.prototype.name === 'Widget';
        },

        /**
         * Check is widget content
         * @member BaseController
         * @returns {boolean}
         */
        isWidgetContent: function isWidgetContent() {

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = this.scope.controller.getContainment();

            if (!widget) {
                this.scope.logger.info('Root is not widget content');
                return false;
            }

            return widget.controller.isWidget();
        },

        /**
         * Store data after layout organize
         * @member BaseController
         * @param [node]
         * @param [data]
         * @param {number} [counter]
         */
        store: function store(node, data, counter) {

            /**
             * Define root
             * @type {App}
             */
            var root = this.root();

            /**
             * Define node
             * @type {*}
             */
            node = this.base.define(
                node,
                root,
                true
            );

            /**
             * Define data
             * @type {*}
             */
            data = this.base.define(data, {
                collector: {}
            }, true);

            /**
             * Define item list
             * @type {*}
             */
            var items = node.model.getItems(),
                index;

            /**
             * Define item name space
             * @type {string}
             */
            var cname = node.model.getItemNameSpace();

            if (node[cname].model) {

                /**
                 * Define data
                 * @type {*}
                 */
                data.collector[cname] = data.collector[cname] || {};

                $.extend(
                    true,
                    data.collector[cname],
                    node.controller.collectItemProperties(
                        !node[cname].model.getItems()
                    )
                );
            }

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    var item = items[index];

                    if (item.model && item.model.getItems()) {

                        this.store.bind(node.controller)(
                            item,
                            data,
                            Object.keys(items).length
                        );
                    }
                }
            }

            if (!counter) {
                root.model.setting.save(data);
            }
        },

        /**
         * Get subscribers list
         * @member BaseController
         * @param {string} event
         * @return {Array}
         */
        getSubscribers: function getSubscribers(event) {

            /**
             * Define rules
             * @type {{}}
             */
            var rules = this.model.rules;

            return rules.subscribers ?
                rules.subscribers[event] : []
        },

        /**
         * Collect items data
         * @member BaseController
         * @param {Boolean} collectDOM
         * @returns {{}}
         */
        collectItemProperties: function collectItemProperties(collectDOM) {

            var collector = {},
                items = this.model.getItems();

            if (items) {

                for (var index in items) {

                    if (items.hasOwnProperty(index)) {

                        var item = items[index],
                            uuid = item.model.getConfig('uuid');

                        collector[uuid] = {};

                        /**
                         * Define config
                         * @type {{}}
                         */
                        collector[uuid].config = this.base.lib.hash.extendHash(
                            item.model.getConfig(),
                            collector[uuid].config
                        );

                        /**
                         * Define containment
                         * @type {String}
                         */
                        collector[uuid].containment = item.containment.model.getConfig('uuid');

                        if (collectDOM) {

                            /**
                             * Collect DOM
                             * @type {{}}
                             */
                            collector[uuid].dom = item.dom;
                        }
                    }
                }
            }

            return collector;
        }

    }, AntHill.prototype, Crud.prototype, Resize.prototype);
});