using System;
using System.Collections.Generic;

namespace TelSprR.Models
{
    public partial class Personal
    {
        public int PersonalId { get; set; }
        public int? PersonalOtdelId { get; set; }
        public string PersonalName { get; set; }
        public string PersonalLastName { get; set; }
        public string PersonalMidName { get; set; }
        public string PersonalUserName { get; set; }
        public string PersonalEmail { get; set; }
        public string PersonalTel { get; set; }
        public string PersonalMobil { get; set; }
        public string PersonalPhoto { get; set; }
        public int? PersonalProfId { get; set; }
        public bool? PersonalDisabled { get; set; }

        public virtual Otdel PersonalOtdel { get; set; }
        public virtual Prof PersonalProf { get; set; }


    }
}
