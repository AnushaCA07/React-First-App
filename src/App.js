import logo from './logo.svg';
import './App.css';
// import CourseList from '../src/CourseList';
import Navbar from '../src/Navbar';
  
const menu = [
  {
    Name:"HealthGrade",
    Url:"",
  },
  {
    Name: "Find A Doctor",
    Url:""
  },{
    Name: "Find a Hospital",
    Url:""
  },
  {
    Name: "Health A to Z",
    Url:""
  }];

function App() {
  return (
      <div>
        <Navbar menu = {menu}/>

          
      </div>
  ); 
}

export default App;
