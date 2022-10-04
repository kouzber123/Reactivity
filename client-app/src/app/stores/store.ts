import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

//stored in the context importing activityStore class
interface Store {
  activityStore: ActivityStore;
}

export const store: Store = { //object
  activityStore: new ActivityStore()
};
// use react context 
export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
