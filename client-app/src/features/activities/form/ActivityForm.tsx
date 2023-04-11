import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MytextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { ActivityFormValues } from "../../../app/models/activity";
//the FORM

//creating interface then add them to the exp default > destruct from type props
export default observer(function ActivityForm() {
  const history = useHistory(); //react history hook
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;

  const { id } = useParams<{ id: string }>();
  //initial state will always be null at the beginning may or may not be available
  //set type as activity so we can pass the "type cannot be null" check
  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required()
  });
  //use ! to inform typescript that we know what we are doing and there wont be anything undefined
  useEffect(() => { //ensure activity just contains the values form itself
    if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity))); //setting state > dependencies high prio
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading content..." />;

  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) { //if not id then create
      // redirect using history
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      //else has id then it will update it and redirect
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  }

  //THIS IS THE EDIT FIELD
  //making html form "reactive"
  //value will be displayed on the edit field
  //apply formik to make code cleaner and more resuseable code

  //activity gets populised with enableReInit with prev values
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
            <MyDateInput placeholderText="Date" name="date" showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />

            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button disabled={isSubmitting || !dirty || !isValid}
             loading={isSubmitting} floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});

//old code

/*


  // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // }




*/
