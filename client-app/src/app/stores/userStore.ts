import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { editProfile } from "../models/editProfile";
import { Profile } from "../models/Profile";

export default class UserStore {
  user: User | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };

  setdisplayName = async  (data: editProfile) => {
    this.loading = true;
    try {
      const update: Profile = await agent.Profiles.updateProfile(data);
      console.log(update.displayName);
      if (update.displayName) {
        runInAction(() => {
          this.user!.displayName = update.displayName;
          this.loading = false;
          return update.displayName;
        });
      }

      this.loading = false;
    } catch (error) {
      runInAction(() => (this.loading = false));
    }
  };
}
