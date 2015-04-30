/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineMaximizeEventManager(BaseEvent) {

    /**
     * Define maximize event manager
     * @class MaximizeEventManager
     * @constructor
     * @extends BaseEvent
     */
    var MaximizeEventManager = function MaximizeEventManager() {

        /**
         * Define events
         * @memberOf MaximizeEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @memberOf MaximizeEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadContent: string,
         *      storeItem: string,
         *      setActiveContent: string,
         *      loadPreferences: string,
         *      defineInteraction: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadModuleContent: 'load.module.content',
            defineInteraction: 'define.interaction',
            loadPreferences: 'load.preferences',
            storeItem: 'store.item',
            setActiveContent: 'set.active.content'
        };
    };

    return MaximizeEventManager.extend('MaximizeEventManager', {

    }, BaseEvent.prototype);
});