using System.Collections.Generic;
using Application.Profiles;

namespace Application.Activities
{
  public class ActivityDto
  {
    public Guid Id { get; set; }

    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }

    public string HostUsername { get; set; }

    public bool IsCancelled { get; set; }


    //we name this as attendees becasue these are the attendees but we share the profile data <Profile data>
    //of each attendee
    public ICollection<AttendeeDto> Attendees { get; set; }
  }
}
