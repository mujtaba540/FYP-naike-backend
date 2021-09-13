const express = require('express');
const validate = require('express-validation');
const donation = require('../../controllers/donation.controller');
const need = require('../../controllers/need.controller');
const router = express.Router();

router
  .route('/need')
    .get(need.all_guest)  

router
  .route('/need/:id')
    .get(need.id_guest)

router
    .route('/needcount')
    .get(need.count)     

    router
    .route('/donation')
      .get(donation.all_guest)  
  
  router
    .route('/donation/:id')
      .get(donation.id_guest)
  
  router
      .route('/donationcount')
      .get(donation.count)

module.exports = router;
