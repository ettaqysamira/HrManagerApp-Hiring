using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.API.Migrations
{
    public partial class AddMatchingScoreToCandidatAndOffre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "MinMatchingScore",
                table: "OffresEmploi",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MinYearsExperience",
                table: "OffresEmploi",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequiredEducation",
                table: "OffresEmploi",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequiredLanguages",
                table: "OffresEmploi",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequiredSkills",
                table: "OffresEmploi",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CVTextContent",
                table: "Candidats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Certifications",
                table: "Candidats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Education",
                table: "Candidats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtractedSkills",
                table: "Candidats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Languages",
                table: "Candidats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastAnalyzedDate",
                table: "Candidats",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MatchingDetails",
                table: "Candidats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MatchingScore",
                table: "Candidats",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "YearsOfExperience",
                table: "Candidats",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MinMatchingScore",
                table: "OffresEmploi");

            migrationBuilder.DropColumn(
                name: "MinYearsExperience",
                table: "OffresEmploi");

            migrationBuilder.DropColumn(
                name: "RequiredEducation",
                table: "OffresEmploi");

            migrationBuilder.DropColumn(
                name: "RequiredLanguages",
                table: "OffresEmploi");

            migrationBuilder.DropColumn(
                name: "RequiredSkills",
                table: "OffresEmploi");

            migrationBuilder.DropColumn(
                name: "CVTextContent",
                table: "Candidats");

            migrationBuilder.DropColumn(
                name: "Certifications",
                table: "Candidats");

            migrationBuilder.DropColumn(
                name: "Education",
                table: "Candidats");

            migrationBuilder.DropColumn(
                name: "ExtractedSkills",
                table: "Candidats");

            migrationBuilder.DropColumn(
                name: "Languages",
                table: "Candidats");

            migrationBuilder.DropColumn(
                name: "LastAnalyzedDate",
                table: "Candidats");

            migrationBuilder.DropColumn(
                name: "MatchingDetails",
                table: "Candidats");

            migrationBuilder.DropColumn(
                name: "MatchingScore",
                table: "Candidats");

            migrationBuilder.DropColumn(
                name: "YearsOfExperience",
                table: "Candidats");
        }
    }
}
