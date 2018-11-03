import './images';
import './stylesheets/application.scss';

import 'jquery-ujs/src/rails';
import 'bootstrap';
import html2canvas from 'html2canvas';
import 'perfect-scrollbar/dist/perfect-scrollbar.min';
import '@coreui/coreui/dist/js/coreui.min';
import '@coreui/coreui-plugin-chartjs-custom-tooltips/dist/js/custom-tooltips.min';

// If you want to reduce size for performance. You can only load what icons you want.
// import fontawesome from '@fortawesome/fontawesome';
// import {faCoffee, faCameraRetro} from '@fortawesome/fontawesome-free-solid';
// fontawesome.library.add(faCoffee, faCameraRetro)
import '@fortawesome/fontawesome-free/js/all.min';

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    $('a[href="#"]').on('click', e => e.preventDefault());
  });
})();