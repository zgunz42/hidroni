import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"

const ProductCard = ({
  title,
  image,
  price,
  discount,
  url,
  onBuy,
  onSave,
  onCart,
}) => {
  return (
    <div className="product">
      <Link to={url} className="img-prod" replace>
        <Image className="img-fluid" {...image} />
        {discount && <span className="status">{discount}%</span>}
        <div className="overlay" />
      </Link>
      <div className="text py-3 pb-4 px-3 text-center">
        <h3>
          <Link to={url}>{title}</Link>
        </h3>
        <div className="d-flex">
          <div className="pricing">
            <p className="price">
              {discount ? (
                <>
                  <span className="mr-2 price-dc">Rp. {price}</span>
                  <span classs="price-sale">
                    ${price - (price * discount) / 100}
                  </span>
                </>
              ) : (
                <span classs="price-sale">Rp. {price}</span>
              )}
            </p>
          </div>
        </div>
        <div className="bottom-area d-flex px-3">
          <div className="m-auto d-flex">
            <a
              href="/"
              className="add-to-cart d-flex justify-content-center align-items-center text-center"
            >
              <span>
                <i className="ion-ios-menu" />
              </span>
            </a>
            <a
              href="/"
              className="buy-now d-flex justify-content-center align-items-center mx-1"
            >
              <span>
                <i className="ion-ios-cart" />
              </span>
            </a>
            <a
              href="/"
              className="heart d-flex justify-content-center align-items-center "
            >
              <span>
                <i className="ion-ios-heart" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
