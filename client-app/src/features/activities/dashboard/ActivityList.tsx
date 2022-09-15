import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

//C:\Users\tomng\Reactivity\client-app\src\app\models\activity.ts
interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

//some ternary conditions to decide color and UI comes from sematic UI react
export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: Props) {
  const [target, setTarget] = useState("");

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
//THIS IS THE FRONT SCREEN OF ALL ACTIVITIES
  return (
    <Segment>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header style={activity.title.match("Future") ? { color: "crimson" } : { color: "green", textDecoration: "line-through" }} as="a">
                {activity.title}{" "}
              </Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => selectActivity(activity.id)} floated="right" content="view" color="blue" />
                <Button name={activity.id} loading={submitting && target === activity.id} onClick={e => handleActivityDelete(e, activity.id)} floated="right" content="delete" color="red" />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
