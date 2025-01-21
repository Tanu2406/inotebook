require('dotenv').config({ path: '../.env.local' }); 
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
 const [notes, setNotes] = useState([]);
 const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
   const getNotes = async () => {
   
    try {
    const response = await fetch(`${API_BASE_URL}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
        
      }
     
    });
    const json = await response.json();
    const flatNotes = json.flat();
    setNotes(flatNotes); 
   
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

  const addNote = async (title, description, tag) => {
   
    const response = await fetch(`${API_BASE_URL}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

 
  const deleteNote = async (id) => {

      const response = await fetch(`${API_BASE_URL}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        }
        
      });
     const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    
    const response = await fetch(`${API_BASE_URL}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
 
    let newNotes = JSON.parse(JSON.stringify(notes)) 
  
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};


export default NoteState;
