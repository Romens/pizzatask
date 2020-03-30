import React from 'react';

function CrustSelect (props) {
  const value = props.value;

  const crusts = props.crusts.map(crust => {
    return (
      <div
        key={crust.id}
        onClick={() => {
          props.action(crust.id);
        }}
        className={
          'crust-value btn btn-secondary ' +
          (value === crust.id ? ' active' : '')
        }
      >{crust.title}</div>
    );
  });

  return (
    <div className='crust-select btn-group'>
      {crusts}
    </div>
  );
}

export default CrustSelect;
