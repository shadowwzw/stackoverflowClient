import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {push} from 'react-router-redux'
import {parseSearch} from '../../utils'
import {selectorForModalOfDescription} from '../../selectors'
import {fetchFullQuestion, fetchAnswersByQuestionId} from '../../actions'
import ModalOfDescription from '../../components/ModalOfDescription'

const mapDispatchToProps = {
    fetchAnswersByQuestionId,
    fetchFullQuestion,
    push
}

export default compose(
    connect(selectorForModalOfDescription, mapDispatchToProps),
    withHandlers({
        onHide: ({push, search}) => () => {
            push(`/result?search=${encodeURI(search)}`)
        }
    }),
    lifecycle({
        componentDidMount() {
            const {fetchFullQuestion,fetchAnswersByQuestionId, location, useFixtures} = this.props
            const question_id = parseSearch(location.search).question_id
            fetchFullQuestion(question_id, useFixtures)
            fetchAnswersByQuestionId(question_id, useFixtures)
        }
    })
)(ModalOfDescription)