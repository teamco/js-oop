/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/tsn.ua/mvc/tsn.ua.controller',
    'plugins/widgets/tsn.ua/mvc/tsn.ua.model',
    'plugins/widgets/tsn.ua/mvc/tsn.ua.view',
    'plugins/widgets/tsn.ua/mvc/tsn.ua.event.manager',
    'plugins/widgets/tsn.ua/mvc/tsn.ua.permission'
], function defineTsnUa(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define TsnUa
     * @param containment
     * @param [opts]
     * @constructor
     * @class TsnUa
     * @extends AntHill
     */
    var TsnUa = function TsnUa(containment, opts) {

        /**
         * Define containment
         * @member TsnUa
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member TsnUa
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
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      },
         *      regex: RegExp,
         *      mask: string
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
         * Define MVC
         * @member TsnUa
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {uuid: this.containment.model.getContentUUID()},
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
            this.eventmanager.eventList.initWidget,
            opts
        );
    };

    return TsnUa.extend('TsnUa', {

    }, AntHill.prototype);
});