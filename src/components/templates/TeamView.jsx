import React, { useEffect } from "react";
import {
  TeamsContainer,
  FancyBoldSpan,
  StyledLetterIcon,
  NormalSpan,
  DivWrapper,
  ImgTeammates,
  TeamMemberImg,
  BtnContainer
} from "../../assets/styles/templates/TeamViewStyling";
// import { RowHead } from "../../assets/styles/atoms/RowHeadStyling";
// import { H3 } from "../../assets/styles/atoms/HeadingStyling";
import Button from "../atoms/Button";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTeammates } from "../../hooks";
import user_icon from "../../assets/images/user_icon.svg";

const TeamView = ({ team, addTeamMemberHandler, setRegisterTeam }) => {
  const { id } = useParams();

  const { event_title } = useSelector(state =>
    state.events.data.find(event => event.id === Number(id))
  );

  const [teammates, fetchTeammates] = useTeammates(team?.id);
  const initial = team?.team_name[0] || "U";

  let memberProfile;

  useEffect(() => {
    fetchTeammates();
  }, [fetchTeammates]);

  return (
    <TeamsContainer>
      <StyledLetterIcon icon="">{initial}</StyledLetterIcon>
      <FancyBoldSpan>Your Team</FancyBoldSpan>
      <FancyBoldSpan>
        Team Name:
        <NormalSpan>{team.team_name}</NormalSpan>
      </FancyBoldSpan>
      <FancyBoldSpan style={{ borderBottom: "none" }}>
        Team Members:
      </FancyBoldSpan>
      {teammates.length !== 0 ? (
        <DivWrapper>
          {teammates.map((member, i) =>
            member.team_member_avatar === null ? (
              <ImgTeammates
                key={i}
                alt="team member profile pic"
                src={user_icon}
              />
            ) : (
              member.team_member_avatar.map((mem, index) => {
                memberProfile = JSON.parse(mem);
                return (
                  <TeamMemberImg
                    alt="team member profile pic"
                    src={memberProfile.avatar}
                  />
                );
              })
            )
          )}
        </DivWrapper>
      ) : (
        <FancyBoldSpan>This team has no members</FancyBoldSpan>
      )}
      <FancyBoldSpan>
        Hackathon Name:
        <NormalSpan>{event_title}</NormalSpan>
      </FancyBoldSpan>
      <BtnContainer>
        <Button color="grey" size="half" onClick={() => setRegisterTeam(false)}>
          Back to event
        </Button>
        <Button
          color="green"
          size="half"
          onClick={() => addTeamMemberHandler(true, team.id)}
        >
          Add Teammate
        </Button>
      </BtnContainer>
    </TeamsContainer>
  );
};

export default TeamView;
