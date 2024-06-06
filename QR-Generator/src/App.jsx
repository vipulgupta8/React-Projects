import React, { useState } from 'react'
import Navbar from './component/navbar/Navbar'
import './App.css'

function App() {
  
  const [inputValue, setInputValue] = useState('');
  const [QR, setQR] = useState('')

  const createQr =() =>{
    if(!inputValue){
      return alert('Input Someting')
    }
    setQR(`http://api.qrserver.com/v1/create-qr-code/?data=${inputValue}&size=[200]x[200]`)
  }
  return (
    <>
      <Navbar />
      {/* Main Content  */}
      <div className=" container mx-auto">
        {/* Top content */}
        <div className="">
          {/* Qr code title  */}
          <h1 className='text-center text-white text-4xl mt-6 mb-2 font-bold'>
            QR Code Generator
          </h1>

          {/* paragraph  */}
          <p className='text-center text-white text-xl mb-3'>An instant creation of a QR code with any content.
          </p>
        </div>

        {/* Search Input And Button  */}
        <div className="flex justify-center">
          <div className="input flex justify-center mt-5 mb-7 px-5 lg:px-0">
            {/* Search Input  */}
            <input
              type="text"

              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}

              placeholder='Write the content (link or text)'
              className=' shadow-md text-white bg-[#2f3542] placeholder-gray-400 
              rounded-l-lg px-2 py-2 w-64 lg:w-[30em] outline-none border-2 border-gray-600'
            />

            {/* Button  */}
            <button

            onClick={createQr}
              className='bg-[#222f3e] px-4 rounded-r-lg text-white 
              shadow-md border-b-2 border-r-2 border-t-2 border-gray-600'>
              Create
            </button>
          </div>
        </div>

        {/* Title And QR Code Image */}
        {QR && <div className='qr-container'>
          {/* title  */}
          <h2 className="qr-title text-center text-2xl text-white font-semibold mb-5">
            Here is your QR!
          </h2>

          {/* anchor tag and img tag  */}
          <a className=' flex justify-center'>
            <img className='qr-image' src={QR} alt="QR code" />
          </a>
        </div>}
      </div>
    </>
  )
}

export default App
