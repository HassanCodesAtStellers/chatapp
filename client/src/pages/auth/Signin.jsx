import React from 'react'

const Signin = () => {
  return (
    <>
    <form method='POST'>
      <input type="email" name='email' placeholder='Email' required/>
      <input type="password" name='password' placeholder='Password' required/>
      <button type='submit'>Signin</button>
    </form>
    </>
  )
}

export default Signin