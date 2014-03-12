/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/application',
    'config/workspace',
    'config/page',
    'config/layout',
    'config/template',
    'config/widget'
], function defineListeners(Application, Workspace, Page, Layout, Template, Widget) {

    /**
     * Load listeners
     */
    Application.prototype.globalListeners = Application.prototype.globalListeners || {};
    Workspace.prototype.globalListeners = Workspace.prototype.globalListeners || {};
    Page.prototype.globalListeners = Page.prototype.globalListeners || {};
    Template.prototype.globalListeners = Template.prototype.globalListeners || {};
    Layout.prototype.globalListeners = Layout.prototype.globalListeners || {};
    Widget.prototype.globalListeners = Widget.prototype.globalListeners || {};

    /**
     * Define Application Global listeners
     * @type {{successRendered: {name: string, callback: successRenderedCallback}}}
     */
    Application.prototype.globalListeners = {

        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {

                var app = this;

                require([
                    'plugins/panel/panel',
                    'plugins/bar/bar',
                    'plugins/gallery/gallery',
                    'plugins/page.data/page.data'
                ], function definePanel(Panel, Bar, Gallery, PageData){

                    /**
                     * Init panel plugin
                     * @type {plugins.panel.panel}
                     */
                    app.panel = new Panel({
                        config: {renderAt: 'left'},
                        modules: [Gallery, PageData],
                        packages: [Bar]
                    }, app);

                    app.panel.view.render();
                });
            }
        }

    };

    /**
     * Define Workspace Global listeners
     * @type {{
     * }}
     */
    Workspace.prototype.globalListeners = {
    };

    /**
     * Define Page Global listeners
     * @type {{
     * }}
     */
    Page.prototype.globalListeners = {
    };

    /**
     * Define Template Global listeners
     * @type {{
     * }}
     */
    Template.prototype.globalListeners = {
    };

    /**
     * Define Widget Global listeners
     * @type {{
     * }}
     */
    Widget.prototype.globalListeners = {
    };

});