import Layout from '../components/Layout/Layout';
import AnalyticsHeader from '../components/Analytics/AnalyticsHeader';
import AnalyticsCharts from '../components/Analytics/AnalyticsCharts';
import InsightsBox from '../components/Analytics/InsightsBox';

export default function Analytics() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <AnalyticsHeader />
        <AnalyticsCharts />
        <InsightsBox />
      </div>
    </Layout>
  );
}
