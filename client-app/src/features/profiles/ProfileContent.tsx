import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/Profile";
import { observer } from "mobx-react-lite";
import ProfileEdit from "./ProfileEdit";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/stores/store";
import ProfileActivities from "./ProfileActivities";

interface Props {
  profile: Profile;
}
export default observer(function ProfileContent({ profile }: Props) {
  const { profileStore } = useStore();

  const panes = [
    { menuItem: "About", render: () => <ProfileEdit profile={profile} /> },
    {
      menuItem: "Photos",
      render: () => <ProfilePhotos profile={profile} />
    },
    { menuItem: "Events", render: () => <ProfileActivities username={profile.username} /> },
    { menuItem: "Followers", render: () => <ProfileFollowings /> },
    { menuItem: "Following", render: () => <ProfileFollowings /> }
  ];

  return <Tab menu={{ fluid: true, vertical: true }} menuPosition="right" panes={panes} onTabChange={(e, data) => profileStore.seActiveTab(data.activeIndex)} />;
});
