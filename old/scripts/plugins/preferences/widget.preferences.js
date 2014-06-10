/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'plugins/preferences/preferences'
], function defineWidgetPreferences(BasePreferences) {

    /**
     * Define prefs
     * @class WidgetPreferences
     * @extends Renderer
     * @extends BasePreferences
     * @constructor
     */
    var WidgetPreferences = function WidgetPreferences() {

    };

    return WidgetPreferences.extend('WidgetPreferences', {

        /**
         * @type {{
         *      title: {type: string, disabled: boolean, value},
         *      description: {type: string, disabled: boolean, value},
         *      widgetUrl: {type: string, disabled: boolean, value},
         *      onClickOpenUrl: {type: string, disabled: boolean, value},
         *      overlapping: {type: string, disabled: boolean, checked: boolean},
         *      alwaysOnTop: {type: string, disabled: boolean, checked: boolean},
         *      statistics: {type: string, disabled: boolean, checked: boolean},
         *      setLayerUp: {type: string, disabled: boolean, group: string, events: array},
         *      setLayerDown: {type: string, disabled: boolean, group: string, events: array}
         * }}
         */
        defaultPrefs: {
            title: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            description: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            widgetUrl: {
                type: 'textarea',
                disabled: true,
                value: undefined,
                visible: true
            },
            onClickOpenUrl: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            overlapping: {
                type: 'checkbox',
                disabled: false,
                checked: false,
                visible: true
            },
            statistics: {
                type: 'checkbox',
                disabled: false,
                checked: false,
                visible: true
            },
            alwaysOnTop: {
                type: 'checkbox',
                disabled: false,
                checked: false,
                visible: true
            },
            setLayerUp: {
                type: 'event',
                disabled: false,
                group: 'layer',
                events: ['click'],
                visible: true
            },
            setLayerDown: {
                type: 'event',
                disabled: false,
                group: 'layer',
                events: ['click'],
                visible: true
            }
        },

        /**
         * Render prefs data
         * @member WidgetPreferences
         * @param data
         */
        renderBasePrefsData: function renderBasePrefsData(data) {

            /**
             * Render form element
             * @param {{}} hash
             * @param {string} title
             * @private
             * @return {Array}
             */
            function _renderForm(hash, title) {

                /**
                 * Define dom nodes
                 * @type {Array}
                 */
                var nodes = [];

                for (var index in hash) {

                    if (hash.hasOwnProperty(index)) {

                        /**
                         * Define text
                         * @type {string}
                         */
                        var text = index.replace(title.toLowerCase(), '').toPoint().humanize();

                        /**
                         * Define node
                         */
                        var node = hash[index];

                        /**
                         * Define placeholder text
                         * @type {string}
                         */
                        var placeholder = 'Enter ' + text,
                            $element;

                        if (node.type === 'event') {

                            /**
                             * Get text field
                             * @type {*[]}
                             */
                            $element = this.renderEventLink({
                                name: index,
                                title: text.trim(),
                                group: node.group || index,
                                disabled: node.disabled,
                                events: node.events,
                                visible: node.visible
                            });
                        }

                        if (node.type === 'text') {

                            /**
                             * Get text field
                             * @type {*[]}
                             */
                            $element = this.renderTextField({
                                name: index,
                                text: text.trim(),
                                placeholder: placeholder,
                                value: node.value,
                                disabled: node.disabled,
                                visible: node.visible
                            });
                        }

                        if (node.type === 'checkbox') {

                            /**
                             * Get checkbox
                             * @type {*[]}
                             */
                            $element = this.renderCheckbox({
                                name: index,
                                text: text.trim(),
                                checked: node.value,
                                value: node.value,
                                disabled: node.disabled,
                                visible: node.visible
                            });
                        }

                        if (node.type === 'textarea') {

                            /**
                             * Get text field
                             * @type {*[]}
                             */
                            $element = this.renderTextArea({
                                name: index,
                                text: text.trim(),
                                placeholder: placeholder,
                                value: node.value,
                                disabled: node.disabled,
                                visible: node.visible
                            });
                        }

                        if (node.type === 'combobox') {

                            /**
                             * Define selected item
                             * @type {string}
                             */
                            var selected = node.value;

                            /**
                             * Get text field
                             * @type {*[]}
                             */
                            $element = this.renderCombobox(
                                node.list,
                                (selected.length === 0 ? node.list[0].value : selected),
                                text.trim(),
                                index,
                                undefined,
                                node.visible
                            );
                        }

                        nodes.push(
                            $('<li />').
                                addClass([node.type, node.visible ? '' : 'hidden'].join(' ')).
                                append($element)
                        );
                    }
                }

                return nodes;
            }

            /**
             * Render node
             * @param type
             * @param prefs
             * @param {string} title
             * @param {boolean} [isOpened]
             * @returns {*|jQuery}
             * @private
             */
            function _renderNode(type, prefs, title, isOpened) {

                /**
                 * Define css class
                 * @type {string}
                 */
                var open = isOpened ? 'open' : undefined;

                return $('<li />').append(
                    $('<fieldset />').append(
                        $('<legend />').addClass(open).text(title).
                            on('click.toggle', this.toggleFieldset.bind(this)).attr({
                                title: title
                            }),

                        $('<ul />').addClass(type).append(
                            _renderForm.bind(this)(prefs, title)
                        )
                    )
                ).addClass('auto');
            }

            /**
             * Merge prefs
             * @param defaults
             * @param prefs
             * @param {boolean} condition
             * @returns {{}}
             * @private
             */
            function _mergePrefs(defaults, prefs, condition) {

                var merge = {}, hash = {}, partition;

                $.extend(true, hash, defaults, prefs);

                for (var index in hash) {

                    if (hash.hasOwnProperty(index)) {

                        partition = condition ?
                            defaults.hasOwnProperty(index) :
                            !defaults.hasOwnProperty(index);

                        if (partition) {
                            merge[index] = hash[index];
                        }
                    }
                }

                return merge;
            }

            this.$.append(
                this.renderInteractions([
                    _renderNode.bind(this)(
                        'default',
                        _mergePrefs(this.defaultPrefs, data, true),
                        'Widget'
                    ),
                    _renderNode.bind(this)(
                        'content',
                        _mergePrefs(this.defaultPrefs, data, false),
                        this.view.scope.constructor.name,
                        true
                    )
                ])
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
                            on('click.toggle', this.toggleFieldset.bind(this)).attr({
                                title: 'Interactions'
                            }),

                        $ul.append([
                            this.renderPrefs('Column', column),
                            this.renderPrefs('Width', width),
                            this.renderPrefs('Row', row),
                            this.renderPrefs('Height', height)
                        ])
                    )
                ).addClass('auto')
            );

            return nodes;
        },

        /**
         * Render move
         * @member WidgetPreferences
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
                disabled: true,
                visible: true
            });

            return $('<li />').append($move);
        }

    }, BasePreferences.prototype);
});