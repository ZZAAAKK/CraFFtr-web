import React, {Component} from 'react';
import SearchResult from '../Components/SearchResult';

class HomePage extends Component {
    handleSearch = (e) => {
        e.preventDefault();
        this.props.performSearch();
    }

    handleChange = (e) => {
        this.props.updateSearchTerm(e.target.value);
    }

    handleClick = (e) => {
        this.props.updateSelectedObj(e);
    }

    render() {
        let listItems = this.props.searchResults.filter(x => x['UrlType'] === "Item");
        listItems = listItems.map((result, id) => 
            <React.Fragment key={id}>
                <SearchResult 
                    result={result} 
                    filterBy={"item"}
                    handleClick={this.handleClick}
                    selectedObj={this.props.selectedObj}
                />
            </React.Fragment>
        );

        let listRecipes = this.props.searchResults.filter(x => x['UrlType'] === "Recipe");
        listRecipes = listRecipes.map((result, id) => 
            <React.Fragment key={id}>
                <SearchResult 
                    result={result} 
                    filterBy={"recipe"}
                    handleClick={this.handleClick}
                    selectedObj={this.props.selectedObj}
                />
            </React.Fragment>
        );

        return (
            <>
            <form id="searchForm" onSubmit={this.handleSearch}>
                <p>Search for an item to get started:</p>
                <input 
                    type="text"
                    placeholder="Type here to search..."
                    value={this.props.searchString}
                    onChange={this.handleChange}
                />
                <button
                    type="submit"
                    className=""
                >
                    Search
                </button>
            </form>
            <p className={listItems.length === 0 ? 'invisible' : ''}></p>
            <table className={listItems.length === 0 ? 'invisible' : 'table'}>
                <thead>
                <tr className="row header">
                    <th>Items</th>
                </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </table>
            <p className={listRecipes.length === 0 ? 'invisible' : ''}></p>
            <table className={listRecipes.length === 0 ? 'invisible' : 'table'}>
                <thead>
                <tr className="row header">
                    <th>Recipes</th>
                </tr>
                </thead>
                <tbody>{listRecipes}</tbody>
            </table>
            </>
        );
    }
}

export default HomePage;