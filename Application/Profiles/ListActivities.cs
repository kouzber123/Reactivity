using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class ListActivities
  {
    //thisa is handler we want to return activities based on predicate and username whose profile we looking at

    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
      public string Username { get; set; }
      public string Predicate { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;

      public Handler(DataContext context, IMapper mapper)
      {


        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        //find the any user > client is clicking
        var query = _context.ActivityAttendees
        .Where(a => a.AppUser.UserName == request.Username)
        .OrderBy(x => x.Activity.Date)
        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
        .AsQueryable();

        query = request.Predicate switch
        {
          "past" => query.Where(a => a.Date <= DateTime.Now),
          "hosting" => query.Where(a => a.HostUsername == request.Username),
          _ => query.Where(a => a.Date >= DateTime.Now)
        };

        var activities = await query.ToListAsync();

        return Result<List<UserActivityDto>>.Success(activities);




      }
    }
  }
}
