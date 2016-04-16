/**
 * Created by teamco on 7/10/14.
 */

define(function defineTextFieldRenderer() {

    /**
     * Define TextFieldRenderer
     * @class TextFieldRenderer
     * @extends LabelRenderer
     * @extends AntHill
     * @constructor
     */
    var TextFieldRenderer = function TextFieldRenderer() {
    };

    return TextFieldRenderer.extend('TextFieldRenderer', {

        /**
         * Render text field
         * @memberOf TextFieldRenderer
         * @param {{
         *      [text]: string,
         *      name: string,
         *      [placeholder]: string,
         *      value,
         *      [type]: string,
         *      [style]: string,
         *      [disabled]: boolean,
         *      [monitor],
         *      [readonly],
         *      [visible],
         *      [validate]: {mask: RegExp, blank: boolean}
         * }} opts
         * @returns {*[]}
         */
        renderTextField: function renderTextField(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-input';

            /**
             * Define $input
             * @type {jQuery}
             */
            var $input = $('<input class="form-control" />').addClass(opts.type).attr({
                name: opts.name,
                type: 'text',
                placeholder: opts.placeholder || 'Enter ' + opts.text,
                title: opts.value,
                'aria-describedby': uuid,
                readonly: this.base.defineBoolean(opts.readonly, false, true),
                disabled: this.base.defineBoolean(opts.disabled, false, true)
            }).val(opts.value);

            var labelClass = [opts.style, opts.visible ? '' : 'hide'].join(' '),
                $template = $('<div class="input-group" />').append(
                    this.renderLabel(uuid, opts.text, labelClass, opts.visible)
                );

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, opts.visible);
            this.validateByMask($input, opts);

            $template.append($input);

            return $template;
        }
    });
});