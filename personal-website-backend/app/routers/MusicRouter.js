import express from 'express'

import { createMusic, fetchMusics, fetchMusic, deletedMusic, updatedMusic } from "../controllers/MusicController.js"
import { authenticateToken } from '../middlewares/Authenticate.js'
import { authenticateRole } from '../middlewares/CustomerAuth.js'
import { ROLE } from '../../config/roles.js'
import { verifyRoles } from '../middlewares/VerifyRoles.js'

export const router = express.Router()

const verify = [authenticateRole, verifyRoles(ROLE.BETA_TESTER, ROLE.CUSTOMER)]
const verify1 = [authenticateRole, verifyRoles(ROLE.BETA_TESTER)]


router.post('/store', createMusic)

router.get('/songs', verify, fetchMusics)

router.get('/song/:id', verify, fetchMusic)

router.delete('/remove/:id', deletedMusic)

router.patch('/update/:id', updatedMusic)