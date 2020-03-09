import React, { useEffect } from "react"
import { isFunction } from "lodash"
import { tns } from "ventura-slider"
import "ventura-slider/dist/tiny-slider.css"

const Hero = ({ items }) => {
  const [placeholderImage1, placeholderImage2] = items
  useEffect(() => {
    const slider = tns({
      container: ".home-slider",
      autoHeight: false,
      items: 1,
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
    <section id="home-section" className="hero">
      <div className="home-slider owl-carousel owl-loaded owl-drag">
        <div
          className="slider-item"
          style={{
            backgroundImage: `url(${data.placeholderImage1.childImageSharp.fixed.src})`,
          }}
        >
          <div className="overlay" />
          <div className="container">
            <div
              className="row slider-text justify-content-center align-items-center"
              data-scrollax-parent="true"
            >
              <div className="col-md-12 text-center">
                <h1 className="mb-2">
                  We serve Fresh Vegestables &amp; Fruits
                </h1>
                <h2 className="subheading mb-4">
                  We deliver organic vegetables &amp; fruits
                </h2>
                <p>
                  <a href="/" className="btn btn-primary">
                    View Details
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="slider-item"
          style={{
            backgroundImage: `url(${data.placeholderImage2.childImageSharp.fixed.src})`,
          }}
        >
          <div className="overlay" />
          <div className="container">
            <div
              className="row slider-text justify-content-center align-items-center"
              data-scrollax-parent="true"
            >
              <div className="col-sm-12 text-center">
                <h1 className="mb-2">100% Fresh &amp; Organic Foods</h1>
                <h2 className="subheading mb-4">
                  We deliver organic vegetables &amp; fruits
                </h2>
                <p>
                  <a href="/" className="btn btn-primary">
                    View Details
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
