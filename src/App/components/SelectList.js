import T from 'prop-types';

const SelectList = ({ items, ...selectProps }) => (
  <select {...selectProps}>
    {items.map(({ label, value, ...optionProps }) => (
      <option key={value} value={value} {...optionProps}>
        {label ? label : value}
      </option>
    ))}
  </select>
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
