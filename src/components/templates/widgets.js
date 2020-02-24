import React, { useEffect, useRef } from "react";
import { addParticipantTeamMember, sendParticipantInvite } from "../../store/participantTeams/actions";
import Button from "../atoms/Button";
import { RowBody } from "../atoms/RowBody";
import { StyledContainer, Container, StyledWidget } from "../styles/templates/AppParticipantTeams";



const handleSubmit = (props) => {
    const data = {
        team_id: props.teamId,
        team_member: props.selectedUser.id,
        eventId: props.eventId
    };
    props.dispatch(addParticipantTeamMember(data, props.history));
};

const sendInvite = (props) => {

    const teamId = props.teamId;
    const eventId = props.eventId;

    const data = {
        teamId,
        email: props.noneUser,
        eventId
    };
    props.dispatch(sendParticipantInvite(data, props.history))
}
const redirect = (props, location = "/dashboard") => {
    props.history.push(location);
};


export const UserWidget = ({ user, select, ...otherProps }) => {
    return (
        <StyledWidget key={user.id} onClick={() => select(user)} {...otherProps}>
            {user.email}
        </StyledWidget>
    );
};

export const SearchWidget = (props) => {
    const history = props.history;
    const searchString = props.searchString;
    const setSearchString = props.setSearchString;
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <Container display="wide">
            <input
                type="text"
                value={searchString}
                onChange={e => {
                    setSearchString(e.target.value);
                }}
                placeholder="Search by email"
                ref={inputRef}
            />
            {props.matches.map(user => (
                <UserWidget key={user.id} user={user} select={props.setSelectedUser} />
            ))}
            {
                !!props.matches && props.validateEmail(searchString) ? props.setNoneUser(searchString) : props.setNoneUser(null)
            }
            <Button color="grey" onClick={(history) => redirect(history)}>
                Back to dashboard
        </Button>
        </Container>
    );
};

export const RoleWidget = (props) => {

    const selectedUser = props.selectedUser;

    return (
        <StyledContainer>
            <RowBody direction="column-reverse">
                <h6>
                    You are adding{" "}
                    <span style={{ color: "#273F92", backgroundColor: "aliceblue" }}>
                        {selectedUser.email}
                    </span>{" "}
                    to your team
          </h6>
            </RowBody>
            <RowBody>
                <Button color="grey" onClick={() => redirect()}>
                    Back to dashboard
          </Button>
                <Button color="green" onClick={(selectedUser) => handleSubmit(selectedUser)}>
                    Add teammate
          </Button>
            </RowBody>
        </StyledContainer>
    );
};

export const InviteWidget = (props) => {

    const noneUser = props.noneUser;

    return (
        <StyledContainer>
            <RowBody direction="column-reverse">
                <h6>
                    This user is not on this platform.
            click send to invite {" "}
                    <span style={{ color: "#273F92", backgroundColor: "aliceblue" }}>
                        {noneUser}
                    </span>{" "}
                    to join your team
          </h6>
            </RowBody>
            <RowBody>
                <Button color="green" onClick={(noneUser) => sendInvite(noneUser)}>
                    Send Invite
          </Button>
            </RowBody>
        </StyledContainer>
    );
};