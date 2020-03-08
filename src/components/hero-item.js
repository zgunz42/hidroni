import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import FadeInUp from "./fade-in-up"

export default function HeroItem(props) {
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "bg_1.jpg" }) {
        childImageSharp {
          fixed(width: 2000, height: 1335) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div
      className="hero-wrap hero-bread"
      style={{
        backgroundImage: `url(${data.bg.childImageSharp.fixed.src})`,
      }}
    >
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center">
          <FadeInUp className="col-md-9 text-center">
            <p className="breadcrumbs">
              <span className="mr-2">
                <a href="/">Home</a>
              </span>{" "}
              <span className="mr-2">
                <a href="/product">Product</a>
              </span>{" "}
              <span>Product Single</span>
            </p>
            <h1 className="mb-0 bread">Product Single</h1>
          </FadeInUp>
        </div>
      </div>
    </div>
  )
}
