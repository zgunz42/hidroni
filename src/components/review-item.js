import React from "react"

export default function ReviewItem({ name, message, image, referal }) {
  return (
    <div className="testimony-wrap p-4 pb-5">
      <div
        className="user-img mb-5"
        style={{ backgroundImage: `url(${image})` }}
      >
        <span className="quote d-flex align-items-center justify-content-center">
          <i className="icon-quote-left" />
        </span>
      </div>
      <div className="text text-center">
        <p className="mb-5 pl-4 line">{message}</p>
        <p className="name">{name}</p>
        <span className="position">{referal}</span>
      </div>
    </div>
  )
}
