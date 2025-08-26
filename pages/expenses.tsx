import Layout from '../components/Layout/Layout';
import ExpensesHeader from '../components/Expenses/ExpensesHeader';
import ExpensesTable from '../components/Expenses/ExpensesTable';
import ExpensesSidebar from '../components/Expenses/ExpensesSidebar';

export default function Expenses() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <ExpensesHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ExpensesTable />
          </div>
          <div className="lg:col-span-1">
            <ExpensesSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}
