import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/Profile";
import ProfileCard from "../../profiles/ProfileCard";
//we have created interface to corresponding to our props attendees
interface Props {
  attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {
  const styles = {
    borderColor: "orangered",
    borderWidth: 3
  };
  return (
    <List horizontal>
      {attendees.map(attendee => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
              <Image size="mini" circular src={attendee.image || "/assets/user.png"} bordered style={attendee.following ? styles : null} />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
});
