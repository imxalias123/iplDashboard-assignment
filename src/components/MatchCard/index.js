// Write your code here
// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatch} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = recentMatch

  const getMatchStatusClassName = status =>
    status === 'Won' ? 'match-won' : 'match-loss'

  const matchStatusClassName = `match-status ${getMatchStatusClassName(
    matchStatus,
  )}`

  return (
    <li>
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />

      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
