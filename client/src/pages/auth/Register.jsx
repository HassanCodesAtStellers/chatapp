import React from 'react'

const Register = () => {
  return (
    <>
    <form method='POST'>
      <input type='text' name='username' placeholder='Username' required />
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Password' required />
      <button type='submit'>Register</button>
    </form>
    </>
  )
}

export default Register