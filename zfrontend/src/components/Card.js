import React from 'react'
import { Link } from 'react-router-dom'

const card = (props) => {
    // need to know : why photo not include host
    return (
        <div className='card'>
            <div className="card__paddingcss">
                <h3 className="card__title">{props.listing.title}</h3>
                <div className="card__header">
                    <img src={props.listing.photo_main} alt="home" className="card__header__photo" />
                </div>
                <p className="card__location">
                    location: {props.listing.address}, {props.listing.city}, {props.listing.state}, {props.listing.zipcode}
                </p>
                <div className="row">
                    <div className="col-2-of-3">
                        <p className="card__info">Price: {props.listing.price}</p>
                        <p className="card__info">Bedrooms: {props.listing.bedrooms}</p>
                        <p className="card__info">Bathrooms: {props.listing.bathrooms}</p>
                    </div>
                    <div className="col-1-of-3">
                        <p className="card__hometype">{props.listing.home_type}</p>
                        <p className="card__saletype">{props.listing.sale_type}</p>
                        <p className="card__sqft">Sqft: {props.listing.sqft}</p>
                    </div>
                </div>
                <Link className='card__link' to={`/listings/${props.listing.slug}`}>View Listing </Link>
            </div>
        </div>
    )
}

export default card