import React from 'react';

function SizeSelect (props) {
  const value = props.value;

  const sizes = props.sizes.map(size => {
    return (
      <div
        key={size.id}
        onClick={() => {
          props.action(size.id);
        }}
        title={size.persons + ' persons'}
        className={
          'size-value btn btn-secondary ' +
          (value === size.id ? ' active' : '')
        }
      >{size.title} cm</div>
    );
  });

  return (
    <div className='size-select btn-group'>
      {sizes}
    </div>
  );
}

export default SizeSelect;
