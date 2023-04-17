using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
  public class List
  {
    public class Query : IRequest<Result<List<Profiles.Profile>>>
    {
      public string Predicate { get; set; } //list of followers or followng

      public string Username { get; set; }


    }

    public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
    {
      private readonly IUserAccessor _userAccessor;

      private readonly IMapper _mapper;
      private readonly DataContext _context;
      public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
        _mapper = mapper;

      }

      public async Task<Result<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var profiles = new List<Profiles.Profile>();

        switch (request.Predicate)
        {
          case "followers":
            profiles = await _context.UserFollowings.Where(x => x.Target.UserName == request.Username)
            .Select(u => u.Observer) //list that are observers
            .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
            .ToListAsync();
            break;
          case "following":
            profiles = await _context.UserFollowings.Where(x => x.Observer.UserName == request.Username)
            .Select(u => u.Target) //list that are observers
            .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
            .ToListAsync();
            break;
        }

        return Result<List<Profiles.Profile>>.Success(profiles);
      }
    }
  }
}
