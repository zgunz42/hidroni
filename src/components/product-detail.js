import React from "react"
import Rating from "./rating"
import _ from "lodash"
import Img from "gatsby-image"

import FadeInUp from "./fade-in-up"
import InputCount from "./input-count"

export default function ProductDetail({
  name,
  image,
  description,
  weight,
  variants,
  price,
  ratingCount,
  averageRating,
  totalSales,
}) {
  const [variant, setVariant] = React.useState()
  const formatter = new Intl.NumberFormat("Id-ID", {
    currency: "IDR",
    style: "currency",
  })
  const displayPrice = price
    ? formatter.format(price)
    : variants
        .sort((a, b) => a.price > b.price)
        .filter((x, index, arr) => index === 0 || index === arr.length - 1)
        .map(v => formatter.format(v.price))
        .join(" - ")

  const displayWeight = weight
    ? weight
    : _.reduce(variants, (a, v) => a + v.weight * v.stock, 0)
  const handleChange = e => {
    setVariant(e.target.value)
  }
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row">
          <FadeInUp className="col-lg-6 mb-5">
            <a href={image.src} className="image-popup">
              <Img className="img-fluid" alt="Colorlib Template" {...image} />
            </a>
          </FadeInUp>
          <FadeInUp className="col-lg-6 product-details pl-md-5">
            <h3>{name}</h3>
            <div className="rating d-flex">
              <p className="text-left mr-4">
                <Rating total={averageRating} />
              </p>
              <p className="text-left mr-4">
                <a href="/" className="mr-2" style={{ color: "#000" }}>
                  {ratingCount} <span style={{ color: "#bbb" }}>Rating</span>
                </a>
              </p>
              <p className="text-left">
                <a href="/" className="mr-2" style={{ color: "#000" }}>
                  {totalSales} <span style={{ color: "#bbb" }}>Sold</span>
                </a>
              </p>
            </div>
            <p className="price">
              <span>{displayPrice}</span>
            </p>
            <p>{description}</p>
            <div className="row mt-4">
              {variants && (
                <div className="col-md-6">
                  <div className="form-group d-flex">
                    <div className="select-wrap">
                      <div className="icon">
                        <span className="ion-ios-arrow-down" />
                      </div>
                      <select onChange={handleChange} className="form-control">
                        <option value="" selected disabled hidden>
                          Pilih Jenis Produk
                        </option>
                        {variants.map((v, i) => (
                          <option key={i} value={v.sku}>
                            [{v.group}] {v.name} ({formatter.format(v.price)})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="w-100" />
              <InputCount initial={1} />
              <div className="w-100" />
              <div className="col-md-12">
                <p style={{ color: "#000" }}>{displayWeight} gram tersedia</p>
              </div>
            </div>
            <p>
              <a
                className={`btn btn-black ${
                  !variants || !variant ? "disabled" : ""
                } py-3 px-5`}
              >
                Tambah ke Keranjang
              </a>
            </p>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
