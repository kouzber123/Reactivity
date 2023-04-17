import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/Profile";
import { observer } from "mobx-react-lite";
import ProfileEdit from "./ProfileEdit";
import ProfileFollowings from "./ProfileFollowings";
import ProfileStore from '../../app/stores/profileStore';
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}
export default observer(function ProfileContent({ profile }: Props) {

  const {profileStore} = useStore()

  const {} = profileStore
  const panes = [
    { menuItem: "About", render: () => <ProfileEdit profile={profile} /> },
    {
      menuItem: "Photos",
      render: () => <ProfilePhotos profile={profile} />
    },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    { menuItem: "Followers", render: () => <ProfileFollowings /> },
    { menuItem: "Following", render: () => <ProfileFollowings /> }
  ];

  return <Tab menu={{ fluid: true, vertical: true }} menuPosition="right" panes={panes} onTabChange={(e, data) => profileStore.seActiveTab(data.activeIndex) } />;
});
