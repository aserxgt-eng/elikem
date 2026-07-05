'use client';

import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useProducts } from '@/lib/hooks/useProducts';
import { exportProductsToExcel, exportProductsToPdf, printProductList } from '@/lib/exports';
import { formatCurrency } from '@/lib/utils';
import { FileSpreadsheet, FileText, Printer, DatabaseBackup } from 'lucide-react';

export default function ReportsPage() {
  const { products, stats, categories } = useProducts();

  async function handleBackup() {
    // Client-side "backup" — exports the full catalog as JSON. For a true
    // server-side backup, trigger a Cloud Function that snapshots Firestore
    // to Cloud Storage on a schedule.
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elikem-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <DashboardTopbar title="Reports" />
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Inventory reports</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Export your full catalog of {products.length} products across {categories.length} categories
            (total value {formatCurrency(stats.inventoryValue)}).
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ReportCard
            icon={FileSpreadsheet}
            title="Excel export"
            description="Full product list as an .xlsx spreadsheet."
            action={() => exportProductsToExcel(products)}
            label="Download Excel"
          />
          <ReportCard
            icon={FileText}
            title="PDF export"
            description="Formatted PDF report for sharing or archiving."
            action={() => exportProductsToPdf(products)}
            label="Download PDF"
          />
          <ReportCard
            icon={Printer}
            title="Printable list"
            description="Clean, print-ready product list."
            action={() => printProductList(products)}
            label="Print list"
          />
          <ReportCard
            icon={DatabaseBackup}
            title="Backup database"
            description="Download a full JSON snapshot of your catalog."
            action={handleBackup}
            label="Backup now"
          />
        </div>
      </div>
    </div>
  );
}

function ReportCard({
  icon: Icon,
  title,
  description,
  action,
  label,
}: {
  icon: any;
  title: string;
  description: string;
  action: () => void;
  label: string;
}) {
  return (
    <Card>
      <CardHeader>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={20} />
        </span>
        <h3 className="mt-4 font-display text-base font-bold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" onClick={action}>{label}</Button>
      </CardContent>
    </Card>
  );
}
