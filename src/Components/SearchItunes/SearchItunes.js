import React from 'react'
import { connect } from 'react-redux'
import * as itunesSearchActions from "../../redux-core/itunesSearch/actions"
import ResultsList from "../List"
import DisplayCard from "../DIsplayCard"
import {
    TextField,
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
        searchTerm: "",
        selectedItem: null,
        audioUrl: "",
        play: false,
        pause: true,
        previewAudio: null
    }

    handleSearchTermChange = e => {

        if(e.target.value === "") {
            this.setState({
                searchTerm: ""
            })
        }

        this.setState({
            searchTerm: e.target.value
        })

        this.handleSearch(e.target.value)
    }

    handleSearch = searchTerm => {
        const { searchItunes } = this.props

        searchItunes(searchTerm)
    }

    handleItemSelection = item => {
        this.setState({
            selectedItem: item,
            audioUrl: item.previewUrl,
            play: false,
            pause: true,
        })
    }

    handlePlayButton = () => {
        const { audioUrl, previewAudio } = this.state
        const newPreviewAudio = new Audio(audioUrl)

        if(previewAudio) {
            previewAudio.pause()
            
            this.setState({
                previewAudio: null
            })
        }
        
        this.setState({
            play: true,
            pause: false,
            previewAudio: newPreviewAudio
        }, () => {
            this.playAudio()
        })
    }

    handlePauseButton = () => {
        this.setState({
            play: false,
            pause:true,
        }, () => {
            this.playAudio()
        })
    }

    playAudio = () => {
        const { play, previewAudio } = this.state

        return play ? previewAudio.play() : previewAudio.pause()
    }


    render() {
        const { searchTerm, selectedItem, play } = this.state
        const { results, classes } = this.props

        return(
            <>
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

                    <ResultsList 
                        results={searchTerm.length ? results : []} 
                        handleItemSelection={this.handleItemSelection}
                    />
                </div>

                {/* card of selectedItem */}
                {selectedItem ? (
                    <DisplayCard 
                        selectedItem={selectedItem}
                        play={play}
                        handlePlayButton={this.handlePlayButton}
                        handlePauseButton={this.handlePauseButton}
                    />
                ) : []}
            </>
            
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