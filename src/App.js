import { useEffect, useState } from "react"
import ItemList from "./components/ItemList"
import Cart from "./components/Cart"
import Bill from "./components/Bill"

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "carrot", price: 23, qty: 0 },
    { id: 2, name: "brinjal", price: 33, qty: 0 },
    { id: 3, name: "cucumber", price: 13, qty: 0 },
    { id: 4, name: "strawberry", price: 103, qty: 0 },
    { id: 5, name: "watermelon", price: 83, qty: 0 },
    { id: 6, name: "apple", price: 123, qty: 0 },
  ])

  useEffect(() => {
    const response = localStorage.getItem("data")

    const data = JSON.parse(response)
    setItems(data)
  }, [])

  useEffect(() => {
    const data = JSON.stringify(items)
    localStorage.setItem("data", data)
  })

  const handleAddItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const currentQuantity = item.qty + 1
        return { ...item, qty: currentQuantity }
      }

      return item
    })

    setItems(updatedItems)
  }

  const handleRemoveItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id && item.qty) {
        const currentQuantity = item.qty - 1
        return { ...item, qty: currentQuantity }
      }

      return item
    })

    setItems(updatedItems)
  }

  const handleRemoveAllItems = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, qty: 0 }
      }
      return item
    })

    setItems(updatedItems)
  }

  return (
    <div>
      <ItemList
        items={items}
        addToCart={handleAddItem}
        removeFromCart={handleRemoveItem}
      />
      <div className="flex items-start justify-center">
        <Cart items={items} removeAllFromCart={handleRemoveAllItems} />
        <Bill items={items} />
      </div>
    </div>
  )
}

export default App
