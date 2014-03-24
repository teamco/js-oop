/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([], function defineBasePreferences() {

    /**
     * Define prefs
     * @class WidgetPreferences
     * @extends Renderer
     * @constructor
     */
    var WidgetPreferences = function WidgetPreferences() {

    };

    return WidgetPreferences.extend('WidgetPreferences', {

        /**
         * Define default widget prefs
         * @type {{
         *      title: {type: string, disabled: boolean, value},
         *      widgetUrl: {type: string, disabled: boolean, value},
         *      description: {type: string, disabled: boolean, value}
         * }}
         */
        defaultPrefs: {
            title: {
                type: 'text',
                disabled: false,
                value: undefined
            },
            description: {
                type: 'textarea',
                disabled: false,
                value: undefined
            },
            widgetUrl: {
                type: 'text',
                disabled: true,
                value: undefined
            }
        },

        /**
         * Render data
         * @memberOf WidgetPreferences
         * @param data
         */
        renderData: function renderData(data) {

            /**
             * Define dom nodes
             * @type {Array}
             */
            var nodes = [];

            /**
             * Merge prefs with default data
             */
            data = $.extend(true, this.defaultPrefs, data);

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Define text
                     * @type {string}
                     */
                    var text = index.toPoint().humanize();

                    /**
                     * Define node
                     */
                    var node = data[index];

                    /**
                     * Define placeholder text
                     * @type {string}
                     */
                    var placeholder = 'Enter ' + text;

                    if (node.type === 'text') {

                        /**
                         * Get text field
                         * @type {*[]}
                         */
                        var textField = this.renderTextField({
                            name: index,
                            text: text,
                            placeholder: placeholder,
                            value: node.value,
                            disabled: node.disabled
                        });
                    }

                    if (node.type === 'textarea') {

                        /**
                         * Get text field
                         * @type {*[]}
                         */
                        var textField = this.renderTextArea({
                            name: index,
                            text: text,
                            placeholder: placeholder,
                            value: node.value,
                            disabled: node.disabled
                        });
                    }

                    nodes.push(
                        $('<li />').append(textField)
                    );
                }
            }

            this.$.append(
                this.renderInteractions(nodes)
            );
        },

        /**
         * Render Interactions
         * @member WidgetPreferences
         * @param {Array} nodes
         * @returns {*}
         */
        renderInteractions: function renderInteractions(nodes) {

            /**
             * Define controller
             * @type {*}
             */
            var controller = this.view.controller;

            /**
             * Define interactions container
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('interactions');

            /**
             * Define dom prefs
             */
            var column = controller.getDOMPreferences('column'),
                row = controller.getDOMPreferences('row'),
                width = controller.getDOMPreferences('relWidth'),
                height = controller.getDOMPreferences('relHeight');

            nodes.push(
                $('<li />').append(
                    $('<fieldset />').append(
                        $('<legend />').text('Interactions').
                            on('click.toggle', function click() {

                                /**
                                 * Define $li
                                 * @type {*|jQuery|HTMLElement}
                                 */
                                var $li = $(this);

                                $li.hasClass('open') ?
                                    $li.removeClass('open') :
                                    $li.addClass('open');
                            }).attr({
                                title: 'Interactions'
                            }),

                        $ul.append([
                            this.renderPrefs('Column', column),
                            this.renderPrefs('Width', width),
                            this.renderPrefs('Row', row),
                            this.renderPrefs('Height', height)
                        ])
                    )
                )
            );

            return nodes;
        },

        /**
         * Render move
         * @memberOf WidgetPreferences
         * @param {string} side
         * @param value
         * @returns {*|jQuery}
         */
        renderPrefs: function renderPrefs(side, value) {

            /**
             * Define move
             * @type {*[]}
             */
            var $move = this.renderTextField({
                name: side.toLowerCase(),
                text: side,
                placeholder: side,
                value: value,
                disabled: true
            });

            return $('<li />').append($move);
        }
    });

});