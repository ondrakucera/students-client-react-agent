export default function CodebookSelect({ 
  id, 
  name, 
  value, 
  onChange, 
  codebookItems, 
  showEmptyOption = false, 
  required = false,
  className = "form-select"
}) {
  return (
    <select
      id={id}
      name={name}
      className={className}
      value={value}
      onChange={onChange}
      required={required}
    >
      {showEmptyOption && <option></option>}
      {codebookItems.map((item) => (
        <option key={item.code} value={item.code}>
          {item.names.en}
        </option>
      ))}
    </select>
  );
} 