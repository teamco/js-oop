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
    'element/widget/widget.element.content',
    'element/widget/widget.element'
], function defineWidgetView(BaseView, Header, Footer, Content, Widget) {

    /**
     * Define Widget View
     * @constructor
     * @class View
     */
    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        renderWidget: function renderWidget() {
            this.elements.$widget = new Widget(this, {
                id: this.createUUID(),
                style: [
                    this.createStyle(),
                    this.scope.config.type
                ].join(' '),
                $container: this.getContainerSelector()
            });
            this.header(Header, this.elements.$widget);
            this.content();
            this.footer(Footer, this.elements.$widget);
        },
        content: function content() {
            this.elements.$content = new Content(this, {
                style: 'content',
                css: {
                    background: anthill._base.lib.generator.randomColor()
                },
                $container: this.elements.$widget.$
            });
        },
        render: function render() {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered
            );
        }
    }, BaseView.prototype)

});