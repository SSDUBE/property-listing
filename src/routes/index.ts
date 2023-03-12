import express from 'express'
const propertyListing = require('../controllers/propertyListing.controller')

const router = express.Router()

router.get('/agents/:organisationID', propertyListing.getAgents)

export default router