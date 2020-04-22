import React from 'react'
import { uuid } from 'uuidv4'

const List = props => {
    const { results } = props

    return (
        <ul style={{ listStyleType: "none"}}>
            {results.map(result => {
                const id = uuid()
                return <li key={id}>{result.trackName}</li>
            })}
        </ul>
    )
}

export default List