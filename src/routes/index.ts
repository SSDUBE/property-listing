import express from 'express'
const propertyListing = require('../controllers/propertyListing.controller')

const router = express.Router()

router.get('/agents/:organisationID', propertyListing.getAgents)
router.get('/properties/:agentID', propertyListing.getProperties)
router.get('/organiazational-properties/:organisationID', propertyListing.getOrganisationalProperties)

export default router