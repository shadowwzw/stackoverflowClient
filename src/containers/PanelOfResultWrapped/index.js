import {connect} from 'react-redux'
import get from 'lodash/get'
import {compose, lifecycle, branch,renderComponent, withProps} from 'recompose'
import {push} from 'react-router-redux'
import {parseSearch} from '../../utils'
import {
    fetchQuestionsByIntitle,
    fetchBestQuestionsByAuthor,
    quickViewTableEnable,
    fetchBestQuestionsByTag,
    setQuickViewTableType,
    changeSearch
} from '../../actions'
import ResultSpinner from '../../components/ResultSpinner'
import {selectorForPanelOfResult} from '../../selectors'
import {BEST_QUESTIONS_BY_AUTHOR_TYPE, BEST_QUESTIONS_BY_TAGS_TYPE} from '../../constants'
import PanelOfResult from '../../components/PanelOfResult'

const mapDispatchToProps = {
    fetchQuestionsByIntitle,
    fetchBestQuestionsByAuthor,
    quickViewTableEnable,
    fetchBestQuestionsByTag,
    setQuickViewTableType,
    changeSearch,
    push
}

export default compose(
    connect(selectorForPanelOfResult, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const {fetchQuestionsByIntitle, search, useFixtures, location, changeSearch} = this.props
            const {search: searchFromLocation} = parseSearch(location.search)
            const decodedSearchFromLocation = decodeURI(searchFromLocation)
            if (search === '') changeSearch(decodedSearchFromLocation)
            fetchQuestionsByIntitle(decodedSearchFromLocation, useFixtures)
        },
    }),
    branch(
        ({questionsIsLoading}) => questionsIsLoading,
        renderComponent(ResultSpinner)
    ),
    withProps(
        ({
             fetchBestQuestionsByAuthor,
             quickViewTableEnable,
             fetchBestQuestionsByTag,
             setQuickViewTableType,
             useFixtures,
             search,
             push
        }) => ({
            onClickOnGoToSearch: () => push(`/`),
            getTdProps: (state, rowInfo, column) => {
                return {
                    onClick: (e, handleOriginal) => {
                        if (handleOriginal) {
                            handleOriginal()
                        }
                        switch (column.Header) {
                            case 'Author':
                                const user_id = get(rowInfo, 'original.user_id', 0)
                                if (user_id) {
                                    fetchBestQuestionsByAuthor(user_id, useFixtures)
                                    setQuickViewTableType(BEST_QUESTIONS_BY_AUTHOR_TYPE)
                                    quickViewTableEnable()
                                }
                                break
                            case 'Subject':
                            case 'Answers':
                                const question_id = get(rowInfo, 'original.question_id', 0)
                                if (question_id) {
                                    push(`/result/description?search=${encodeURI(search)}&question_id=${question_id}`)
                                }
                                break
                            case 'Tags':
                                const tags = get(rowInfo, 'original.tags', '')
                                if (tags) {
                                    fetchBestQuestionsByTag(tags, useFixtures)
                                    setQuickViewTableType(BEST_QUESTIONS_BY_TAGS_TYPE)
                                    quickViewTableEnable()
                                }
                                break
                            default: break
                        }
                    }
                }
            }
        })
    )
)(PanelOfResult)