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

    }
}
