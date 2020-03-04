import styled from "styled-components";

import { useField } from "formik";
import styled from "styled-components";
import CheckGroup from '../molecules/CheckGroup';
import Label from "./Label";

function Checkbox({label, ...props}) {
  const [field] = useField(props);

  return (
    <CheckGroup>
      <StyledCheckboxField id={props.value} type="checkbox" {...field} {...props}/>
      <Label htmlFor={props.value}>{label}</Label>
    </CheckGroup>
  );
}

export default Checkbox;

const StyledCheckboxField = styled.input`
  width: 20px;
  height: 20px;
  margin: 0 20px 10px 0;
`;

// const CheckGroup = styled.div`
//   width: ${props => props.short ? "120px" : "180px"};
//   label {
//     font-weight: normal;
//   }
// `;

// export default CheckGroup;