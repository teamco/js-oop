/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/element',
    'element/button.element',
    'element/cover.element'
], function defineModalElement(AntHill, BaseElement, Button, Cover) {

    /**
     * Define Modal Element
     * @param view
     * @param opts
     * @returns {ModalElement}
     * @constructor
     * @class ModalElement
     * @extends AntHill
     * @extends BaseElement
     */
    var ModalElement = function ModalElement(view, opts) {

        /**
         * Set button elements
         * @member ModalElement
         * @type {$modal.$buttons}
         */
        this.$buttons = {};

        this.setup(opts);

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        }).$.addClass('modal-dialog');

        this.renderInnerContent();
        this.setCover();

        return this;
    };

    return ModalElement.extend('ModalElement', {

        /**
         * Setup modal dialog
         * @memberOf ModalElement
         * @param {{
         *      [style]: String,
         *      [cover]: Boolean,
         *      [opacityOff]: Number,
         *      [opacityOn]: Number,
         *      [title]: String,
         *      [type]: String ('info', 'success', 'warning', 'error'),
         *      [position]: String ('t(l-c-r), c(l-c-r), b(l-c-r)'),
         *      [adoptOnResize]: boolean,
         *      [html]: String,
         *      [text]: String,
         *      [draggable]: Boolean,
         *      [autoclose]: Boolean,
         *      [coverOpacity]: Number
         *      $container,
         *      [css],
         *      [items],
         *      [buttons]
         * }} opts
         */
        setup: function setup(opts) {

            /**
             * Set modal title
             * @member ModalElement
             * @type {String|*}
             */
            this.title = opts.title;

            /**
             * Set modal type ['error', 'warning', 'success', 'info']
             * @member ModalElement
             * @type {String|*}
             */
            this.type = opts.type;

            /**
             * Set modal html
             * @member ModalElement
             * @type {String|*}
             */
            this.html = opts.html;

            /**
             * Set modal text
             * @member ModalElement
             * @type {String|*}
             */
            this.text = opts.text;

            /**
             * Set modal item dependency (called from)
             * @member ModalElement
             */
            this.items = opts.items;

            /**
             * Set modal style
             * @member ModalElement
             * @type {String|*|string}
             */
            this.style = opts.style || '';

            /**
             * Set modal css
             * @member ModalElement
             * @type {$modal.css}
             */
            this.css = opts.css || {};

            /**
             * Set hover opacity
             * @member ModalElement
             * @type {*}
             */
            this.hover = this.base.defineBoolean(opts.hover, true, true);

            /**
             * Set modal opacity hover out
             * @member ModalElement
             * @type {Number|*|number}
             */
            this.opacityOff = opts.opacityOff || 0.8;

            /**
             * Set modal opacity hover in
             * @member ModalElement
             * @type {Number|*|number}
             */
            this.opacityOn = opts.opacityOn || 0.9;

            /**
             * Set modal parent container
             * @member ModalElement
             * @type {*|jQuery|HTMLElement}
             */
            this.$container = opts.$container || $('body');

            /**
             * Set modal position:
             *      ['tl' 'tc' 'tr']
             *      ['cl' 'cc' 'cr']
             *      ['bl' 'bc' 'br']
             * @member ModalElement
             * @type {$modal}
             */
            this.position = opts.position || 'cc';

            /**
             * Adopt position on resize
             * @member ModalElement
             * @type {boolean}
             */
            this.adoptOnResize = this.base.defineBoolean(opts.adoptOnResize, true, true);

            /**
             * Set modal is draggable condition
             * @member ModalElement
             * @type {*}
             */
            this.draggable = this.base.defineBoolean(opts.draggable, true, true);

            /**
             * Set close X button
             * @member ModalElement
             * @type {*}
             */
            this.closeX = this.base.defineBoolean(opts.closeX, true, true);

            /**
             * Set cover config
             * @member ModalElement
             * @type {*}
             */
            this.cover = this.base.defineBoolean(opts.cover, true, true);

            /**
             * Set close modal on click cover
             * @member ModalElement
             * @type {*}
             */
            this.autoclose = this.base.defineBoolean(opts.autoclose, false, true);

            /**
             * Set cover opacity
             * @member ModalElement
             * @type {Number|*}
             */
            this.coverOpacity = opts.coverOpacity;

            /**
             * Set buttons config
             * @member ModalElement
             * @type {*|{}}
             */
            this.buttons = opts.buttons || {};
        },

        /**
         * Render inner content
         * @member ModalElement
         */
        renderInnerContent: function renderInnerContent() {
            this.$.append(
                [
                    '<h2 class="header"></h2>',
                    '<ul class="actions"></ul>',
                    '<div class="content">',
                    '<p class="text"></p>',
                    '<div class="html"></div>',
                    '</div>',
                    '<ul class="buttons"></ul>'
                ].join('')
            ).
                addClass([this.style, this.type].join(' ')).
                css(this.css);

            this.setHeader();
            this.setHtml(this.html, this._get$HTML());
            this.setText(this.text, this._get$Text());
            this.setHover();

            this.fixContent();

            this.setPosition({
                $container: this.$container,
                $item: this.$,
                position: this.position
            });

            if (this.draggable) {
                this.$.draggable({
                    handle: this._get$Header()
                });
            }

            this.setButtons();

            this.setFocus();
        },

        /**
         * Set focus
         * @member ModalElement
         */
        setFocus: function setFocus() {

            if (this.html) {
                $('input:first', this.$).focus();
            }
        },

        /**
         * Set close X button
         * @member ModalElement
         * @returns {boolean|undefined}
         * @private
         */
        _setCloseX: function _setCloseX() {

            /**
             * Get actions
             * @type {*}
             */
            var $actions = this._get$Actions();

            if (!this.closeX) {
                $actions.hide();
                return false;
            }

            this.buttons['closeX'] = {
                $container: this._get$Actions(),
                text: 'Close',
                events: {
                    click: 'rejectModalEvent'
                }
            };
        },

        /**
         * Set buttons
         * @member ModalElement
         */
        setButtons: function setButtons() {

            var $container = this._get$Buttons();

            $.each(this.buttons, function each(i, button) {
                button.$container = $container;
            });

            this._setCloseX();

            this.view.button(Button, this.buttons, this.$buttons);
        },

        /**
         * Unset buttons
         * @member ModalElement
         */
        unsetButtons: function unsetButtons() {

            $.each(this.$buttons, function each(i, $button) {
                $button.destroy();
            });
        },

        /**
         * Set header
         * @member ModalElement
         */
        setHeader: function setHeader() {
            var $header = this._get$Header();
            this.base.isDefined(this.title) ?
                $header.text(this.title) :
                $header.hide();
        },

        /**
         * Fix content
         * @member ModalElement
         */
        fixContent: function fixContent() {

            if (!this.base.isDefined(this.html)) {
                this._get$HTML().hide();
            }

            if (!this.base.isDefined(this.text)) {
                this._get$Text().hide();
            }
        },

        /**
         * Get action buttons container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$Actions: function _get$Actions() {
            return this.$.find('ul.actions');
        },

        /**
         * Get HTML container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$HTML: function _get$HTML() {
            return this.$.find('div.html');
        },

        /**
         * Get text container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$Text: function _get$Text() {
            return this.$.find('p.text');
        },

        /**
         * Get buttons container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$Buttons: function _get$Buttons() {
            return this.$.find('ul.buttons');
        },

        /**
         * Get header container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$Header: function _get$Header() {
            return this.$.find('h2');
        },

        /**
         * Set opacity on hover
         * @member ModalElement
         */
        setHover: function setHover() {

            /**
             * Set opacity
             * @param e
             * @private
             */
            function _setOpacity(e) {

                /**
                 * Define $item
                 * @type {*}
                 */
                var $item = $(e.target),
                    opacity;

                opacity = e.type === 'mouseenter' ?
                    this.opacityOn :
                    this.opacityOff;

                $item.css('opacity', opacity);
            }

            if (this.hover) {

                this.$.hover(
                    _setOpacity.bind(this),
                    _setOpacity.bind(this)
                );

                this.$.css(
                    'opacity',
                    this.opacityOn
                );
            }
        },

        /**
         * Unset hover
         * @member ModalElement
         */
        unsetHover: function unsetHover() {
            this.$.unbind('mouseenter mouseleave').
                css('opacity', 1);
        },

        /**
         * Set cover
         * @member ModalElement
         */
        setCover: function setCover() {
            if (this.cover) {
                this.$cover = this.view.cover(Cover, {
                    $container: this.$container,
                    opacity: this.coverOpacity,
                    style: 'cover-' + this.style,
                    events: this.autoclose ? { click: 'rejectModalEvent' } : {}
                });
            }
        },

        /**
         * Unset cover
         * @member ModalElement
         */
        unsetCover: function unsetCover() {
            if (this.$cover) {
                this.$cover.destroy();
            }
        },

        /**
         * Self destroy functionality
         * @member ModalElement
         */
        selfDestroy: function selfDestroy() {
            this.unsetButtons();
            this.unsetCover();
            this.destroy();
        }

    }, AntHill.prototype, BaseElement.prototype);
});