import React, { Component } from 'react';
import Nav from './Nav';
import './App.css';
import ItemPage from './ItemPage';
import CartPage from './CartPage';
import { items } from './static-data';

class App extends Component {
  state = {
    activeTab: 0,
    cart: [],
  };

  handleTabChange = index => {
    this.setState({
      activeTab: index
    });
  }
  renderContent() {
    switch (this.state.activeTab) {
      default:
      case 0:
        return (
          <ItemPage
            items={items}
            onAddToCart={this.handleAddToCart} />
        );
      case 1: return this.renderCart();
    }
  }

  renderCart() {
    let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId]++;
      return itemCounts;
    }, {});

    let cartItems = Object.keys(itemCounts).map(itemId => {
      var item = items.find(item => item.id === parseInt(itemId, 10));
      return {
        ...item,
        count: itemCounts[itemId]
      }
    });

    let totalCount = cartItems.reduce((totalCount, item) => {
      totalCount += item.count * item.price;
      return totalCount;
    }, 0);

    return (<CartPage
      items={cartItems}
      onAddOne={this.handleAddToCart}
      onRemoveOne={this.handleRemoveOne}
      total={totalCount.toFixed(2)} />);
  }

  handleAddToCart = item => {
    this.setState({
      cart: [...this.state.cart, item.id]
    });
  }

  handleRemoveOne = item => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1)
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <Nav onTabChange={this.handleTabChange} activeTab={this.state.activeTab} />
        <main className="App-content">
          {this.renderContent()}
        </main>
      </div>
    );
  }
}

export default App;
