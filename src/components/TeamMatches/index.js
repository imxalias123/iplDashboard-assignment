// Write your code here
// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(each =>
        this.getFormattedData(each),
      ),
    }
    this.setState({teamMatchesData: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData

    return (
      <div className="team-details-container">
        <img src={teamBannerUrl} alt="team banner" className="banner-img" />
        <LatestMatch latestMatchData={latestMatchDetails} />
        <ul className="match-card-flex">
          {recentMatches.map(recentMatch => (
            <MatchCard key={recentMatch.id} recentMatch={recentMatch} />
          ))}
        </ul>
      </div>
    )
  }

  getClassNames = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches${this.getClassNames()}`
    return (
      <div className={className}>
        {isLoading ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
