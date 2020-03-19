import React from "react";
import { RowBodyN } from "../../assets/styles/atoms/RowBody";
import { ErrorSpanN } from "../../assets/styles/atoms/Span";
import { ErrorMessage } from "formik";
import Input from "../atoms/Input";
import {LabelN} from "../../assets/styles/atoms/Label";
import { ColumnN } from "../../assets/styles/atoms/Column";
import { ParagraphN } from "../../assets/styles/atoms/Paragraph";

   
const ProjectTitle = (props) => {

  const currentEvent = props.currentEvent

    return (
        <>
              <RowBodyN>
                <ParagraphN>
                  You are making a submission for the{" "}
                  <strong>{currentEvent.event_title}</strong>. Please ensure you
                  have read the event guidelines and have gone through the
                  grading rubrics for this event before you make your
                  submission.
                </ParagraphN>
              </RowBodyN>
              <RowBodyN>
                <ColumnN>
                  <LabelN htmlFor="project_title">Project Title</LabelN>
                  <Input
                    type="text"
                    id="project_title"
                    name="project_title"
                    display="wide"
                  />
                  <ErrorSpanN>
                    <ErrorMessage name="project_title" component="div" />
                  </ErrorSpanN>
                </ColumnN>
                <ColumnN>
                  <LabelN htmlFor="participant_or_team_nam">
                    Team/Participant name
                  </LabelN>
                  <Input
                    type="text"
                    name="participant_or_team_name"
                    id="participant_or_team_name"
                    display="wide"
                  />
                  <ErrorSpanN>
                    <ErrorMessage
                      name="participant_or_team_name"
                      component="div"
                    />
                  </ErrorSpanN>
                </ColumnN>
              </RowBodyN>
              </>
    )}

    export default ProjectTitle;