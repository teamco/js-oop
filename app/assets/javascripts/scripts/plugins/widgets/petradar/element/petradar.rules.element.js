/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePetradarRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Petradar Rules Element
     * @param view
     * @param opts
     * @returns {PetradarRulesElement}
     * @constructor
     * @class PetradarRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PetradarRulesElement = function PetradarRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBaseRulesData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return PetradarRulesElement.extend('PetradarRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});