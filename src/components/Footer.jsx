import React from 'react'
import { Link } from 'react-router-dom';


export function Footer() {
  return (
    <div className='text-center py-5 font-semibold'>
      <p>Copyright © 2021 Cryptoverse Inc.</p>
      <p>All Rights Reserved.</p>
      <div className="text-sm space-x-3 text-blue-500 mt-3">
        <Link to='/'>Home</Link>
        <Link to='/exchanges'>Exchanges</Link>
        <Link to='/news'>News</Link>
      </div>
    </div>
  )
}


