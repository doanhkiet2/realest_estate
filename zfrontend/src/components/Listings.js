import React from 'react'
import Card from './Card'

const listings = (props) => {

    const getListings = () => {
        const listingOnPage = []
        const result = []

        props.listings && props.listings.map(listing => {
            return listingOnPage.push(
                <Card listing={listing} />
            )
        })

        for (let i = 0; i < props.listings.length; i += 3) {
            result.push(
                <div className="row" key={i}>
                    <div className="col-1-of-3">
                        {listingOnPage[i] ? listingOnPage[i] : null}
                    </div>
                    <div className="col-1-of-3">
                        {listingOnPage[i + 1] ? listingOnPage[i + 1] : null}
                    </div>
                    <div className="col-1-of-3">
                        {listingOnPage[i + 2] ? listingOnPage[i + 2] : null}
                    </div>
                </div>
            )
        }

        return result
    }


    return (
        <div className='listings'>
            {getListings()}
        </div>
    )
}

export default listings