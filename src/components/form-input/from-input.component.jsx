import {FormInputLabel,Input, Group} from "./form-input.styles.jsx";
const FormInput = ({ lable, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {lable && (
        <FormInputLabel
        shrink={otherProps.value.length}
        >
          {lable}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
