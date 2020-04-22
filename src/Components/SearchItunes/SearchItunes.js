import React from 'react'
import { connect } from 'react-redux'
import * as itunesSearchActions from "../../redux-core/itunesSearch/actions"
import ResultsList from "../List"
import {
    TextField,
    Divider,
    Typography
} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core'

const styles = () => ({
    divContainer: {
        padding: 50,
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        height: "500px",
        border: "1px solid black"
    }
})

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
        const { results, classes } = this.props

        return(
            <div className={classes.divContainer}>
                <div style={{ display: "flex", flexDirection: "column"}}>
                    <Typography 
                        variant="h4" 
                        style={{
                            color: "silver",
                            marginBottom: 50}}
                    >
                        Search iTunes Content
                    </Typography>

                    <TextField 
                        type="text" 
                        value={searchTerm} 
                        placeholder="Search in iTunes..." 
                        onChange={e => this.handleSearchTermChange(e)} 
                        InputProps={{
                            endAdornment: <SearchIcon />
                        }}
                    />
                </div>

                <Divider />

                <ResultsList results={searchTerm.length ? results : []} />
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

const StyledComponent = withStyles(styles)(SearchItunes)

export default connect(mapStateToProps, mapDispatchToProps)(StyledComponent)