/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/19/12
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */

define([
], function defineLog() {

    /**
     * Define Logger
     * @class Logger
     * @constructor Logger
     */
    var Logger = function Logger() {
    };

    return Logger.extend({

        /**
         * Show Log
         * @returns {boolean}
         */
        showLog: function showLog() {
            return this.config.show;
        },

        /**
         * Check if log available
         * @return {Boolean}
         */
        isLoggable: function isLoggable() {
            return anthill._base.isDefined(console) &&
                (this.scope.controller.isDevelopmentMode() && this.showLog());
        },

        /**
         * Puts (internal function)
         * @param {string} type
         * @returns {boolean}
         */
        puts: function puts(type) {
            var console = window.console,
                content = [],
                hash = {},
                base = anthill._base,
                config = this.config,
                scope = this.scope,
                log = this.isLoggable();
            if (log && config.type[type]) {
                try {
                    if (!!config.namespaces) {
                        var instance = scope.constructor.name;
                        if (base.isDefined(instance)) {
                            config.namespaces = base.define(
                                config.namespaces,
                                [config.namespaces],
                                true
                            );
                            if ($.inArray(instance, config.namespaces) === -1) {
                                return false;
                            }
                        }
                    }
                    var args = [], i = 1;
                    for (i; i < arguments.length; i += 1) {
                        args.push(arguments[i]);
                    }

                    if (base.isDefined(console[type])) {
                        hash[type] = args;
                        content.push(hash);
                    } else {
                        content.push({log: args});
                    }
                    if (type === 'error' && base.isDefined(console.trace)) {
                        content.push({trace: args});
                    }
                } catch (e) {
                    if (base.isDefined(console.error)) {
                        content.push({
                            error: [e, arguments]
                        });
                    }
                }
            }

            i = 0;
            var l = content.length;

            if (l === 0) {
                return false;
            }

            console.groupCollapsed(scope);
            for (i; i < l; i += 1) {
                hash = content[i];
                var k = base.lib.hash.firstHashKey(hash);
                hash[k]['caller'] = this.puts.caller;
                hash[k]['line'] = this.stackIt((new Error).stack.split("\n"));
                console[k](hash[k]);
            }
            console.info('timestamp', base.lib.datetime.timestamp());
            console.groupEnd();

            return true;
        },

        /**
         * Stack trace parser
         * @param {Array} stacks
         * @returns {Array}
         */
        stackIt: function stackIt(stacks) {
            var log = [];
            for (var i = 1, l = stacks.length; i < l; i++) {
                log.push(stacks[i].replace(/^\s+|\s+$/g, '').match(/at (\w+.+)\/?/)[1]);
            }

            return log;
        },

        /**
         * Timer
         * @param {string} name
         * @param {boolean} start
         */
        timer: function timer(name, start) {

            var console = window.console,
                base = anthill._base,
                config = this.config,
                log = this.isLoggable();

            start = base.defineBoolean(start, false, true);

            if (log && config.type.debug) {
                start ?
                    console.time(name) :
                    console.timeEnd(name);
            }
        },

        /**
         * Define available logs
         */
        defineLogs: function defineLogs() {
            var base = anthill._base,
                availableLogs = base.lib.hash.hashKeys(
                    this.config.type
                ),
                length = availableLogs.length,
                i = 0;

            for (i; i < length; i += 1) {
                var log = availableLogs[i];
                if (base.isDefined(log)) {
                    this[log] = this.puts.bind(this, log);
                }
            }
        }

    });
});