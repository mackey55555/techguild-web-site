import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { CompaniesHero } from '@/components/companies/companies-hero'
import { CompaniesCoCreate } from '@/components/companies/companies-co-create'
import { CompaniesWhyNow } from '@/components/companies/companies-why-now'
import { CompaniesInvolvement } from '@/components/companies/companies-involvement'
import { CompaniesWhoFits } from '@/components/companies/companies-who-fits'
import { CompaniesCta } from '@/components/companies/companies-cta'

export default function CompaniesPage() {
  return (
    <ScrollRevealProvider>
      <CompaniesHero />
      <CompaniesCoCreate />
      <CompaniesWhyNow />
      <CompaniesInvolvement />
      <CompaniesWhoFits />
      <CompaniesCta />
    </ScrollRevealProvider>
  )
}
