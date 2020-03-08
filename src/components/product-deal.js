import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import FadeInUp from "./fade-in-up"

export default function ProductDeal({
  name,
  price,
  promoPrice,
  beginDate,
  delay = 1000,
}) {
  const getDays = distance => Math.floor(distance / (1000 * 60 * 60 * 24))
  const getHours = distance =>
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const getMinutes = distance =>
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const getSeconds = distance => Math.floor((distance % (1000 * 60)) / 1000)
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finish: false,
  })

  useEffect(() => {
    function tick() {
      const now = new Date()
      const distance = beginDate - now

      if (distance > 0) {
        setState({
          days: getDays(distance),
          hours: getHours(distance),
          minutes: getMinutes(distance),
          seconds: getSeconds(distance),
        })
      } else {
        setState({
          finish: true,
        })
        clearInterval(id)
      }
    }

    const id = setInterval(tick, delay)

    if (delay !== null) {
      return () => clearInterval(id)
    }
  }, [delay, beginDate])

  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "bg_3.jpg" }) {
        childImageSharp {
          fixed(width: 2000, height: 1335) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <section
      className="ftco-section img"
      style={{
        backgroundImage: `url(${data.bg.childImageSharp.fixed.src})`,
      }}
    >
      <div className="container">
        <div className="row justify-content-end">
          <FadeInUp className="col-md-6 heading-section deal-of-the-day">
            <span className="subheading">Best Price For You</span>
            <h2 className="mb-4">Deal of the day</h2>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia
            </p>
            <h3>
              <a href="/">{name}</a>
            </h3>
            <span className="price">
              Rp. {price} <a href="/">now Rp. {promoPrice} only</a>
            </span>
            <div id="timer" className="d-flex mt-5">
              <div className="time" id="days">
                {state.days}
                <span>Days</span>
              </div>
              <div className="time pl-3" id="hours">
                {state.hours}
                <span>Hours</span>
              </div>
              <div className="time pl-3" id="minutes">
                {state.minutes}
                <span>Minutes</span>
              </div>
              <div className="time pl-3" id="seconds">
                {state.seconds}
                <span>Seconds</span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
