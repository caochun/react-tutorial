// import logo from './logo.svg';
import 'primitive-ui/dist/css/main.css';
import React from 'react';
import Table from './Table';
import Form from './Form'


class App extends React.Component {

  url = "http://localhost:8000/characters/";

  state = {
    characters: [],
  }

  loadData() {
    fetch(this.url).then((result) => result.json()).then((result) => {
      this.setState({
        characters: result,
      })
    })
  }

  componentDidMount() {

    this.loadData();

  }

  removeCharacter = (index) => {
    const { characters } = this.state
    fetch(this.url + (index + 1), {
      method: "DELETE"
    }).then(this.loadData())
    // this.setState({
    //   characters: characters.filter((character, i) => {
    //     return i != index
    //   })
    // })

  }

  handleSubmit = character => {
    // this.setState({ characters: [...this.state.characters, character] });
    let payload = {
      id: (this.state.characters.length + 1),
      name: character.name,
      job: character.job
    }

    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(this.loadData())
      .catch((error) => {
        console.log(error)
      })
  }

  render() {


    const { characters } = this.state

    return (
      <div className='container'>
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App;
