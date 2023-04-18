using Application.Activities;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProfilesController : BaseApiController
  {
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
      return HandleResult(await Mediator.Send(new Application.Profiles.Details.Query { Username = username }));
    }


    [HttpGet("{username}/activities")]
    public async Task<IActionResult> GetList(string username, string predicate)
    {
      return HandleResult(await Mediator.Send(new Application.Profiles.ListActivities.Query { Predicate = predicate, Username = username }));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfile.Command command)
    {
      return HandleResult(await Mediator.Send(command));
    }
  }
}
