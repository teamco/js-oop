/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:35 PM
 */
import {WidgetController} from '../../../../core/controller/widget.controller';
import {Widget} from '../../../../core/config/widget';
import {widgets} from '../widgets';

export const widgetGlobalListeners = () => {

  /**
   * @memberOf WidgetController
   * @method getAvailableContent
   */
  WidgetController.prototype.getAvailableContent = function(resource) {

    if (resource && widgets[resource]) {
      return widgets[resource];
    }

    this.scope.logger.warn('Unable to fetch resource', resource, widgets);
  };

  /**
   * Define Widget Global listeners
   * @memberOf Widget
   * @type {{}}
   */
  Widget.prototype.globalListeners = {};
};