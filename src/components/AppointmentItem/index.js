import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'

class AppointmentItem extends Component {
  render() {
    const {values, starredItem} = this.props
    const {title, date, id} = values

    const starredBtn = () => {
      starredItem(id)
    }
    const getStarImage = () => {
      const {isStarred} = values
      return !isStarred
        ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    }
    return (
      <li className="appointment-item-container">
        <div className="appointment-details-container">
          <p className="appointment-title">{title}</p>
          <button
            type="button"
            data-testid="star"
            className="star-btn"
            onClick={starredBtn}
          >
            <img src={getStarImage()} alt="star" className="star-img" />
          </button>
        </div>
        <p className="date">{format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
      </li>
    )
  }
}

export default AppointmentItem
