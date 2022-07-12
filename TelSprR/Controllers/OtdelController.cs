using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using TelSprR.Models;
using TelSprR.Repository;


namespace TelSprR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OtdelController : ControllerBase
    {
        private IOtdelRepository otdelRepo;

        public OtdelController(IOtdelRepository repo)
        {
            otdelRepo = repo;
        }


        [HttpGet]
        public IEnumerable<Otdel> Get()
        {
            List<Otdel> list = otdelRepo.Otdel.ToList();

            List<Otdel> newList = new List<Otdel>();

            foreach(var item in list)
            {
                if (item.OtdelParentId == null)
                {
                    Otdel otdel = new Otdel()
                    {
                        OtdelId = item.OtdelId,
                        OtdelName = item.OtdelName,
                        OtdelParentId = item.OtdelParentId,
                    };
                    if(item.SubOtdel.Count != 0)
                    {
                        foreach(var it in item.SubOtdel)
                        {
                            Otdel subOtdel = new Otdel()
                            {
                                OtdelId = it.OtdelId,
                                OtdelName = it.OtdelName,
                                OtdelParentId = it.OtdelParentId,
                            };
                            otdel.SubOtdel.Add(subOtdel);

                        }
                    }
                    newList.Add(otdel);
                }
            }
            return newList.ToArray();

        }
    }

}
