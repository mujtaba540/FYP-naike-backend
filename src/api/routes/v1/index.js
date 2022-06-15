const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const privilegeRoutes=require('./privilege.route')
const roleRoutes=require('./role.route')
const needRoutes=require('./need.route')
const donationRoutes=require('./donation.route')
const guestRoutes=require('./guest.route')
const categoryRoutes=require('./category.route')
const subcategoryRoutes=require('./subcategory.route')
const Category=require('../../models/etherium/category.ethmodel')

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));
router.get('/deploy', (req, res) => {
    Category.deploy(function (err, success) {
        if (!err) {
            res.send("Contract deployed successfully!")
        } else {
            res.send("Contract deployment error" + err)
        }
    })
})

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/privilege',privilegeRoutes)
router.use('/role',roleRoutes)
router.use('/need',needRoutes)
router.use('/donation',donationRoutes)
router.use('/guest',guestRoutes)
router.use('/category',categoryRoutes)
router.use('/subcategory',subcategoryRoutes)


module.exports = router;
