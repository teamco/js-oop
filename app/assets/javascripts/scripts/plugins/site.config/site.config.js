/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/site.config/mvc/site.config.controller',
    'plugins/site.config/mvc/site.config.model',
    'plugins/site.config/mvc/site.config.view',
    'plugins/site.config/mvc/site.config.event.manager',
    'plugins/site.config/mvc/site.config.permission'
], function defineSiteConfig(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SiteConfig
     * @constructor
     * @param containment
     * @class SiteConfig
     * @extends AntHill
     */
    var SiteConfig = function SiteConfig(containment) {

        /**
         * Define containment
         * @property SiteConfig
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property SiteConfig
         * @type {SiteConfig}
         */
        this.referrer = this;

        /**
         * Define active content
         * @property SiteConfig
         * @type {Page}
         */
        this.activeContent = undefined;

        /**
         * Allow to locate element
         * @property SiteConfig
         * @type {boolean}
         */
        this.allowToLocate = true;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          floating: boolean,
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      }
         * }}
         */
        var DEFAULTS = {
            plugin: true,
            html: {
                style: 'default',
                header: true,
                footer: true,
                floating: true,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            routes: {
                activateSiteStorage: ['/sites/activate/', 'put'],
                createNewWidget: ['/author/widgets', 'post'],
                createExternalWidget: ['/author/widgets/create_external', 'post'],
                updateExistingWidget: ['/author/widgets/{id}', 'put'],
                publishSiteStorage: ['/author/site_storages/publish/{id}', 'put'],
                fetchExternalWidget: ['/fetch_external_widget', 'put']
            },
            widget: {
                type: 'regular',
                thumbnail: 'data:image/png;base64,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',
                dimensions: {
                    height: 50,
                    width: 50
                }
            }
        };

        /**
         * Define MVC
         * @memberOf SiteConfig
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [DEFAULTS],
            components: [
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        this.observer.batchPublish(
            this.eventmanager.eventList.successCreated,
            this.eventmanager.eventList.setRoutes
        );

        this.observer.publish(
            this.eventmanager.eventList.updateTranslations,
            ['plugins/site.config/translations/en-us']
        );
    };

    return SiteConfig.extend('SiteConfig', {}, AntHill.prototype);
});