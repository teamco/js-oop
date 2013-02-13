/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/workspace',
    'config/page'
], function defineListeners(Workspace, Page) {

    Workspace.prototype.globalListeners = {
        createPage: {
            name: 'create.page',
            callback: function createPageCallback() {
                this.observer.publish(this.eventmanager.eventList.setPageContainerHeight);
            }
        }
    };

    Page.prototype.globalListeners = {
        createWidget: {
            name: 'create.widget',
            callback: function createWidgetCallback() {
                this.observer.publish(this.eventmanager.eventList.setPageHeight);
            }
        }
    };

});