



 
// const books=[
//   {
//     title:" india",
//     author:" abc"
//   },
//   {
//     title: "karnataka",
//     author:"prq"
//   }
// ]



//parent 
// function App() {
//   return (
//     <>
//     {books.map((book)=>{
//       return (
//         <Example a={book}/>
//       )
//     })}
    
//     </>
//   );
// }

// //child
// function Example(props){
//   return (
//     <>
//       <h1> {props.a.title}</h1>
//       <h3>{props.a.author} </h3>

//     </>
//   );
// }


//if parent function is not definied
// function App(){
//   return(
//     <> 
//     {books.map((book)=>{
//       return(
//         <> 
//        <h1>{book.title}</h1> 
//        <h5>{book.author}</h5>
//        </>
//       )
//     })
//     }
//     </>
//   )
// }

// function App(){
// const [text, setText] = useState("hello")
// const [showText, setshowText]= useState(false)
// function handleClick(){
//   setText(!text)
//   setshowText(!showText)
// }
//   return(
//     <> 
//     {text ? <h1>good</h1> : <h1>bad </h1>}
//     <button type="button" onClick={handleClick}> click here </button>
//     {showText && <h1> this will display</h1>}
//     </>
//   )
// }


// function App(){
//   return (
//     <Router>
//         <Routes>
//           <Route path="/" element ={ <Home /> } />
//           <Route path="/About" element ={ <About /> } />
//           <Route path="/Content" element ={ <Content /> } />
//           <Route path ="*" element= {<Error />} />
//         </Routes>
//     </Router>
//   )
// }
// export default App;


import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [editIndex, setEditIndex] = useState(null); // Track which user is being edited

  // Load users from localStorage on page load
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Save to localStorage whenever `users` change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Update input values
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editIndex] = data;
      setUsers(updatedUsers);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add new user
      setUsers([...users, data]);
    }

    setData({ name: "", email: "", password: "" }); // Clear input fields
  };

  // Edit user details
  const handleEdit = (index) => {
    setData(users[index]); // Fill form with existing data
    setEditIndex(index);
  };

  // Delete user from list and update localStorage
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>{editIndex !== null ? "Edit User" : "Registration Form"}</h1>
          <p>Enter the name</p>
          <input type="text" name="name" placeholder="Enter the name" value={data.name} onChange={handleChange} required />
          <p>Enter the email</p>
          <input type="email" name="email" placeholder="Enter the email" value={data.email} onChange={handleChange} required />
          <p>Password</p>
          <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} required />
          <br />
          <button type="submit">{editIndex !== null ? "Update" : "Register"}</button>
        </form>

        <h2>Registered Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

