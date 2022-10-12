using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }
    public class Handler : IRequestHandler<Command>
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
      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _context.Activities.FindAsync(request.Activity.Id);

        _mapper.Map(request.Activity, activity);
        
        await _context.SaveChangesAsync();

        return Unit.Value;
      }
    }
  }
}