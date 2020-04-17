import React, { useEffect } from "react"
import { tns } from "ventura-slider"
import { isFunction } from "lodash"
import "ventura-slider/dist/tiny-slider.css"

import FadeInUp from "./fade-in-up"
import ReviewItem from "./review-item"

export default function Reviews({ reviews }) {
  useEffect(() => {
    const slider = tns({
      container: ".carousel-testimony",
      autoHeight: false,
      items: 1,
      responsive: {
        640: {
          edgePadding: 20,
          gutter: 20,
          items: 2,
        },
        700: {
          gutter: 30,
        },
        900: {
          items: 3,
        },
      },
      autoplay: true,
      autoplayTimeout: 5000,
      speed: 400,
      autoplayButtonOutput: false,
      nav: false,
      touch: true,
      controls: false,
    })

    return () => {
      slider && isFunction(slider.destory) && slider.destory()
    }
  }, [])

  return (
    <section className="ftco-section testimony-section">
      <div className="container">
        <div className="row justify-content-center mb-5 pb-3">
          <FadeInUp className="col-md-7 heading-section text-center">
            <span className="subheading">Testimony</span>
            <h2 className="mb-4">Our satisfied customer says</h2>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in
            </p>
          </FadeInUp>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="carousel-testimony owl-carousel">
              {reviews.edges.map(({ node }) => (
                <div key={node.id} className="owl-item active">
                  <div className="item">
                    <ReviewItem
                      name={node.name}
                      message={node.message}
                      image={node.image.childImageSharp.fixed.src}
                      referral={node.referral}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
