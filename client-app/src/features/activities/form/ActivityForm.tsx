import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MytextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { ActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
//the FORM

//creating interface then add them to the exp default > destruct from type props
export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;

  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required()
  });
  //use ! to inform typescript that we know what we are doing and there wont be anything undefined
  useEffect(() => {
    //ensure activity just contains the values form itself
    if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity))); //setting state > dependencies high prio
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading content..." />;

  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  }

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
            <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
