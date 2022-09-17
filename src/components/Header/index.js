import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="header">
    <Link to="/">
      <img
        className="header-image"
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
      />
    </Link>
  </nav>
)

export default Header
