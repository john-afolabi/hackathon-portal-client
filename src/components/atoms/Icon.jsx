import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Icon = ({ icon, onClick, ...props }) => {
    
    return (
        <StyledIcon
            icon={icon}
            onClick={onClick ? onClick : null}
            {...props}
        />
    );
};

export default Icon;

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 2.3rem;
    color: ${props => props.theme.color.white};
`;


// import styled from 'styled-components';
// import { type, Solid, Gradient } from '../index';
// // import dateIcon from '../../assets/Icon-time.png';

// export const DateIcon = styled.div`
//   width: 20px;
//   height: 23px;
//   background-image: url(${dateIcon});
//   background-repeat: no-repeat;
// `;

// export const LetterIcon = styled.div`
//   font-family: ${type.ROBOTO_MONO};
//   font-size: 20px;
//   font-weight: 500;
//   text-transform: uppercase;
//   color: ${Solid.WHITE};
//   width: 40px;
//   height: 40px;
//   background: ${Gradient.ORANGE};
//   border-radius: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;