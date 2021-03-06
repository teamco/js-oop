require.context('../images/', true, /\.(gif|jpg|png|svg)$/i);

import Turbolinks from 'turbolinks';
import * as ActiveStorage from '@rails/activestorage/src';

import './scss/development.scss';
import './scss/application.scss';
import './combined';

import 'bootstrap';

import 'perfect-scrollbar/dist/perfect-scrollbar.min';
import '@fortawesome/fontawesome-free/js/all.min';

import 'jquery.initialize';

require('../channels');

global['$'] = window.jQuery;

document.addEventListener('DOMContentLoaded', () => {
  Turbolinks.start();
  ActiveStorage.start();
});

// Needed for Hot Module Replacement
if (module.hot) {
  // eslint-disable-line no-undef
  module.hot.accept();
}