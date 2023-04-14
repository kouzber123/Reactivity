using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Persistence;

namespace Application.Profiles
{
  public class UpdateProfile
  {
    public class Command : IRequest<Result<Profile>>
    {
      public string DisplayName { get; set; }
      public string Bio { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Profile>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
      {
        _mapper = mapper;
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Result<Profile>> Handle(Command request, CancellationToken cancellationToken)
      {
        //find user by user name from useraccessor, in useacessor we get access to claim.name
        var user = await _context.Users.FirstOrDefaultAsync(n => n.UserName == _userAccessor.GetUsername());
        if (user == null) return null;

        if (request.DisplayName == null && request.Bio == null) return Result<Profile>.Failure("Nothing to update");

          user.DisplayName = request.DisplayName == null ? user.DisplayName : request.DisplayName;
          user.Bio = request.Bio == null ? user.Bio : request.Bio;
        // _context.Entry(user).State = EntityState.Modified;
        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Result<Profile>.Success(_mapper.Map<Profile>(user));

        return Result<Profile>.Failure("Nothing to update");

      }
    }
  }
}
