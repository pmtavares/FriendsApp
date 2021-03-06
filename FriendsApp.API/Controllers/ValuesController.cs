﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FriendsApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FriendsApp.API.Controllers
{
    [Authorize] //Middleware
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }
        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        /* public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value5" };
        }*/

        //New Function
        //Convert to async: Added async, Task and await. Changed ToList to ToListAsync
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        [AllowAnonymous]
        // GET api/values/5
        [HttpGet("{id}")]
        /* public ActionResult<string> Get(int id)
        {
            return "value";
        }*/

        public  async Task<IActionResult> GetValue(int id){
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
