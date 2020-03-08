import React, { useState, useCallback } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

const Navbar = () => {
  const [state, setState] = useState({
    active: false,
    navBarActiveClass: "show",
  })
  const toggleHamburger = useCallback(() => {
    // toggle the active boolean in the state
    const active = !state.active
    setState({
      ...state,
      active,
      navBarActiveClass: active ? "hide" : "show",
    })
  }, [state, setState])

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
      id="ftco-navbar"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Vegefoods
        </Link>
        <button
          onClick={e => toggleHamburger()}
          className={classNames([
            "navbar-toggler",
            {
              collapsed: !state.active,
            },
          ])}
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded={state.active}
          aria-label="Toggle navigation"
        >
          <span className="oi oi-menu" /> Menu
        </button>

        <div
          className={classNames([
            "collapse navbar-collapse",
            {
              show: state.active,
            },
          ])}
          id="ftco-nav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a href="index.html" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="dropdown04"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown04">
                <a className="dropdown-item" href="shop.html">
                  Shop
                </a>
                <a className="dropdown-item" href="wishlist.html">
                  Wishlist
                </a>
                <a className="dropdown-item" href="product-single.html">
                  Single Product
                </a>
                <a className="dropdown-item" href="cart.html">
                  Cart
                </a>
                <a className="dropdown-item" href="checkout.html">
                  Checkout
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a href="about.html" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="blog.html" className="nav-link">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a href="contact.html" className="nav-link">
                Contact
              </a>
            </li>
            <li className="nav-item cta cta-colored">
              <a href="cart.html" className="nav-link">
                <span className="icon-shopping_cart" />
                [0]
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
