using MediatR;
using Microsoft.AspNetCore.Mvc;

//PROVIDES ROUTE

namespace API.Controllers
{

  /*
  The [ApiController] attribute can be applied to a controller class to enable the following opinionated, 
  API-specific behaviors:

  Attribute routing requirement
  Automatic HTTP 400 responses
  Binding source parameter inference
  Multipart/form-data request inference
  Problem details for error status codes

  */
 //api/activities > controller  = route //controller is dynamic route like api/activiies
  [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
        private IMediator _mediator;

        //IMEDIATOR Encapsulates request / response / httpcontext comes from controllerbase
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
            .GetService<IMediator>();
    }
}
/*
Mediator is a behavioral design pattern that reduces coupling between components of a program by making them communicate indirectly,
through a special mediator object. 
The Mediator makes it easy to modify, extend and reuse individual components
 because they're no longer dependent on the dozens of other classes.
*/