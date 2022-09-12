using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  public class ActivitiesController : BaseApiController //based from
  {
    private readonly DataContext _context;
    public ActivitiesController(DataContext context)
    {
      _context = context;
       
    }
    [HttpGet] //gets all <LIST> 
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await _context.Activities.ToListAsync();
    }
    [HttpGet("{id}")] // acitivities/id > indvidual id 
    public async Task<ActionResult<Activity>> GetActivity(Guid id)   //with an guid id
    {
        return await _context.Activities.FindAsync(id); //finding the result with a correct id
    }
  }
}