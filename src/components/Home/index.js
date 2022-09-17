import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'

class Home extends Component {
  state = {
    dataList: [],
    phase: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({phase: 'loading'})
    try {
      const response = await fetch('https://apis.ccbp.in/te/courses')
      const data = await response.json()
      const {courses} = data
      const formatData = courses.map(each => ({
        logoUrl: each.logo_url,
        name: each.name,
        id: each.id,
      }))
      if (response.ok === true) {
        this.setState({phase: 'success', dataList: formatData})
      } else {
        this.setState({phase: 'failure'})
      }
    } catch (e) {
      console.log(e)
      this.setState({phase: 'failure'})
    }
  }

  renderTechEra = () => {
    const {phase} = this.state
    switch (phase) {
      case 'success':
        return this.renderSuccess()
      case 'failure':
        return this.renderFailure()
      case 'loading':
        return this.renderLoading()
      default:
        return null
    }
  }

  renderFailure = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.getData} type="button">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {dataList} = this.state
    return (
      <div className="course">
        <h1 className="heading">Courses</h1>
        <ul className="list-course">
          {dataList.map(each => (
            <CourseItem key={each.id} item={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="render-container">{this.renderTechEra()}</div>
      </div>
    )
  }
}

export default Home
