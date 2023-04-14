import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";
//stored in the context importing activityStore class
//assign the values
interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  commentStore: CommentStore;
}
//create new obj
export const store: Store = {
  //object
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  commentStore: new CommentStore()
};
// use react context
export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
