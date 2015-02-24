/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/24/15
 * Time: 7:31 PM
 */

/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineFilterRenderer() {

    /**
     * Define FilterRenderer
     * @class FilterRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var FilterRenderer = function FilterRenderer() {

    };

    return FilterRenderer.extend('FilterRenderer', {

        /**
         * Render iframe
         * @member FilterRenderer
         * @param {{
         *      text: string,
         *      name: string,
         *      placeholder: string,
         *      visible: boolean,
         *      callback: function,
         *      [items]
         * }} opts
         * @returns {*|jQuery}
         */
        renderFilter: function renderFilter(opts) {

            // Get scope
            var scope = this.view.scope;

            // Define items setter
            this.items = opts.items;

            /**
             * Define $search
             * @type {TextFieldRenderer}
             */
            var $search = this.renderTextField({
                text: opts.text,
                name: opts.name,
                placeholder: opts.placeholder,
                monitor: {
                    events: [
                        'keyup.' +
                        scope.name.toLowerCase() +
                        '-search'
                    ],
                    callback: this.filterResults.bind({
                        callback: opts.callback,
                        $element: this
                    })
                },
                visible: opts.visible
            });

            scope.logger.debug('Search field params', opts);

            return $search;
        },

        /**
         * Update items
         * @member FilterRenderer
         * @param items
         */
        updateData: function updateData(items) {
            this.items = items;
        },

        /**
         * Filter search results
         * @member FilterRenderer
         * @param e
         */
        filterResults: function filterResults(e) {

            e.preventDefault();

            if (e.which === 13) {
                return false;
            }

            if (e.which === 27) {
                e.target.value = '';
            }

            /**
             * Get item elements
             * @type {{}}
             */
            var items = this.$element.items,
                index, $item,
                value = e.target.value,
                regex;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    // Define item
                    $item = items[index];

                    if (value.length === 0) {

                        $item.removeStyle();

                    } else {

                        /**
                         * Define regex
                         * @type {RegExp}
                         */
                        regex = new RegExp(value, 'ig');

                        ($item.data.name.match(regex) || $item.data.type.match(regex)) ?
                            $item.removeStyle() :
                            $item.hide();
                    }
                }
            }

            if (typeof(this.callback) === 'function') {

                // Execute callback
                this.callback();
            }
        }
    });
});