using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  //This will handle CRUD commands
  //WE NEED DOMAIN folder TO GET THE MODEL - ACTIVITY
  public class ActivitiesController : BaseApiController //This class inherits Api Controller so all data will be seen as API
  {
    

//------------------GET ALL from the database
    [HttpGet] //gets all <LIST>  and list gets the indexes from the acitivity model
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
      //from BASEAPI CONTROLLER
        return await Mediator.Send(new List.Query());
    }


//------------------GET BY ID
    [HttpGet("{id}")] // acitivities/id > indvidual id 
    public async Task<ActionResult<Activity>> GetActivity(Guid id)   //with an guid id
    {
        return await Mediator.Send(new Details.Query{Id = id}); //finding the result 
    }


    //end for creating activity when sending bodi inside object > smart enough to look body req
    //if match > looks inside

//------------------Create a post
    [HttpPost]
    public async Task <IActionResult> CreateActivity(Activity activity)
    {

      //user post > program uses create.cs > formulates 
      return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
    }

//----------------Update a post
    [HttpPut("{id}")]
    public async Task <IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
    }

//--------------------Delete by ID
    [HttpDelete("{id}")]
    public async Task <IActionResult> DeleteActivity(Guid id)
    {
      return Ok(await Mediator.Send(new Delete.Command{Id = id}));
    }

  }
}