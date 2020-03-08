import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { isFunction } from "lodash"
import { tns } from "ventura-slider"
import "ventura-slider/dist/tiny-slider.css"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage1: file(relativePath: { eq: "bg_1.jpg" }) {
        childImageSharp {
          fixed(width: 2000, height: 1335) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      placeholderImage2: file(relativePath: { eq: "bg_2.jpg" }) {
        childImageSharp {
          fixed(width: 2000, height: 1335) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

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
