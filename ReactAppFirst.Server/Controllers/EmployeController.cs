using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactAppFirst.Server.BusinessLayer;
using ReactAppFirst.Server.Models;

namespace ReactAppFirst.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeController : ControllerBase
    {
        BLEmployee BL = new BLEmployee();

        [HttpGet]
        [Route("GetAllEmployeeDetails")]
        public IActionResult GetAllEmployee()
        {
            List<Employee> employees = BL.GetAllEmployeeDetails();
            return Ok(employees);

        }

        [HttpPost]
        [Route("SaveEmployeeDetail")]

        public IActionResult SaveEmployee([FromBody]Employee employee)
        {
           int IdentityValue= BL.InsertIntoEmploye(employee);
            employee.Id = IdentityValue;

            return employee != null ? Ok(employee) : Ok("Employee Data Not Found");

        }

        [HttpPut]
        [Route("UpdateEmployee/{id}")]

        public IActionResult PutEmployee([FromRoute]int id,[FromBody]Employee employee)
        {
            BL.UpdateEmploye(id,employee);

            return employee == null ? Ok(employee) : Ok(employee);
        }

        [HttpDelete]
        [Route("DeleteEmployee/{id}")]

        public IActionResult DeleteEmployee([FromRoute]int id)
        {
            BL.DeleteEmploye(id);
            return Ok("Deleted Successfully");
        }

    }
}
