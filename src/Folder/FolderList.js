import React from 'react';
import Folder from '../Folder'
import NotefulContext from '../ApiContext'
import AddFolder from '../AddFolder/AddFolder'

export default class FolderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAddFolder: false
    }
  }
  static contextType = NotefulContext;

  handleAddFolder = () => {
    this.setState({
      displayAddFolder: true
    })
  }

  resetAddFolderState = () => {
    this.setState({
      displayAddFolder: false
    })
  }

  renderCreateNewFolderButton() {
    return (
      <button onClick={this.handleAddFolder}>Add Folder</button>
    )
  }

  renderNewFolderForm() {
    return (
      <AddFolder
        active={this.state.displayAddFolder}
        resetFunction={this.resetAddFolderState}
      />
    )
  }

  render() {
    const { folders } = this.context;
    let folderList = [];
    let lookupId = this.props.match.params.folderId;

    if(lookupId) {
      console.log(folders);
      let selectedFolder = folders[(lookupId -1)];
    
    console.log(selectedFolder);
    folderList =<Folder
    key={selectedFolder.Id}
    id={selectedFolder.Id}
    name={selectedFolder.folder_name} />

  }
   else { 
    folderList=folders.map(folder => {
      return <Folder
      key={folder.Id}
      id={folder.Id}
      name={folder.folder_name}
        />
      })
    }

    return (
      <div>
        <ul>
          {folderList}
        </ul>
        {this.state.displayAddFolder && this.renderNewFolderForm()}
        {!this.state.displayAddFolder && this.renderCreateNewFolderButton()}
      </div>
    )
  }
}
