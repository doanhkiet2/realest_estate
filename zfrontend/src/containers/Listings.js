import React, { useEffect, useState } from 'react'
import Cart from '../components/Card'
import Pagination from '../components/Pagination'
import axios from 'axios'



const Listings = () => {
    const [count, setCount] = useState(0)
    const [listings, setListings] = useState([])
    const [next, setNext] = useState('')
    const [previous, setPrevious] = useState('')
    const [active, setActive] = useState(1)

    useEffect(() => {
        window.scrollTo(0, 0)

        const flechData = async () => {
            try {
                const res = await axios.get('http://192.168.1.169:8000/api/listings/?page=1')
                console.log(res)
                setListings(res.data.results)
                setNext(res.data.next)
                setPrevious(res.data.previous)
                setCount(res.data.count)
            } catch (err) {

            }
        }

        flechData()
    }, [])


    const displayListings = () => {
        const display = []
        const result = []

        listings && listings.map(listing => {
            return display.push(
                <Cart listing={listing} />
            )
        })

        for (let i = 0; i < count; i += 3) {
            result.push(
                <div className="row" key={i}>
                    <div className="col-1-of-3">
                        {display[i]}
                    </div>
                    <div className="col-1-of-3">
                        {display[i] + 1 ? display[i + 1] : null}
                    </div>
                    <div className="col-1-of-3">
                        {display[i + 2] ? display[i + 2] : null}
                    </div>
                </div>
            )
        }

        return result
    }

    const visitPage = (page) => {
        axios.get(`http://192.168.1.169:8000/api/listings/?page=${page}`)
            .then(res => {
                setListings(res.data.results)
                setNext(res.data.next)
                setPrevious(res.data.previous)
                setActive(page)
                setCount(res.data.count)

            }).catch(err => {

            })
        //need to know : why use then >< try
    }

    const previous_number = () => {
        axios.get(previous)//state
            .then(res => {
                setListings(res.data.results)
                setNext(res.data.next)
                setPrevious(res.data.previous)
                setCount(res.data.count)

                if (previous)
                    setActive(active - 1)
            }).catch(err => {

            })
    }

    const next_number = () => {
        axios.get(next)//state
            .then(res => {
                console.log("resssssssssss",res)
                setListings(res.data.results)
                setNext(res.data.next)
                setPrevious(res.data.previous)
                // setCount(res.data.count)

                if (next)
                    setActive(active + 1)
            }).catch(err => {

            })
    }


    return (
        <main className='listings'>
            <section className='listings_listings'>
                {displayListings()}
            </section>
            <section className="listings__pagination">
                <Pagination
                    itemPerPage={3}
                    listingCount={count}
                    next={next_number}
                    previous={previous_number}
                    visitPage={visitPage}
                    active={active}
                    setActive={setActive}
                />
            </section>
        </main>
    )
}

export default Listings