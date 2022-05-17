import T from 'prop-types';

import ConditionalRender from './ConditionalRender';

const SelectList = ({ items, label, ...selectProps }) => (
  <div className='SelectList'>
    <ConditionalRender
      Component={<label>{label}</label>}
      shouldRender={!!label}
    />
    <select {...selectProps}>
      {items.map(({ label, value, ...optionProps }) => (
        <option key={value} value={value} {...optionProps}>
          {label ? label : value}
        </option>
      ))}
    </select>
  </div>
);

SelectList.propTypes = {
  items: T.arrayOf(
    T.shape({
      label: T.string,
      value: T.oneOfType([T.string, T.number]).isRequired,
    })
  ).isRequired,
};

export default SelectList;
