import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './CartPage.css';
import Total from './Total';

function CartPage({ items, onAddOne, onRemoveOne, total }) {
  if (items.length===0) {
    return (
      <span className="CartPage-empty">
        Your cart is empty.<br/>
        Why not add some expensive products to it?
      </span>);

  } else {
    return [
      <ul className="CartPage-items" key={0}>
        {items.map(item =>
          <li key={item.id} className="CartPage-item">
            <Item item={item} >
              <div className="CartItem-controls">
                <button className="CartItem-removeOne" onClick={() => onRemoveOne(item)}>&ndash;</button>
                <span className="CartItem-count">{item.count}</span>
                <button className="CartItem-addOne" onClick={() => onAddOne(item)}>+</button>
              </div>
            </Item>
          </li>
        )}
      </ul>,
      <Total key={1} total={total} />
    ];

  }

}

CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

export default CartPage;