import React from 'react'
import { selectAll } from '../../features/flashCardSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteFlashcard } from '../../features/flashCardSlice'
import { AiFillDelete } from 'react-icons/ai'
import { motion } from 'framer-motion'




export const MainGroup = () => {
const flashcards = useSelector((state) => selectAll(state));
 const dispatch = useDispatch()

const [showAllCards, setShowAllCards] = useState(false);

const [showDeleteMessage, setshowDeleteMessage] = useState(false)
 
const maxVisibleCards = 6;

const handleSeeAll = () => {
  setShowAllCards(!showAllCards);
};

const handleDelete = (flashcardIndex) => {
  dispatch(deleteFlashcard(flashcardIndex))
  setshowDeleteMessage(true)

  setTimeout(() => {
    setshowDeleteMessage(false)
  },1000)
}

const displayedFlashcards = showAllCards ? flashcards : flashcards.slice(0, maxVisibleCards);
    
  return (
    <div>
      <div
       className='flex flex-wrap gap-3 ml-2 items-center justify-center'
       >
        {displayedFlashcards.map((flashcard, flashcardIndex) => (
            <div key={flashcardIndex}  className='flex flex-shrink-0'>
              <div className='flex flex-col items-center'>
              <img src={flashcard?.mainGroup?.mainGroupImage?.mainImage} alt='' className=' w-14 h-14 rounded-full z-10 position relative top-3 shadow-md'/>
              <div className='bg-white w-72 h-48 flex flex-col space-y-2 items-center z-0'>
                <h1 className='text-[21px] font-bold mt-8'>{flashcard?.mainGroup?.mainGroupName}</h1>
                
                <p className='text-[12px] text-center max-w-[70%] max-h-4 overflow-hidden'>{flashcard?.mainGroup?.mainGroupDescription} </p>
                
                <p className='text-[16px]'>{flashcard.termGroup.length} cards</p>
                
                <nav>
                <Link to={`/termGroup/${flashcardIndex}`}>
              <button className='w-36 h-8 text-red-500 text-[16px] p-1 border border-red-500'>View Cards</button>
              </Link>
              </nav>
              <button className="text-gray-700 text-[16px] relative  bottom-1 cursor-pointer right-0"onClick={() => handleDelete(flashcardIndex)} > remove </button>
                  </div>
                </div>
              </div>
          ))}
          </div>
          
              {!showAllCards && flashcards.length > maxVisibleCards && (
        <button 
         className=' text-red-500 mt-4 float-right '
        onClick={handleSeeAll}>
          See All
        </button>
      )}
      {showDeleteMessage && (
        <motion.div 
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        exit={{ x: -1000 }}
        transition={{ duration: 0.5 }}
        className='fixed left-18 sm:left-10 max-h-fit max-w-fit bottom-8 z-50 p-1 bg-red-600 text-white rounded-md drop-shadow-md'>
        <p className=' flex items-center justify-center mr-2 text-sm lg:text-lg font-bold'> <AiFillDelete className='mr-4 text-sm lg:text-lg font-bold'/> Your Card is Deleted </p>
        </motion.div>
      )}
    </div>
  )
}
