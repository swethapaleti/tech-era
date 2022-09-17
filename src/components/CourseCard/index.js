import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

class CourseCard extends Component {
  state = {
    course: {},
    phase: '',
  }

  componentDidMount() {
    this.getCourse()
  }

  getCourse = async () => {
    this.setState({phase: 'loading'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    try {
      const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
      const data = await response.json()
      const formatData = data.course_details
      const courseItem = {
        id: formatData.id,
        name: formatData.name,
        description: formatData.description,
        imageUrl: formatData.image_url,
      }
      if (response.ok === true) {
        this.setState({course: courseItem, phase: 'success'})
      } else {
        this.setState({phase: 'failure'})
      }
    } catch (e) {
      console.log(e)
      this.setState({phase: 'failure'})
    }
  }

  renderCourseItem = () => {
    const {phase} = this.state
    switch (phase) {
      case 'success':
        return this.courseSuccess()
      case 'failure':
        return this.courseFailure()
      case 'loading':
        return this.courseLoading()
      default:
        return null
    }
  }

  courseSuccess = () => {
    const {course} = this.state
    const {name, description, imageUrl} = course
    return (
      <div className="course-card">
        <img className="course-img" alt={name} src={imageUrl} />
        <div className="text-container">
          <h1>{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  courseLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  courseFailure = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.getCourse} type="button">
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <div>
        <Header />
        <div className="course-item-container">{this.renderCourseItem()}</div>
      </div>
    )
  }
}

export default CourseCard
