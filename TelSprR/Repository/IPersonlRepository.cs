using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TelSprR.Models;

namespace TelSprR.Repository
{
    public interface IPersonRepository
    {
        IQueryable<Personal> Personal { get; }
        void CreatePerson(Personal user);
        bool DeletePerson(int id);
        void EditUser(Personal user);
        Personal GetPerson(int id);

    }
}
