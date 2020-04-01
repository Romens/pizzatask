import React from 'react';
import PizzaMiniView from './PizzaMiniView';

function PizzaList (props) {
  const list = props.list.map(pizza => {
    return <PizzaMiniView key={pizza.id} pizza={pizza} />;
  });

  return (
    <div className='pizza-list row-cols-1 row-cols-sm-2 row-cols-md-3'>
      {list}
    </div>
  );
}

export default PizzaList;
