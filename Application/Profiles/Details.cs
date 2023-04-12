using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class Details
  {
    /// <summary>
    /// everything that doesnt update db is query
    ///
    /// other users can get other users
    /// </summary>
    public class Query : IRequest<Result<Profile>>
    {
      public string Username { get; set; }
    }

    /// <summary>
    /// map and access to database
    /// </summary>
    public class Handler : IRequestHandler<Query, Result<Profile>>
    {
      private readonly DataContext _context;

      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;

        _context = context;
      }

      public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _context.Users
        .ProjectTo<Profile>(_mapper.ConfigurationProvider)
        .SingleOrDefaultAsync(x => x.Username == request.Username);

        if (user == null) return null;

        return Result<Profile>.Success(user);
      }
    }
  }
}
