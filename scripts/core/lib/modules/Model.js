/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/crud'
], function initModel(AntHill, CRUD) {

    /**
     * Define Base model
     * @class BaseModel
     * @extends CRUD
     * @extends AntHill
     * @constructor
     */
    var BaseModel = function BaseModel() {

    };

    return BaseModel.extend('BaseModel', {

        /**
         * Get scope config
         * @member BaseModel
         * @param {String} [key]
         * @returns {*}
         */
        getConfig: function getConfig(key) {
            var scope = this.scope,
                config = scope.config,
                reference = scope.config;

            if (typeof(key) === 'undefined') {
                return config;
            }

            /**
             * Split key by slash
             * @type {Array}
             */
            var path = key.split('/');

            for (var i = 0, l = path.length; i < l; i++) {

                /**
                 * Get config node
                 */
                var node = path[i];

                if (reference.hasOwnProperty(node)) {

                    scope.logger.debug('Get config by key', node);
                    reference = reference[node];

                } else {
                    scope.logger.warn('Undefined config key', node);
                    return false;
                }
            }

            scope.logger.debug('Get config', reference);

            return reference;
        },

        /**
         * Set scope config
         * @member BaseModel
         * @param {String} [key]
         * @param {*} [value]
         * @returns {scope.config}
         */
        setConfig: function setConfig(key, value) {
            var scope = this.scope,
                config = scope.config;
            if (config.hasOwnProperty(key)) {
                scope.logger.debug('Update config', key, value);
                config[key] = value;
            }
            scope.logger.debug('Set config new data', key, value);
            config[key] = value;
            return this.getConfig(key);
        },

        /**
         * Get scope namespace
         * @member BaseModel
         * @param {*} node
         * @returns {string}
         */
        getNameSpace: function getNameSpace(node) {
            var base = this.base,
                scope = base.isDefined(node) ?
                    node : this.scope,
                constructor = base.isFunction(scope) ?
                    scope : scope.constructor;

            return constructor.name.toLowerCase();
        },

        /**
         * Find item in a whole project
         * @member BaseModel
         * @param {*} root
         * @param {string} uuid
         * @return {*}
         */
        findItemByUUID: function findItemByUUID(root, uuid) {

            if (!root) {
                this.scope.logger.error('Undefined root', root);
            }

            // Get child node
            var child = root.model.getItemByUUID(uuid);

            if (child) {
                return child;
            }

            // Get all items
            var items = root.model.getItems();

            for (var index in items) {

                if (items.hasOwnProperty(index)) {

                    var item = items[index];

                    // Recursive search
                    var search = item.model.findItemByUUID(
                        item, uuid
                    );

                    if (search) {
                        return search;
                    }
                }
            }
        },

        /**
         * Get parent items
         * @member BaseModel
         * @returns {*}
         */
        getParentItems: function getParentItems() {
            return this.scope.controller.getContainment().items;
        },

        /**
         * Get items
         * @member BaseModel
         * @returns {*}
         */
        getItems: function getItems() {
            return this.scope.items;
        },

        /**
         * Get all items apart of item
         * @member BaseModel
         * @param {{model}} item
         * @returns {Array}
         */
        getItemsApartOf: function getItemsApartOf(item) {
            var items = this.getItems(),
                nodes = [], index, node, nodeUUID,
                uuid = item.model.getUUID();

            for (index in items) {
                if (items.hasOwnProperty(index)) {
                    node = items[index];
                    nodeUUID = node.model.getUUID();
                    if (uuid !== nodeUUID) {
                        nodes.push(node);
                    }
                }
            }
            return nodes;
        },

        /**
         * Get UUID
         * @member BaseModel
         * @param {{model}} [node]
         * @returns {String}
         */
        getUUID: function getUUID(node) {
            return this.base.isDefined(node) ?
                node.model ?
                    node.model.getUUID() :
                    'Undefined ' + node.constructor.name :
                this.getConfig('uuid');
        },

        /**
         * Get item from collector by UUID
         * @member BaseModel
         * @param {string} uuid
         * @returns {*}
         */
        getItemByUUID: function getItemByUUID(uuid) {
            var base = this.base,
                items = this.getItems(),
                item = base.lib.hash.isHashKey(items, uuid) ?
                    items[uuid] : undefined;

            if (!base.isDefined(item)) {
                this.scope.logger.debug('Undefined item');
            }
            return item;
        },

        /**
         * Reset collector
         * @member BaseModel
         * @returns {*}
         */
        resetItems: function resetItems() {
            this.scope.items = {};
            return this.getItems();
        },

        /**
         * Delete widget from collector
         * @member BaseModel
         * @param uuid
         * @returns {*}
         */
        deleteItem: function deleteItem(uuid) {
            delete this.scope.controller.getContainment().items[uuid];
            return this.getParentItems();
        },

        /**
         * Update collector
         * @member BaseModel
         * @param {string} uuid
         * @param hash
         * returns {*}
         */
        updateItem: function updateItem(uuid, hash) {
            var item = this.getItemByUUID(uuid);
            $.extend(true, item, hash);
            return item;
        },

        /**
         * Add item to collector
         * @member BaseModel
         * @param {{model}} node
         * @param {boolean} [force]
         * @returns {*}
         */
        setItem: function setItem(node, force) {
            var base = this.base;

            node = base.define(node, {}, true);
            force = base.defineBoolean(force, false, true);

            var uuid = node.model.getUUID(),
                item = base.isDefined(this.getItemByUUID(uuid));
            if (force || !item) {
                this.getItems()[uuid] = node;
            } else if (item) {
                this.scope.logger.warn('Item already in collector');
            }
            return this.getItemByUUID(uuid);
        },

        /**
         * Get Item constructor name
         * @member BaseModel
         * @returns {string}
         */
        getItemNameSpace: function getItemNameSpace() {
            this.scope.logger.debug('Get item namespace');
            if (this.hasOwnProperty('item')) {
                return this.item.name.toLowerCase();
            }

            this.scope.logger.debug('Undefined item');
        },

        /**
         * Get items order
         * @member BaseModel
         * @returns {*}
         */
        getOrder: function getOrder() {
            return this.getConfig('order');
        },

        /**
         * Get prefs
         * @member BaseModel
         * @param {string} prefs
         * @returns {boolean|string}
         */
        getContentPrefs: function getContentPrefs(prefs) {

            if (!this.preferences[prefs]) {
                this.scope.logger.warn('Undefined preference', prefs);
                return false;
            }

            return this.preferences[prefs].value;
        },

        /**
         * Get prefs
         * @member BaseModel
         * @param {string} prefs
         * @returns {boolean|string}
         */
        getPrefs: function getPrefs(prefs) {

            if (this.base.isDefined(this.preferences)) {

                return this.getContentPrefs(prefs);
            }

            /**
             * Define prefs
             * @type {{}}
             */
            var preferences = this.scope.config.preferences;

            if (!preferences) {
                this.scope.logger.warn('Unable to locate preference', prefs);
                return false;
            }

            return preferences[prefs];
        },

        /**
         * Set prefs
         * @member BaseModel
         * @param {string} prefs
         * @param {string} value
         */
        setPrefs: function setPrefs(prefs, value) {

            /**
             * Define new prefs
             * @type {*}
             */
            this.preferences[prefs] = this.base.define(
                this.preferences[prefs], {}, true
            );

            /**
             * Define prefs
             * @type {string}
             */
            this.preferences[prefs].value = value;
        },

        /**
         * Copy prefs
         * @member BaseModel
         * @param source
         * @returns {boolean}
         */
        copyPrefs: function copyPrefs(source) {

            /**
             * Define
             * @type {string}
             */
            var cname = this.scope.constructor.name.toLowerCase(),
                prefs = source.model.preferences;

            if (source.constructor.name.toLowerCase() !== cname) {
                this.scope.logger.warn('Unable to copy preferences', source);
                return false;
            }

            for (var index in prefs) {

                if (prefs.hasOwnProperty(index)) {

                    if (index.match(new RegExp(cname))) {

                        this.setPrefs(index, prefs[index].value);
                        this.scope.logger.debug(
                            'Copied prefs', source, index, prefs[index]
                        );
                    }
                }
            }
        },

        /**
         * Set rules on loading
         * @member BaseModel
         * @param rules
         */
        setRules: function setRules(rules) {

            /**
             * Local rules storage
             * @member BaseModel
             * @type {{}}
             */
            this.rules = rules;
        },

        /**
         * Set Title
         * @member BaseModel
         * @param {string} title
         */
        setTitle: function setTitle(title) {
            this.setPrefs('title', title);
        },

        /**
         * Set Description
         * @member BaseModel
         * @param {string} description
         */
        setDescription: function setDescription(description) {
            this.setPrefs('description', description);
        },

        /**
         * Set on click Url
         * @member BaseModel
         * @param {string} url
         */
        setOnClickOpenUrl: function setOnClickOpenUrl(url) {
            this.setPrefs('onClickOpenUrl', url);

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            scope.observer.publish(
                scope.eventmanager.eventList.setOnClickUrl,
                url
            );
        },

        /**
         * Set statistics
         * @member BaseModel
         * @param {boolean} statistics
         */
        setStatistics: function setStatistics(statistics) {
            this.setPrefs('statistics', statistics);
        },

        /**
         * Set on top
         * @member BaseModel
         * @param {boolean} ontop
         */
        setAlwaysOnTop: function setStatistics(ontop) {
            this.setPrefs('alwaysOnTop', ontop);

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            scope.observer.publish(
                scope.eventmanager.eventList.setOnTop,
                ontop
            );
        },

        /**
         * Set overlapping
         * @member BaseModel
         * @param {boolean} overlapping
         */
        setOverlapping: function setOverlapping(overlapping) {
            this.setPrefs('overlapping', overlapping);
        },

        /**
         * Check items limit
         * @member BaseModel
         * @param {Function} constructor
         * @param {Number} limit
         * @returns {boolean}
         */
        checkLimit: function checkLimit(constructor, limit) {
            var base = this.base,
                namespace = this.getNameSpace(constructor);

            limit = base.isDefined(limit) ?
                limit :
                this.getConfig(namespace).limit;

            if (!base.isDefined(limit)) {
                return false;
            }

            return base.lib.hash.hashLength(this.getItems()) >= limit;

        },

        /**
         * Update items collector
         * @member BaseModel
         * @param {function} Constructor
         * @param {{}} opts
         * @returns {*}
         */
        updateCollector: function updateCollector(Constructor, opts) {

            var namespace = this.getNameSpace(Constructor),
                scope = this.scope,
                cname = Constructor.name,
                node = scope[cname.toLowerCase()],
                base = this.base;

            this.setConfig(namespace, base.define(scope.config[namespace], {}, true));

            /**
             * Define limit
             * @type {number}
             */
            var limit = this.getConfig(namespace).limit;

            if (this.checkLimit(Constructor, limit)) {
                scope.logger.warn(
                        cname + ': Maximum limit reached',
                    limit
                );
                node.model.setConfig('limit', true);

            } else {

                /**
                 * Init node
                 * @type {Constructor}
                 */
                node = new Constructor(base.define(opts, {}, true));

                if (base.isDefined(node.model)) {

                    this.setItem(node);

                } else {

                    scope.logger.warn(
                            cname + ' was created with some errors',
                        node
                    );
                }

                /**
                 * Update counter
                 * @type {Number}
                 */
                scope.config[namespace].counter =
                    base.lib.hash.hashLength(this.getItems());

                /**
                 * Store item
                 * @type {*}
                 */
                scope[cname.toLowerCase()] = node;

                node.model.setConfig('limit', false);
            }

            return node;
        },

        /**
         * Load data
         * @member BaseModel
         * @param [data]
         * @returns {*}
         */
        loadData: function loadData(data) {

            /**
             * Set data
             */
            data = this.base.isDefined(data) ?
                data : this.setting.load();

            if (!data.hasOwnProperty('collector')) {
                return false;
            }

            if (!this.base.isDefined(this.item)) {
                return data.collector;
            }

            var cname = this.item.name,
                lname = cname.toLowerCase(),
                collector = this.base.define(data.collector, {}, true);

            if (collector.hasOwnProperty(lname)) {

                for (var index in collector[lname]) {
                    if (collector[lname].hasOwnProperty(index)) {

                        // Create item
                        this.scope.api['create' + cname](
                            this.base.define(collector[lname][index], {}, true),
                            true,
                            true
                        );
                    }
                }
            }

            this.loadData.bind(this.scope[lname].model)(data);

            return data.collector;
        }

    }, AntHill.prototype, CRUD.prototype);

});