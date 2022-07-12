using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TelSprR.Models;

namespace TelSprR.Repository
{
    public interface IProfRepository
    {
        IQueryable<Prof> Prof { get; }
    }
}
