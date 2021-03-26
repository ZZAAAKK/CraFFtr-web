import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './App.css';

import HomePage from './pages/HomePage';
import CraftingPage from './pages/CraftingPage';
import GatheringPage from './pages/GatheringPage';
import NavBar from './NavBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
      searchResults: [],
      selectedObj: [],
      selectedObjResults: [],
      lastIndex: 0,
      mapData: []
    };
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.updateSelectedObj = this.updateSelectedObj.bind(this);
    this.lookupItem = this.lookupItem.bind(this);
    this.lookupRecipe = this.lookupRecipe.bind(this);
  }

  componentDidMount() {
    const mapData = [];

    fetch('/MappyData.json')
      .then(response => response.json())
      .then(results => results.map(item => {
        mapData.push(item);
        return item;
    }));

    this.setState({
      mapData: mapData
    });
  }

  updateSearchTerm(searchTerm) {
    this.setState({searchString: searchTerm});
  }

  performSearch() {
    const url = 'https://xivapi.com/search?string=' + 
      this.state.searchString.replace(' ', '%20') + 
      '&private_key=' + process.env.REACT_APP_XIV_API_KEY;
    
    this.setState({
      selectedObj: [],
      selectedObjResults: [],
      searchResults: []
    });

    fetch(url, {mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        let items = result['Results'].map(item => {
          item.itemId = this.state.lastIndex;
          this.setState({lastIndex: this.state.lastIndex + 1});
          return item;
        });

        this.setState({
          searchResults: items
        });
      });
  }

  lookupItem(obj) {
    const url = 'https://xivapi.com' + obj.Url + '?private_key=' + process.env.REACT_APP_XIV_API_KEY;

    fetch(url, {mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        if(result.GameContentLinks.hasOwnProperty('GatheringItem')){
          this.setState({
            selectedObjResults: [
              result.Name,
              result.ID,
              result.GameContentLinks.GatheringItem.Item[0],
              result.Icon
            ]
          });
        } else {
          this.setState({
            selectedObjResults: [`${result.Name} is not a gathering item`]
          });
        }
      });
  }

  lookupRecipe(obj) {
    const url = `https://xivapi.com/recipe/${obj.ID}?columns=ID,Icon,RecipeLevelTable,AmountIngredient0,AmountIngredient1,AmountIngredient2,AmountIngredient3,AmountIngredient4,AmountIngredient5,AmountIngredient6,AmountIngredient7,AmountIngredient8,AmountIngredient9,AmountResult,ClassJob.Abbreviation,ClassJob.Icon,ItemIngredient0,ItemIngredient1,ItemIngredient2,ItemIngredient3,ItemIngredient4,ItemIngredient5,ItemIngredient6,ItemIngredient7,ItemIngredient8,ItemIngredient9,ItemIngredientRecipe0,ItemIngredientRecipe1,ItemIngredientRecipe2,ItemIngredientRecipe3,ItemIngredientRecipe4,ItemIngredientRecipe5,ItemIngredientRecipe6,ItemIngredientRecipe7,ItemIngredientRecipe8,ItemIngredientRecipe9,ItemResult`

    this.setState({
      selectedObjResults: []
    });

    fetch(url, {mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        this.setState({
          selectedObjResults: result
        });
      });
  }

  updateSelectedObj(obj) {
    this.setState({
      selectedObj: obj
    });

    if(obj['UrlType'] === 'Recipe') {
      this.lookupRecipe(obj);
    } else {
      this.lookupItem(obj);
    }
  }

  render () {
    return (
      <>
        <Router>
          <div className="app">
            <NavBar />
            <div id="page-body">
              <Switch>
                <Route path='/' render={() => 
                <>
                  <HomePage 
                    updateSearchTerm={this.updateSearchTerm}
                    updateSelectedObj={this.updateSelectedObj} 
                    performSearch={this.performSearch} 
                    searchString={this.state.searchString}
                    searchResults={this.state.searchResults}
                    selectedObj={this.state.selectedObj}
                  />
                  <GatheringPage
                    obj={this.state.selectedObjResults}
                    mapData={this.state.mapData}
                  />
                  <CraftingPage
                    obj={this.state.selectedObjResults}
                  />
                  </> }
                  exact 
                />
                <Route path='/crafting' component={CraftingPage} exact />
              </Switch>
            </div>
          </div>
        </Router>
      </>
    );
  }
}

export default App;