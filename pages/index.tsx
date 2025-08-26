import Layout from '../components/Layout/Layout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import OverviewCards from '../components/Dashboard/OverviewCards';
import ExpenseTable from '../components/Dashboard/ExpenseTable';
import Charts from '../components/Dashboard/Charts';
import ExportData from '../components/Dashboard/ExportData';

export default function Dashboard() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <OverviewCards />
        <ExpenseTable />
        <Charts />
        <ExportData />
      </div>
    </Layout>
  );
}
