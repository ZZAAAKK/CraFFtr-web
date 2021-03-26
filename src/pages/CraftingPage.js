import React, {Component} from 'react';

class CraftingPage extends Component {
    constructor() {
        super();
        this.state = {
            itemToBeCrafted: [],
            ingredientAmounts: [],
            ingredients: []
        };
    }

    render() {
        if(this.props.obj.hasOwnProperty('AmountIngredient0')) {
            const ingredientAmounts = [];
            const ingredients = [];
            const ingredientRecipes = [];

            for(let i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
                ingredientAmounts.push(this.props.obj[`AmountIngredient${i}`]);
                ingredients.push(this.props.obj[`ItemIngredient${i}`]);
                ingredientRecipes.push(this.props.obj[`ItemIngredientRecipe${i}`]);
            }

            console.log(this.props.obj.ItemResult.Name);
            console.log(ingredientAmounts);
            console.log(ingredients);
            console.log(ingredientRecipes);

            return (
                <>
                <ul>
                    {ingredientAmounts.map((ingredient, index) => {
                        if(ingredient > 0) {
                            return <li>{ingredients[index].Name} (x{ingredient}){ingredientRecipes[index] !== null ? ' [is a recipe]' : ''}</li>
                        }
                    })}
                </ul>
                </>
            )
        } else {
            return <div className="invisible" />
        }        
    }
}

export default CraftingPage;