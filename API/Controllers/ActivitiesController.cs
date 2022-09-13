using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  public class ActivitiesController : BaseApiController //based from
  {
  
  
    [HttpGet] //gets all <LIST> 
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
      //from BASEAPI CONTROLLER
        return await Mediator.Send(new List.Query());
    }
    [HttpGet("{id}")] // acitivities/id > indvidual id 
    public async Task<ActionResult<Activity>> GetActivity(Guid id)   //with an guid id
    {
        return await Mediator.Send(new Details.Query{Id = id}); //finding the result 
    }

    //end for creating activity when sending bodi inside object > smart enough to look body req
    //if match > looks inside
    [HttpPost]
    public async Task <IActionResult> CreateActivity(Activity activity)
    {
      return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
    }
    [HttpPut("{id}")]
    public async Task <IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
    }

    [HttpDelete("{id}")]
    public async Task <IActionResult> DeleteActivity(Guid id)
    {
      return Ok(await Mediator.Send(new Delete.Command{Id = id}));
    }

  }
}