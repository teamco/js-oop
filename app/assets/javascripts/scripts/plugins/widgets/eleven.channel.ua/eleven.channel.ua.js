/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/eleven.channel.ua/mvc/eleven.channel.ua.controller',
    'plugins/widgets/eleven.channel.ua/mvc/eleven.channel.ua.model',
    'plugins/widgets/eleven.channel.ua/mvc/eleven.channel.ua.view',
    'plugins/widgets/eleven.channel.ua/mvc/eleven.channel.ua.event.manager',
    'plugins/widgets/eleven.channel.ua/mvc/eleven.channel.ua.permission'
], function defineElevenChannelUa(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define ElevenChannelUa
     * @param containment
     * @param [opts]
     * @constructor
     * @class ElevenChannelUa
     * @extends AntHill
     */
    var ElevenChannelUa = function ElevenChannelUa(containment, opts) {

        /**
         * Define containment
         * @member ElevenChannelUa
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member ElevenChannelUa
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
         * @member ElevenChannelUa
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

    return ElevenChannelUa.extend('ElevenChannelUa', {

    }, AntHill.prototype);
});