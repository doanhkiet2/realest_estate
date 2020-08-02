import React, { useState, useEffect } from 'react'
import axios from 'axios'
import House from '../asserts/images/61.webp'

const About = () => {
    const [topSellers, setTopSellers] = useState([])
    const [realtors, setRealtors] = useState([])

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const getTopSeller = async () => {
            try {
                const res = await axios.get("http://192.168.1.169:8000/api/realtors", config)
                setRealtors(res.data)
            } catch (err) {

            }
        }
        getTopSeller()
    }, [])

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const getTopSeller = async () => {
            try {
                const res = await axios.get("http://192.168.1.169:8000/api/realtors/topseller", config)
                setTopSellers(res.data)
            } catch (err) {

            }
        }
        getTopSeller()
    }, [])

    const getAllRealtors = () => {
        const display = []
        const result = []

        realtors && realtors.map(realtor => {
            return display.push(
                <div className='about__card' key={realtor.id}>
                    <div className="about__display">
                        <img src={realtor.photo} alt="" className="about__display__photo" />
                    </div>
                    <h3 className="about__realtor">{realtor.name}</h3>
                    <p className="about__contact">{realtor.phone}</p>
                    <p className="about__contact">{realtor.email}</p>
                    <p className="about__about">{realtor.description}</p>
                </div>
            )
        })

        for (let i = 0; i < display.length; i += 3) {
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

    const getAllTopSellers = () => {
        const result = []

        topSellers && topSellers.map(topSeller => {
            return result.push(
                <div className='about__card' key={topSeller.id}>
                    <div className="about__display">
                        <img src={topSeller.photo} alt="" className="about__display__photo" />
                    </div>
                    <h3 className="about__realtor">{topSeller.name}</h3>
                    <p className="about__contact">{topSeller.phone}</p>
                    <p className="about__contact">{topSeller.email}</p>
                    <p className="about__about">{topSeller.description}</p>
                </div>
            )
        })
        return result
    }

    return (
        <main className='about'>
            <section className='about__header'>
                <h1 className="about__header__heading">About Realest Estate</h1>
            </section>
            <div className='about__info'>
                <div className="row">
                    <div className="col-3-of-4">
                        <h2 className="about__subheading">We find the perfect home for you</h2>
                        <p className="about__paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien a diam eleifend faucibus.
                            Suspendisse vitae sodales leo. Proin hendrerit aliquam interdum. Maecenas tellus ante, ultrices id
                            justo id, venenatis hendrerit orci. Orci varius natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Praesent aliquam condimentum ligula eget ullamcorper.
                        </p>
                        <div className="about__display main_photo">
                            <img src={House} alt="about_photo" className="about__display__photo" />
                        </div>
                        <p className="about__paragraph">
                            Suspendisse gravida magna posuere purus laoreet, et elementum velit placerat. Fusce at convallis erat.
                            Curabitur placerat eros eu interdum lacinia. Nulla facilisi. Duis pretium tristique porta. Donec
                            vehicula est a massa interdum vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Mauris malesuada lacus mauris, eu ultrices neque egestas eu. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos. Morbi elementum enim vitae purus pulvinar tincidunt.
                            Aenean id viverra leo, non vehicula odio. Vestibulum volutpat a nulla at mattis. Nam cursus semper sapien,
                            eu consequat lacus iaculis vel.
                        </p>
                    </div>
                    <div className="col-1-of-4">
                        {getAllTopSellers()}
                    </div>
                </div>
            </div>

            <section className='about__team'>
                <h2 className="about__subheading">Meet out awesome team!</h2>
                {getAllRealtors()}
            </section>
        </main>
    )
}

export default About