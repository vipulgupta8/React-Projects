
import { createSlice } from "@reduxjs/toolkit";


const localStoreData = localStorage.getItem("Flashcard");
let parsedData = null;

try {
  parsedData = JSON.parse(localStoreData);
} catch (error) {
  console.error("Error parsing JSON:", error);
}



const initialState = {
  flashcards: parsedData ? parsedData : [], 
};

const flashcardSlice = createSlice({
  name: "flashcard", 
  initialState, 
  reducers: {
    
    addFlashcard: (state, action) => {
      state.flashcards.unshift(action.payload);
      
      localStorage.setItem("Flashcard", JSON.stringify(state.flashcards));
    },
    deleteFlashcard: (state, action) => {
      const flashcardIndex = action.payload;
      
      state.flashcards.splice(flashcardIndex, 1);
      
      localStorage.setItem("Flashcard", JSON.stringify(state.flashcards));
    },
  },
});


export const selectAll = (state) => state.flashcard.flashcards;



export const { addFlashcard, deleteFlashcard } = flashcardSlice.actions;


export default flashcardSlice.reducer;
