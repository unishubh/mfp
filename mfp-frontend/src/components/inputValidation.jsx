import React from 'react';
import { Content, Row, Col, Inputs, LoginCore } from "adminlte-2-react";

const { Text } = Inputs;

const InputValidation = ({
	className,
	placeholder,
	label,
	labelPosition,
	iconLeft,
	iconRight,
	field,
	form,
	value
  }) => {
	const onChange = valor => {
	  form.setFieldValue(field.name, valor.target.value);
	};
  
	const onBlur = e => {
	  const { handleBlur } = form;
	  handleBlur(e);
	};
  
	const getValue = () => {
	  return value;
	};
  
	return (
	  <Text
		className={className}
		name={field.name}
		value={getValue()}
		onChange={onChange}
		onBlur={onBlur}
		placeholder={placeholder}
		label={label}
		labelPosition={labelPosition}
		iconLeft={iconLeft}
		iconRight={iconRight}
	  />
	);
  };

  export default InputValidation;