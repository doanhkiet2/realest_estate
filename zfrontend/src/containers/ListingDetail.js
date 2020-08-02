import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListingDetail = (props) => {
    const [listing, setListing] = useState({})
    const [realtor, setRealtor] = useState({})
    const [price, setPrice] = useState(0);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    useEffect(() => {
        const slug = props.match.params.id
        console.log(slug)
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        axios.get(`http://192.168.1.169:8000/api/listings/${slug}`, config)
            .then(res => {
                console.log("res.data", res.data)
                setListing(res.data)
                setPrice(numberWithCommas(res.data.price))
            }).catch(err => {
                console.log(err, "catch slug")

            })
    }, [props.match.params.id])


    useEffect(() => {
        const id = listing.realtor
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        id && axios.get(`http://192.168.1.169:8000/api/realtors/${id}`, config)
            .then(res => {
                console.log("realtor", res.data)

                setRealtor(res.data)
            }).catch(err => {

            })
    }, [listing.realtor])

    const displayOtherPicture = () => {
        const display = []
        const result = []

        const DB_MAX_PHOTO = 20
        for (let i = 0; i < DB_MAX_PHOTO; i++) {
            listing[`photo_${i}`] && display.push(
                <div className='col-1-of-3' key={i}>
                    <div className="listingdetail__display">
                        <div className="listingdetail__paddingcss">
                            <img className='listingdetail__display__subphoto' src={listing[`photo_${i}`]} alt="sub_photo" />
                        </div>
                    </div>
                </div >
                // : null
            )
        }
        // display.filter(item => item != null)
        for (let i = 0; i < display.length; i += 3) {
            result.push(
                <div className="row" key={i}>
                    {display[i]}
                    {display[i + 1] && display[i + 1]}
                    {display[i + 2] && display[i + 2]}
                </div>
            )
        }

        return result
    }

    const breacrumbText = "<<"

    return (
        <div className="listingdetail">
            <div className='row'>
                <div className="listingdetail__breadcrumb">
                    <Link className="listingdetail__breadcrumb__link" to='/' >
                        <span>{breacrumbText}</span> Home <span>{breacrumbText}</span>
                    </Link>
                </div>
            </div>
            <div className='listingdetail__header row'>
                <h1 className="listingdetail__title">{listing.title}</h1>
                <p className="listingdetail__location">{listing.address}, {listing.city}, {listing.state}, {listing.zipcode}</p>
            </div>
            <div className="row">
                <div className="col-3-of-4">
                    <div className="listingdetail__display">
                        <div className="listingdetail__paddingcss">
                            <img className="listingdetail__display__photo" src={listing.photo_main} alt="home" />
                        </div>
                    </div>
                </div>
                <div className="col-1-of-4">
                    <div className="listingdetail__display">
                        <div className="listingdetail__paddingcss">
                            <img className="listingdetail__display__photo" src={realtor.photo} alt="realtor" />
                        </div>
                        <p className="listingdetail__realtor">{realtor.name}</p>
                        <p className="listingdetail__contact">{realtor.phone}</p>
                        <p className="listingdetail__contact">{realtor.email}</p>
                        <p className="listingdetail__about">{realtor.description}</p>
                    </div>

                </div>
            </div>
            <div className='row'>
                <div className='col-1-of-2'>
                    <ul className='listingdetail__list'>
                        <li className='listingdetail__list__item'>Home Type: <span>{listing.home_type}</span></li>
                        <li className='listingdetail__list__item'>Price: <span>${price}</span></li>
                        <li className='listingdetail__list__item'>Bedrooms: <span>{listing.bedrooms}</span></li>
                        <li className='listingdetail__list__item'>Bathrooms: <span>{listing.bathrooms}</span></li>
                        <li className='listingdetail__list__item'>Square Feet: <span>{listing.sqft}</span></li>
                    </ul>
                </div>
                <div className='col-1-of-2'>
                    <ul className='listingdetail__list'>
                        <li className='listingdetail__list__item'>Sale Type: <span>{listing.sale_type}</span></li>
                        <li className='listingdetail__list__item'>Address: <span>{listing.address}</span></li>
                        <li className='listingdetail__list__item'>City: <span>{listing.city}</span></li>
                        <li className='listingdetail__list__item'>State: <span>{listing.state}</span></li>
                        <li className='listingdetail__list__item'>Zipcode: <span>{listing.zipcode}</span></li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <p className="listingdetail__description">{listing.description}</p>
            </div>
            {displayOtherPicture()}
        </div>

    )
}

export default ListingDetail