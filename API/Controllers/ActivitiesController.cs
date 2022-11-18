using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



/*A Controller is a class that implements operations defined by an application's API. 
It implements an application's business logic and acts as a bridge between the HTTP/REST API and domain/database models.*/
namespace API.Controllers
{


  //This will handle CRUD commands
  //WE NEED DOMAIN folder TO GET THE MODEL - ACTIVITY
  [AllowAnonymous]
  public class ActivitiesController : BaseApiController //This class inherits Api Controller so all data will be seen as API
  {
    

//------------------GET ALL from the database
    [HttpGet] //gets all <LIST>  and list gets the indexes from the acitivity model
    public async Task<IActionResult> GetActivities()
    {
      //from BASEAPI CONTROLLER
        return HandleResult (await Mediator.Send(new List.Query()));
    }


    
//------------------GET BY ID
    
    [HttpGet("{id}")] // acitivities/id > indvidual id 
    public async Task<IActionResult> GetActivity(Guid id)   //with an guid id
    {
        //finding the result 
        return HandleResult(await Mediator.Send(new Details.Query{Id = id}));          
    }


    //end for creating activity when sending bodi inside object > smart enough to look body req
    //if match > looks inside

    //HANDLERESULT CAN BE FOUND IN BASE API CONTROLLER

//------------------Create a post
    [HttpPost]
    public async Task <IActionResult> CreateActivity(Activity activity)
    {

      //user post > program uses create.cs > formulates 
      return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
    }

  [Authorize(Policy = "IsActivityHost")]
//----------------Update a post
    [HttpPut("{id}")]
    public async Task <IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
    }

//--------------------Delete by ID
    [Authorize(Policy = "IsActivityHost")]
    [HttpDelete("{id}")]
    public async Task <IActionResult> DeleteActivity(Guid id)
    {
      return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
    }

    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(Guid id)
    {
      return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
    }

  }
}