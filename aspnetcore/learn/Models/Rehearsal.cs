namespace aspnetcoreapp.Models
{
    public class Rehearsal
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public double LocLat { get; set; }
        public double LocAlt { get; set; }
    }
} 