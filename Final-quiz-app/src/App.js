import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { MyQuizzes } from "./Components/MyQuizzes/MyQuizzes";
import { CreateNew } from "./Components/CreateNew/CreateNew";
import { PlayQuiz } from "./Components/PlayQuiz/PlayQuiz";
import { Quiz } from "./Components/PlayQuiz/Quiz";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/play-quiz" element={<PlayQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
