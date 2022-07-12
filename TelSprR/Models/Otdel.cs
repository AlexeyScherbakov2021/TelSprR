using System;
using System.Collections.Generic;

namespace TelSprR.Models
{
    public partial class Otdel
    {
        public Otdel()
        {
            SubOtdel = new HashSet<Otdel>();
        }

        public int OtdelId { get; set; }
        public int? OtdelParentId { get; set; }
        public string OtdelName { get; set; }

        public virtual Otdel OtdelParent { get; set; }
        public virtual ICollection<Otdel> SubOtdel { get; set; }
    }
}
