/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineLoginElement(BaseElement) {

    /**
     * Define Login Element
     * @param view
     * @param opts
     * @returns {LoginElement}
     * @constructor
     * @class LoginElement
     * @extends BaseElement
     */
    var LoginElement = function LoginElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('login', {
            resource: '/widgets'
        });

        return this;
    };

    return LoginElement.extend('LoginElement', {

        /**
         * Render Embedded content
         * @member LoginElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            /**
             * Define login element
             * @type {LoginElement}
             */
            var $element = this;

            /**
             * Get page
             * @type {Page}
             */
            var page = $element.view.controller.getPage();

            $element.view.controller.clearParentThumbnail();

            $element.$.append(
                $('<div />').addClass('con-status-container').
                    append([
                        $('<div />').addClass('user-name-container').html(
                            'Welcome: <span>Spike</span>'
                        ),
                        $('<a />').addClass('logout-button').attr({
                            title: 'Logout'
                        })
                    ])
            );

            /**
             * Define buttons container
             * @type {*|jQuery|HTMLElement}
             */
            var $ul = $('<ul />');

            require([
                'http://connect.facebook.net/en_US/all.js'
            ], function loadFacebookApi() {

                require([
                    'plugins/widgets/login/lib/social.api'
                ], function loadSocialApi() {

                    $element.view.modalDialog({
                        style: 'social-login',
                        $container: page.view.get$item().$,
                        type: 'info',
                        title: 'Login to your account',
                        html: $ul.append([
                            $element.getSocialButton('fb', doLogin),
                            $element.getSocialButton('gg', login)
                        ]),
                        cover: true,
                        buttons: {
                            reject: {
                                text: 'Cancel',
                                events: {
                                    click: 'rejectModalEvent'
                                }
                            }
                        }
                    });
                });
            });
        },

        /**
         * Get social button
         * @param style
         * @param callback
         * @returns {*|jQuery}
         */
        getSocialButton: function getSocialButton(style, callback) {

            return $('<li />').on('click.login', function clickLogin(e) {

                e.preventDefault();

                if (typeof(callback) === 'function') {

                    callback();
                }
            }).addClass(style + '-login');
        }

    }, BaseElement.prototype);

});