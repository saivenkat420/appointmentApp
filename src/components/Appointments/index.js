import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    fullAppointmentList: [],
    appointmentList: [],
    title: '',
    date: '',
    isStarredButtonSelected: false,
  }

  addAppointment = async () => {
    const {title, date} = this.state
    await this.setState(prevState => ({
      fullAppointmentList: [
        ...prevState.fullAppointmentList,
        {title, date, isStarred: false, id: v4()},
      ],
    }))
    const {fullAppointmentList} = this.state
    this.setState({appointmentList: [...fullAppointmentList]})
    this.setState({title: ''})
    this.setState({date: ''})
  }

  showStarredItems = async () => {
    await this.setState(prevState => ({
      isStarredButtonSelected: !prevState.isStarredButtonSelected,
    }))
    const {isStarredButtonSelected} = this.state
    if (isStarredButtonSelected) {
      this.setState(prevState => ({
        appointmentList: prevState.fullAppointmentList.filter(
          eachItem => eachItem.isStarred,
        ),
      }))
    } else {
      this.setState(prevState => ({
        appointmentList: prevState.fullAppointmentList,
      }))
    }
  }

  starredItem = async id => {
    await this.setState(prevState => ({
      fullAppointmentList: prevState.fullAppointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
    const {fullAppointmentList} = this.state
    this.setState({appointmentList: fullAppointmentList})
  }

  submitForm = event => event.preventDefault()

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date, appointmentList, isStarredButtonSelected} = this.state
    const getStarBtnClassName = isStarredButtonSelected
      ? 'starred-btn'
      : 'unstarred-btn'
    return (
      <div className="container">
        <div className="main-container-1">
          <div className="main-container-2">
            <div className="sub-container">
              <form className="content-container">
                <h1 className="content-container-head">Add Appointment</h1>
                <div className="sub-content-container">
                  <label className="input-specifier" htmlFor="#title">
                    Title
                  </label>
                  <input
                    id="#title"
                    placeholder="Title"
                    type="text"
                    value={title}
                    className="input"
                    onChange={this.updateTitle}
                  />
                  <label htmlFor="#date" className="input-specifier">
                    Date
                  </label>
                  <input
                    id="#date"
                    value={date}
                    type="date"
                    onChange={this.updateDate}
                    className="input"
                  />
                  <button
                    type="button"
                    onClick={this.addAppointment}
                    className="appointment-add-button"
                  >
                    Add
                  </button>
                </div>
              </form>
              <div className="appointment-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="appointments-img"
                />
              </div>
            </div>
            <div className="list-function-container">
              <h1 className="list-container-head">Appointments</h1>
              <button
                type="button"
                className={`star-filter-btn ${getStarBtnClassName}`}
                onClick={this.showStarredItems}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-container">
              {appointmentList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  values={eachItem}
                  starredItem={this.starredItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
