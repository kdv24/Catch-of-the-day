import React        from 'react';
import Header       from './Header';
import Order        from './Order';
import Inventory    from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish         from './Fish';
import base         from '../base';


export default class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        // sync with name of the firebase store
        const { params } = this.props.match;
        // first reinstate local Storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        // copy existing state (don't mutate state)
        const fishes = {...this.state.fishes};
        // add new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // set the new fishes object to state
        this.setState({ fishes });
    }

    updateFish = (key, updatedFish) => {
        // copy current state
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder = key => {
        // take a copy of state
        const order = {...this.state.order};
        // add to order or update quantity
        order[key] = order[key] + 1 || 1;
        // call set state to update state object
        this.setState({ order });
    }

    deleteFromOrder = key => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }

    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline='Fresh Seafood Market' />
                    <ul className="fishes"></ul>
                    {Object.keys(this.state.fishes).map(key => 
                        <Fish 
                            key={key} 
                            index={key} 
                            details={this.state.fishes[key]} 
                            addToOrder={this.addToOrder}
                         />
                        )}
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    deleteFromOrder={this.deleteFromOrder}
                 />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                />
            </div>
        );
    }
}