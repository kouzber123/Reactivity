import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, GridColumn, Loader } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ActivityFilters from "./dashboard/ActivityFilters";
import ActivityList from "./dashboard/ActivityList";
import { useState } from "react";
import { PagingParams } from "../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./dashboard/ActivityListItemPlaceholder";
//DASHBOARD DISPLAYS  EVENTS

export default observer(function ActivityDashboard() {
  //HERE WE ADD THE COMPONENTS FROM THE DETAILS , DASHBOARD and FORM

  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }

  //if map array is 0 then load api activities otherwise no need
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);



  return (
    <Grid>
      <Grid.Column width="10">
        {activityStore.loadingInitial && !loadingNext ? (
          <>
          <ActivityListItemPlaceholder />
          <ActivityListItemPlaceholder />
          </>
        ) : (

          <InfiniteScroll pageStart={0} loadMore={handleGetNext} hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} initialLoad={false}>
          <ActivityList />
        </InfiniteScroll>

        )}

      </Grid.Column>

      <GridColumn width="6">
        <h2>Activity Filters WIP</h2>
        <ActivityFilters />
      </GridColumn>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
//see if activies[0] is true if so populate
