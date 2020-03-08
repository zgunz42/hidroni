/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

// import Header from "./header"
import TopHeader from "./top-header"
import Navbar from "./navbar"
import Footer from "./footer"
import Newsletter from "./newsletter"

import "../scss/style.scss"
import "../css/open-iconic-bootstrap.min.css"
import "../css/ionicons.min.css"
import "../css/icomoon.css"
import "../css/flaticon.css"
import "../css/animate.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <TopHeader />
      <Navbar />
      <div>
        <main>{children}</main>
        <Newsletter />
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
