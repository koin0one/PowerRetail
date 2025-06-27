using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PowerRetail.Server.Migrations
{
    /// <inheritdoc />
    public partial class add_password_lvl_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SecondPassword",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SecondPassword",
                table: "Users");
        }
    }
}
