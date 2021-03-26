import React, {Component} from 'react';
import GatheringPoints from '../Components/GatheringPoints';

class GatheringPage extends Component {
    constructor() {
        super();
        this.state = {
            selectedTerritory: '',
            selectedRegion: ''
        };
        this.toggleTerritories = this.toggleTerritories.bind(this);
        this.toggleRegions = this.toggleRegions.bind(this);
    }

    toggleTerritories(e) {
        const target = e.target;
        const text = target.innerText;

        if(!e.target.innerText) {
            return;
        } else {
            this.setState({
                selectedRegion: ''
            });
    
            if(this.state.selectedTerritory === text) {
                this.setState({
                    selectedTerritory: ''
                });
            } else {
                this.setState({
                    selectedTerritory: text
                });
            }
        }        
    }

    toggleRegions(e) {
        const target = e.target;
        const text = target.innerText;

        if(!e.target.innerText) {
            return;
        } else {
            if(this.state.selectedRegion === text) {
                this.setState({
                    selectedRegion: ''
                });
            } else {
                this.setState({
                    selectedRegion: text
                });
            }
        }
    }

    render () {
        if(this.props.obj.length > 1) {
            const url = 'https://xivapi.com' + this.props.obj[3];

            return (
                <>
                    <div>
                        <img align="right" src={url} alt="Gathering item"/>
                        <h2>{this.props.obj[0]}</h2>
                    </div>
                    <GatheringPoints 
                        gatheringItemID={this.props.obj[1]} 
                        toggleTerritories={this.toggleTerritories}
                        toggleRegions={this.toggleRegions}
                        selectedTerritory={this.state.selectedTerritory}
                        selectedRegion={this.state.selectedRegion}
                        mapData={this.props.mapData}
                    />
                </>
            );
        } else if (this.props.obj.length === 1) {
            return (
                <h3>{this.props.obj[0]}!</h3>
            );
        } else {
            return (
                <div />
            );
        }        
    }
}

export default GatheringPage;