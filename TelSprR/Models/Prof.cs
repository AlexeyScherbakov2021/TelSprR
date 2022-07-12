using System;
using System.Collections.Generic;

namespace TelSprR.Models
{
    public partial class Prof
    {
        public Prof()
        {
            Personal = new HashSet<Personal>();
        }

        public int ProfId { get; set; }
        public string ProfName { get; set; }
        public int ProfOrder { get; set; }

        public virtual ICollection<Personal> Personal { get; set; }
    }
}
