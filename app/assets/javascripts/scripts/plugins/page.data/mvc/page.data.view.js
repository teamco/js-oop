/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/View',
    'plugins/preferences/preferences',
    'element/header.element',
    'element/footer.element',
    'plugins/page.data/element/page.data.content.element',
    'plugins/page.data/element/page.data.search.element',
    'plugins/page.data/element/page.data.element'
], function definePageDataView(AntHill, BaseView, BasePreferences, Header, Footer, PageDataContentElement, PageDataSearchElement, PageDataElement) {

    /**
     * Define view
     * @class PageDataView
     * @constructor
     * @extends BaseView
     * @extends BasePreferences
     */
    var PageDataView = function PageDataView() {
    };

    return PageDataView.extend('PageDataView', {

        /**
         * Render PageData
         * @member PageDataView
         * @returns {boolean}
         */
        renderPageData: function renderPageData() {

            if (this.isCached('$pagedata', PageDataElement)) {
                return false;
            }

            /**
             * Define PageData element
             * @type {PageDataElement}
             */
            this.elements.$pagedata = new PageDataElement(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });
        },

        /**
         * Render gallery search
         * @member PageDataView
         * @returns {boolean}
         */
        renderSearch: function renderSearch() {

            /**
             * Define PageData Search element
             * @type {PageDataSearchElement}
             */
            this.elements.$search = new PageDataSearchElement(this, {
                $container: this.elements.$container.$,
                style: 'page-data-search'
            });
        },

        /**
         * Render page.data content
         * @member PageDataView
         * @param data
         * @returns {boolean}
         */
        renderContent: function renderContent(data) {

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};
            this.elements.$pagedata.empty();

            this.renderHeader(Header, 'Page Widgets');
            this.renderSearch();

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {PageDataContentElement}
                     */
                    var $item = new PageDataContentElement(this, {
                        style: 'content',
                        id: [
                            data[index].model.getConfig('uuid'),
                            this.scope.constructor.prototype.name.toDash()
                        ].join('-'),
                        $container: this.elements.$pagedata.$,
                        data: data[index]
                    });

                    this.scope.observer.publish(
                        this.scope.eventmanager.eventList.storeItem,
                        data[index]
                    );

                    this.controller.defineContentReferrer(data[index]);

                    this.elements.items[$item.id] = $item;
                }
            }

            this.elements.$pagedata.scrollCover(
                this.elements.$container.$
            );

            this.elements.$search.updateData({
                items: this.elements.items,
                focusOn: 'input'
            });

            this.updateFooterContent();
        },

        /**
         * Update footer content
         * @member PageDataView
         */
        updateFooterContent: function updateFooterContent() {
            this.renderFooter(Footer, this.elements.$pagedata);
        },

        /**
         * Show preferences
         * @member PageDataView
         * @param config
         * @param {boolean} load
         */
        showPreferences: function showPreferences(config, load) {

            /**
             * Define scope
             * @type {PageData}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.setActiveContent,
                config.uuid
            );

            /**
             * Get content
             * @type {WidgetContent}
             */
            var content = this.scope.activeContent;

            if (!content) {
                scope.logger.warn('Undefined content');
                return false;
            }

            if (load) {

                /**
                 * Define $html
                 * @type {BaseElement}
                 */
                var $html = content.view.renderPreferences();

                this.openPreferences({
                    config: config,
                    $html: $html.$,
                    style: [
                        config.preferences.resource.toClassName(),
                        'widget-prefs preferences'
                    ].join(' '),
                    title: 'Widget preferences',
                    buttons: {
                        remove: {
                            text: 'Remove',
                            events: {
                                click: 'removeWidget'
                            }
                        },
                        rules: {
                            text: 'Rules',
                            events: {
                                click: 'rules' + this.scope.constructor.prototype.name
                            }
                        },
                        reject: {
                            text: 'Cancel',
                            events: {
                                click: [
                                    'rejectModalEvent',
                                    'restoreWidgetsLayerIndex',
                                    'restoreWidgetSticker'
                                ]
                            }
                        }
                    }
                });
            }
        },

        /**
         * Render page.data
         * @member PageDataView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPageData.bind(this)
            );
        }

    }, AntHill.prototype, BaseView.prototype, BasePreferences.prototype)

});