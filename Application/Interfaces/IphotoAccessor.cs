using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
  public interface IphotoAccessor
  {
    Task<PhotoUploadResult> AddPhoto(IFormFile file);
    Task <string> DeletePhoto(string PublicId);
  }
}
