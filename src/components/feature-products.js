import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProductCard from "./product-card"

const FeatureProduct = () => {
  const data = useStaticQuery(graphql`
    query {
      products: allProduct(
        limit: 8
        sort: { fields: stats___totalSales, order: DESC }
      ) {
        nodes {
          id
          name
          sku
          price
          images {
            childImageSharp {
              fluid(maxWidth: 508) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          parent {
            ... on Mdx {
              fields {
                slug
                money
              }
            }
          }
        }
      }
    }
  `)
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center mb-3 pb-3">
          <div className="col-md-12 heading-section text-center ftco-animate fadeInUp ftco-animated">
            <span className="subheading">Featured Products</span>
            <h2 className="mb-4">Our Products</h2>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
            {data.products.nodes.map(product => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.parent.fields.money}
                url={product.parent.fields.slug}
                image={{
                  fluid: product.images[0].childImageSharp.fluid,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureProduct
