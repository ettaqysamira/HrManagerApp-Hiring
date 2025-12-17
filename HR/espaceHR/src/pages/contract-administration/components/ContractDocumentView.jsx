import React, { useRef } from 'react';
import Button from '../../../components/ui/Button';

const ContractDocumentView = ({ contract, onClose }) => {
    const printRef = useRef();

    const handlePrint = () => {
        const printContent = printRef.current;
        const windowUrl = 'about:blank';
        const uniqueName = new Date().getTime();
        const windowName = 'Print' + uniqueName;
        const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

        printWindow.document.write(`
            <html>
                <head>
                    <title>Contrat de Travail - ${contract.employee?.firstName} ${contract.employee?.lastName}</title>
                    <style>
                        body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; }
                        h1 { text-align: center; text-transform: uppercase; margin-bottom: 40px; }
                        h2 { margin-top: 30px; font-size: 18px; }
                        p { margin-bottom: 15px; text-align: justify; }
                        .header { display: flex; justify-content: space-between; margin-bottom: 50px; }
                        .signature-section { display: flex; justify-content: space-between; margin-top: 80px; }
                        .signature-box { width: 200px; text-align: center; }
                        .bold { font-weight: bold; }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    if (!contract) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">Aperçu du Contrat</h3>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrint} iconName="Printer">Imprimer</Button>
                        <Button variant="ghost" onClick={onClose} iconName="X">Fermer</Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-gray-100 dark:bg-gray-900">
                    <div ref={printRef} className="bg-white text-black p-12 shadow-lg mx-auto max-w-[210mm] min-h-[297mm]">
                        <h1>CONTRAT DE TRAVAIL ({contract.type})</h1>

                        <p>
                            <strong>ENTRE LES SOUSSIGNÉS :</strong>
                        </p>

                        <p>
                            L'entreprise <strong>HR Manager Corp</strong>, sise à Casablanca, représentée par le Directeur des Ressources Humaines.<br />
                            Ci-après dénommée "L'Employeur".
                        </p>

                        <p><strong>ET :</strong></p>

                        <p>
                            M./Mme <strong>{contract.employee?.firstName} {contract.employee?.lastName}</strong><br />
                            Matricule : {contract.employeeId}<br />
                            Ci-après dénommé(e) "Le Salarié".
                        </p>

                        <div style={{ height: '2px', background: '#000', margin: '20px 0' }}></div>

                        <h2>ARTICLE 1 : ENGAGEMENT</h2>
                        <p>
                            L'Employeur engage le Salarié sous contrat <strong>{contract.type}</strong> à compter du <strong>{new Date(contract.startDate).toLocaleDateString()}</strong>.
                            {contract.endDate && ` Ce contrat est conclu pour une durée déterminée prenant fin le ${new Date(contract.endDate).toLocaleDateString()}.`}
                        </p>

                        <h2>ARTICLE 2 : FONCTIONS</h2>
                        <p>
                            Le Salarié occupera le poste de <strong>{contract.employee?.position || 'Employé'}</strong>. Il s'engage à accomplir les tâches qui lui seront confiées avec diligence et professionnalisme.
                        </p>

                        <h2>ARTICLE 3 : RÉMUNÉRATION</h2>
                        <p>
                            En contrepartie de son travail, le Salarié percevra un salaire mensuel net de <strong>{contract.salary} MAD</strong>.
                        </p>

                        <h2>ARTICLE 4 : LIEU DE TRAVAIL</h2>
                        <p>
                            Le lieu de travail est fixé au siège de l'entreprise à Casablanca. Le Salarié pourra être amené à effectuer des déplacements professionnels.
                        </p>

                        <h2>ARTICLE 5 : DISPOSITIONS DIVERSES</h2>
                        <p>
                            Le présent contrat est régi par la législation du travail en vigueur au Maroc. Tout litige relatif à l'interprétation ou l'exécution du présent contrat sera de la compétence des tribunaux de Casablanca.
                        </p>

                        <div className="signature-section">
                            <div className="signature-box">
                                <p><strong>L'EMPLOYEUR</strong></p>
                                <p style={{ marginTop: '50px' }}>(Signature et Cachet)</p>
                            </div>
                            <div className="signature-box">
                                <p><strong>LE SALARIÉ</strong></p>
                                <p style={{ fontSize: '12px' }}>Lu et approuvé</p>
                                <p style={{ marginTop: '35px' }}>(Signature)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDocumentView;
