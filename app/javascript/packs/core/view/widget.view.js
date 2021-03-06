/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../modules/View';
import {WidgetElement} from '../element/widget/widget.element';
import {WidgetContentElement} from '../element/widget/widget.content.element';
import {WidgetExpanderElement} from '../element/widget/widget.expander.element';
import {WidgetCommentElement} from '../element/widget/widget.comment.element';

/**
 * @class WidgetView
 * @extends BaseView
 * @type {WidgetView}
 */
export class WidgetView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Widget} scope
   */
  constructor(name, scope) {
    super(name || 'WidgetView', scope);
  }

  /**
   * Render widget
   * @memberOf WidgetView
   */
  renderWidget() {

    /**
     * Define $widget
     * @type {WidgetElement}
     */
    this.elements.$widget = new WidgetElement(this, {
      style: [this.createStyle(), this.scope.config.type].join(' '),
      $container: this.getContainerSelector(),
      destroy: false
    });

    this.scope.map.setPosition();

    this.header(this.get$item());
    this.content();
    this.contentSharing();
    this.footer(this.get$item());
  }

  /**
   * Render content
   * @memberOf WidgetView
   */
  content() {

    /**
     * Define $content
     * @type {WidgetContentElement}
     */
    this.elements.$content = new WidgetContentElement(this, {
      style: 'content',
      resource: this.controller.getResource(),
      thumbnail: this.controller.getThumbnail(),
      $container: this.get$item().$
    });
  }

  /**
   * Render content expander
   * @memberOf WidgetView
   */
  contentExpander() {

    /**
     * Define $expander
     * @type {WidgetExpanderElement}
     */
    this.elements.$expander = new WidgetExpanderElement(this, {
      style: 'expander',
      $container: this.get$item().$
    });
  }

  /**
   * Render comments
   * @memberOf WidgetView
   */
  contentComments() {

    /**
     * Define $comments
     * @type {WidgetCommentElement}
     */
    this.elements.$comments = new WidgetCommentElement(this, {
      style: 'comments',
      $container: this.elements.$content
    });
  }

  /**
   * @memberOf WidgetView
   */
  contentSharing() {

  }

  /**
   * Render widget
   * @memberOf WidgetView
   * @param {boolean} silent
   */
  render(silent) {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, silent);
  }
}