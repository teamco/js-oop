/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function definePageContainer(Base, BaseElement) {

    var PageContainer = function PageContainer(view, opts) {
        return this.config(view, opts).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return PageContainer.extend({
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.id = this.renderUUID(opts.id);
            this.$ = $('<ul />').attr({
                id: opts.id
            }).addClass(this.style);

            return this;
        },
        setHeight: function setHeight() {
            var header = this.view.elements.$header,
                footer = this.view.elements.$footer,
                $container = $(this.view.scope.model.root().config.html.container);

            var headerHeight = header.$ ? header.$.height() : 0,
                footerHeight = footer.$ ? footer.$.height() : 0,
                containerHeight = $container.height();

            this.$.css({
                height: containerHeight - (headerHeight + footerHeight)
            });
        }

    }, Base, BaseElement.prototype);
});