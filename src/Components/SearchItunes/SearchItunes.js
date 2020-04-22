import React from 'react'
import { connect } from 'react-redux'
import * as itunesSearchActions from "../../redux-core/itunesSearch/actions"
import List from "../List"
import BeforeAfterWrapper from 'material-ui/internal/BeforeAfterWrapper'

class SearchItunes extends React.Component {
    state={
        searchTerm: ""
    }

    handleSearchTermChange = e => {
        this.setState({
            searchTerm: e.target.value
        })

        this.handleSearch(e.target.value)
    }

    handleSearch = searchTerm => {
        const { searchItunes } = this.props

        searchItunes(searchTerm)
    }

    render() {
        const { searchTerm } = this.state
        const { results } = this.props

        return(
            <div>
                <input 
                    type="text" value={searchTerm} 
                    placeholder="Search in iTunes..." 
                    onChange={e => this.handleSearchTermChange(e)} 
                />

                {searchTerm.length ? <List results={results} /> : []}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.itunesSearch.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchItunes: searchTerm => dispatch({ 
            type: itunesSearchActions.SEARCH_ITUNES,
            searchTerm
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchItunes)