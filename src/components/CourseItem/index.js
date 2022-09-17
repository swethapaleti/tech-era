import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {item} = props
  const {id, name, logoUrl} = item
  return (
    <Link className="link" to={`/courses/${id}`}>
      <li className="list">
        <div className="course-item">
          <img className="img" alt={name} src={logoUrl} />
          <p className="text">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default CourseItem
