/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseController
 * @type {module.BaseController}
 */
const BaseController = require('../lib/modules/Controller.js');

/**
 * @class LayoutController
 * @type {module.LayoutController}
 */
module.exports = class LayoutController extends BaseController {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'LayoutController', scope, false);
  }

  /**
   * Before nested organizer
   * @memberOf LayoutController
   * @param {boolean} silent
   */
  beforeNestedOrganizer(silent) {
    silent ?
        this.logger.debug(this.i18n.t('silent.add.widget')) :
        this.controller.getContainment().controller.banAddWidget();
    this.logger.debug(this.i18n.t('before.nested.organizer'));
  }

  /**
   * After nested organizer
   * @memberOf LayoutController
   */
  afterNestedOrganizer() {
    this.controller.readyToOrganize();
    this.controller.store();
    this.logger.debug(this.i18n.t('after.nested.organizer'));
  }

  /**
   * Define beforeExpand
   * @memberOf LayoutController
   * @param {Widget} widget
   */
  beforeExpand(widget) {
    this.logger.debug(this.i18n.t('before.expand'), widget);
  }

  /**
   * Define onExpand
   * @memberOf LayoutController
   * @param {Widget} widget
   */
  onExpand(widget) {
    this.logger.debug(this.i18n.t('on.expand'), widget);
    this.observer.publish(this.eventManager.eventList.beforeExpand, widget);
    this.expand.adoptLayout(widget);
  }

  /**
   * Define afterExpand
   * @memberOf LayoutController
   * @param {Widget} widget
   */
  afterExpand(widget) {
    this.logger.debug(this.i18n.t('after.expand'), widget);
  }

  /**
   * Ready to organize
   * @memberOf LayoutController
   */
  readyToOrganize() {

    /**
     * Get containment
     * @type {Page|*}
     */
    const containment = this.getContainment();
    containment.controller.allowAddWidget();
  }

  /**
   * Update grid number of columns
   * @memberOf LayoutController
   * @param {number} columns
   */
  updateNumberOfColumns(columns) {
    this.logger.debug('Start update columns', columns);
    if (!columns) {
      this.logger.warn('Undefined number of columns set default', columns, this.config.grid.columns);
      return false;
    }
    this.config.grid.columns = columns;
  }

  /**
   * Update cell size on resize container
   * @memberOf LayoutController
   * @returns {*}
   */
  updateMinCellWidth() {
    delete this.config.grid.minCellWidth;
    return this.controller.minCellWidth();
  }

  /**
   * Calculate cell size
   * @memberOf LayoutController
   * @returns {Number}
   */
  minCellWidth() {

    /**
     * Get scope
     * @type {Layout}
     */
    const scope = this.scope;
    const config = scope.config.grid;

    if (config.minCellWidth) {
      return config.minCellWidth;
    }

    const columns = config.columns,
        margin = config.margin;

    const elements = scope.controller.getContainment().view.elements,
        $page = elements.$page,
        $widgets = elements.$widgets;

    const pl = $widgets.getPaddingLeft(),
        pr = $widgets.getPaddingRight(),
        ml = $widgets.getMarginLeft(),
        mr = $widgets.getMarginRight();

    const width = $page.getWidth() - pl - pr - ml - mr;

    config.minCellWidth = (width - margin * columns) / columns;
    scope.logger.debug('Calculated cell size (px)', config.minCellWidth);
    return config.minCellWidth;
  }

  /**
   * Get grid width
   * @memberOf LayoutController
   * @returns {number}
   */
  getGridWidth() {
    const config = this.scope.config.grid,
        cell = this.minCellWidth();
    return (cell + config.margin) * config.columns;
  }

  /**
   * Toggle page grid
   * @method toggleGrid
   * @memberOf LayoutController
   */
  toggleGrid() {
    const config = this.config.grid,
        cellWidth = this.controller.minCellWidth() + config.margin;
    this.grid.toggleGrid(this.controller.getContainment(), cellWidth);
  }

  /**
   * Get next position
   * @memberOf LayoutController
   * @param {{column: Number, row: Number, zIndex}} dom
   * @returns {{left: Number, top: Number}}
   */
  getNextPosition(dom) {
    const layout = this.scope,
        page = layout.controller.getContainment(),
        $widgets = page.controller.getWidgetsContainer(),
        top = $widgets.getMarginTop(),
        left = $widgets.getMarginLeft();

    const cell = layout.controller.minCellWidth(),
        margin = layout.config.grid.margin;

    /**
     * Get next position
     * @param {Number} pos
     * @returns {Number}
     * @private
     */
    function _getNextPosition(pos) {
      return pos * cell + (margin * (pos + 1));
    }

    return {
      left: _getNextPosition(dom.column) + left,
      top: _getNextPosition(dom.row) + top,
      zIndex: dom.zIndex
    };
  }

  /**
   * Get layout Behavior mode
   * @memberOf LayoutController
   * @returns {string}
   */
  getBehaviorMode() {
    return this.scope.config.mode;
  }

  /**
   * Set layout Behavior mode
   * @memberOf LayoutController
   * @param {string} mode
   * @returns {string}
   */
  setBehaviorMode(mode) {
    this.logger.warn('Behavior mode was changed', this.controller.getBehaviorMode(), mode);

    /**
     * Define Behavior mode
     * @type {string}
     */
    this.config.mode = mode;
  }

  /**
   * Check if mode is Snap to Grid
   * @memberOf LayoutController
   * @returns {boolean}
   */
  isSnap2Grid() {
    return this.getBehaviorMode() === this.getContainment().LAYOUT_MODES.snap2grid;
  }

  /**
   * Check if mode is Snap to Grid
   * @memberOf LayoutController
   * @returns {boolean}
   */
  isUIGrid() {
    return this.getBehaviorMode() === this.getContainment().LAYOUT_MODES.jqUIGrid;
  }

  /**
   * Check if mode is Free Style
   * @memberOf LayoutController
   * @returns {boolean}
   */
  isFreeStyle() {
    return this.getBehaviorMode() === this.getContainment().LAYOUT_MODES.freeStyle;
  }

  /**
   * Check if overlapping allowed
   * @memberOf LayoutController
   * @returns {boolean}
   */
  isOverlappingAllowed() {
    return this._getLayoutMode('organize') !== this.getContainment().ORGANIZE_MODES.none;
  }

  /**
   * Get layout behavior mode
   * @memberOf LayoutController
   * @returns {*}
   */
  getBehavior() {
    return this.scope.config.behavior[this.getBehaviorMode()];
  }

  /**
   * Set behavior empty spaces mode
   * @memberOf LayoutController
   * @param {string} mode
   */
  setEmptySpacesMode(mode) {
    this.controller._setLayoutMode('emptySpaces', mode);
  }

  /**
   * Set behavior organize mode
   * @memberOf LayoutController
   * @param {string} mode
   */
  setOrganizeMode(mode) {
    this.controller._setLayoutMode('organize', mode);
  }

  /**
   * Set layout mode
   * @memberOf LayoutController
   * @param {string} type
   * @param {string|boolean} mode
   * @private
   */
  _setLayoutMode(type, mode) {
    this.scope.logger.warn(type.toUnderscore().capitalize() + ' was changed', this._getLayoutMode(type), mode);
    this._updateLayoutMode(type, mode);
  }

  /**
   * Get layout mode
   * @memberOf LayoutController
   * @param {string} type
   * @returns {*|Overlapping}
   * @private
   */
  _getLayoutMode(type) {
    return this.getBehavior()[type];
  }

  /**
   * Update layout mode
   * @memberOf LayoutController
   * @param mode
   * @param {string} type
   * @private
   * @returns {*|Overlapping}
   */
  _updateLayoutMode(type, mode) {
    this.scope.config.behavior[this.getBehaviorMode()][type] = mode;
    return this._getLayoutMode(type);
  }
};
