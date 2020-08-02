import React, { useState } from 'react'
import Listings from '../components/Listings'
import ListingForm from '../components/ListingForm'
import Pagination from '../components/Pagination'


const Home = () => {
    const [listings, setListings] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [listingsPerPage, setListingsPerPage] = useState(3)
    const [active, setActive] = useState(1)

    const indexOfLastListing = currentPage * listingsPerPage
    const indexOfFirstListing = indexOfLastListing - listingsPerPage
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing)

    const visitPage = (page) => {
        setCurrentPage(page)
        setActive(page)
    }

    const previous_number = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
            setActive(currentPage - 1)
        }
    }


    const next_number = () => {
        if (currentPage !== Math.ceil(listings.length / 3)) {
            setCurrentPage(currentPage + 1)
            setActive(currentPage + 1)
        }
    }


    return (
        <div className='home'>
            <div className="home__form">
                <ListingForm setListings={setListings} />
            </div>
            <div className="listings">
                <Listings listings={currentListings} />
            </div>
            {listings.length === 0 ? null : <div className="home__pagination">
                    <Pagination
                        itemPerPage={listingsPerPage}
                        listingCount={listings.length}
                        next={next_number}
                        previous={previous_number}
                        visitPage={visitPage}
                        active={active}
                        setActive={setActive}
                        setListingsPerPage={setListingsPerPage}
                    />
                </div>
            }
        </div>
        //need to know: why pagination in here, not in listings
        //need to know: not work {listings === null ? null : ()}
    )
}

export default Home