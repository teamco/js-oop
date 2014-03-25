/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/gallery/element/gallery.providers.element',
    'plugins/gallery/element/gallery.search.element',
    'plugins/gallery/element/gallery.content.element',
    'plugins/gallery/element/gallery.element'
], function defineGalleryView(BaseView, Header, Footer, GalleryProviders, GallerySearch, GalleryContent, Gallery) {

    /**
     * Define view
     * @class GalleryView
     * @constructor
     * @extends BaseView
     */
    var GalleryView = function GalleryView() {
    };

    return GalleryView.extend('GalleryView', {

        /**
         * Render Gallery
         * @member GalleryView
         * @returns {boolean}
         */
        renderGallery: function renderGallery() {

            if (this.isCached('$gallery', Gallery)) {
                return false;
            }

            this.header(Header, this.elements.$container).setText(
                'Gallery Widgets'
            );

            /**
             * Define Gallery element
             * @type {GalleryElement}
             */
            this.elements.$gallery = new Gallery(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$gallery.getFooter()
            );
        },

        /**
         * Render gallery providers
         * @param providers
         * @param defaultProvider
         * @returns {boolean}
         */
        renderProviders: function renderProviders(providers, defaultProvider) {

            if (this.isCached('$providers', GalleryProviders)) {
                return false;
            }

            /**
             * Define Gallery element
             * @type {GalleryProvidersElement}
             */
            this.elements.$providers = new GalleryProviders(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$,
                style: 'gallery-providers',
                data: providers,
                default: defaultProvider
            });
        },

        /**
         * Render gallery search
         * @returns {boolean}
         */
        renderSearch: function renderSearch() {

            if (this.isCached('$search', GallerySearch)) {
                return false;
            }

            /**
             * Define Gallery element
             * @type {GallerySearchElement}
             */
            this.elements.$search = new GallerySearch(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$,
                style: 'gallery-search'
            });
        },

        /**
         * Render gallery content
         * @member GalleryView
         * @param data
         * @param {Boolean} force
         * @returns {boolean}
         */
        renderContent: function renderContent(data, force) {

            if (this.isCachedItems(force)) {
                return false;
            }

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {GalleryContentElement}
                     */
                    var $item = new GalleryContent(this, {
                        style: 'content',
                        $container: this.elements.$gallery.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Render gallery
         * @member GalleryView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGallery.bind(this)
            );
        }

    }, BaseView.prototype)

});