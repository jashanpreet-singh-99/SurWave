using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenSurveyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddedSurveyUserGroupRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SurveyUserGroupRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SurveyId = table.Column<int>(type: "int", nullable: false),
                    UserGroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyUserGroupRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyUserGroupRelations_Surveys_SurveyId",
                        column: x => x.SurveyId,
                        principalTable: "Surveys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SurveyUserGroupRelations_UserGroups_UserGroupId",
                        column: x => x.UserGroupId,
                        principalTable: "UserGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SurveyUserGroupRelations_SurveyId",
                table: "SurveyUserGroupRelations",
                column: "SurveyId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyUserGroupRelations_UserGroupId",
                table: "SurveyUserGroupRelations",
                column: "UserGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveyUserGroupRelations");
        }
    }
}
