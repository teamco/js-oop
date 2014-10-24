/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineSiteConfigEventManager(BaseEvent) {

    /**
     * Define SiteConfig event manager
     * @class SiteConfigEventManager
     * @constructor
     * @extends BaseEvent
     */
    var SiteConfigEventManager = function SiteConfigEventManager() {

        /**
         * Define events
         * @member SiteConfigEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return SiteConfigEventManager.extend('SiteConfigEventManager', {

        /**
         * Define event list
         * @member SiteConfigEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadContent: string,
         *      cleanUpLocalStorage: string,
         *      importSiteData: string,
         *      approveImportSiteData: string,
         *      readyToImportSiteData: string,
         *      exportSiteData: string,
         *      loadSitePreferences: string,
         *      widgetGenerator: string
         * }}
         */
        eventList: {
            updateTranslations: 'update.translations',
            loadContent: 'load.content',
            cleanUpLocalStorage: 'clean.up.local.storage',
            importSiteData: 'import.site.data',
            approveImportSiteData: 'approve.import.site.data',
            readyToImportSiteData: 'ready.to.import.site.data',
            exportSiteData: 'export.site.data',
            loadSitePreferences: 'load.site.preferences',
            widgetGenerator: 'widget.generator'
        }

    }, BaseEvent.prototype);
});