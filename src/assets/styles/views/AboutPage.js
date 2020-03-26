import styled from 'styled-components';


export const AboutContainer = styled.div`
    width: 100%; height:100%;
    background-color: ${props => props.theme.color.white.bg};
    overflow-y: scroll;
    border: 3px solid ${props => props.theme.color.primary.regular};
    &::-webkit-scrollbar {
        height: 0; width: 0;
    }
`;

export const AboutHeaderContainer = styled.div`
    ${props => props.theme.flex.columnCenter};
    width: 100%; height: 60vh;
    background-color: ${props => props.theme.color.primary.regular};
    clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%);
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%);
`;

export const HeroContainer = styled.div`
    ${props => props.theme.flex.columnCenter};
    margin-top: -100px;
`;

export const HeroText = styled.div`
    ${props => props.theme.shadow.text};
    padding: 5px 10px 10px;
    font-size: 24px;
    color: ${props => props.theme.color.white.regular};
`;

export const MainContent = styled.div`
    ${props => props.theme.shadow.box};
    position: relative;
    width: 90%; max-width: 1000px;
    background-color: ${props => props.theme.color.white.regular};
    margin: -100px auto;
    border-radius: 3px;
    z-index: 1;
`;

export const SectionTitle = styled.h1`
    ${props => props.theme.flex.columnCenter};
    margin-bottom: 15px; padding-top: 30px;
    text-transform: uppercase; text-align: center;
    font-size: 25px;

    & > hr {
        ${({ lineWidth }) => lineWidth ? `width: ${lineWidth};` : 'width: 20%'};
        height: 3px;
        background-color: ${props => props.theme.color.primary.regular};
    }
`;

export const TeamContainer = styled.div`
    /* display: grid;
    grid-template-columns: repeat(autofill, minmax( 250px, 1fr)); */
    ${({theme}) => theme.flex.custom('space-evenly', 'flex-start', 'row', 'wrap')};
    margin: 0 auto 10px;
`;

export const StyledCard = styled.div`
    width: calc((100% / 3) - 10px); min-width: 250px;
    height: 250px;
    border: 2px solid ${props => props.theme.color.primary.regular};
    margin: 5px 2.5px;

    &:hover {
        ${props => props.theme.shadow.box};
    }
`;

export const Paragraph = styled.p`
    width: 100%;
    margin-top: -10px;
    text-align: center;
    font-size: 19px;
`;

export const FeaturesContainer = styled.div`
    ${({theme}) => theme.flex.custom('space-around', 'flex-start', 'row', 'wrap')};
    margin: 30px auto 0;
`;

export const FeatureBox = styled.div`
    ${({theme}) => theme.flex.custom('flex-start', 'center', 'column')};
    width: calc((100% / 3) - 10px); min-width: 200px;
    height: 300px;

    & > img {
        width: 50%; min-width: 100px;
        object-fit: cover;
    }
`;

export const FeatureTitle = styled.h2`
    margin-top: 5px;
    font-size: 20px; letter-spacing: 2px;
    font-weight: bolder;
`;

export const FeatureDescription = styled.p`
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
    color: #00C4CC;
`;