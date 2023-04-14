import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import UserStore from "../../app/stores/userStore";
import { Profile } from "../../app/models/Profile";
import agent from "../../app/api/agent";
import { UserFormValues } from "../../app/models/user";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { editProfile } from "../../app/models/editProfile";

interface Props {
  profile: Profile;
}

export default observer(function ProfileEdit({ profile }: Props) {
  const [EditProfileMode, setEditProfileMode] = useState(false);
  const [target, setTarget] = useState<editProfile>({
    displayname: profile.displayName,
    bio: profile?.bio
  });
  const {
    profileStore: { isCurrentUser, uploadPhoto, uploading, setMainPhoto, deletePhoto }
  } = useStore();

  const {
    userStore: { setdisplayName, loading }
  } = useStore();
  async function handleUpdateProfile(e: SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();

    const data = await setdisplayName(target);
    if (data !== null) profile.displayName = target.displayname;
  }
  function handleUpdateValues(e: any) {
    e.target.name === "displayname"
      ? setTarget({
          ...target,
          displayname: e.target.value
        })
      : setTarget({
          ...target,
          bio: e.target.value
        });
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="address card" content="About Me" />
          {isCurrentUser && <Button floated="right" basic content="Edit profile" onClick={() => setEditProfileMode(!EditProfileMode)} />}
        </Grid.Column>
        <Grid.Column width={16}>
          <div className="ui form">
            <div className="field">
              <label>Display name</label>
              {EditProfileMode ? (
                <div className="ui segment">
                  <input type="text" name="displayname" defaultValue={target["displayname"]} onChange={handleUpdateValues} />
                </div>
              ) : (
                <div className="ui segment">
                  <p> {target.displayname} </p>
                </div>
              )}

              <label>Bio</label>
              {EditProfileMode ? (
                <div className="segment">
                  <textarea defaultValue={target["bio"]} name="bio" onChange={handleUpdateValues}></textarea>
                </div>
              ) : (
                <div className="segment">
                  <textarea readOnly style={{ cursor: "grab" }}>
                    {target.bio}
                  </textarea>
                </div>
              )}
            </div>
          </div>
          {EditProfileMode && (
            <div style={{ paddingTop: "1rem" }}>
              <Button.Group floated="right">
                <Button disabled={profile.displayName === target.displayname && profile.bio === target.bio} basic color="green" content="Update" loading={loading} onClick={e => handleUpdateProfile(e)} />
                <Button basic color="red" content="Cancel" disabled={loading} onClick={() => setEditProfileMode(!EditProfileMode)} />
              </Button.Group>
            </div>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
