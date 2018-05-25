import {compose, withHandlers} from 'recompose'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import SearchPanel from '../../components/SearchPanel'
import {changeSearch} from '../../actions'
import {selectorForSearchPanel} from '../../selectors'

export default compose(
    connect(selectorForSearchPanel, {push, changeSearch}),
    withHandlers({
        onSubmit: ({push, search}) => (e) => {e.preventDefault(); push(`/result?search=${encodeURI(search)}`)},
        onChange: ({changeSearch}) => (e) => {changeSearch(e.target.value)}
    })
)(SearchPanel)