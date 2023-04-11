const Employee = require('../dataBase/Employee')

const getEmployee = async (req, res) => {
    const { id } = req.params
    if (!id) return res.sendStatus(400)
    try {
        let employee = await Employee.findOne({_id: id}).exec()
        employee
        ? res.status(200).json(employee)
        : res.status(400).send('Employee not found, try another ID')
    } catch (error) {
        res.sendStatus(500)
    }
}

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find()
    if(!employees) return res.json({"message": "There are no employees"})
    res.status(200).json(employees)
}
    
const createNewEmployee = async (req, res) => {
    const { firstname, lastname } = req.body
    if (!firstname || !lastname) return res.sendStatus(400)

    try {
        const employee = await Employee.create({ firstname, lastname })
        res.status(201).json(employee)
    } catch (error) {
        res.sendStatus(500)
    }
}
    
const updateEmployee = async (req, res) => {
    const { id, firstname, lastname } = req.body
    if (!firstname || !lastname || !id) return res.sendStatus(400)

    try {
        const employee = await Employee.findOne({ _id: id }).exec()
        if (!employee) return res.sendStatus(204)

        employee.firstname = firstname
        employee.lastname = lastname
        await employee.save()
        res.json({"success": `Employee ${firstname} was updated succesfully`})
    } catch (error) {
        res.sendStatus(500)
    }
}
    
const deleteEmployee = async (req, res) => {
    const { id } = req.body
    if (!id) return res.sendStatus(400)

    const employee = Employee.findOne({ _id: id }).exec()
    if (!employee) return res.sendStatus(204)
    
    await Employee.deleteOne({ _id: id })
    res.json({"message": "Employee deleted succesfully"})
}
    
module.exports = {getEmployee, getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee}