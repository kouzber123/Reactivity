import { format } from "date-fns";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { Profile } from "../models/Profile";
import { store } from "./store";
import { Pagination, PagingParams } from "../models/pagination";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loadingInitial = false;
  loading = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();

  predicate = new Map().set("all", true);
  constructor() {
    //this = this function makeobs
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.activityRegistry.clear();
        this.loadActivities();
      }
    )
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        if (key !== "startDate") this.predicate.delete(key);
      });
    };
    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "startDate":
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, (value as Date).toISOString());
      }
      params.append(key, value);
    });
    return params;
  }
  //get date
  //add ! at the end because we know it cannot be null
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
  }

  //get grouped

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!, "dd MMM yyyy");
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  //auto function makes autoobservable automatic
  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Activities.list(this.axiosParams);
      result.data.forEach(activity => {
        this.setActivity(activity);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);

      this.loadingInitial = false;
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  //get activity details by id (activitydetails component)
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    //return activity otherwise it return void
    if (activity) {
      this.selectedActivity = activity;
      return activity;
      //try to connect to api
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        this.selectedActivity = activity;
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    const user = store.userStore.user;
    if (user) {
      //returns boolean > if user is going (in the attendee list)
      activity.isGoing = activity.attendees!.some(a => a.username === user.username);
      //
      activity.isHost = activity.hostUsername === user.username;
      //
      activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
    }
    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  };
  //will return id or null
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.username;
      newActivity.attendees = [attendee]; //pass new attendee object
      this.setActivity(newActivity); //can workout if user(host is going)
      runInAction(() => {
        this.selectedActivity = newActivity; //dispaly on the right side
      });
    } catch (error) {
      console.log(error);
    }
  };
  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          let updateActivity = { ...this.getActivity(activity.id), ...activity };
          this.activityRegistry.set(activity.id, updateActivity as Activity); //we know updated activity contains everything we need
          this.selectedActivity = updateActivity as Activity; //display right side
        } //create new array and remove activity based on the  filter and pass into activity ¨
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        //filters out the currently looked in user from attendee array
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(a => a.username !== user?.username);
          this.selectedActivity.isGoing = false;
        } else {
          //we are adding attendee object if they are joining the event
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        //also take the opportunity to set actvity registry at the same time
        this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
        this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  updateAttendeeFollowing = (username: string) => {
    this.activityRegistry.forEach(activity => {
      activity.attendees?.forEach(attendee => {
        if (attendee.username === username) {
          attendee.following ? attendee.followersCount-- : attendee.followersCount++;
          attendee.following = !attendee.following;
        }
      });
    });
  };
}
