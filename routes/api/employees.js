const express = require('express')
const router = express.Router()
const { getEmployee, getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee } = require('../../controllers/employeesController')
const roles = require('../../config/roles')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(roles.admin), createNewEmployee)
    .put(verifyRoles(roles.admin, roles.editor), updateEmployee)
    .delete(verifyRoles(roles.admin), deleteEmployee)

router.route('/:id')
    .get(getEmployee)


module.exports = router