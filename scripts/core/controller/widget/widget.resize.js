/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/interactions'
], function defineWidgetResize(Interactions) {

    /**
     * Define Resize
     * @class Resizable
     * @mixin {Interactions}
     * @param scope
     * @constructor
     */
    var Resizable = function Resizable(scope) {

        /**
         * Define scope
         * @type {Widget}
         */
        this.scope = scope;

        /**
         * Define widget jquery element
         * @type {jQuery}
         */
        this.$scope = scope.view.elements.$widget.$;

        this.checkPermission();
    };

    return Resizable.extend({

        /**
         * Init resizable
         */
        init: function init() {
            var scope = this.scope;

            if (scope.permission.authorizedFunctionCall(this.init)) {
                this.$scope.resizable(
                    $.extend({
                        containment: scope.controller.get$page(),
                        create: this.create.bind(this),
                        start: this.start.bind(this),
                        stop: this.stop.bind(this),
                        resize: this.resize.bind(this)
                    }, scope.model.getConfig('events').resizable)
                );
            }
        },

        /**
         * Enable resize
         */
        enable: function enable() {

            var scope = this.scope;
            if (scope.permission.eventTunnelFunctionCall(this.enable) &&
                scope.controller.isResizable()) {
                this.$scope.resizable('enable');
            }
        },

        /**
         * Disable resize
         */
        disable: function disable() {

            var scope = this.scope;
            if (scope.permission.eventTunnelFunctionCall(this.disable) &&
                scope.controller.isResizable()) {
                this.$scope.resizable('disable');
            }
        },

        /**
         * Destroy resize
         */
        destroy: function destroy() {

            var scope = this.scope;
            if (scope.permission.eventTunnelFunctionCall(this.destroy) &&
                scope.controller.isResizable()) {
                this.$scope.resizable('destroy');
            }
        },

        /**
         * Create resize
         * @param event
         * @param ui
         */
        create: function create(event, ui) {

            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.createResizable,
                [event.type, arguments]
            );
        },

        /**
         * Start resize
         * @param event
         * @param ui
         */
        start: function start(event, ui) {
            var scope = this.scope;
            this.debugUI(event, ui);
            scope.controller.setAsCurrent();
            scope.wireframe.resizeSticker();

            scope.observer.publish(
                scope.eventmanager.eventList.startResizable,
                [event.type, arguments]
            );
        },

        /**
         * Stop resize
         * @param event
         * @param ui
         */
        stop: function stop(event, ui) {
            var scope = this.scope;
            this.debugUI(event, ui);
            scope.observer.publish(
                scope.eventmanager.eventList.stopResizable,
                [event.type, arguments]
            );
            scope.wireframe.hide();
        },

        /**
         * On resize event
         * @param event
         * @param ui
         */
        resize: function resize(event, ui) {
            var scope = this.scope;
            this.debugUI(event, ui);
            scope.observer.publish(
                scope.eventmanager.eventList.resizeResizable,
                [event.type, arguments]
            );
        }

    }, Interactions.prototype);
});