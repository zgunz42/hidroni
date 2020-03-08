import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Features from "../components/features"
import Categories from "../components/categories"
import FeatureProduct from "../components/feature-products"
import ProductDeal from "../components/product-deal"
import Reviews from "../components/reviews"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Hero />
    <Features />
    <Categories />
    <FeatureProduct />
    <ProductDeal
      beginDate={new Date("2020-03-16")}
      name="Spinach"
      price="20.000"
      promoPrice="10.000"
    />
    <Reviews />
  </Layout>
)

export default IndexPage
