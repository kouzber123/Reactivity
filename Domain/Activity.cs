using System;
using System.Collections.Generic;

//This is MODEL for the data
namespace Domain
{
  public class Activity
    {
        public Guid Id { get; set; }
        
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        public bool IsCancelled { get; set; }

//many to many this creates array from our activityAttendee.cs file and adds it to our db
        public ICollection<ActivityAttendee> Attendees {get; set;} = new List<ActivityAttendee>();
    }
}