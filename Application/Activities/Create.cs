using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class Create //commands do not return anything
    {

      //HttpPost here > command domain activity get set
      // mediator unit returns nothing e.g. results activities
        public class Command : IRequest<Result<Unit>> 
        {
            public Activity Activity {get; set;}
        }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
      }
    }
    public class Handler : IRequestHandler<Command, Result<Unit>> //data that uses posts
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public Handler(DataContext context, IUserAccessor userAccessor)
        {
      _userAccessor = userAccessor;
            _context = context;
        }

      public async Task<Result<Unit>> Handle (Command request, CancellationToken cancellationToken)
      {

          //gives accesss to user object
        var user = await _context.Users.FirstOrDefaultAsync(x =>
         x.UserName == _userAccessor.GetUsername());
       

      //create new attendee object and then add it to activity > 
        var attendee = new ActivityAttendee
        {
          AppUser = user,
          Activity = request.Activity,
          IsHost = true
        };
        request.Activity.Attendees.Add(attendee);

        _context.Activities.Add(request.Activity); //add it to activities table


        //save changes returns numerber so will save if number of changes > 0 otherwise no save
        var result = await _context.SaveChangesAsync() > 0;

        if(!result) return Result<Unit>.Failure("Failed to create activity");
        return Result<Unit>.Success(Unit.Value); //NOTIFY API THIS WAS SUCCESSFUL
      }
    }
  }
}