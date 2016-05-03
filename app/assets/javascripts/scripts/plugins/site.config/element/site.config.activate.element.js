/**
 * Created by teamco on 7/31/14.
 */

define([
    'plugins/plugin.element'
], function defineSiteConfigActivateElement(PluginElement) {

    /**
     * Define SiteConfigActivateElement
     * @class SiteConfigActivateElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends PluginElement
     * @extends Renderer
     * @returns {SiteConfigActivateElement}
     */
    var SiteConfigActivateElement = function SiteConfigActivateElement(view, opts) {

        this._config(view, opts, $('<div class="site-mode" />')).build({
            $container: opts.$container
        });

        this.renderContent();

        return this;
    };

    return SiteConfigActivateElement.extend('SiteConfigActivateElement', {

        /**
         * Render content
         * @memberOf SiteConfigActivateElement
         */
        renderContent: function renderContent() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope,
                root = scope.controller.root();

            var storage = root.model.setting.storage,
                modes = [];

            for (var index in storage) {
                if (storage.hasOwnProperty(index)) {
                    modes.push({
                        type: 'text',
                        key: index,
                        value: index
                    });
                }
            }

            /**
             * Define combo
             * @type {*|jQuery}
             */
            var $combo = $('<div class="input-group input-group-sm" />').append(
                this.renderLabel(undefined, 'Mode', '', true),
                this.renderCombobox(
                    modes,
                    root.model.getConfig('mode'),
                    'Mode',
                    'author_site_type[name]',
                    undefined,
                    true,
                    true
                )
            );

            this.$.append($combo);
        }

    }, PluginElement.prototype);
});