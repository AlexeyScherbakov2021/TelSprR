using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TelSprR.Models;
using TelSprR.Repository;

namespace TelSprR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfController : ControllerBase
    {
        private IProfRepository profRepo;

        public ProfController(IProfRepository repo)
        {
            profRepo = repo;
        }


        [HttpGet]
        public IEnumerable<Prof> Get()
        {
            return profRepo.Prof.OrderBy(it => it.ProfName).ToArray();
        }

        //---------------------------------------------------------------------------
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (profRepo.Delete(id))
                return Ok();
            else
                return NotFound();
        }


        //--------------------------------------------------------------------------------------------------
        [HttpPost]
        public int Post(Prof item)
        {
            bool result; 

            if (item.ProfId < 1)
                result = profRepo.Create(item);
            else
                result = profRepo.Edit(item);

            //return result ? Ok() : NotFound();

            return item.ProfId;

        }
    }
}
