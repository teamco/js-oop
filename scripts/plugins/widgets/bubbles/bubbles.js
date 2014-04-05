/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/widgets/bubbles/mvc/statistics.controller',
    'plugins/widgets/bubbles/mvc/statistics.model',
    'plugins/widgets/bubbles/mvc/statistics.view',
    'plugins/widgets/bubbles/mvc/statistics.event.manager',
    'plugins/widgets/bubbles/mvc/statistics.permission'
], function defineStatistics(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Statistics
     * @param containment
     * @constructor
     * @class Statistics
     * @extends AntHill
     */
    var Statistics = function Statistics(containment) {

        /**
         * Define containment
         * @member Statistics
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Statistics
         * @type {*}
         */
        this.referrer = undefined;

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
                header: false,
                footer: false,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        };

        /**
         * Init observer
         * @member Statistics
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Statistics
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Statistics
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Statistics
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Statistics
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
                DEFAULTS
            ],
            components: [
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        this.observer.publish(
            this.eventmanager.eventList.initWidget
        );
    };

    return Statistics.extend('Statistics', {

    }, AntHill.prototype);
});