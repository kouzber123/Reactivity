import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commentStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

//stored in the context importing activityStore class
//assign the values
interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore
}
//create new obj
export const store: Store = {
  //object
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore()
};
// use react context
export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
