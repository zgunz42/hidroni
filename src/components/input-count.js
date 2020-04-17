import React from "react"

function InputCount({
  initial,
  minValue = 0,
  maxValue = Number.MAX_SAFE_INTEGER,
}) {
  const [count, setCount] = React.useState(minValue || initial || 0)

  const handleDecrement = () => {
    const nextCount = count - 1
    if (nextCount > minValue) {
      setCount(nextCount)
    }
  }

  const handleIncrement = () => {
    const nextCount = count + 1
    if (maxValue > nextCount) {
      setCount(nextCount)
    }
  }

  const handleChange = nextCount => {
    if (nextCount > minValue && maxValue > nextCount) {
      setCount(nextCount)
    }
  }

  const handleMouseDown = e => e.preventDefault()

  return (
    <div className="input-group col-md-6 d-flex mb-3">
      <span className="input-group-btn mr-2">
        <button
          type="button"
          className="quantity-left-minus btn"
          disabled={count - 1 === minValue}
          onClick={handleDecrement}
          onMouseDown={handleMouseDown}
          data-type="minus"
          data-field
        >
          <i className="ion-ios-remove" />
        </button>
      </span>
      <input
        type="number"
        value={count}
        onChange={event => handleChange(parseInt(event.target.value))}
        id="quantity"
        name="quantity"
        className="form-control input-number"
        defaultValue={1}
        min={1}
        max={100}
      />
      <span className="input-group-btn ml-2">
        <button
          type="button"
          disabled={count + 1 === maxValue}
          onClick={handleIncrement}
          onMouseDown={handleMouseDown}
          className="quantity-right-plus btn"
          data-type="plus"
          data-field
        >
          <i className="ion-ios-add" />
        </button>
      </span>
    </div>
  )
}

export default InputCount
