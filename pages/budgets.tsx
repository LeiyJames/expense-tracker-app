import Layout from '../components/Layout/Layout';
import BudgetManagement from '../components/Budget/BudgetManagement';

export default function Budgets() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <BudgetManagement />
      </div>
    </Layout>
  );
}
