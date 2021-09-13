const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const empRoutes=require('./emp.route')
const privilegeRoutes=require('./privilege.route')
const roleRoutes=require('./role.route')
const appointmentRoutes=require('./appointment.route')
const salaryRoutes=require('./salaray.route')
const ranksRoutes=require('./ranks.route')
const needRoutes=require('./need.route')
const donationRoutes=require('./donation.route')

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/employee', empRoutes);
router.use('/privilege',privilegeRoutes)
router.use('/role',roleRoutes)
router.use('/appointment',appointmentRoutes)
router.use('/ranks',ranksRoutes)
router.use('/salary',salaryRoutes)
router.use('/need',needRoutes)
router.use('/donation',donationRoutes)


module.exports = router;
