using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class Create //commands do not return anything
    {

      //HttpPost here > command domain activity get set
        public class Command : IRequest<Result<Unit>> // mediator unit returns nothing e.g. results activities
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
        public Handler(DataContext context)
        {
            _context = context;
        }

      public async Task<Result<Unit>> Handle (Command request, CancellationToken cancellationToken)
      {
        _context.Activities.Add(request.Activity);

        //save changes returns numerber so will save if number of changes > 0 otherwise no save
        var result = await _context.SaveChangesAsync() > 0;

        if(!result) return Result<Unit>.Failure("Failed to create activity");
        return Result<Unit>.Success(Unit.Value); //NOTIFY API THIS WAS SUCCESSFUL
      }
    }
  }
}