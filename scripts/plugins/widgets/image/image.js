/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/widgets/image/mvc/image.controller',
    'plugins/widgets/image/mvc/image.model',
    'plugins/widgets/image/mvc/image.view',
    'plugins/widgets/image/mvc/image.event.manager',
    'plugins/widgets/image/mvc/image.permission'
], function defineImage(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Image
     * @param containment
     * @constructor
     * @class Image
     * @extends AntHill
     */
    var Image = function Image(containment) {

        /**
         * Define containment
         * @member Image
         */
        this.containment = containment;

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
         * @member Image
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Image
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Image
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Image
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Image
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

        this.observer.publish(
            this.eventmanager.eventList.initWidget
        );
    };

    return Image.extend('Image', {

    }, AntHill.prototype);
});