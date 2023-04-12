import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commentStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";

//stored in the context importing activityStore class
//assign the values
interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
}
//create new obj
export const store: Store = {
  //object
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore()
};
// use react context
export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
