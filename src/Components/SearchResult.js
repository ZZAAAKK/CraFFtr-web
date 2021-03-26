import React, {Component} from 'react';

class SearchResult extends Component {
    constructor(){
        super();
        this.state = {
            result: []
        };
    }

    componentDidMount() {
        this.setState({
            result: this.props.result
        });
    }

    handleClick = () => {
        this.props.handleClick(this.state.result);
    }

    render() {
        return (
            <>
                <tr className={this.props.selectedObj.ID === this.state.result.ID ? 'row selected' : 'row'}>
                    <td 
                        
                        onClick={this.handleClick}
                    >
                        {this.state.result['Name']}
                    </td>
                </tr>
            </>
        );
    }
}

// const SearchResult = ({res, filterBy, handleClick}) => {
//     const result = res;

//     return (
//         <>
//             <tr>
//                 <td>
//                     {result['Name']}
//                 </td>
//                 <td>
//                     <button 
//                         onClick={() => handleClick(result)}
//                     >
//                         Select this {filterBy}
//                     </button>
//                 </td>
//             </tr>
//         </>
//     );
// }

export default SearchResult;