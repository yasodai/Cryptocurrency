import React, { cloneElement, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '.'
import brand from '../images/cryptocurrency.png'



function Menu({ className, onClick }) {
  const [selected, setSelected] = useState('')
  const sidebarData = [
    { title: 'Home', path: '/', icon: <Icon.Home /> },
    { title: 'Cryptocurrencies', path: '/cryptocurrencies', icon: <Icon.Chart /> },
    { title: 'Exchanges', path: '/exchanges', icon: <Icon.Currency /> },
    { title: 'News', path: '/news', icon: <Icon.News /> },
  ]

  return (
    <div onClick={onClick} className={`menu ${className}`}>
      <ul>
        {sidebarData.map(item => (
          <li key={item.title} className={`${selected === item.title ? 'selected' : ''}`} >
            <Link to={item.path} onClick={() => setSelected(item.title)} className='group'>
              {cloneElement(item.icon, { className: 'icon h-5 w-5 group-hover:text-white' })}
              <h5 className='group-hover:text-blue-800'>{item.title}</h5>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


export function Navbar() {
  const [toggle, setToggle] = useState(false)
  const onClick = () => {
    setToggle(!toggle)
  }


  return (
    <div className="nav-container  ">
      <div className="mobile-nav flex justify-between">
        <div className="logo-container  ">
          <img src={brand} alt="brand" />
          <Link to='/'>Cryptoverse</Link>
        </div>
        <button onClick={onClick} className="btn m-4 p-4 lg:hidden">
          <Icon.Menu className='h-8 w-8 text-white' />
        </button>
      </div>
      <Menu onClick={onClick} className={toggle ? 'mobil-menu' : 'hidden'} />
      <Menu className='desktop-menu' />


    </div>
  )
}


