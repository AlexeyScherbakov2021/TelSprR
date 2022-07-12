using System.Collections.Generic;

namespace TelSprR.Models
{
    public class Card
    {
        public int PersonalId { get; set; }
        public string PersonalName { get; set; }
        public string PersonalLastName { get; set; }
        public string PersonalMidName { get; set; }
        public string PersonalEmail { get; set; }
        public string PersonalTel { get; set; }
        public string PersonalMobil { get; set; }
        public string PersonalPhoto { get; set; }
        public bool? PersonalDisabled { get; set; }
        public int? PersonalProfId { get; set; }
        public int? PersonalOtdelId { get; set; }
        public string Profession { get; set; }
        public string RouteOtdels { get; set; }
    }

}
