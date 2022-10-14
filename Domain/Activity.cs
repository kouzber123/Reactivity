using System;

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
    }

    //Model idea 
    /*
    title :Today beef?
    option 1. Yes all the way  
    option 2. Perhaps we can do it
    option 3. No aboslutely no im vegan

    button send (update request)
    // */
    // public class Epoll {

    //     public Guid Id { get; set; }
    //     public string Title { get; set; }
    //    public options  { get; set; }

    // }
}