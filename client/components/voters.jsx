import React from 'react'

const PopupButton = () => {
  const openPopup = () => {
    window.open('https://cvr.inecnigeria.org/vvs', '_blank', 'width=600,height=400')
  }

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
    </div>
  )
}

export default PopupButton
