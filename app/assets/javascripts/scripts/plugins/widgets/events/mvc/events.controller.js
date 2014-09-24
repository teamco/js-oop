/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineEventsController(PluginBase, WidgetContentController) {

    /**
     * Define events controller
     * @class EventsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EventsController = function EventsController() {
    };

    return EventsController.extend('EventsController', {

        /**
         * Set embedded content
         * @member EventsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$events.renderEmbeddedContent();
        },

        /**
         * Add Events rule
         * @member EventsController
         * @param e
         */
        addEventsRule: function addEventsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});