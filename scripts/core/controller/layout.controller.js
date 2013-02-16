/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/controller'
], function defineLayoutController(Base, BaseController) {

    /**
     *
     * @constructor
     */
    var Controller = function Controller() {

    };

    return Controller.extend({
        /**
         * Update cell size on resize container
         * @returns {*}
         */
        updateMinCellWidth: function updateMinCellWidth() {
            delete this.config.grid.minCellWidth;
            return this.controller.minCellWidth();
        },
        /**
         * Calculate cell size
         * @returns {*}
         */
        minCellWidth: function minCellWidth() {
            var base = this.base,
                scope = this.scope,
                config = scope.config.grid;
            if (base.isDefined(config.minCellWidth)) {
                return config.minCellWidth;
            }
            var columns = config.columns,
                margin = config.margin + config.padding;

            config.minCellWidth = (
                scope.page.view.elements.$page.getWidth() -
                    margin - margin * columns
                ) / (columns);

            this.scope.page.logger.info('Calculated cell size (px)', config.minCellWidth);
            return config.minCellWidth;
        },
        /**
         * Retrieve the last row number we are occupying by now
         * @param {boolean} lower
         * returns {*}
         */
        rowsBasedOnWidgets: function rowsBasedOnWidgets(lower) {

            lower = this.base.defineBoolean(lower, false, true);

            var row = -1,
                bottom = {},
                widgets = this.layout.page.model.getAllWidgetsFromCollector(),
                index;
            for (index in widgets) {
                if (widgets.hasOwnProperty(index)) {
                    var widget = widgets[index];
                    // row is current row + blocks it takes to the bottom
                    if (widget.row + widget.relHeight > row) {
                        row = widget.row + widget.relHeight;
                        bottom = widget;
                    }
                }
            }
            return lower ? bottom : row;
        },
        /**
         * Get map margins delta in row/column
         * @param column
         * @param row
         * @returns {{top: number, left: number}}
         */
        marginFor: function marginFor(column, row) {
            var config = this.scope.config.grid;
            return {
                top: (row + 1) * config.margin,
                left: (column + 1) * config.margin
            };
        },
        /**
         * Get map widget top/left
         * @param column
         * @param row
         * @returns {{top: number, left: number}}
         */
        positionFor: function positionFor(column, row) {
            var margins = this.marginFor(column, row),
                config = this.scope.config.grid;
            return {
                top: row * config.minCellWidth + margins.top,
                left: column * config.minCellWidth + margins.left
            };
        }

    }, Base, BaseController.prototype);
});