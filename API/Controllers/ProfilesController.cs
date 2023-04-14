using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Application.Photos;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProfilesController : BaseApiController
  {
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
      return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
    }

    [HttpPut]

    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfile.Command command)
    {
      return HandleResult(await Mediator.Send(command));
    }
  }
}
