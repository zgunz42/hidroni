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
        name={product.name}
        price={product.price}
        weight={product.weight}
        image={{ fixed: product.images[0].childImageSharp.fixed }}
        ratingCount={product.stats.rating_count}
        description={product.description}
        averageRating={product.stats.average_rating}
        totalSales={product.stats.total_sales}
        variants={product.variants}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ProductQuery($id: String) {
    product(id: { eq: $id }) {
      id
      name
      description
      weight
      stats {
        average_rating
        total_sales
        rating_count
      }
      price
      variants {
        weight
        sku
        name
        group
        stock
        price
      }
      images {
        childImageSharp {
          fixed(width: 510, height: 408) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
