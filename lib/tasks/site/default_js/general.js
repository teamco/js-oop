(function() {

  const script = document.getElementById('require-init'),
      dataset = script.dataset || {};

  /**
   * Define public loader
   * @returns {boolean}
   * @private
   */
  function _loadPublic() {

    const site = dataset.resource,
        uuid = dataset.uuid,
        version = parseInt(dataset.current || 0, 10) || 1,
        user = dataset.user,
        mode = dataset.mode,
        activated = dataset.activated,
        environment = dataset.environment;

    /**
     * Define Setup
     * @returns Application
     * @private
     */
    function _setup() {

      if (mode !== 'consumption') {
        //loaderJs.unshift('jquery-ui');
      }

      const config = require('./javascript/config.js');
      const listeners = require('./javascript/listeners.js');
      const permissions = require('./javascript/permissions.js');

      Object.assign(config, {
        user: user,
        uuid: uuid,
        version: version,
        activate: activated === 'true',
        environment: environment,
        appName: site,
        mode: mode
      });

      /**
       * @constant Application
       * @type {Application}
       */
      const Application = require('../../scripts/core/config/application.js');

      /**
       * Define application
       * @type {Application}
       */
      new Application({config: config || {}});
    }

    _setup();
  }

  _loadPublic();

})();
