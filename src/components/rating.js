import React from "react"

function isInt(n) {
  return n % 1 === 0
}

const className = (value, limit) => {
  if (Math.floor(value) >= limit) {
    return "ion-ios-star"
  }

  if (value > limit - 1) {
    return "ion-ios-star-half"
  }

  return "ion-ios-star-outline"
}

export default function Rating({ total }) {
  return (
    <>
      <a href="/" className="mr-2">
        {total}
      </a>
      <a href="/">
        <span className={className(total, 1)} />
      </a>
      <a href="/">
        <span className={className(total, 2)} />
      </a>
      <a href="/">
        <span className={className(total, 3)} />
      </a>
      <a href="/">
        <span className={className(total, 4)} />
      </a>
      <a href="/">
        <span className={className(total, 5)} />
      </a>
    </>
  )
}
