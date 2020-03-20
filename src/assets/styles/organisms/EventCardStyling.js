import styled from "styled-components";

import { IconLetterN } from "../atoms/IconLetter";
import { Paragraph } from "../atoms/Paragraph";
import Icon from "../../../components/atoms/Icon";

export const StyledEventCardN = styled.div`
  text-decoration: none;
  &:hover > div {
    ${props => props.theme.shadow.box};
    transform: translateY(5px);
    transition: box-shadow 0.2s ease, transform 0.4s ease;
  }
`;

export const EventImageN = styled.figure`
  width: 100%;
  height: 170px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const OrgImgN = styled.img`
  position: absolute;
  top: 130px;
  left: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid ${props => props.theme.color.primary.regular};
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledIconLetterN = styled(IconLetterN)`
  ${props => props.theme.flex.center};
  position: absolute;
  top: 130px;
  left: 10px;
  width: 30px;
  height: 30px;
  background-color: ${props => props.theme.color.black.regular};
  border: 1px solid ${props => props.theme.color.primary.regular};
  border-radius: 50%;
  object-fit: cover;
  color: ${props => props.theme.color.primary.regular};
`;

export const EventCardContentN = styled.div`
  width: 100%;
  height: 220px;
  padding: 10px;
  overflow: hidden;
`;

export const EventCTAN = styled.div`
  ${props => props.theme.flex.custom("space-between", "center")};
  position: absolute;
  top: calc(100% - 50px);
  left: 0;
  width: 100%;
  padding: 0 10px 5px;
`;

export const DateParagraphN = styled(Paragraph)`
  margin-bottom: 0;
  color: ${props => props.theme.color.grey.regular};
`;

export const LocationParagraphN = styled(ParagraphN)`
  margin: -5px 0 8px;
  color: ${props => props.theme.color.grey.light};
`;

export const CardCountDownN = styled.div`
  position: absolute;
  top: 20px;
  left: 70%;
  background-color: ${props => props.theme.color.white.regular};
  border: 2px solid ${props => props.theme.color.black.regular};
  border-radius: 3px;
  padding: 5px 10px;
`;

export const StyledBookmarkIconN = styled(Icon)`
  position: absolute;
  top: -5px;
  left: 10px;
  font-size: 3rem;
  color: ${props => props.theme.color.primary.regular};
  cursor: pointer;
`;

export const StyledStarIconN = styled(Icon)`
  position: absolute;
  top: 0;
  left: 11px;
  font-size: 1.8rem;
  color: ${props => props.theme.color.white.regular};
  cursor: pointer;
`;
