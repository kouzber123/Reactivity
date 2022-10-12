import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
//the FORM

//creating interface then add them to the exp default > destruct from type props
export default observer(function ActivityForm() {
  const history = useHistory(); //react history hook
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

  const { id } = useParams<{ id: string }>();
  //initial state will always be null at the beginning may or may not be available
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  //use ! to inform typescript that we know what we are doing and there wont be anything undefined
  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!)); //setting state > dependencies high prio
  }, [id, loadActivity]);

  function handleSubmit() {
    if (activity.id.length === 0) {
      //if 0 then create new object and create it and redirect using history
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      //else id then it will update it and redirect
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content="Loading content..." />;

  //THIS IS THE EDIT FIELD
  //making html form "reactive"
  //value will be displayed on the edit field
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.Input placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />

        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
