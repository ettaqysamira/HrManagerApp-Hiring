import React, { useState, useEffect } from 'react';
import PresenceService from '../../services/presence.service';
import { employeeApi } from '../../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import Input from '../../components/ui/Input';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import Icon from '../../components/AppIcon';
import KPICard from '../hr-dashboard-overview/components/KPICard';

const HRAttendanceDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [dailyReport, setDailyReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });

    useEffect(() => {
        fetchDailyReport();
    }, [selectedDate]);

    const fetchDailyReport = async () => {
        setLoading(true);
        try {
            const employeesResponse = await employeeApi.getEmployees();
            const employees = employeesResponse?.data || [];

            const presenceResponse = await PresenceService.getPresences(selectedDate);
            const presences = presenceResponse?.data || [];

            const report = employees.map(emp => {
                const morning = presences.find(a => (a.employeeId === emp.id || a.employeeId === emp.employeeId) && a.shift === 'Morning');

                let status = 'En attente';
                if (morning) {
                    status = morning.status === 'Absent' ? 'Absent' : 'Présent';
                }

                return {
                    id: emp.id,
                    name: `${emp.firstName} ${emp.lastName}`,
                    department: emp.department || 'N/A',
                    position: emp.position || 'N/A',
                    photoUrl: emp.photoUrl,
                    morning: morning ? { time: morning.time, status: morning.status, isLate: morning.isLate } : null,
                    status: status
                };
            });

            setDailyReport(report);

            setStats({
                total: employees.length,
                present: report.filter(r => r.status === 'Présent').length,
                absent: report.filter(r => r.status === 'Absent').length
            });

        } catch (error) {
            console.error("Critical error building daily report:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
                <Sidebar />
                <Header />
                <main className="main-content">
                    <Breadcrumb />

                    <div className="p-6 max-w-7xl mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                    Tableau de Bord Présences
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">
                                    Suivi quotidien de l'assiduité des collaborateurs.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <Icon name="Calendar" size={18} className="text-gray-500 ml-2" />
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="border-none bg-transparent focus:ring-0 text-sm font-medium text-gray-700 dark:text-gray-200"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <KPICard
                                title="Total Employés"
                                value={stats.total}
                                icon="Users"
                                iconColor="#3b82f6"
                                subtitle="Effectif enregistré"
                            />
                            <KPICard
                                title="Présents Aujourd'hui"
                                value={stats.present}
                                icon="UserCheck"
                                iconColor="#22c55e"
                                subtitle="Pointages validés"
                            />
                            <KPICard
                                title="Absents"
                                value={stats.absent}
                                icon="UserX"
                                iconColor="#ef4444"
                                subtitle="Absences non justifiées"
                            />
                        </div>

                        <Card className="border-none shadow-md bg-white dark:bg-gray-800 overflow-hidden">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/50 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                        <Icon name="List" size={20} className="text-primary" />
                                        Liste des Pointages
                                    </CardTitle>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                            <Icon name="Filter" size={18} className="text-gray-500" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                            <Icon name="Download" size={18} className="text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-gray-900/50 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Employé</th>
                                            <th className="px-6 py-4 font-medium">Département</th>
                                            <th className="px-6 py-4 font-medium">Heure de Pointage</th>
                                            <th className="px-6 py-4 font-medium text-center">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <Icon name="Loader2" className="animate-spin text-primary" size={24} />
                                                        <span>Chargement des données...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : dailyReport.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <Icon name="AlertCircle" size={24} />
                                                        <span>Aucune donnée trouvée pour cette date.</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            dailyReport.map((row) => (
                                                <tr key={row.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs overflow-hidden">
                                                                {row.photoUrl ? (
                                                                    <img src={row.photoUrl} alt={row.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    row.name.charAt(0)
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{row.name}</div>
                                                                <div className="text-xs text-gray-500">{row.position}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                            {row.department}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {row.morning ? (
                                                            <div className="flex flex-col items-start gap-1">
                                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${row.morning.status === 'Accepted'
                                                                    ? 'bg-green-50 text-green-700 border border-green-100'
                                                                    : 'bg-red-50 text-red-700 border border-red-100'
                                                                    }`}>
                                                                    <Icon name={row.morning.status === 'Accepted' ? 'CheckCircle' : 'XCircle'} size={12} />
                                                                    {row.morning.time.substring(0, 5)}
                                                                </span>
                                                                {row.morning.isLate && (
                                                                    <span className="text-[10px] text-red-500 font-medium">Retard</span>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-300 italic text-xs">Pas de pointage</span>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${row.status === 'Présent'
                                                            ? 'bg-green-100 text-green-700 ring-1 ring-green-600/20'
                                                            : row.status === 'Absent'
                                                                ? 'bg-red-100 text-red-700 ring-1 ring-red-600/20'
                                                                : 'bg-gray-100 text-gray-700 ring-1 ring-gray-600/20'
                                                            }`}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default HRAttendanceDashboard;
