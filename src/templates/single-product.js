import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import HeroItem from "../components/hero-item"
import ProductDetail from "../components/product-detail"

export default function SingleProduct({ data: { product } }) {
  return (
    <Layout>
      <HeroItem />
      <ProductDetail
        title={product.title}
        image={{ fixed: product.image.childImageSharp.fixed }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ProductQuery($id: String) {
    product(id: { eq: $id }) {
      id
      title
      image {
        childImageSharp {
          fixed(width: 510, height: 408) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
