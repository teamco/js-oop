/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineWorkspaceDataElement(BaseElement) {

    /**
     * Define WorkspaceData Element
     * @param view
     * @param opts
     * @constructor
     * @class WorkspaceDataElement
     * @type {Function}
     * @extends BaseElement
     * @returns {WorkspaceDataElement}
     */
    var WorkspaceDataElement = function WorkspaceDataElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container
        });

        this.addCSS('workspace.data');
        this.addCSS('preferences');

        this.initSortable();

        return this;
    };

    return WorkspaceDataElement.extend('WorkspaceDataElement', {

        /**
         * Init sortable
         * @memberOf WorkspaceDataElement
         */
        initSortable: function initSortable() {

            this.$.sortable({

                containment: this.$container.$,
                cursor: 'move',
                distance: 5,
                items: '> li.content',
                opacity: 0.8,
                tolerance: 'pointer',

                start: this._startSortable.bind(this),
                stop: this._stopSortable.bind(this)
            });
        },

        /**
         * Start sortable
         * @memberOf WorkspaceDataElement
         * @param event
         * @param ui
         * @private
         */
        _startSortable: function _startSortable(event, ui) {

            /**
             * Get $item
             * @memberOf WorkspaceDataElement
             * @type {WorkspaceDataContentElement}
             */
            var $item = this.view.elements.items[ui.item.attr('id')];

            $item.hideTooltip();
        },

        /**
         * Stop sortable
         * @memberOf WorkspaceDataElement
         * @param event
         * @param ui
         * @private
         */
        _stopSortable: function _stopSortable(event, ui) {

            /**
             * Get scope
             * @type {WorkspaceData}
             */
            var scope = this.view.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.updatePagesOrder,
                [this.$.sortable('toArray')]
            );

            ui.item.attr(
                'style',
                ui.item.attr('style').
                    replace(/position: relative;/, '')
            );
        }

    }, BaseElement.prototype);

});