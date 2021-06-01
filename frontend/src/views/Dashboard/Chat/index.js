import { Component } from 'react'
import ChatArea from './ChatArea'
import Navigation from './Navigation'
import { getMyConversations } from '../../../reducers/actions/conversationActions'
import { connect } from 'react-redux'
// const sortConvs = () => -1

class Chat extends Component {
  componentDidMount() {
    this.props.getMyConversations()
  }

  render() {
    return (
      <>
        <Navigation handleStatus={this.props.handleStatus} />
        <ChatArea />
      </>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getMyConversations })(Chat)
