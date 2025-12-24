using System;
using System.IO;
using System.Threading.Tasks;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Hosting;
using HR.API.Models;

namespace HR.API.Services
{
    public class ContractGeneratorService : IContractGeneratorService
    {
        private readonly IWebHostEnvironment _environment;

        public ContractGeneratorService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<string> GenerateContractFileAsync(Contract contract)
        {
            try
            {
                string rootPath = _environment.ContentRootPath;
                string uploadsFolder = Path.Combine(rootPath, "uploads", "contracts");
                
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string fileName = $"Contrat_{contract.Employee?.LastName ?? "NoName"}_{Guid.NewGuid().ToString().Substring(0, 8)}.docx";
                string filePath = Path.Combine(uploadsFolder, fileName);
                string relativeUrl = $"uploads/contracts/{fileName}";

                await Task.Run(() =>
                {
                    using (WordprocessingDocument wordDocument = WordprocessingDocument.Create(filePath, WordprocessingDocumentType.Document))
                    {
                        MainDocumentPart mainPart = wordDocument.AddMainDocumentPart();
                        mainPart.Document = new Document();
                        Body body = mainPart.Document.AppendChild(new Body());

                        AddParagraph(body, $"CONTRAT DE TRAVAIL ({contract.Type})", true, 28, JustificationValues.Center);
                        AddParagraph(body, "", false); 

                        AddParagraph(body, "ENTRE LES SOUSSIGNÉS :", true, 24);
                        AddParagraph(body, "L'entreprise HR Manager Corp, sise à Casablanca, représentée par le Directeur des Ressources Humaines. Ci-après dénommée \"L'Employeur\".");
                        AddParagraph(body, "", false);

                        AddParagraph(body, "ET :", true, 24);
                        AddParagraph(body, $"M./Mme {contract.Employee?.FirstName} {contract.Employee?.LastName}");
                        AddParagraph(body, $"Matricule : {contract.EmployeeId}");
                        AddParagraph(body, "Ci-après dénommé(e) \"Le Salarié\".");
                        AddParagraph(body, "", false);

                        AddParagraph(body, "ARTICLE 1 : ENGAGEMENT", true, 24);
                        AddParagraph(body, $"L'Employeur engage le Salarié sous contrat {contract.Type} à compter du {contract.StartDate.ToShortDateString()}. " +
                                           (contract.EndDate.HasValue ? $"Ce contrat est conclu pour une durée déterminée prenant fin le {contract.EndDate.Value.ToShortDateString()}." : "Ce contrat est conclu pour une durée indéterminée."));
                        AddParagraph(body, "", false);

                        AddParagraph(body, "ARTICLE 2 : FONCTIONS", true, 24);
                        AddParagraph(body, $"Le Salarié occupera le poste de {contract.Employee?.Position ?? "Employé"}. Il s'engage à accomplir les tâches qui lui seront confiées avec diligence.");
                        AddParagraph(body, "", false);

                        AddParagraph(body, "ARTICLE 3 : RÉMUNÉRATION", true, 24);
                        AddParagraph(body, $"En contrepartie de son travail, le Salarié percevra un salaire mensuel net de {contract.Salary:N2} MAD.");
                        AddParagraph(body, "", false);

                        AddParagraph(body, "ARTICLE 4 : DISPOSITIONS DIVERSES", true, 24);
                        AddParagraph(body, "Le présent contrat est régi par la législation du travail en vigueur au Maroc. Tout litige relatif à l'interprétation sera de la compétence des tribunaux de Casablanca.");
                        AddParagraph(body, "", false);
                        AddParagraph(body, "", false);

                        Table table = new Table();
                        TableProperties tblProp = new TableProperties(new TableWidth() { Type = TableWidthUnitValues.Pct, Width = "5000" });
                        table.AppendChild(tblProp);

                        TableRow row = new TableRow();
                        TableCell cell1 = new TableCell(new Paragraph(new Run(new Text("L'EMPLOYEUR") { Space = SpaceProcessingModeValues.Preserve }) { RunProperties = new RunProperties(new Bold()) }));
                        TableCell cell2 = new TableCell(new Paragraph(new Run(new Text("LE SALARIÉ") { Space = SpaceProcessingModeValues.Preserve }) { RunProperties = new RunProperties(new Bold()) }));
                        row.Append(cell1);
                        row.Append(cell2);
                        table.Append(row);
                        body.Append(table);

                        mainPart.Document.Save();
                    }
                });

                return relativeUrl;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] GenerateContractFileAsync: {ex.Message}");
                throw;
            }
        }

        private void AddParagraph(Body body, string text)
        {
            AddParagraph(body, text, false, 22, JustificationValues.Left);
        }

        private void AddParagraph(Body body, string text, bool isBold)
        {
            AddParagraph(body, text, isBold, 22, JustificationValues.Left);
        }

        private void AddParagraph(Body body, string text, bool isBold, int fontSize)
        {
            AddParagraph(body, text, isBold, fontSize, JustificationValues.Left);
        }

        private void AddParagraph(Body body, string text, bool isBold, int fontSize, JustificationValues justification)
        {
            Paragraph para = body.AppendChild(new Paragraph());
            ParagraphProperties paraProp = new ParagraphProperties();
            paraProp.AppendChild(new Justification() { Val = justification });
            para.AppendChild(paraProp);

            Run run = para.AppendChild(new Run());
            RunProperties runProp = new RunProperties();
            
            if (isBold) runProp.AppendChild(new Bold());
            runProp.AppendChild(new FontSize() { Val = fontSize.ToString() });
            
            run.AppendChild(runProp);
            run.AppendChild(new Text(text));
        }
    }
}
