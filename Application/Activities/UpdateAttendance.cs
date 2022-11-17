using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

//THIS HANDLES IF USER JOINS THE EVENT OR NOT
namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            //activity id
            public Guid Id { get; set; }
        }
    
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
    private readonly IUserAccessor _userAccessor;
    private readonly DataContext _context;

    //constuctor we need know the user who does this request > username needed
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
      _context = context;
      _userAccessor = userAccessor;
      }
    
    
      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        //get the activity we are working on
        var activity = await _context.Activities
        .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
        .SingleOrDefaultAsync(x => x.Id == request.Id); //return exception

        if(activity == null) return null; //404 not found

            var user = await _context.Users.FirstOrDefaultAsync(x => 
            x.UserName == _userAccessor.GetUsername());

            if(user == null) return null;

            var HostUsername =activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

            var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                //user is host > proceeds to cancel the activity  > true false
            if( attendance != null && HostUsername == user.UserName)
                activity.IsCancelled = !activity.IsCancelled;

                //user is not host > proceeds to remove the user from the list
            if(attendance != null && HostUsername != user.UserName)
                activity.Attendees.Remove(attendance);

               // user joins the event / is not host 
            if(attendance == null)
            {
                attendance = new ActivityAttendee
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = false
                };

                activity.Attendees.Add(attendance);
            }
            //result always have to be greater > 0 order to be attendance
            var result = await _context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
         
       }
    }  
  }
}
