import React, {Component} from 'react';

class GatheringMap extends Component {
    render() {
        const multiplier = window.innerWidth > 420 ? 1 : 0.75;

        return (
            <div
                className={this.props.selectedRegion.includes(this.props.nodes[0].TerritoryType.Map.PlaceName.Name) ? '' : 'invisible'} 
                id="map-container">
                <img
                    id="map"
                    src={this.props.url}
                    alt="Map"
                />
                {this.props.nodes.map((node, key) => {
                    return (
                        <img
                            src={`https://xivapi.com${node.GatheringPointBase.GatheringType.IconMain}`}
                            alt="i"
                            style= {{
                                position: 'absolute',
                                width: 32 * multiplier,
                                height: 32 * multiplier,
                                top: (this.props.mapData.filter(x => x.ID === node.ID)[0].PixelY / (window.innerWidth > 420 ? 2 : 5.12)) - (16 * multiplier),
                                left: (this.props.mapData.filter(x => x.ID === node.ID)[0].PixelX / (window.innerWidth > 420 ? 2 : 5.12)) - (16 * multiplier)
                            }}
                            key={key}
                        />
                    );
                })}
            </div>
        )
    }
}

export default GatheringMap;