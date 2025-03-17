import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
// import { useDispatch, useSelector } from 'react-redux'
// import { useLogExpenseMutation } from '../slices/expenseApiSlice'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import SuccessMessage from '../components/SuccessMessage'
// import '../styles/LogExpense.css'

function LogExpense() {
  const token = localStorage.getItem('userInfo')
  let userId
  if (token) {
    const decodedToken = jwtDecode(token)
    userId = decodedToken.userId
    console.log(userId)
  }

  const [formData, setFormData] = useState({
    expenseId: null,
    nameOfEmployee: '',
    employeeEmploymentNumber: '',
    employeeDepartment: '',
    phoneNumber: '',
    currentDate: '',
    expenseType: '',
    expenseDescription: '',
    expenseAmount: '',
    image: '',
    imageUrl: '',
  })

  const [file, setFile] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false) // Toggle for success page
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]:
        id === 'expenseAmount'
          ? value.replace(/[^\d]/g, '') // Keep numeric value in raw state
          : value,
    }))
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]) // Store the file for submission
  }

//   const [logExpense, { isLoading, error }] = useLogExpenseMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()

    if (file) {
      data.append('file', file) // Attach the file
    }
    console.log(file)
    // Append form fields to FormData
    const expenseDto = {
      expenseId: Number(formData.expenseId),
      nameOfEmployee: formData.nameOfEmployee,
      employeeDepartment: formData.employeeDepartment,
      expenseType: formData.expenseType,
      currentDate: formData.currentDate,
      submittedBy: {
        userId: userId, // Extract userId from the token
      },
      expenseDescription: formData.expenseDescription,
      employeeEmploymentNumber: formData.employeeEmploymentNumber,
      phoneNumber: formData.phoneNumber,
      expenseAmount: Number(formData.expenseAmount),
      image: formData.image, // Optional field
      imageUrl: formData.imageUrl, // Optional field
    }

    data.append('expenseDto', JSON.stringify(expenseDto))

    const formDataObject = {}
    data.forEach((value, key) => {
      formDataObject[key] = value
    })
    console.log(formDataObject)

    // try {
    //   const res = await logExpense(data).unwrap()
    //   console.log(res)
    //   toast.success('Expense logged successfully!')
    //   setShowSuccess(true) // Show success message
    //   // Reset form fields upon successful submission
    //   setFormData({
    //     expenseId: null,
    //     nameOfEmployee: '',
    //     employeeEmploymentNumber: '',
    //     employeeDepartment: '',
    //     phoneNumber: '',
    //     currentDate: '',
    //     expenseType: '',
    //     expenseDescription: '',
    //     expenseAmount: '',
    //     image: '',
    //     imageUrl: '',
    //   })
    //   setFile(null) // Reset file input
    // } catch (err) {
    //   toast.error(err)
    // }
  }

  // Utility function for currency formatting
  const formatCurrency = (value) => {
    if (!value) return ''
    const number = value.replace(/[^\d]/g, '') // Remove non-numeric characters
    return `#${parseInt(number, 10).toLocaleString()}` // Format with commas and prefix
  }

//   if (error) {
//     console.log(`error message ${error}`)
//   }

//   if (showSuccess) {
//     return <SuccessMessage navigate={navigate} />
//   }

  return (
    <div>
      <header className='flex'>
        <p className='pageHeader'>Log Expense</p>
      </header>

      <div class='container'>
        <form className='log-expense' onSubmit={handleSubmit}>
          <div className='row'>
            <h3>Personal Details</h3>
            <div className='input-group input-group-icon'>
              <input
                type='text'
                id='nameOfEmployee'
                placeholder='Full Name'
                value={formData.nameOfEmployee}
                onChange={handleChange}
                required
              />
              <div className='input-icon'>
                <i className='fa fa-user' />
              </div>
            </div>

            <div className='input-group input-group-icon'>
              <input
                type='text'
                id='employeeEmploymentNumber'
                placeholder='Your ID'
                value={formData.employeeEmploymentNumber}
                onChange={handleChange}
                required
              />
              <div className='input-icon'>
                <i className='fa fa-envelope' />
              </div>
            </div>

            <div className='input-group input-group-icon'>
              <input
                type='text'
                id='employeeDepartment'
                placeholder='Department'
                value={formData.employeeDepartment}
                onChange={handleChange}
                required
              />
              <div className='input-icon'>
                <i className='fa fa-building' />
              </div>
            </div>

            <div className='input-group input-group-icon'>
              <input
                type='text'
                id='phoneNumber'
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <div className='input-icon'>
                <i className='fa fa-phone' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-half'>
              <h3>Current Date</h3>
              <input
                type='date'
                id='currentDate'
                value={formData.currentDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='row'>
            <h3>Upload File</h3>
            <label>Choose an image or PDF file</label>
            <div className='input-group'>
              <input
                type='file'
                // id='file'
                accept='image/*,.pdf'
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <div className='row'>
            <h3>Expense Type</h3>
            <div className='input-group'>
              <input
                type='text'
                id='expenseType'
                placeholder="e.g 'Transportation'"
                value={formData.expenseType}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='row'>
            <h3>Expense Description</h3>
            <div className='input-group'>
              <textarea
                id='expenseDescription'
                placeholder='Provide more information'
                value={formData.expenseDescription}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='row'>
            <h3>Total Amount</h3>
            <div className='input-group'>
              <input
                type='text'
                id='expenseAmount'
                placeholder=''
                value={formatCurrency(formData.expenseAmount)}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='row flex'>
            <button type='submit' className='submit-button'>
              Submit Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogExpense
