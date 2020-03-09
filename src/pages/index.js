import React from "react"
import { graphql } from "gatsby"
import loadable from "@loadable/component"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Features from "../components/features"
import Categories from "../components/categories"
import FeatureProduct from "../components/feature-products"
import ProductDeal from "../components/product-deal"

const LoadableHero = loadable(() => import("../components/hero"))
const LoadableReviews = loadable(() => import("../components/reviews"))

const IndexPage = ({
  data: { placeholderImage1, placeholderImage2, allReview },
}) => (
  <Layout>
    <SEO title="Home" />
    <LoadableHero items={[placeholderImage1, placeholderImage2]} />
    <Features />
    <Categories />
    <FeatureProduct />
    <ProductDeal
      beginDate={new Date("2020-03-16")}
      name="Spinach"
      price="20.000"
      promoPrice="10.000"
    />
    <LoadableReviews reviews={allReview} />
  </Layout>
)

export const query = graphql`
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
    allReview {
      edges {
        node {
          name
          message
          referal
          image {
            childImageSharp {
              fixed(width: 479, height: 479) {
                src
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
