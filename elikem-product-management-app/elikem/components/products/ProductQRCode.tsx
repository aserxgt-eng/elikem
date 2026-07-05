'use client';

/** Renders a scannable QR code encoding the product's canonical URL + batch number. */
import { QRCodeSVG } from 'qrcode.react';

interface ProductQRCodeProps {
  productId: string;
  batchNumber: string;
  size?: number;
}

export function ProductQRCode({ productId, batchNumber, size = 140 }: ProductQRCodeProps) {
  const payload = JSON.stringify({
    productId,
    batchNumber,
    url: typeof window !== 'undefined' ? `${window.location.origin}/products/${productId}` : `/products/${productId}`,
  });

  return (
    <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-surface-border bg-white p-4">
      <QRCodeSVG value={payload} size={size} fgColor="#1A2332" bgColor="#FFFFFF" level="M" />
      <p className="font-mono text-xs text-ink-muted">{batchNumber}</p>
    </div>
  );
}
