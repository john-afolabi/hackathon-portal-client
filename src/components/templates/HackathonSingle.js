import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  PTags,
  TitleContainer,
  TagsGroup,
  ModalBody,
  StyledEventCard,
  EventCardLeftColumn,
  EventImageContainer,
  EventImg,
  StyledIcon,
  StyledParagraph
} from "../../assets/styles/templates/HackathonSingleStyling";
import { H2 } from "../../assets/styles/atoms/HeadingStyling";
import { ExitButton } from "../../assets/styles/atoms/ExitButtonStyling";
import Icon from "../atoms/Icon";
import EventJudges from "../organisms/EventJudges";
import HSTagsCard from "../organisms/HSTagsCard";
import ContentTitle from "../molecules/ContentTitle";
import HackathonProjectsPage from "../views/HackathonProjectsPage";
import ParticipantSubmissionPage from "../views/ParticipantSubmissionPage";
import AddTeammates from "../templates/AddTeammates";
import CreateTeam from "../templates/CreateTeam";
import eventImg from "../../assets/images/event-img.jpg";
import Spinner from "../molecules/Spinner";
import {
  registerEvent,
  unregisterEvent
} from "../../store/eventParticipants/actions";
import { useParticipants, useEventTeam, useTeams, useEvent } from "../../hooks";

const HackathonSingle = ({ isSideBarOpen }) => {
  const { id } = useParams();
  const [isAddJudgeOpen, setIsAddJudgeOpen] = useState(false);
  const [isSubmissionsPageOpen, setIsSubmissionsPageOpen] = useState(false);
  const [isSubmitProjectOpen, setIsSubmitProjectOpen] = useState(false);
  const [registerTeam, setRegisterTeam] = useState(false);
  // //!!REMOVE THIS BIT AND ALL CORRELATED STYLES
  // const [isSlideForm, setIsSlideForm] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[1];
  const { userId } = useSelector(state => state.currentUser);
  const [participants, fetchParticipants] = useParticipants(id);
  const [team] = useEventTeam(id);
  const [teams] = useTeams(id);
  const createdTeam = teams.find(t => t.team_lead === userId);
  const [data, loading] = useEvent(id);

  // Filter out event by URL param & grab user ID
  const [
    {
      creator_id,
      event_title,
      event_description: description,
      start_date,
      end_date,
      guidelines,
      participation_type,
      tag_name,
      location,
      organizer_email,
      organizer_name,
      organizer_profile_pic,
      rubrics
    }
  ] = data?.body || [
    {
      creator_id: 0,
      event_title: "",
      event_description: "",
      start_date: null,
      end_date: null,
      guidelines: "",
      participation_type: "",
      tag_name: [],
      location: "",
      organizer_email: "",
      organizer_name: "",
      organizer_profile_pic: [],
      rubrics: []
    }
  ];

  const userCallback = p => p.user_id === userId;
  const isTeamLead = createdTeam;
  const isRegistered = participants.find(userCallback) || isTeamLead;

  // Redacting user emails before rendering
  let redactedEmail = organizer_email.split("");
  let atIndex = redactedEmail.indexOf("@");
  let emailUser = redactedEmail.slice(0, atIndex);
  let emailHost = redactedEmail.slice(atIndex, redactedEmail.length);

  emailUser = emailUser
    .map((redact, index) => {
      if (index === 0 || index === emailUser.length - 1) {
        return redact;
      } else {
        redact = "*";
        return redact;
      }
    })
    .concat(emailHost)
    .join("");

  const handleRegistration = e => {
    e.preventDefault();
    if (isRegistered) {
      dispatch(unregisterEvent(id, history));
    } else {
      dispatch(registerEvent(id, history));
    }
    return fetchParticipants();
  };

  const handleTeamRegistration = () => {
    setRegisterTeam(true);
  };

  const toTittleCase = item => {
    return item
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleExit = () => {
    history.push(`/${currentPath}`);
  };

  const renderSingleEvent = () => {
    return (
      <ModalBody>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <StyledEventCard menuOpen={isSideBarOpen}>
              <EventCardLeftColumn>
                <TitleContainer>
                  <StyledIcon icon={["fab", "connectdevelop"]} />
                  <H2>{event_title}</H2>
                  <StyledIcon icon={["fab", "connectdevelop"]} />
                </TitleContainer>
                <EventImageContainer>
                  {/* Here it will go image of the event */}
                  <EventImg src={eventImg} alt="event-image" />
                </EventImageContainer>
                <ContentTitle text="Judges" />
                <EventJudges {...{ team }} />
                <ContentTitle text="About this event" />
                <StyledParagraph>{description}</StyledParagraph>
                <ContentTitle text="Guidelines" />
                <StyledParagraph>{guidelines}</StyledParagraph>
                <ContentTitle text="Rubrics" />
                <TagsGroup>
                  {rubrics.map(rubric => {
                    return <PTags key={rubric}>{toTittleCase(rubric)}</PTags>;
                  })}
                </TagsGroup>
                <ContentTitle text="Event Tags" />
                <TagsGroup>
                  {tag_name && tag_name.length !== 0 ? (
                    tag_name.map((tagged, index) => {
                      return <PTags key={index}>{tagged}</PTags>;
                    })
                  ) : (
                    <StyledParagraph>No tags provided for this event</StyledParagraph>
                  )}
                </TagsGroup>
              </EventCardLeftColumn>
              <HSTagsCard
                {...{ isSideBarOpen }}
                {...{ start_date }}
                {...{ end_date }}
                {...{ team }}
                {...{ participants }}
                {...{ organizer_profile_pic }}
                {...{ participation_type }}
                {...{ location }}
                {...{ creator_id }}
                {...{ isTeamLead }}
                {...{ isRegistered }}
                {...{ organizer_name }}
                {...{ userId }}
                {...{ id }}
                {...{ setIsAddJudgeOpen }}
                {...{ setRegisterTeam }}
                {...{ setIsSubmitProjectOpen }}
                {...{ setIsSubmissionsPageOpen }}
                {...{ handleRegistration }}
                {...{ handleTeamRegistration }}
                {...{ userCallback }}
                {...{ emailUser }}
              />
            </StyledEventCard>
          </>
        )}
        <ExitButton onClick={handleExit} color="primary">
          <Icon icon="times" />
        </ExitButton>
      </ModalBody>
    );
  };

  if (registerTeam) {
    return (
      <>
        {renderSingleEvent()}
        <CreateTeam {...{ id }} {...{setRegisterTeam}} />
      </>
    );
  }

  if (isAddJudgeOpen) {
    return (
      <>
        {renderSingleEvent()}
        <AddTeammates {...{ id }} {...{ setIsAddJudgeOpen }} />
      </>
    );
  }

  if (isSubmissionsPageOpen) {
    return (
      <>
        {renderSingleEvent()}
        <HackathonProjectsPage {...{ id }} {...{ setIsSubmissionsPageOpen }} />
      </>
    );
  }

  if (isSubmitProjectOpen) {
    return (
      <>
        {renderSingleEvent()}
        <ParticipantSubmissionPage
          {...{ id }}
          {...{ setIsSubmitProjectOpen }}
        />
      </>
    );
  }

  return renderSingleEvent();
};

export default HackathonSingle;
