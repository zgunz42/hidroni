import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { chunk } from "lodash"
import FadeInUp from "./fade-in-up"

const Categories = () => {
  const data = useStaticQuery(graphql`
    query {
      hero: file(relativePath: { eq: "category.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 510) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      top: allCategory(
        sort: { order: DESC, fields: products___sold }
        limit: 4
      ) {
        edges {
          node {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 510) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            slug
          }
        }
      }
    }
  `)

  const section = chunk(data.top.edges, 2)
  const leftSection = section.length > 0 ? section[0] : []
  const rightSection = section.length > 1 ? section[1] : []

  return (
    <section className="ftco-section ftco-category ftco-no-pt">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 order-md-last align-items-stretch d-flex">
                <FadeInUp
                  className="category-wrap-2 img align-self-stretch d-flex"
                  style={{
                    backgroundImage: `url(${data.hero.childImageSharp.fluid.src})`,
                  }}
                >
                  <div className="text text-center">
                    <h2>Vegetables</h2>
                    <p>Protect the health of every home</p>
                    <p>
                      <a href="/" className="btn btn-primary">
                        Shop now
                      </a>
                    </p>
                  </div>
                </FadeInUp>
              </div>
              <div className="col-md-6">
                {leftSection.map(({ node }, i) => (
                  <FadeInUp
                    delay={i}
                    className="category-wrap img mb-4 d-flex align-items-end"
                    style={{
                      backgroundImage: `url(${node.image.childImageSharp.fluid.src})`,
                    }}
                  >
                    <div className="text px-3 py-1">
                      <h2 className="mb-0">
                        <a href="/">{node.title}</a>
                      </h2>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {rightSection.map(({ node }, i) => (
              <FadeInUp
                delay={i + 2}
                className="category-wrap img mb-4 d-flex align-items-end"
                style={{
                  backgroundImage: `url(${node.image.childImageSharp.fluid.src})`,
                }}
              >
                <div className="text px-3 py-1">
                  <h2 className="mb-0">
                    <a href="/">{node.title}</a>
                  </h2>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Categories
