/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

define([
], function defineBaseResize() {

    /**
     * Define Base Window resize
     * @class BaseResize
     * @constructor BaseResize
     */
    var BaseResize = function BaseResize() {

    };

    return BaseResize.extend('BaseResize', {

        /**
         * Get resize attributes
         * Get items are ready to be resized
         * @member BaseResize
         * @returns {{event: string|*, items: *}}
         * @private
         */
        _getResizeAttributes: function _getResizeAttributes() {

            var items = this.model.getItems(),
                current, event;

            if (items) {

                var cname = this.model.getItemNameSpace(),
                    plural = this.model.getConfig(cname).plural,
                    abstract = this.scope.eventmanager.abstract;

                /**
                 * Define resize event
                 * @type {*}
                 */
                event = this.scope.eventmanager.eventList[abstract.resizeItem];

                if (!plural) {

                    items = {};
                    current = this.scope[this.model.getItemNameSpace()];
                    items[current.model.getConfig('uuid')] = current;
                }
            }

            return {
                event: event,
                items: items
            };
        },

        /**
         * Nested resize
         * @member BaseResize
         * @param resize
         * @private
         */
        _resizeNestedEventTrigger: function _resizeNestedEventTrigger(resize) {

            if (resize.items) {

                /**
                 * Define local items
                 * @type {*}
                 */
                var items = resize.items;

                for (var index in items) {

                    if (items.hasOwnProperty(index)) {

                        /**
                         * Define local item
                         * @type {*}
                         */
                        var item = items[index];

                        this.scope.observer.publish(
                            resize.event,
                            item
                        );

                        /**
                         * Define containment
                         * @type {*}
                         */
                        var containment = item.controller.getContainment();

                        containment.logger.debug(resize.event.humanize(), item);
                    }
                }
            }

        },

        /**
         * Resize items on resize window
         * @member BaseResize
         */
        resizeItems: function resizeItems() {

            this.logger.debug(
                'Resize items',
                this.model.getConfig('isResized')
            );

            if (!this.model.getConfig('isResized')) {
                return false;
            }

            this.controller._resizeNestedEventTrigger(
                this.controller._getResizeAttributes()
            );
        },

        /**
         * Resize item on resize window
         * @member BaseResize
         * @param item
         */
        resizeItem: function resizeItem(item) {

            this.controller._resizeNestedEventTrigger(
                item.controller._getResizeAttributes()
            );
        }
    });
});