import React, { useState, useEffect } from 'react'
import colab from './colab.png'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sesi-new.onrender.com/api/scholarship-application'
    : 'http://localhost:8080/api/scholarship-application'

const questions = [
  {
    question:
      'Q1: Hon. Sesi Whingan is a member in which chamber of the Nigerian National Assembly?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    answer: 2,
  },
  {
    question:
      'Q2: A car travels 60 miles per hour. How far will it travel in 3.5 hours?',
    options: ['150 miles', '210 miles', '180 miles', '240 miles'],
    answer: 1,
  },
  {
    question:
      'Q3: A shirt originally costs ₦40 and is on sale for 25% off. What is the sale price of the shirt?',
    options: ['₦28', '₦30', '₦35', '₦20'],
    answer: 1,
  },

  {
    question: 'Q4: Badagry is an LGA in which region in Nigeria?',
    options: ['South', 'South-West', 'South-East', 'South-South'],
    answer: 1,
  },
  {
    question:
      'Q5: If you invest ₦1,000 at an annual interest rate of 5%, how much interest will you earn after 3 years',
    options: ['₦100', '₦200', '₦150', '₦500'],
    answer: 2,
  },
]

const Scholarship = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    occupation: '',
    localGovernment: '',
    preferredProgram: '',
    hasLaptop: '',
  })
  const [errors, setErrors] = useState({})
  const [submitMessage, setSubmitMessage] = useState('')
  const [quizAnswers, setQuizAnswers] = useState(
    Array(questions.length).fill(null)
  )
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(500)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isAttested, setIsAttested] = useState(false)
  const [attestationError, setAttestationError] = useState('')

  useEffect(() => {
    let timer
    if (timeRemaining > 0 && !quizCompleted) {
      timer = setInterval(() => setTimeRemaining((prev) => prev - 1), 520)
    } else if (timeRemaining === 0) {
      handleQuizSubmit()
    }
    return () => clearInterval(timer)
  }, [timeRemaining, quizCompleted])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleQuizChange = (index, answer) => {
    const updatedAnswers = [...quizAnswers]
    updatedAnswers[index] = answer
    setQuizAnswers(updatedAnswers)
  }

  const handleAttestationChange = (e) => {
    setIsAttested(e.target.checked)
    if (attestationError) setAttestationError('')
  }

  const validateForm = () => {
    let tempErrors = {}
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        tempErrors[key] = 'This field is required'
      }
    })

    if (!isAttested) {
      setAttestationError('You must attest to the accuracy of the information.')
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid'
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0 && isAttested
  }

  const handleQuizSubmit = async () => {
    setIsProcessing(true)
    const calculatedScore = quizAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].answer ? acc + 1 : acc
    }, 0)

    setScore(calculatedScore)
    setQuizCompleted(true)

    const applicationData = {
      ...formData,
      quizAnswers,
      score: calculatedScore,
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      })

      if (response.ok) {
        const data = await response.json()
        setSubmitMessage(
          'Your application and quiz results have been successfully submitted! Please check your email for confirmation.'
        )
        resetForm()
      } else if (response.status === 409) {
        const errorData = await response.json()
        setSubmitMessage(
          'Submission failed: An application from this email already exists. You can only make one submission. Thank you!'
        )
      } else {
        const errorData = await response.json()
        let errorMessage = errorData?.error || 'Something went wrong'
        setSubmitMessage(errorMessage)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setSubmitMessage(`An error occurred: ${error.message}`)
    } finally {
      setIsProcessing(false)
      setIsOpen(true)
    }
  }


  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      occupation: '',
      localGovernment: '',
      preferredProgram: '',
      hasLaptop: '',
    })
    setQuizAnswers(Array(questions.length).fill(null))
    setScore(0)
    setTimeRemaining(300)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsOpen(true) 
    }
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <div className="flex flex-col pt-[100px] md:pt-[140px] font-cabinetGrotesk mb-[50px] text-custom-green items-center">
        <h1 className="font-neuemachina text-custom-orange md:text-4xl mb-8 text-3xl">
          1000 Tech Training Program
        </h1>
        <img
          className="mb-8 shadow-2xl rounded-[40px]"
          width={300}
          src={colab}
          alt="Collaboration"
        />
        <p className="text-xl mx-8 text-justify md:text-center md:w-1/3">
          Hon. Sesi Whingan in Partnership with Codeverse Africa brings to you{' '}
          <span className="text-custom-orange font-bold">
            1000 Tech Training Program
          </span>{' '}
          aimed at equipping the youths of Badagry with technological skills for
          global and national relevance.
        </p>

        <h1 className="font-neuemachina text-custom-orange md:text-2xl mt-12 text-xl">
          To apply, fill the form below
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs md:max-w-md lg:w-[500px]"
        >
          {['firstName', 'lastName', 'email', 'dateOfBirth', 'occupation'].map(
            (field) => (
              <div key={field} className="mt-2">
                <label className="form-control text-xl w-full">
                  <div className="label">
                    <span className="label-text text-lg text-custom-green">
                      {field === 'lastName'
                        ? 'Surname'
                        : field.charAt(0).toUpperCase() +
                          field.slice(1).replace(/([A-Z])/g, ' $1')}
                      :
                    </span>
                  </div>
                  <input
                    type={
                      field === 'email'
                        ? 'email'
                        : field === 'dateOfBirth'
                        ? 'date'
                        : 'text'
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={field === 'dateOfBirth' ? '' : 'Type here'}
                    className="input input-md input-bordered w-full"
                    required
                  />
                </label>
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            )
          )}

          {['localGovernment', 'preferredProgram', 'hasLaptop'].map((field) => (
            <div key={field} className="mt-2">
              <label className="form-control text-xl w-full">
                <div className="label">
                  <span className="label-text text-lg text-custom-green">
                    {field === 'localGovernment'
                      ? 'Local Government Area'
                      : field === 'preferredProgram'
                      ? 'Preferred Program'
                      : 'Do you have a Laptop'}
                    :
                  </span>
                </div>
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Pick one
                  </option>
                  {field === 'localGovernment' && (
                    <>
                      <option>Badagry Local Government (Central)</option>
                      <option>Badagry West LCDA</option>
                      <option>Olorunda LCDA</option>
                    </>
                  )}
                  {field === 'preferredProgram' && (
                    <>
                      <option>Web Development</option>
                      <option>Data Analytics</option>
                      <option>Product Design</option>
                    </>
                  )}
                  {field === 'hasLaptop' && (
                    <>
                      <option>I have a personal laptop</option>
                      <option>I have access to a laptop</option>
                      <option>I do not have a laptop</option>
                    </>
                  )}
                </select>
              </label>
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="mt-4 text-left">
            <label className="flex items-left ">
              <input
                type="checkbox"
                checked={isAttested}
                onChange={handleAttestationChange}
                className="checkbox checkbox-primary mr-2"
              />
              <span>
                I attest that the information provided are true and I will be
                physically available for training.
              </span>
            </label>
            {attestationError && (
              <p className="text-red-500 text-sm mt-1">{attestationError}</p>
            )}
          </div>

          <button type="submit" className="btn btn-custom-orange mt-4">
            Submit Application
          </button>
        </form>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-custom-green rounded-lg p-8 max-w-md w-4/5 max-h-screen overflow-y-auto">
            <h2 className="text-2xl text-custom-white font-bold mb-4">
              Quiz Time!
            </h2>
            {quizCompleted ? (
              <div>
                <h3 className="text-xl text-custom-orange font-bold mb-2">
                  Your Score: {score}/{questions.length}, wait a minute to confirm your application status...
                </h3>
                <p className="mb-4 text-custom-white">{submitMessage}</p>
                <button
                  onClick={closeModal}
                  className="btn btn-primary  bg-custom-orange text-custom-green w-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg text-custom-orange font-neuemachina mb-4">
                  Time Remaining: {Math.floor(timeRemaining / 60)}:
                  {(timeRemaining % 60).toString().padStart(2, '0')}
                </h3>
                {questions.map((q, index) => (
                  <div key={index} className="mb-4 text-custom-white text-left">
                    <p className="font-semibold mb-2">{q.question}</p>
                    <div className="flex flex-row flex-wrap">
                      {q.options.map((option, i) => (
                        <label
                          key={i}
                          className="flex items-center font-cabinetGrotesk text-custom-orange mb-2 mr-4"
                        >
                          <input
                            type="radio"
                            name={`question${index}`}
                            value={i}
                            onChange={() => handleQuizChange(index, i)}
                            checked={quizAnswers[index] === i}
                            className="mr-2 accent-custom-orange"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleQuizSubmit}
                  className="btn btn-primary bg-custom-orange text-custom-green w-full mt-4"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Submit Quiz'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Scholarship
