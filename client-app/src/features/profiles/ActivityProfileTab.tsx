import { Card, Grid, Header, Image, Tab, TabProps } from "semantic-ui-react";
import { UserActivity } from "../../app/models/userActivity";
import { useStore } from "../../app/stores/store";
import { format } from "date-fns";
import { useEffect } from "react";
import { SyntheticEvent } from "react-toastify/dist/utils";
interface Props {
  setPredicate: any;
  predicate: string;
  activities: UserActivity[] | null;
}
export default function ActivityProfileTab({ setPredicate, activities, predicate }: Props) {
  const { profileStore } = useStore();
  const { loadingActivities, profile, userActivities, loadActivities } = profileStore;
  setPredicate(predicate);

  
  // <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="clock" content="Activities" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {activities?.map(activity => (
              <Card>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid />
                <Card.Content>
                  <Card.Header>{activity.title}</Card.Header>
                  <Card.Description>{activity.category}</Card.Description>
                  <Card.Description>{format(new Date(activity.date), "do LLL")}</Card.Description>
                  <Card.Description>{format(new Date(activity.date), "h:mm a")}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
