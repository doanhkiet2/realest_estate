import React, { useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'

const ListingForm = (props) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        sale_type: 'For Sale',
        price: '$0+',
        home_type: 'House',
        sqft: '0+',
        bedrooms: '0+',
        bathrooms: '0+',
        days_listed: 'Any',
        has_photos: '0+',
        keywords: '',
        open_house: 'true'
    })

    const {
        sale_type,
        price,
        home_type,
        sqft,
        bedrooms,
        bathrooms,
        days_listed,
        has_photos,
        keywords,
        open_house
    } = formData
    console.log("open_house", open_house)
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    //need to know: , [e.target.name]: e.target.checked
    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = JSON.stringify({
            sale_type,
            price,
            home_type,
            sqft,
            bedrooms,
            bathrooms,
            days_listed,
            has_photos,
            keywords,
            open_house
        })
        axios.post('http://192.168.1.169:8000/api/listings/search', data, config)
            .then(res => {
                setLoading(false)
                props.setListings(res.data)
                window.scrollTo(0, 0);
            }).catch(err => {
                setLoading(false)
                window.scrollTo(0, 0);
            })
    }

    return (
        <form className='listingform' onSubmit={e => onSubmit(e)}>
            <div className='row'>
                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label htmlFor="sale_type" className="listingform__label">sale_type</label>
                        <select name="sale_type" value={sale_type} className="listingform__select" onChange={e => onChange(e)}>
                            <option value="For Sale">For Sale</option>
                            <option value="For Rent">For Rent</option>
                        </select>
                    </div>
                    <div className="listingform__section">
                        <label htmlFor="price" className="listingform__label">price</label>
                        <select name="price" value={price} className="listingform__select" onChange={e => onChange(e)}>
                            <option value="$0+">$0+</option>
                            <option value="$200,000+">$200,000+</option>
                            <option value="$400,000+">$400,000+</option>
                            <option value="$600,000+">$600,000+</option>
                            <option value="$800,000+">$800,000+</option>
                            <option value="$1,000,000+">$1,000,000+</option>
                            <option value="$1,200,000+">$1,200,000+</option>
                            <option value="$1,500,000+">$1,500,000+</option>
                            <option value="$2,000,000+">$2,000,000+</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                </div>


                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label htmlFor="home_type" className="listingform__label">home_type</label>
                        <select name="home_type" value={home_type} className="listingform__select" onChange={e => onChange(e)}>
                            <option value="House">House</option>
                            <option value="Condo">Condo</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                    <div className="listingform__section">
                        <label htmlFor="sqft" className="listingform__label">sqft</label>
                        <select name="sqft" value={sqft} className="listingform__select" onChange={e => onChange(e)}>
                            <option value="0+">0+</option>
                            <option value="500+">500+</option>
                            <option value="800+">800+</option>
                            <option value="1000+">1000+</option>
                            <option value="1200+">1200+</option>
                            <option value="1500+">1500+</option>
                            <option value="2000+">2000+</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                </div>


                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label htmlFor="bedrooms" className="listingform__label">bedrooms</label>
                        <select name="bedrooms" value={bedrooms} className="listingform__select" onChange={e => onChange(e)}>
                            <option value="0+">0+</option>
                            <option value="1+">1+</option>
                            <option value="2+">2+</option>
                            <option value="3+">3+</option>
                            <option value="4+">4+</option>
                            <option value="5+">5+</option>
                            <option value="10+">10+</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                    <div className="listingform__section">
                        <label htmlFor="bathrooms" className="listingform__label">bathrooms</label>
                        <select name="bathrooms" value={bathrooms} className="listingform__select" onChange={e => onChange(e)}>
                            <option value="0+">0+</option>
                            <option value="1+">1+</option>
                            <option value="2+">2+</option>
                            <option value="3+">3+</option>
                            <option value="4+">4+</option>
                            <option value="5+">5+</option>
                            <option value="10+">10+</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                </div>


                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label htmlFor="days_listed" className="listingform__label">days_listed</label>
                        <select name="days_listed" value={days_listed} className="listingform__select" onChange={e => onChange(e)}>
                            <option value="1 or less">"1 or less"</option>
                            <option value="3 or less">"3 or less"</option>
                            <option value="5 or less">"5 or less"</option>
                            <option value="10 or less">"10 or less"</option>
                            <option value="20 or less">"20 or less"</option>
                            <option value="30 or less">"30 or less"</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                    <div className="listingform__section">
                        <label htmlFor="has_photos" className="listingform__label">has_photos</label>
                        <select name="has_photos" value={has_photos} className="listingform__select" onChange={e => onChange(e)}>
                            <option value="0+">0+</option>
                            <option value="3+">3+</option>
                            <option value="5+">5+</option>
                            <option value="10+">10+</option>
                            <option value="15+">15+</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                </div>


                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label htmlFor="keywords" className="listingform__label">keywords</label>
                        <input type='text' name="keywords" value={keywords} className="listingform__input" onChange={e => onChange(e)} placeholder="keywords"/>
                    </div>
                    <div className="listingform__section">
                        <label className='listingform__label listingform__label__checkbox' htmlFor='open_house'>Open Houses</label>
                        <input className='listingform__checkbox' name='open_house' type='checkbox' onChange={e => onChange(e)} value={open_house} />
                    </div>
                </div>
                            </div>
                <div className="row">
                    {loading
                        ? <div className="listingform__loader ">
                            <Loader
                                type='Oval'
                                color='#424242'
                                height={50}
                                width={50}
                            />
                        </div>
                        : <button className='listingform__button listingform__button--primary ' >Find Now</button>
                    }
                </div>
        </form>
    )
}

export default ListingForm