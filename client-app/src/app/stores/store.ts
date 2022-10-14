import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commentStore";

//stored in the context importing activityStore class
interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
}

export const store: Store = {
  //object
  activityStore: new ActivityStore(),
  commonStore: new CommonStore()
};
// use react context
export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
