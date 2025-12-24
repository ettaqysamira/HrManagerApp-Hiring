using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace HR.API.Services
{
    public class CVParserService : ICVParserService
    {
        public async Task<string> ExtractTextAsync(string filePath)
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"CV file not found: {filePath}");
            }

            var extension = Path.GetExtension(filePath).ToLowerInvariant();
            
            return extension switch
            {
                ".pdf" => await ExtractTextFromPdfAsync(filePath),
                ".docx" => await ExtractTextFromDocxAsync(filePath),
                ".doc" => await ExtractTextFromDocxAsync(filePath),
                _ => throw new NotSupportedException($"File format {extension} is not supported. Only PDF and DOCX are supported.")
            };
        }

        public async Task<string> ExtractTextFromPdfAsync(string filePath)
        {
            return await Task.Run(() =>
            {
                try
                {
                    var sb = new StringBuilder();
                    
                    using (PdfDocument document = PdfDocument.Open(filePath))
                    {
                        foreach (Page page in document.GetPages())
                        {
                            sb.AppendLine(page.Text);
                        }
                    }
                    
                    return sb.ToString();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error extracting text from PDF: {ex.Message}", ex);
                }
            });
        }

        public async Task<string> ExtractTextFromDocxAsync(string filePath)
        {
            return await Task.Run(() =>
            {
                try
                {
                    var sb = new StringBuilder();
                    
                    using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(filePath, false))
                    {
                        if (wordDoc.MainDocumentPart?.Document?.Body != null)
                        {
                            foreach (var paragraph in wordDoc.MainDocumentPart.Document.Body.Elements<Paragraph>())
                            {
                                sb.AppendLine(paragraph.InnerText);
                            }
                        }
                    }
                    
                    return sb.ToString();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error extracting text from DOCX: {ex.Message}", ex);
                }
            });
        }
    }
}
