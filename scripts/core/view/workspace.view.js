/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/workspace/wrapper',
    'element/workspace/header',
    'element/workspace/footer',
    'element/workspace/page.container'
], function defineWorkspaceView(BaseView, Wrapper, Header, Footer, PageContainer){

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        wrapper: function wrapper() {
            this.elements.$wrapper = new Wrapper(this, {
                id: this.scope.config.uuid + '-wrapper',
                style: 'wrapper',
                $container: this.scope.config.html.containerSelector
            });
            this.header();
            this.pageContainer();
            this.footer();
        },
        header: function header() {
            this.elements.$header = new Header(this, {
                style: 'header',
                $container: this.elements.$wrapper.$
            });
        },
        footer: function footer() {
            this.elements.$footer = new Footer(this, {
                style: 'footer',
                $container: this.elements.$wrapper.$
            });
        },
        pageContainer: function pageContainer() {
            this.elements.$pageContainer = new PageContainer(this, {
                style: 'page-container',
                $container: this.elements.$wrapper.$
            });
        },
        render: function render() {
            this.wrapper();
        }
    }, BaseView.prototype)

});