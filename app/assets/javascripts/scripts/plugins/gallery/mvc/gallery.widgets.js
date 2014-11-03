/**
 * Created by i061485 on 10/1/14.
 */

define(['config/routes'], function defineGalleryWidgets(Routes) {

    /**
     * Define gallery widgets
     * @class GalleryWidgets
     * @constructor
     * @extends Routes
     * @param {GalleryModel} galleryModel
     */
    var GalleryWidgets = function GalleryWidgets(galleryModel) {

        /**
         * Define static gallery content
         * @member GalleryWidgets
         * @type {{
         *      name: string,
         *      description: string,
         *      thumbnail: string,
         *      dimensions: {width: number, height: number},
         *      type: string,
         *      resource: string
         * }[]}
         */
        this.defaultData = [];

        /**
         * Define gallery model
         * @member GalleryWidgets
         * @type {GalleryModel}
         */
        this.galleryModel = galleryModel;
    };

    return GalleryWidgets.extend('GalleryWidgets', {

        /**
         * Load Default Data
         * @member GalleryWidgets
         * @param {string} [key]
         * @param {string} [type]
         * @param {boolean} [reverse]
         * @returns {{name: string, description: string, thumbnail: string, dimensions: {width: number, height: number}, type: string, resource: string}[]}
         */
        loadDefaultData: function loadDefaultData(key, type, reverse) {

            /**
             * Define local
             * @type {GalleryWidgets}
             */
            var galleryWidgets = this;

            /**
             * Define scope
             * @type {Gallery}
             */
            var scope = galleryWidgets.galleryModel.scope;

            /**
             * Define sort
             * @private
             */
            function _sortData() {

                // Store ordered data
                var data = typeof(key) === 'string' && typeof(type) === 'string' ?
                    galleryWidgets.defaultData.sortByValue(key, type, reverse) :
                    galleryWidgets.defaultData;

                galleryWidgets.setDefaultData({
                    widgets: data
                });

                galleryWidgets.galleryModel.init();

                scope.observer.publish(
                    scope.eventmanager.eventList.setProviders
                );

                scope.observer.publish(
                    scope.eventmanager.eventList.setCurrentProvider,
                    scope.model.currentProvider.key
                );
            }

            if (galleryWidgets.defaultData.length === 0) {

                $.ajax({

                    url: galleryWidgets.resources.showWidgetsList,
                    dataType: 'json'

                }).done(
                    /**
                     * Define done
                     * @private
                     * @param {Array} json
                     * @return {Array}
                     */
                        function _done(json) {

                        galleryWidgets.setDefaultData(json);
                        _sortData();
                    }
                );

            } else {

                _sortData();
            }
        },

        /**
         * Define default data setter
         * @member GalleryWidgets
         * @param {{categories: Array, widgets: Array}} json
         */
        setDefaultData: function setDefaultData(json) {

            if (typeof(this.galleryModel.dataTypes) === 'undefined') {

                /**
                 * Define provider types
                 * @member GalleryModel
                 * @type {object}
                 */
                this.galleryModel.dataTypes = {};

                var category,
                    i = 0, l = json.categories.length;

                for (; i < l; i++) {

                    /**
                     * Define category instance
                     * @type {{name_index, name_value}}
                     */
                    category = json.categories[i];
                    this.galleryModel.dataTypes[category.name_index] = category.name_value;
                }
            }

            /**
             * Set default data
             * @member GalleryWidgets
             */
            this.defaultData = json.widgets;
        },

        /**
         * Define default data getter
         * @member GalleryWidgets
         * @returns {{
         *      name: string,
         *      description: string,
         *      thumbnail: string,
         *      dimensions: {width: number, height: number},
         *      type: string,
         *      resource: string
         * }[]}
         */
        getDefaultData: function getDefaultData() {
            return this.defaultData;
        },

        /**
         * Define widget data getter
         * @member GalleryWidgets
         * @param {string} resource
         * @returns {{
         *      name: string,
         *      description: string,
         *      thumbnail: string,
         *      dimensions: {width: number, height: number},
         *      type: string,
         *      resource: string
         * }}
         */
        getWidgetData: function getWidgetData(resource) {

            /**
             * Get default data
             * @type {{
             *      name: string,
             *      description: string,
             *      thumbnail: string,
             *      dimensions: {width: number, height: number},
             *      type: string,
             *      resource: string
             * }[]}
             */
            var data = this.defaultData,
                i = 0,
                l = data.length;

            /**
             * Get scope
             * @type {Gallery}
             */
            var scope = this.galleryModel.scope;

            for (; i < l; i++) {

                if (data[i].resource === resource) {

                    scope.logger.debug('Get widget data', data[i]);
                    return data[i];
                }
            }

            scope.logger.debug('Undefined widget data', resource);
        }

    }, Routes.prototype);
});