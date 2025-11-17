using ReactAppFirst.Server.DataLayer;
using ReactAppFirst.Server.Models;
using System.Data;

namespace ReactAppFirst.Server.BusinessLayer
{
    public class BLEmployee
    {
        SqlServerDB db = new SqlServerDB();
        string sqlQuery = string.Empty;
        public List<Employee> GetAllEmployeeDetails()
        {
            List<Employee> employeesList = new List<Employee>();
            sqlQuery = "SELECT * FROM EmployeeCrud";
            DataTable dt = db.GetDataTable(sqlQuery);

            foreach (DataRow dr in dt.Rows)
            {
                Employee employee = new Employee
                {
                    Id = (int)dr["Id"],
                    Name = (string)dr["Name"],
                    Age = (int)dr["Age"],
                    Gender = (int)dr["Gender"],
                    PhoneNumber = (string)dr["PhoneNumber"],
                    IsVacinated = (bool)dr["ISVACNITATED"],
                    Adress = (string)dr["adress"],
                    Designation = (int)dr["DESIGNATION"],

                };
                employeesList.Add(employee);
            }

            return employeesList;
        }

        public int InsertIntoEmploye(Employee employee)
        {
            sqlQuery = "insert into EmployeeCrud VALUES ('"+employee.Name+"','"+employee.PhoneNumber+"','"+(employee.IsVacinated == true?1 :0)+"',"+employee.Age+","+employee.Gender+",'"+employee.Adress+"',"+employee.Designation+ ");SELECT SCOPE_IDENTITY();";

            int IdentityValue = db.ExecuteOnlyQuery(sqlQuery);

            return IdentityValue;
        }
        
        public int UpdateEmploye(int sentId,Employee emp)
        {
            sqlQuery = "UPDATE [dbo].[EmployeeCrud] SET [NAME] = '"+emp.Name+"',[PHONENUMBER] ='"+emp.PhoneNumber+"',[ISVACNITATED] = '"+(emp.IsVacinated == true?1:0)+"',[AGE] = "+emp.Age+",[GENDER] = "+emp.Gender+",[ADRESS] = '"+emp.Adress+"',[DESIGNATION] = "+emp.Designation+" WHERE ID = '"+ sentId + "' ";

            int result = db.ExecuteOnlyQuery(sqlQuery);

            return result;
        }

        public int DeleteEmploye(int sentId)
        {
            sqlQuery = "DELETE FROM [dbo].[EmployeeCrud]  WHERE ID = '"+sentId+"'";
            int result = db.ExecuteOnlyQuery(sqlQuery);

            return result;
        }
    }
}
