import Layout from '../components/Layout/Layout';
import CategoriesHeader from '../components/Categories/CategoriesHeader';
import CategoriesGrid from '../components/Categories/CategoriesGrid';
import CategoryInsights from '../components/Categories/CategoryInsights';

export default function Categories() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <CategoriesHeader />
        <CategoriesGrid />
        <CategoryInsights />
      </div>
    </Layout>
  );
}
