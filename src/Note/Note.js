import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import PropTypes from 'proptypes';
import ApiContext from '../ApiContext';
import './Note.css'
import { nominalTypeHack } from 'prop-types';

export default class Note extends Component {
  constructor(props){
  super(props);
  this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  static defaultProps={
    onDeletenote: () => { },

  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    this.props.history.push('/');
    this.context.deleteNote(noteId);
  }

  render() {
    const {notes} = this.context;
    let noteList =[];
    let selectedId = this.props.match.params.folderId;
  
    if(selectedId) {
      console.log(notes);
      console.log(selectedId);
      noteList = notes.filter(note => 
        note.folder_Id == Number(selectedId));
        console.log(noteList);
        noteList = noteList.map(note => {
          return <Note 
          key={note.id}
          history={this.props.history}
          id={note.id}
          name={note.note_name}
          dateMod={note.date_created}
          />
        
      })
    
console.log("Filtered Notes: " +  noteList);
  }else{
    noteList = notes.map(note => {
    
    
    return <Note 
     key={note.id}
      history={this.props.history}
      id={note.id}
      name={note.note_name}
      />
    