using System.Data;
using Microsoft.Data.SqlClient;
namespace ReactAppFirst.Server.DataLayer
{
    public class SqlServerDB 
    {
        public string conn = string.Empty;
        public SqlServerDB()
        {
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["dbcs"];
            conn = Convert.ToString(connString);
        }
        
        public DataTable GetDataTable(string query)
        {
            SqlCommand cmd = new SqlCommand();
            SqlConnection sqlConn = new SqlConnection();
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable tblData = new DataTable();

            cmd.CommandText = query;
            sqlConn.ConnectionString = conn;
            sqlConn.Open();
            cmd.Connection = sqlConn;
            cmd.CommandType = CommandType.Text;
            da.SelectCommand = cmd;
            da.Fill(tblData);
            sqlConn.Close();
            return tblData;
        }
        public int obtainId()
        {
            return 0;
        }
        public int ExecuteOnlyQuery(string query)
        {
            SqlConnection sqlConn = new SqlConnection();
            SqlCommand cmd = new SqlCommand();

            cmd.CommandText = query;
            sqlConn.ConnectionString = conn;
            sqlConn.Open();
            cmd.Connection = sqlConn;
            cmd.CommandType = CommandType.Text;
            int IdentityValue =Convert.ToInt32( cmd.ExecuteScalar());
           
            sqlConn.Close();
            return IdentityValue;
        }
        public DataTable GetDataTable(string procedureName, CommandType commandType, params SqlParameter[] parameters)
        {
            using (SqlConnection sqlConn = new SqlConnection(conn))
            {
                using (SqlCommand cmd = new SqlCommand(procedureName, sqlConn))
                {
                    cmd.CommandType = commandType;

                    // Adding Parameters if provided
                    if (parameters != null)
                    {
                        cmd.Parameters.AddRange(parameters);
                    }

                    sqlConn.Open();
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable tblData = new DataTable();
                        da.Fill(tblData);
                        return tblData;
                    }
                }
            }
        }
    }
}

