import React, {Component} from 'react';
import {FaAngleRight, FaAngleDown} from 'react-icons/fa';
import GatheringMap from '../Components/GatheringMap';

class GatheringPoints extends Component {
    constructor() {
        super();
        this.state = {
            gatheringPoints: [],
            gatheringPointData: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const url = 'https://xivapi.com/GatheringPoint?limit=-1&columns=ID,GatheringPointBase.ID,GatheringPointBase.GatheringLevel,GatheringPointBase.GatheringType.ID,GatheringPointBase.GatheringType.Name,GatheringPointBase.GatheringType.IconMain,TerritoryType.Map.ID,TerritoryType.Map.PlaceNameRegion.Name,TerritoryType.Map.PlaceName.Name,GatheringPointBase.Item0.Item.ID,GatheringPointBase.Item1.Item.ID,GatheringPointBase.Item2.Item.ID,GatheringPointBase.Item3.Item.ID,GatheringPointBase.Item4.Item.ID,GatheringPointBase.Item5.Item.ID,GatheringPointBase.Item6.Item.ID,GatheringPointBase.Item7.Item.ID,PlaceName.Name,TerritoryType.Map.MapFilename';
        
        fetch(url, {mode: 'cors'})
            .then(response => response.json())
            .then(results => {
                const items = results.Results.map(item => {
                    return item;
                });

                this.setState({
                    gatheringPoints: items
                });
            });
    }

    render() {
        if(this.state.gatheringPoints.length === 0){
            return <h3>Loading...</h3>
        }
        
        const returnItems = [];
        for (let i = 0; i < this.state.gatheringPoints.length; i++) {
            for (let j in [0, 1, 2, 3, 4, 5, 6, 7]) {
                if (this.state.gatheringPoints[i].GatheringPointBase[`Item${j}`].Item.ID === this.props.gatheringItemID) {
                    returnItems.push(this.state.gatheringPoints[i]);
                }
            }
        }

        const territories = [];
        for(let i = 0; i < returnItems.length; i++) {
            if(!territories.includes(returnItems[i].TerritoryType.Map.PlaceNameRegion.Name)) {                
                territories.push(returnItems[i].TerritoryType.Map.PlaceNameRegion.Name);
            }
        }

        const regions = [];
        for(let i = 0; i < returnItems.length; i++) {
            if(!regions.includes(returnItems[i].TerritoryType.Map.PlaceName.Name)) {
                regions.push(returnItems[i].TerritoryType.Map.PlaceName.Name);
            }
        }

        const places = [];
        for(let i = 0; i < returnItems.length; i++) {
            if(!places.includes(returnItems[i].PlaceName.Name)) {
                places.push(returnItems[i].PlaceName.Name);
            }
        }

        const nodes = [];
        const mapData = this.props.mapData;
        for(let i = 0; i < mapData.length; i++) {
            for(let j = 0; j < returnItems.length; j++) {
                if(returnItems[j].ID === mapData[i].ID) {
                    nodes.push(mapData[i]);
                }
            }
        }
        
        return (
            <>
            {territories.map((territory, key) => {
                if(territory !== null) {
                    return (
                        <React.Fragment key={key}>
                            <h2 onClick={this.props.toggleTerritories}>{this.props.selectedTerritory.includes(territory) ? <FaAngleDown /> : <FaAngleRight />} {territory} ({returnItems.filter(x => x.TerritoryType.Map.PlaceNameRegion.Name === territory).length} nodes)</h2>
                            {regions.map((region, key) => {
                                if(returnItems.filter(x => x.TerritoryType.Map.PlaceNameRegion.Name === territory && x.TerritoryType.Map.PlaceName.Name === region).length > 0) {
                                    return (
                                        <div key={key} className={this.props.selectedTerritory.includes(territory) ? '' : 'invisible'}>
                                        <h3 onClick={this.props.toggleRegions}>{this.props.selectedRegion.includes(region) ? <FaAngleDown /> : <FaAngleRight />} {region}</h3>
                                        {/* <div className="limiter">
                                        <div className='wrap-table100'>
                                            <table className={this.props.selectedRegion.includes(region) ? 'table' : 'collapsed'}>
                                                <thead>
                                                    <tr className="row header">
                                                        <th>Place Name</th>
                                                        <th>X</th>
                                                        <th>Y</th>
                                                        <th>Z</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {returnItems.map((item, key) => {
                                                        if(item.TerritoryType.Map.PlaceName.Name === region && item.TerritoryType.Map.PlaceNameRegion.Name === territory) {
                                                            return <tr className="row" key={key}>
                                                                <td>{item.PlaceName.Name}</td>
                                                                <td>{mapData.filter(x => x.ID === item.ID)[0].PosX.toFixed(1)}</td>
                                                                <td>{mapData.filter(x => x.ID === item.ID)[0].PosY.toFixed(1)}</td>
                                                                <td>{mapData.filter(x => x.ID === item.ID)[0].PosZ.toFixed(1)}</td>
                                                            </tr>;
                                                        } else {
                                                            return <tr className='collapsed' key={key}/>
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>  */}
                                            <GatheringMap
                                                url={`https://xivapi.com${returnItems.filter(x => x.TerritoryType.Map.PlaceName.Name === region)[0].TerritoryType.Map.MapFilename}`}
                                                nodes={returnItems.filter(x => x.TerritoryType.Map.PlaceName.Name === region)}
                                                mapData={mapData}
                                                selectedRegion={this.props.selectedRegion}
                                            /> 
                                        </div>
                                    )
                                } else {
                                    return <div className='invisible' key={key}/>
                                }
                            })}                                                
                        </React.Fragment>
                    );
                } else {
                    return (
                        <div key={key}/>
                    );
                }
            })}            
            </>
        );    
    }
}

export default GatheringPoints;