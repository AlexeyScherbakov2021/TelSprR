using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TelSprR.Models;

namespace TelSprR.Repository
{
    public class OtdelRepository : IOtdelRepository
    {
        private PersonalNGKContext context;

        public OtdelRepository(PersonalNGKContext ctx) => context = ctx;

        public IQueryable<Otdel> Otdel => context.Otdel;


        //--------------------------------------------------------------------------------------------------
        public bool Create(Otdel item)
        {
            try
            {
                context.Otdel.Add(item);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        //--------------------------------------------------------------------------------------------------
        public bool Delete(int id)
        {
            Otdel otdel = context.Otdel.Where(u => u.OtdelId == id).FirstOrDefault();
            if (otdel != null)
            {
                try
                {
                    context.Otdel.Remove(otdel);
                    context.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }

            return false;
        }

        //--------------------------------------------------------------------------------------------------
        public bool Edit(Otdel item)
        {
            Otdel otdel = context.Otdel.Where(u => u.OtdelId == item.OtdelId).FirstOrDefault();

            if (otdel != null)
            {
                try
                {
                    otdel.OtdelName = item.OtdelName;
                    otdel.OtdelParentId = item.OtdelParentId;

                    context.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }

            return false;
        }

    }
}


