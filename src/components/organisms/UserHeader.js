import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { WideHeader } from "../../assets/styles/atoms/WideHeader";
import { HeaderContainer } from "../../assets/styles/atoms/HeaderContainer";
import Logo from "../atoms/Logo";
// import Nav from "../organisms/Nav";
import { ProfileImg } from "../atoms/ProfileImg";
import Dropdown from "../atoms/DropDown";

const UserHeader = () => {
  const { email: user } = useSelector(state => state.currentUser);

  const initial = user[0].toUpperCase();

  const Navigation = styled.div`
    display: flex;
    align-items: center;
  `;

  return (
    <WideHeader>
      <HeaderContainer>
        <Link to="/dashboard">
          <Logo />
        </Link>
        <Navigation>
          {/* <Nav type="mobile" /> */}
          <ProfileImg>
            {initial}
            <Dropdown className="row2tab" />
          </ProfileImg>
        </Navigation>
      </HeaderContainer>
    </WideHeader>
  );
};

export default UserHeader;
