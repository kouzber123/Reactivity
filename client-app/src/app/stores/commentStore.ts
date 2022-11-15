import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem("jtw");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      token => {
        if(token) {
          window.localStorage.setItem("jwt", token)
        } else {
          window.localStorage.removeItem("jwt")
        }
      }
    )
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

//when we execute this function reaction will happen and set jwt to localstorage
  setToken = (token: string | null ) => {
    this.token = token;
  }

  setAppLoaded = () => {
    this.appLoaded = true
  }
}
