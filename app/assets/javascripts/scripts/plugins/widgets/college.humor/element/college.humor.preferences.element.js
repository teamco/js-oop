/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineCollegeHumorPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define CollegeHumor Preferences Element
     * @param view
     * @param opts
     * @returns {CollegeHumorPreferencesElement}
     * @constructor
     * @class CollegeHumorPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var CollegeHumorPreferencesElement = function CollegeHumorPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return CollegeHumorPreferencesElement.extend('CollegeHumorPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});