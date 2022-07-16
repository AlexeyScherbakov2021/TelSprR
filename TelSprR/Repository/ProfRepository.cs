using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TelSprR.Models;

namespace TelSprR.Repository
{
    public class ProfRepository :IProfRepository
    {
        private PersonalNGKContext context;

        public ProfRepository(PersonalNGKContext ctx) => context = ctx;

        public IQueryable<Prof> Prof => context.Prof;

        public bool Create(Prof item)
        {
            try
            {
                context.Prof.Add(item);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }



        public bool Delete(int id)
        {
            Prof prof = context.Prof.Where(u => u.ProfId == id).FirstOrDefault();
            if (prof != null)
            {
                try
                {
                    context.Prof.Remove(prof);
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

        public bool Edit(Prof item)
        {
            Prof prof = context.Prof.Where(u => u.ProfId == item.ProfId).FirstOrDefault();

            if (prof != null)
            {
                try
                {
                    prof.ProfName = item.ProfName;
                    prof.ProfOrder = item.ProfOrder;

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
