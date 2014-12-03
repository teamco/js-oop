/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/sublime.video/mvc/sublime.video.controller',
    'plugins/widgets/sublime.video/mvc/sublime.video.model',
    'plugins/widgets/sublime.video/mvc/sublime.video.view',
    'plugins/widgets/sublime.video/mvc/sublime.video.event.manager',
    'plugins/widgets/sublime.video/mvc/sublime.video.permission'
], function defineSublimeVideo(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SublimeVideo
     * @param containment
     * @param [opts]
     * @constructor
     * @class SublimeVideo
     * @extends AntHill
     */
    var SublimeVideo = function SublimeVideo(containment, opts) {

        /**
         * Define containment
         * @member SublimeVideo
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member SublimeVideo
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
         * @member SublimeVideo
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

    return SublimeVideo.extend('SublimeVideo', {

    }, AntHill.prototype);
});