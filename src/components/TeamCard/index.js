// Write your code here
// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamImageUrl} = eachTeam

  return (
    <li className="cards-list">
      <Link to={`/team-matches/${id}`} className="link">
        <img src={teamImageUrl} alt={name} className="team-img" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
