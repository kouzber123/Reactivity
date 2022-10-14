using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

         public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
      }
    }
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
        public Handler(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        // await _context.Activities.FindAsync(request.Activity.Id);
        /*
        Finds an entity with the given primary key values.
         If an entity with the given primary key values is being tracked by the context, 
         then it is returned immediately without making a request to the database. Otherwise, 
         a query is made to the database for an entity with the given primary key values and this entity, if found, 
         is attached to the context and returned. If no entity is found, then null is returned.
        */
      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _context.Activities.FindAsync(request.Activity.Id);

          if(activity == null ) return null; 

        _mapper.Map(request.Activity, activity);
        
        var result = await _context.SaveChangesAsync() > 0;

        if(!result) return Result<Unit>.Failure("Failed to update activity");

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}