/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/controller',
    'controller/widget/widget.drag',
    'controller/widget/widget.resize',
    'controller/widget/widget.content'
], function defineWidgetController(AntHill, BaseController, Drag, Resize, Content) {

    /**
     * Define widget controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend('Controller', {

        /**
         * Get config
         * @param {string} type
         * @returns {*|{
         *      animate: Boolean,
         *      organize: Boolean,
         *      [callback]: Function,
         *      $source
         * }}
         */
        getInteractionConfig: function getInteractionConfig(type) {

            /**
             * Init config
             * @type {*}
             */
            var config = {};

            switch (type) {

                case 'ongoing':

                    /**
                     * Set config
                     * @type {{
                     *      animate: boolean,
                     *      organize: boolean,
                     *      $source: ($|*|Element.$)
                     * }}
                     */
                    config = {
                        animate: false,
                        organize: true,
                        $source: this.scope.wireframe.$
                    };
                    break;

                case 'stop':

                    /**
                     * Set config
                     * @type {{
                     *      animate: boolean,
                     *      organize: boolean,
                     *      $source: ($|*|Element.$),
                     *      callback: (function(this:BaseController)|*)
                     * }}
                     */
                    config = {
                        animate: true,
                        organize: true,
                        $source: this.scope.view.get$item().$,
                        callback: this._resetInteractions.bind(this)
                    };
                    break;
            }

            return config;
        },

        /**
         * Get page jquery object
         * @returns {*|jQuery}
         */
        get$page: function get$page() {
            return this.getContainment().view.elements.$page;
        },

        /**
         * Get layout
         * @returns {*}
         */
        getLayout: function getLayout() {
            return this.getContainment().controller.getLayout();
        },

        /**
         * Get merged local padding from widget dom
         * @returns {{top: number, right: number, bottom: number, left: number}|*}
         */
        getLocalPadding: function getLocalPadding() {
            var padding = {},
                global = this.getGlobalPadding(),
                local = this.base.define(this.scope.dom.padding, {}, true);

            this.scope.logger.debug(
                'Merge local padding',
                $.extend(padding, global, local)
            );

            return padding;
        },

        /**
         * Get global padding from layout config
         * @returns {{top: number, right: number, bottom: number, left: number}}
         */
        getGlobalPadding: function getGlobalPadding() {
            var padding = this.getContainment().controller.getLayout().config.grid.padding;
            this.scope.logger.debug('Get global padding', padding);

            return padding;
        },

        /**
         * Setup interactions {Drag|Resize}
         */
        setupInteractions: function setupInteractions() {
            var scope = this.scope;
            scope.observer.publish(scope.eventmanager.eventList.initDraggable);
            scope.observer.publish(scope.eventmanager.eventList.initResizable);
        },

        /**
         * Init drag
         */
        initDraggable: function initDraggable() {
            this.controller.setInteraction('draggable', new Drag(this));
        },

        /**
         * Enable drag
         */
        enableDraggable: function enableDraggable() {
            this.interactions.draggable.enable();
        },

        /**
         * Disable drag
         */
        disableDraggable: function disableDraggable() {
            this.interactions.draggable.disable();
        },

        /**
         * Destroy drag
         */
        destroyDraggable: function destroyDraggable() {
            this.interactions.draggable.destroy();
        },

        /**
         * Init resize
         */
        initResizable: function initResizable() {
            this.controller.setInteraction('resizable', new Resize(this));
        },

        /**
         * Enable resize
         */
        enableResizable: function enableResizable() {
            this.interactions.resizable.enable();
        },

        /**
         * Disable resize
         */
        disableResizable: function disableResizable() {
            this.interactions.resizable.disable();
        },

        /**
         * Destroy resize
         */
        destroyResizable: function destroyResizable() {
            this.interactions.resizable.destroy();
        },

        /**
         * Debug interactions
         * @param {String} interaction
         */
        debugInteractions: function debugInteractions(interaction) {
            this.logger.debug('Debug interactions', interaction);
        },

        /**
         * Create drag
         */
        createDraggable: function createDraggable() {
            this.logger.debug('Create drag', arguments);
        },

        /**
         * Start drag
         */
        startDraggable: function startDraggable() {
            this.logger.debug('Start drag', arguments);

            this.controller.get$page().hideItemsContent();
        },

        /**
         * Grid sticker on drag
         * @param {String} type
         */
        dragDraggable: function dragDraggable(type) {

            this.logger.debug('On drag', arguments);

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('ongoing'),
                type
            );
        },

        /**
         * Stop drag
         * @param {String} type
         */
        stopDraggable: function stopDraggable(type) {

            this.logger.debug('Stop drag', arguments);

            this.controller.getContainment().controller.downgradeLayer(this);

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('stop'),
                type
            );

            this.controller.get$page().showItemsContent();
        },

        /**
         * Create resize
         * @param {String} type
         */
        createResizable: function createResizable(type) {
            this.logger.debug('Create resize', arguments);
        },

        /**
         * Resize start
         * @param {String} type
         */
        startResizable: function startResizable(type) {
            this.logger.debug('Start resize', arguments);

            this.controller.get$page().hideItemsContent();
        },

        /**
         * Grid sticker on resize
         * @param {String} type
         */
        resizeResizable: function resizeResizable(type) {
            this.logger.debug('On resize', arguments);

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('ongoing'),
                type
            );
        },

        /**
         * Resize stop
         * @param {String} type
         * @param {{}} [opts]
         * @param [args]
         */
        stopResizable: function stopResizable(type, opts, args) {

            this.logger.debug('Stop resize', arguments);

            /**
             * Define opts
             * @type {*}
             */
            opts = this.base.define(opts, {}, true);

            /**
             * Define controller
             * @type {controller|*}
             */
            var controller = this.controller;

            controller.getContainment().controller.downgradeLayer(this);

            /**
             * Get config
             * @type {*|{organize: Boolean, animate: Boolean, callback?: Function, $source}}
             */
            var config = controller.getInteractionConfig('stop');

            /**
             * Define organize
             * @type {boolean}
             */
            config.organize = this.base.defineBoolean(
                opts.organize,
                config.organize,
                true
            );

            /**
             * Define animate
             * @type {boolean}
             */
            config.animate = this.base.defineBoolean(
                opts.animate,
                config.animate,
                true
            );

            controller.behaviorMode(config, type);

            controller.get$page().showItemsContent();
        },

        /**
         * Update Resizable
         * @param key
         * @param value
         */
        updateResizable: function updateResizable(key, value) {
            this.updateInteractions('resizable', key, value);
        },

        /**
         * Update Draggable
         * @param key
         * @param value
         */
        updateDraggable: function updateDraggable(key, value) {
            this.updateInteractions('draggable', key, value);
        },

        /**
         * Update interactions
         * @param type
         * @param key
         * @param value
         */
        updateInteractions: function updateInteractions(type, key, value) {
            this.scope.view.get$item().$[type]('option', key, value);
        },

        /**
         * Reset interactions on resize template
         * @private
         */
        _resetInteractions: function _resetInteractions() {
            $.each(this._getTemplateItems(), function each(uuid, widget) {
                widget.api.destroyResize();
                widget.api.destroyDrag();
                widget.api.initResize();
                widget.api.initDrag();
            });
        },

        /**
         * Get items from template widget and run callback
         * @private
         */
        _getTemplateItems: function _getTemplateItems() {
            return this.isTemplate() ?
                this.getContainment().template.page.items || {} : {};
        },

        /**
         * Check if widget is draggable
         * @returns {Boolean}
         */
        isDraggable: function isDraggable() {
            return this.scope.view.get$item().$.is('.ui-draggable');
        },

        /**
         * Check if widget is resizable
         * @returns {Boolean}
         */
        isResizable: function isResizable() {
            return this.scope.view.get$item().$.is('.ui-resizable');
        },

        /**
         * Check if widget is template
         * @returns {Boolean}
         */
        isTemplate: function isTemplate() {

            var scope = this.scope;

            return scope.config.type ===
                this.getContainment().model.getConfig(
                    scope.constructor.name.toLowerCase()
                ).types.template;
        },

        /**
         * Behavior mode
         * @param {{
         *      animate: Boolean,
         *      [callback]: Function,
         *      [type]: String
         *      $source
         * }} opts
         * @param {String} type
         */
        behaviorMode: function behaviorMode(opts, type) {

            /**
             * Check if mod
             * @type {boolean}
             */
            var mode = this.isMode();

            /**
             * Set event type
             * @type {String}
             */
            opts.type = type;

            if (mode && this.base.isFunction(this[mode + 'Mode'])) {
                this[mode + 'Mode'](
                    opts,
                    mode,
                    this.getLayout().controller.getBehavior()
                );
            }
        },

        /**
         * Define snap2grid mode
         * @param opts
         * @param mode
         * @param behavior
         */
        jqUIGridMode: function jqUIGridMode(opts, mode, behavior) {
            this.scope.wireframe.hide();
            this.scope.map.sticker(opts, mode, behavior);
        },

        /**
         * Define snap2grid mode
         * @param opts
         * @param mode
         * @param behavior
         */
        freeStyleMode: function freeStyleMode(opts, mode, behavior) {

        },

        /**
         * Define snap2grid mode
         * @param opts
         * @param mode
         * @param behavior
         */
        snap2gridMode: function snap2gridMode(opts, mode, behavior) {
            this.scope.map.sticker(opts, mode, behavior);
        },

        /**
         * Check behavior mode
         * @returns {boolean}
         */
        isMode: function isMode() {

            var modes = this.getContainment().LAYOUT_MODES,
                layout = this.getLayout(),
                mode = layout.config.mode,
                index;

            for (index in modes) {

                if (modes.hasOwnProperty(index)) {
                    if (mode === modes[index]) {
                        return mode;
                    }
                }
            }

            return false;
        },

        /**
         * Adopt widget dimension on resize page
         * @param {Boolean} organize
         * @param {Boolean} animate
         */
        adoptDimensions: function adoptDimensions(organize, animate) {

            /**
             * Define controller
             * @type {controller|*}
             */
            var controller = this.controller;

            controller.behaviorMode({
                organize: organize,
                animate: animate,
                $source: this.view.get$item().$,
                callback: controller._resetInteractions.bind(controller)
            }, 'resizestop');
        },

        /**
         * Save widget DOM
         */
        saveDOM: function saveDOM() {
            this.logger.debug(this.i18n.t('save.widget'));
            this.model.defineDOM();
        }

    }, AntHill.prototype, BaseController.prototype, Content.prototype);
});