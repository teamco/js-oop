/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'element/widget/widget.element.content',
    'element/widget/widget.element'
], function defineWidgetView(AntHill, BaseView, Header, Footer, Content, Widget) {

    /**
     * Define Widget View
     * @constructor
     * @class View
     */
    var View = function View() {
    };

    return View.extend('View', {

        /**
         * Render widget
         */
        renderWidget: function renderWidget() {

            /**
             * Define $widget
             * @type {element.widget.widget.element}
             */
            this.elements.$widget = new Widget(this, {
                id: this.createUUID(),
                style: [
                    this.createStyle(),
                    this.scope.config.type
                ].join(' '),
                $container: this.getContainerSelector()
            });

            this.scope.map.setPosition();

            this.header(Header, this.elements.$widget);
            this.content();
            this.footer(Footer, this.elements.$widget);
        },

        content: function content() {
            this.elements.$content = new Content(this, {
                style: 'content',
                css: {
                    background: this.base.lib.generator.randomColor()
                },
                $container: this.elements.$widget.$
            });
        },

        /** Render widget
         * @param {boolean} silent
         */
        render: function render(silent) {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                silent
            );
        }

    }, AntHill.prototype, BaseView.prototype)

});