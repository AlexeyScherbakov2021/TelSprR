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


        //--------------------------------------------------------------------------------------------------
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
                        //OtdelParent = new Otdel()
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
                                //OtdelParent = it.OtdelParent
                            };
                            otdel.SubOtdel.Add(subOtdel);

                        }
                    }
                    newList.Add(otdel);
                }
            }
            return newList.ToArray();

        }

        //---------------------------------------------------------------------------
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (otdelRepo.Delete(id))
                return Ok();
            else
                return NotFound();
        }


        //--------------------------------------------------------------------------------------------------
        [HttpPost]
        public int Post(Otdel item)
        {
            bool result;

            if (item.OtdelId < 1)
                result = otdelRepo.Create(item);
            else
                result = otdelRepo.Edit(item);

            return item.OtdelId;

        }

    }

}
