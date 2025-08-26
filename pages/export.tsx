import Layout from '../components/Layout/Layout';
import ExportHeader from '../components/Export/ExportHeader';
import ExportOptions from '../components/Export/ExportOptions';
import ExportPreview from '../components/Export/ExportPreview';

export default function Export() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <ExportHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExportOptions />
          </div>
          <div className="lg:col-span-2">
            <ExportPreview />
          </div>
        </div>
      </div>
    </Layout>
  );
}
