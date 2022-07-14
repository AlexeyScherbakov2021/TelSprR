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

        bool Delete(int id);
        bool Create(Prof item);
        bool Edit(Prof item);

    }
}
