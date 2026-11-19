/** Wordmark provisório em texto — trocar pelo logotipo quando ficar pronto. */
export function BrandFilters() { return null }
export default function BrandLogo({ className = '', decorative = false }: { className?: string; decorative?: boolean }) {
  return <span className={`brand-logo brand-wordmark ${className}`} aria-label={decorative ? undefined : 'Dr. Márcio Cesar da Silva'} aria-hidden={decorative || undefined}><span>Dr. Márcio</span><em>Cesar da Silva</em></span>
}
